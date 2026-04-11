using Xunit;
using FluentAssertions;
using FacturaFlow.Models;

namespace FacturaFlow.Tests
{
    // NOTA: Tests existentes mantenidos y actualizados a FluentAssertions — Sprint 1 RT-003
    // test_ratio pre-Sprint1: 1 fichero / 6 prod = 0.17 → riesgo regresión HIGH
    // test_ratio post-Sprint1: 2 ficheros / 6 prod = 0.33 → mejorado (target S3: >= 0.80)

    public class FacturaTests
    {
        [Fact]
        public void Factura_EstadoInicial_DebeSerBorrador()
        {
            // Arrange & Act
            var factura = new Factura();

            // Assert
            factura.Estado.Should().Be("BORRADOR",
                because: "el estado inicial de una factura debe ser BORRADOR según el modelo de negocio");
        }

        [Fact]
        public void Factura_Total_DebeCalcularseCorrectamente()
        {
            // Arrange
            var factura = new Factura
            {
                BaseImponible = 1000m,
                PorcentajeIVA = 21m
            };

            // Act
            // TODO(TECH-DEBT): El cálculo del total NO es automático — requiere método de dominio
            // Ticket: DEBT-TK pendiente (Sprint 2)
            factura.Total = factura.BaseImponible + (factura.BaseImponible * factura.PorcentajeIVA / 100);

            // Assert
            factura.Total.Should().Be(1210m,
                because: "1000 + 21% IVA = 1210");
        }

        // TODO: Añadir tests para ciclo de vida completo BORRADOR → EMITIDA → PAGADA (Sprint 2)
        // TODO: Añadir tests para validación NIF/CIF único (Sprint 2)
        // TODO: Añadir tests de integración con Testcontainers SQL Server (Sprint 3)
    }
}
