USE GestionTareasDb;
GO



CREATE TABLE Tarea
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Titulo VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(500) NOT NULL,
    Prioridad VARCHAR(20) NOT NULL,
    Estado VARCHAR(20) NOT NULL,
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE()
);
GO

INSERT INTO Tarea
(
    Titulo,
    Descripcion,
    Prioridad,
    Estado
)
VALUES
('Comprar pan', 'Ir a la tienda a comprar pan.', 'Alta', 'Pendiente'),
('Pagar recibo', 'Pagar el recibo de luz.', 'Media', 'Pendiente'),
('Llamar al cliente', 'Confirmar la reunión programada.', 'Alta', 'En Proceso'),
('Enviar correo', 'Enviar información solicitada.', 'Baja', 'Completada'),
('Hacer compras', 'Comprar productos para la semana.', 'Media', 'Pendiente'),
('Estudiar React', 'Revisar componentes y hooks.', 'Alta', 'En Proceso'),
('Limpiar escritorio', 'Ordenar documentos y archivos.', 'Baja', 'Completada');
GO

CREATE OR ALTER PROCEDURE usp_ListarTareas
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Id,
        Titulo,
        Descripcion,
        Prioridad,
        Estado,
        FechaCreacion
    FROM Tarea
    ORDER BY Id DESC;
END;
GO

CREATE OR ALTER PROCEDURE usp_ObtenerTarea
(
    @Id INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Id,
        Titulo,
        Descripcion,
        Prioridad,
        Estado,
        FechaCreacion
    FROM Tarea
    WHERE Id = @Id;
END;
GO

CREATE OR ALTER PROCEDURE usp_FiltrarTareas
(
    @Estado VARCHAR(20) = NULL,
    @Prioridad VARCHAR(20) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Id,
        Titulo,
        Descripcion,
        Prioridad,
        Estado,
        FechaCreacion
    FROM Tarea
    WHERE
        (@Estado IS NULL OR Estado = @Estado)
        AND
        (@Prioridad IS NULL OR Prioridad = @Prioridad)
    ORDER BY Id DESC;
END;
GO