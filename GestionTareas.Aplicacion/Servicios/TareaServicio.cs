using GestionTareas.Aplicacion.DTOs;
using GestionTareas.Aplicacion.Interfaces;

namespace GestionTareas.Aplicacion.Servicios;

public class TareaServicio : ITareaServicio
{
    private readonly ITareaRepositorio _repositorio;

    public TareaServicio(ITareaRepositorio repositorio)
    {
        _repositorio = repositorio;
    }

    public async Task<IEnumerable<TareaDto>> ListarAsync()
    {
        return await _repositorio.ListarAsync();
    }

    public async Task<TareaDto?> ObtenerPorIdAsync(int id)
    {
        return await _repositorio.ObtenerPorIdAsync(id);
    }

    public async Task<IEnumerable<TareaDto>> FiltrarAsync(string? estado, string? prioridad)
    {
        return await _repositorio.FiltrarAsync(estado, prioridad);
    }
}