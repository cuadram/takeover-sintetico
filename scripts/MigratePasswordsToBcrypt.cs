// ─────────────────────────────────────────────────────────────────────────────
// scripts/MigratePasswordsToBcrypt.cs — Script one-shot RT-005
// Sprint 1 FacturaFlow — SOFIA v2.6.25
//
// PRERREQUISITOS:
//   1. Backup completo de BD antes de ejecutar (OBLIGATORIO)
//   2. Migración estructural AddPasswordHash ya aplicada:
//      dotnet ef database update AddPasswordHash
//   3. Variable de entorno CONNECTIONSTRINGS__DEFAULTCONNECTION configurada
//
// EJECUCIÓN:
//   dotnet script scripts/MigratePasswordsToBcrypt.cs
//   -- o desde el proyecto principal si se incluye en el .csproj como herramienta --
//
// VERIFICACIÓN post-ejecución:
//   SELECT COUNT(*) FROM Usuarios WHERE PasswordHash = 'PENDING_MIGRATION';  -- debe ser 0
//   SELECT COUNT(*) FROM Usuarios WHERE Password IS NOT NULL;                 -- debe ser 0
//   SELECT LEFT(PasswordHash, 4) FROM Usuarios;                               -- debe ser '$2a'
// ─────────────────────────────────────────────────────────────────────────────

using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using FacturaFlow.Data;

Console.WriteLine("=== FacturaFlow — Migración de passwords a BCrypt ===");
Console.WriteLine($"Inicio: {DateTime.UtcNow:O}");

// ── Verificar backup antes de proceder ────────────────────────────────────
Console.Write("¿Confirmas que se ha realizado backup de la BD? [s/N]: ");
var confirmacion = Console.ReadLine()?.Trim().ToLower();
if (confirmacion != "s")
{
    Console.Error.WriteLine("ABORTADO: realizar backup de BD antes de ejecutar este script.");
    Environment.Exit(1);
}

// ── Configuración desde variables de entorno ──────────────────────────────
var connectionString = Environment.GetEnvironmentVariable("CONNECTIONSTRINGS__DEFAULTCONNECTION")
    ?? throw new InvalidOperationException(
        "Variable de entorno CONNECTIONSTRINGS__DEFAULTCONNECTION no configurada.");

var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
optionsBuilder.UseSqlServer(connectionString);

await using var db = new AppDbContext(optionsBuilder.Options);

// ── Consultar usuarios pendientes de migración ────────────────────────────
var usuariosPendientes = await db.Usuarios
    .Where(u => u.PasswordHash == "PENDING_MIGRATION")
    .ToListAsync();

Console.WriteLine($"Usuarios pendientes de migración: {usuariosPendientes.Count}");

if (usuariosPendientes.Count == 0)
{
    Console.WriteLine("No hay usuarios pendientes. Migración ya completada.");
    Environment.Exit(0);
}

// ── Migrar passwords ──────────────────────────────────────────────────────
int migrados = 0;
int errores  = 0;

foreach (var usuario in usuariosPendientes)
{
    try
    {
        if (string.IsNullOrWhiteSpace(usuario.Password))
        {
            // Usuario sin password en texto plano — asignar hash vacío temporal
            // El administrador deberá resetear su password manualmente
            Console.WriteLine($"  [WARN] Usuario {usuario.Id} ({usuario.Email}) sin password en texto plano — marcado para reset manual.");
            usuario.PasswordHash = BCrypt.HashPassword(Guid.NewGuid().ToString(), workFactor: 12);
            usuario.Password     = null;
        }
        else
        {
            // Hashear con BCrypt cost factor 12 (satisface RNF-B02: cost >= 10)
            usuario.PasswordHash = BCrypt.HashPassword(usuario.Password, workFactor: 12);
            usuario.Password     = null; // Vaciar texto plano
            migrados++;
        }
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"  [ERROR] Usuario {usuario.Id}: {ex.Message}");
        errores++;
    }
}

await db.SaveChangesAsync();

// ── Resumen ───────────────────────────────────────────────────────────────
Console.WriteLine();
Console.WriteLine("=== RESUMEN ===");
Console.WriteLine($"  Migrados correctamente : {migrados}");
Console.WriteLine($"  Errores                : {errores}");
Console.WriteLine($"  Fin: {DateTime.UtcNow:O}");

if (errores > 0)
{
    Console.Error.WriteLine("[WARN] Hubo errores en la migración. Revisar logs.");
    Environment.Exit(2);
}

Console.WriteLine("[OK] Migración completada. Ejecutar queries de verificación antes de desplegar.");
