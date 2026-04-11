using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using FacturaFlow.Data;
using FacturaFlow.Security;
using Serilog;

// ─────────────────────────────────────────────────────────
// SOFIA Sprint 1 — Program.cs
// Cambios: .NET 8 | secrets desde env vars | BCrypt DI
// RT-001, RT-002, RT-003, RT-004, RT-005
// ─────────────────────────────────────────────────────────

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    // ── SERILOG ────────────────────────────────────────────
    builder.Host.UseSerilog((ctx, lc) => lc
        .ReadFrom.Configuration(ctx.Configuration)
        .WriteTo.Console()
        .Enrich.FromLogContext());

    // ── RT-002: CONNECTION STRING desde variable de entorno ─
    // ASP.NET Core mapea CONNECTIONSTRINGS__DEFAULTCONNECTION → ConnectionStrings:DefaultConnection
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    if (string.IsNullOrWhiteSpace(connectionString))
        throw new InvalidOperationException(
            "CONNECTIONSTRINGS__DEFAULTCONNECTION no está configurado. " +
            "La aplicación no puede arrancar sin conexión a BD. " +
            "Ver .env.example para instrucciones.");

    // ── RT-003: EF CORE 8 ──────────────────────────────────
    builder.Services.AddDbContext<AppDbContext>(opts =>
        opts.UseSqlServer(connectionString));

    // ── RT-001: JWT SETTINGS desde variable de entorno ─────
    // ASP.NET Core mapea JWTAUTH__SECRET → JwtSettings:Secret
    builder.Services.AddOptions<JwtSettings>()
        .Bind(builder.Configuration.GetSection("JwtSettings"))
        .Validate(s => !string.IsNullOrWhiteSpace(s.Secret),
                  "JWTAUTH__SECRET no está configurado. " +
                  "La aplicación no puede arrancar sin JWT secret. " +
                  "Ver .env.example para instrucciones.")
        .ValidateOnStart();

    var jwtSettings = builder.Configuration
        .GetSection("JwtSettings")
        .Get<JwtSettings>()
        ?? throw new InvalidOperationException("Sección JwtSettings no encontrada en configuración.");

    // ── RT-004: JWT BEARER 8 ───────────────────────────────
    builder.Services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer           = true,
                ValidateAudience         = true,
                ValidateLifetime         = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer              = jwtSettings.Issuer,
                ValidAudience            = jwtSettings.Audience,
                IssuerSigningKey         = new SymmetricSecurityKey(
                                               Encoding.UTF8.GetBytes(jwtSettings.Secret)),
                ClockSkew = TimeSpan.Zero
            };
        });

    builder.Services.AddAuthorization();

    // ── RT-005: BCRYPT — registrar como singleton ──────────
    // BCrypt.Net.BCrypt es estático — no requiere DI, pero se documenta aquí
    // para trazabilidad de la dependencia en el sprint.
    // Uso: BCrypt.Net.BCrypt.HashPassword(password, workFactor: 12)
    //      BCrypt.Net.BCrypt.Verify(password, hash)

    // ── CONTROLADORES + AUTOMAPPER ─────────────────────────
    builder.Services.AddControllers();
    builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

    // ── SWAGGER ────────────────────────────────────────────
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseSerilogRequestLogging();
    app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();

    Log.Information("FacturaFlow iniciando — entorno: {Env}", app.Environment.EnvironmentName);
    app.Run();
}
catch (Exception ex) when (ex is not OperationCanceledException)
{
    Log.Fatal(ex, "FacturaFlow terminó inesperadamente al arrancar.");
    throw;
}
finally
{
    Log.CloseAndFlush();
}
