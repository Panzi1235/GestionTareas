# Documentación Técnica

## Arquitectura

La solución está dividida en cuatro proyectos:

- GestionTareas.Api
- GestionTareas.Aplicacion
- GestionTareas.Dominio
- GestionTareas.Infraestructura

## GestionTareas.Api

Expone los endpoints REST mediante controladores.

Endpoints:

- GET /api/Tareas
- GET /api/Tareas/{id}
- GET /api/Tareas/filtro

## GestionTareas.Aplicacion

Contiene interfaces, DTOs y servicios.

## GestionTareas.Dominio

Contiene la entidad principal Tarea.

## GestionTareas.Infraestructura

Contiene la conexión SQL Server y los repositorios con Dapper.

## Flujo

React Native consume la API mediante Axios.
La API llama al servicio.
El servicio llama al repositorio.
El repositorio ejecuta procedimientos almacenados.
SQL Server devuelve los datos.

## Procedimientos almacenados

- usp_ListarTareas
- usp_ObtenerTarea
- usp_FiltrarTareas