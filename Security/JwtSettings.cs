namespace FacturaFlow.Security
{
    /// <summary>
    /// Configuración JWT leída desde variables de entorno vía IConfiguration.
    /// El campo <see cref="Secret"/> se inyecta exclusivamente desde JWTAUTH__SECRET.
    /// Nunca debe aparecer en appsettings.json ni en el repositorio.
    /// </summary>
    public class JwtSettings
    {
        /// <summary>
        /// JWT signing secret. Mínimo 256 bits (32 bytes, base64).
        /// Fuente: variable de entorno JWTAUTH__SECRET.
        /// </summary>
        public string Secret { get; set; } = string.Empty;

        /// <summary>Emisor del token — valor de appsettings.json.</summary>
        public string Issuer { get; set; } = "FacturaFlow";

        /// <summary>Audiencia del token — valor de appsettings.json.</summary>
        public string Audience { get; set; } = "FacturaFlowClients";

        /// <summary>Tiempo de expiración del token en minutos. Default 1440 (24h).</summary>
        public int ExpiryMinutes { get; set; } = 1440;
    }
}
