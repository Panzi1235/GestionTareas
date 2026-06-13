using GestionTareas.Aplicacion.DTOs;

namespace GestionTareas.Aplicacion.Interfaces;

public interface ITareaRepositorio
{
    Task<IEnumerable<TareaDto>> ListarAsync();

    Task<TareaDto?> ObtenerPorIdAsync(int id);

    Task<IEnumerable<TareaDto>> FiltrarAsync(string? estado, string? prioridad);
}