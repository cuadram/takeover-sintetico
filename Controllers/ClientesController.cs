using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FacturaFlow.Models;
using FacturaFlow.Data;
using Microsoft.EntityFrameworkCore;

namespace FacturaFlow.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class ClientesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClientesController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/v1/clientes
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Clientes.ToListAsync());
        }

        // GET api/v1/clientes/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null) return NotFound();
            return Ok(cliente);
        }

        // POST api/v1/clientes
        [HttpPost]
        [Authorize(Roles = "Admin,Comercial")]
        public async Task<IActionResult> Create([FromBody] Cliente cliente)
        {
            // TODO: Validar NIF/CIF único antes de insertar
            // TODO: Enviar email de bienvenida al crear cliente
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = cliente.Id }, cliente);
        }

        // PUT api/v1/clientes/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Comercial")]
        public async Task<IActionResult> Update(int id, [FromBody] Cliente cliente)
        {
            if (id != cliente.Id) return BadRequest();
            _context.Entry(cliente).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // GET api/v1/clientes/{id}/facturas
        [HttpGet("{id}/facturas")]
        public async Task<IActionResult> GetFacturas(int id)
        {
            var facturas = _context.Facturas
                .Where(f => f.ClienteId == id)
                .ToList();
            return Ok(facturas);
        }
    }
}
