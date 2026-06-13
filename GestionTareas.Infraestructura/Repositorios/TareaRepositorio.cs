using Dapper;
using GestionTareas.Aplicacion.DTOs;
using GestionTareas.Aplicacion.Interfaces;
using GestionTareas.Infraestructura.Conexion;
using System.Data;

namespace GestionTareas.Infraestructura.Repositorios;

public class TareaRepositorio : ITareaRepositorio
{
    private readonly FabricaConexionSql _fabricaConexion;

    public TareaRepositorio(FabricaConexionSql fabricaConexion)
    {
        _fabricaConexion = fabricaConexion;
    }

    public async Task<IEnumerable<TareaDto>> ListarAsync()
    {
        using var conexion = _fabricaConexion.CrearConexion();

        return await conexion.QueryAsync<TareaDto>(
            "usp_ListarTareas",
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<TareaDto?> ObtenerPorIdAsync(int id)
    {
        using var conexion = _fabricaConexion.CrearConexion();

        return await conexion.QueryFirstOrDefaultAsync<TareaDto>(
            "usp_ObtenerTarea",
            new { Id = id },
            commandType: CommandType.StoredProcedure
        );
    }

    public async Task<IEnumerable<TareaDto>> FiltrarAsync(string? estado, string? prioridad)
    {
        using var conexion = _fabricaConexion.CrearConexion();

        return await conexion.QueryAsync<TareaDto>(
            "usp_FiltrarTareas",
            new
            {
                Estado = estado,
                Prioridad = prioridad
            },
            commandType: CommandType.StoredProcedure
        );
    }
}