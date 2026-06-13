# Gestión de Tareas

Aplicación móvil desarrollada en React Native CLI conectada a un microservicio REST en .NET y una base de datos SQL Server.

## Tecnologías Utilizadas

### Backend

- .NET 10
- ASP.NET Core Web API
- Dapper
- SQL Server
- Stored Procedures
- Swagger / OpenAPI

### Frontend

- React Native CLI
- TypeScript
- Axios

### Base de Datos

- SQL Server Express 2022

---

# Arquitectura

La solución fue desarrollada utilizando una arquitectura por capas para mantener una adecuada separación de responsabilidades y facilitar la escalabilidad y mantenimiento del sistema.

```text
GestionTareas.Api
        ↓
GestionTareas.Aplicacion
        ↓
GestionTareas.Dominio
        ↓
GestionTareas.Infraestructura
        ↓
SQL Server
```

## Descripción de Capas

### GestionTareas.Api

Contiene los controladores REST, configuración de Swagger, inyección de dependencias y punto de entrada de la aplicación.

### GestionTareas.Aplicacion

Contiene DTOs, interfaces y servicios de negocio.

### GestionTareas.Dominio

Contiene las entidades principales del sistema.

### GestionTareas.Infraestructura

Contiene los repositorios, acceso a datos mediante Dapper y la conexión a SQL Server.

---

# Estructura del Proyecto

```text
GestionTareas
│
├── GestionTareas.Api
├── GestionTareas.Aplicacion
├── GestionTareas.Dominio
├── GestionTareas.Infraestructura
│
├── Frontend
│   └── GestionTareasMovil
│
├── docs
│   ├── diagrama_arquitectura_backend.png
│   ├── diagrama_comunicacion_app_api_db.png
│   └── diagramas.md
│
├── DOCUMENTACION_TECNICA.md
├── README.md
└── scripts
```

---

# Base de Datos

## Requisitos

- SQL Server Express 2022 o superior
- SQL Server Management Studio (SSMS)

## Configuración

Ejecutar el script SQL incluido en el proyecto para crear:

- Base de datos
- Tabla Tarea
- Datos de prueba
- Procedimientos almacenados

### Procedimientos almacenados utilizados

```text
usp_ListarTareas
usp_ObtenerTarea
usp_FiltrarTareas
```

---

# Backend

## Requisitos

- .NET SDK 10 o superior

## Configuración

Actualizar la cadena de conexión en:

```text
GestionTareas.Api/appsettings.json
```

Ejemplo:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=GestionTareasDb;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

## Ejecutar API

```bash
cd GestionTareas.Api
dotnet run
```

La API estará disponible en:

```text
http://localhost:5003
```

Swagger:

```text
http://localhost:5003/swagger
```

---

# Endpoints Disponibles

## Obtener todas las tareas

```http
GET /api/Tareas
```

## Obtener tarea por Id

```http
GET /api/Tareas/{id}
```

Ejemplo:

```http
GET /api/Tareas/1
```

## Filtrar tareas

```http
GET /api/Tareas/filtro?estado=Pendiente&prioridad=Alta
```

---

# Frontend

## Requisitos

- Node.js
- Android Studio
- Android SDK
- JDK 17

## Instalar dependencias

```bash
cd Frontend/GestionTareasMovil
npm install
```

## Ejecutar Metro

```bash
npx react-native start
```

## Ejecutar aplicación Android

```bash
npx react-native run-android
```

---

# Funcionalidades Implementadas

## Gestión de tareas

- Listado de tareas
- Filtrado por estado
- Filtrado por prioridad
- Visualización de detalle de tarea

## Estados

```text
Pendiente
En Proceso
Completada
```

## Prioridades

```text
Alta
Media
Baja
```

---

# Comunicación de la Solución

```text
React Native
      ↓ HTTP
ASP.NET Core API
      ↓ Dapper
SQL Server
```

---

# Decisiones Técnicas

## Dapper

Se utilizó Dapper debido a su simplicidad, alto rendimiento y excelente integración con procedimientos almacenados.

## SQL Server

Se eligió SQL Server por su robustez, estabilidad y amplia adopción en entornos empresariales.

## Arquitectura por Capas

La aplicación fue estructurada por capas para desacoplar responsabilidades y facilitar futuras extensiones y mantenimiento.

## React Native CLI

Se utilizó React Native CLI para tener mayor control sobre la configuración nativa y cumplir con los requisitos del reto.

---

## Instalación y Ejecución

### 1. Requisitos Previos

Instalar las siguientes herramientas:

- .NET SDK 10 o superior
- SQL Server Express 2022
- SQL Server Management Studio
- Node.js
- JDK 17
- Android Studio
- Android SDK
- Git

---

### 2. Configurar Base de Datos

Abrir SQL Server Management Studio y ejecutar el script ubicado en:

```text
scripts/BaseDatos.sql
```

Este script crea:

- Base de datos `GestionTareasDb`
- Tabla `Tarea`
- Datos de prueba
- Procedimientos almacenados

---

### 3. Ejecutar Backend

Ingresar a la carpeta de la API:

```bash
cd GestionTareas.Api
```

Ejecutar:

```bash
dotnet restore
dotnet run
```

La API quedará disponible en:

```text
http://localhost:5003
```

Swagger:

```text
http://localhost:5003/swagger
```

---

### 4. Ejecutar Frontend React Native

Ingresar a la carpeta del frontend:

```bash
cd Frontend/GestionTareasMovil
```

Instalar dependencias:

```bash
npm install
```

Iniciar Metro:

```bash
npx react-native start
```

En otra consola, ejecutar Android:

```bash
npx react-native run-android
```

---

### 5. Consideración para Emulador Android

La aplicación móvil consume la API usando:

```text
http://10.0.2.2:5003/api/Tareas
```

En Android Emulator, `10.0.2.2` apunta al `localhost` de la PC.

---

### 6. Pruebas Rápidas de API

Listar tareas:

```text
http://localhost:5003/api/Tareas
```

Obtener tarea:

```text
http://localhost:5003/api/Tareas/1
```

Filtrar tareas:

```text
http://localhost:5003/api/Tareas/filtro?estado=Pendiente&prioridad=Alta
```





# Documentación

La documentación técnica se encuentra en:

```text
DOCUMENTACION_TECNICA.md
```

Los diagramas se encuentran en:

```text
docs/
```

---

# Autor

Diego