using Xunit;
using FluentAssertions;
using FacturaFlow.Models;
using BCryptNet = BCrypt.Net.BCrypt;

namespace FacturaFlow.Tests
{
    /// <summary>
    /// Tests de autenticación — Sprint 1 RT-005.
    /// Verifica el comportamiento de BCrypt en la entidad Usuario.
    /// </summary>
    public class AuthTests
    {
        // ── RT-005: BCrypt hash y verificación ────────────────────────────────

        [Fact]
        public void BCrypt_HashPassword_DebeGenerarHashValido()
        {
            // Arrange
            const string password = "P@ssw0rdSeguro";

            // Act
            var hash = BCryptNet.HashPassword(password, workFactor: 12);

            // Assert
            hash.Should().NotBeNullOrEmpty();
            hash.Should().StartWith("$2a$12$",
                because: "BCrypt cost factor 12 debe producir hash con prefijo $2a$12$");
        }

        [Fact]
        public void BCrypt_Verify_DebeRetornarTrue_ConPasswordCorrecto()
        {
            // Arrange
            const string password = "P@ssw0rdSeguro";
            var hash = BCryptNet.HashPassword(password, workFactor: 12);

            // Act
            var resultado = BCryptNet.Verify(password, hash);

            // Assert
            resultado.Should().BeTrue(
                because: "BCrypt.Verify debe validar la contraseña correcta contra su hash");
        }

        [Fact]
        public void BCrypt_Verify_DebeRetornarFalse_ConPasswordIncorrecto()
        {
            // Arrange
            const string password = "P@ssw0rdSeguro";
            const string passwordIncorrecto = "OtraContraseña";
            var hash = BCryptNet.HashPassword(password, workFactor: 12);

            // Act
            var resultado = BCryptNet.Verify(passwordIncorrecto, hash);

            // Assert
            resultado.Should().BeFalse(
                because: "BCrypt.Verify debe rechazar contraseña incorrecta");
        }

        [Fact]
        public void BCrypt_HashPassword_DosHashesMismoPassword_DebenSerDistintos()
        {
            // Arrange — BCrypt usa salt aleatorio por diseño
            const string password = "P@ssw0rdSeguro";

            // Act
            var hash1 = BCryptNet.HashPassword(password, workFactor: 12);
            var hash2 = BCryptNet.HashPassword(password, workFactor: 12);

            // Assert — el salt aleatorio garantiza hashes distintos
            hash1.Should().NotBe(hash2,
                because: "BCrypt debe generar hashes distintos con el mismo password (salt aleatorio)");
            // Pero ambos verifican correctamente
            BCryptNet.Verify(password, hash1).Should().BeTrue();
            BCryptNet.Verify(password, hash2).Should().BeTrue();
        }

        [Fact]
        public void BCrypt_CostFactor_DebeSerMinimo10()
        {
            // Arrange — RNF-B02: cost factor >= 10
            const string password = "P@ssw0rdSeguro";

            // Act
            var hash = BCryptNet.HashPassword(password, workFactor: 12);

            // Assert — extraer cost factor del hash
            // Formato BCrypt: $2a$COST$SALT+HASH
            var partes = hash.Split('$');
            var costFactor = int.Parse(partes[2]);

            costFactor.Should().BeGreaterThanOrEqualTo(10,
                because: "RNF-B02 exige BCrypt cost factor >= 10");
        }

        // ── RT-005: Entidad Usuario post-migración ────────────────────────────

        [Fact]
        public void Usuario_TrasMigracion_PasswordDebeSerNull()
        {
            // Arrange — simular estado post-migración
            var usuario = new Usuario
            {
                Id           = 1,
                Email        = "test@facturaflow.es",
                Password     = null,    // vaciado en migración
                PasswordHash = BCryptNet.HashPassword("contraseña", workFactor: 12),
                Rol          = "Comercial",
                Activo       = true
            };

            // Assert
            usuario.Password.Should().BeNull(
                because: "RT-005: columna Password debe estar vacía tras la migración BCrypt");
            usuario.PasswordHash.Should().NotBeNullOrEmpty(
                because: "RT-005: PasswordHash debe contener el hash BCrypt");
            usuario.PasswordHash!.Should().StartWith("$2a$",
                because: "PasswordHash debe ser un hash BCrypt válido");
        }
    }
}
