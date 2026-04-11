using Microsoft.EntityFrameworkCore;
using FacturaFlow.Models;

namespace FacturaFlow.Data
{
    /// <summary>Contexto principal de EF Core 8 para FacturaFlow.</summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Factura> Facturas { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Factura>(entity =>
            {
                entity.HasKey(f => f.Id);
                entity.Property(f => f.Numero).IsRequired().HasMaxLength(20);
                entity.Property(f => f.Estado).IsRequired().HasMaxLength(20);
                entity.Property(f => f.BaseImponible).HasPrecision(18, 2);
                entity.Property(f => f.Total).HasPrecision(18, 2);
                entity.HasOne(f => f.Cliente)
                      .WithMany(c => c.Facturas)
                      .HasForeignKey(f => f.ClienteId);
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.Property(c => c.NifCif).IsRequired().HasMaxLength(20);
                entity.HasIndex(c => c.NifCif).IsUnique();
                entity.Property(c => c.RazonSocial).IsRequired().HasMaxLength(200);
                entity.Property(c => c.TipoCliente).HasDefaultValue("NACIONAL");
                entity.Property(c => c.Email).HasMaxLength(255);
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Email).IsRequired().HasMaxLength(255);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.Rol).IsRequired().HasMaxLength(50);

                // RT-005: Password deprecated — nullable para mantener rollback posible
                entity.Property(u => u.Password).IsRequired(false);

                // RT-005: PasswordHash — BCrypt cost 12, añadido en migración AddPasswordHash
                entity.Property(u => u.PasswordHash).IsRequired(false);
            });
        }
    }
}
