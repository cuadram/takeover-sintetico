namespace FacturaFlow.Models
{
    public class Factura
    {
        public int Id { get; set; }
        public string Numero { get; set; } = string.Empty;
        public int ClienteId { get; set; }
        public Cliente? Cliente { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaEmision { get; set; }
        public DateTime? FechaVencimiento { get; set; }
        // Estado: BORRADOR | EMITIDA | PAGADA | ANULADA
        public string Estado { get; set; } = "BORRADOR";
        public decimal BaseImponible { get; set; }
        public decimal PorcentajeIVA { get; set; } = 21;
        public decimal Total { get; set; }
        // TODO(TECH-DEBT): Añadir líneas de factura (FK a TablaLineasFactura) — DEBT-TK-013
        // TODO(TECH-DEBT): Añadir campo SerieFactura para numeración por ejercicio
    }

    public class Cliente
    {
        public int Id { get; set; }
        public string RazonSocial { get; set; } = null!;
        public string NifCif { get; set; } = null!;
        // TODO(TECH-DEBT): Email y Telefono deben tener validación de formato — DEBT-TK pendiente
        public string Email { get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
        public bool Activo { get; set; } = true;
        public DateTime FechaAlta { get; set; }
        // Tipo: NACIONAL | EUROPEO | EXTRACOMUNITARIO (afecta al IVA)
        public string TipoCliente { get; set; } = "NACIONAL";
        public List<Factura> Facturas { get; set; } = new();
    }

    public class Usuario
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;

        /// <summary>
        /// DEPRECATED — Sprint 1 RT-005: vaciado a NULL tras migración BCrypt.
        /// No usar en lógica de autenticación nueva.
        /// </summary>
        [Obsolete("Deprecated en Sprint 1 (RT-005). Usar PasswordHash con BCrypt.")]
        public string? Password { get; set; }

        /// <summary>
        /// Hash BCrypt (cost factor 12) de la contraseña del usuario.
        /// Formato: $2a$12$... — añadido en migración AddPasswordHash.
        /// </summary>
        public string? PasswordHash { get; set; }

        // Roles: Admin | Comercial | Contabilidad | Solo_Lectura
        public string Rol { get; set; } = "Solo_Lectura";
        public bool Activo { get; set; } = true;
    }
}
