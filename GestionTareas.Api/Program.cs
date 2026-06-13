using GestionTareas.Aplicacion.Interfaces;
using GestionTareas.Aplicacion.Servicios;
using GestionTareas.Infraestructura.Conexion;
using GestionTareas.Infraestructura.Repositorios;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<FabricaConexionSql>();
builder.Services.AddScoped<ITareaRepositorio, TareaRepositorio>();
builder.Services.AddScoped<ITareaServicio, TareaServicio>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("PoliticaCors", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("PoliticaCors");

app.UseHttpsRedirection();

app.MapControllers();

app.Run();