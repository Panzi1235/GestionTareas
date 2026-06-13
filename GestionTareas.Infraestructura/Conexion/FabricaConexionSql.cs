using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace GestionTareas.Infraestructura.Conexion;

public class FabricaConexionSql
{
    private readonly IConfiguration _configuration;

    public FabricaConexionSql(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public IDbConnection CrearConexion()
    {
        var cadena = _configuration.GetConnectionString("DefaultConnection");
        return new SqlConnection(cadena);
    }
}