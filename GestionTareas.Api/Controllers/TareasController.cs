using GestionTareas.Aplicacion.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GestionTareas.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TareasController : ControllerBase
{
    private readonly ITareaServicio _servicio;

    public TareasController(ITareaServicio servicio)
    {
        _servicio = servicio;
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var resultado = await _servicio.ListarAsync();
        return Ok(resultado);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Obtener(int id)
    {
        var resultado = await _servicio.ObtenerPorIdAsync(id);

        if (resultado == null)
            return NotFound();

        return Ok(resultado);
    }

    [HttpGet("filtro")]
    public async Task<IActionResult> Filtrar(
        string? estado,
        string? prioridad)
    {
        var resultado = await _servicio.FiltrarAsync(
            estado,
            prioridad);

        return Ok(resultado);
    }
}