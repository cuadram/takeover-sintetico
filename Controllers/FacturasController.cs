using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FacturaFlow.Models;
using FacturaFlow.Data;
using Microsoft.EntityFrameworkCore;

namespace FacturaFlow.Controllers
{
    // TODO: Añadir paginación a todos los endpoints de listado
    // TODO: Implementar rate limiting en endpoints de creación
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class FacturasController : ControllerBase
    {
        private readonly AppDbContext _context;

        // FIXME: Inyectar IFacturaRepository en lugar de DbContext directamente
        // Viola Clean Architecture — Application no debe depender de Infrastructure
        public FacturasController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/v1/facturas
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? estado)
        {
            // HACK: Filtro manual en memoria — migrar a IQueryable con filtros en BD
            var facturas = await _context.Facturas.ToListAsync();
            if (estado != null)
                facturas = facturas.Where(f => f.Estado == estado).ToList();
            return Ok(facturas);
        }

        // GET api/v1/facturas/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var factura = await _context.Facturas.FindAsync(id);
            if (factura == null) return NotFound();
            return Ok(factura);
        }

        // POST api/v1/facturas
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Factura factura)
        {
            // TODO: Validar que el cliente existe antes de crear la factura
            // TODO: Calcular total automáticamente desde las líneas
            factura.FechaCreacion = DateTime.UtcNow;
            factura.Estado = "BORRADOR";
            _context.Facturas.Add(factura);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = factura.Id }, factura);
        }

        // PUT api/v1/facturas/{id}/emitir
        [HttpPut("{id}/emitir")]
        public async Task<IActionResult> Emitir(int id)
        {
            var factura = await _context.Facturas.FindAsync(id);
            if (factura == null) return NotFound();
            if (factura.Estado != "BORRADOR")
                return BadRequest("Solo se pueden emitir facturas en estado BORRADOR");
            factura.Estado = "EMITIDA";
            factura.FechaEmision = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return Ok(factura);
        }

        // DELETE api/v1/facturas/{id}
        // FIXME: No debería ser DELETE sino PUT a estado ANULADA — GDPR audit trail
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var factura = await _context.Facturas.FindAsync(id);
            if (factura == null) return NotFound();
            _context.Facturas.Remove(factura);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
