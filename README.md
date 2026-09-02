# Sistema Web CRUD para la Gestión de Datos de Alojamientos Airbnb

## 1. Descripción del proyecto

El presente proyecto consiste en el desarrollo de un **Sistema Web CRUD para la Gestión de Datos de Alojamientos Airbnb**, desarrollado como parte de una actividad académica de Maestría.

El sistema permite gestionar información de alojamientos almacenados en una base de datos **MongoDB**, utilizando un dataset en formato JSON basado en **Sample Airbnb Listings**.

La aplicación implementa las operaciones fundamentales de un CRUD:

- Crear alojamientos.
- Listar alojamientos.
- Consultar un alojamiento por su identificador.
- Actualizar alojamientos.
- Eliminar alojamientos.

Además, incorpora paginación, formularios, mensajes de confirmación, actualización automática de la interfaz y una arquitectura cliente-servidor separando frontend, backend y base de datos.

---

# 2. Objetivo

Desarrollar una aplicación web utilizando Python y MongoDB que permita realizar operaciones CRUD sobre un conjunto de datos en formato JSON, aplicando tecnologías modernas para el desarrollo del backend, frontend y persistencia de información.

---

# 3. Funcionalidades principales

El sistema permite realizar las siguientes operaciones:

### Crear alojamiento

Permite registrar un nuevo alojamiento mediante un formulario desde la interfaz web.

Endpoint:

```text
POST /alojamientos/
```

### Listar alojamientos

Permite obtener los alojamientos almacenados en MongoDB utilizando paginación.

Endpoint:

```text
GET /alojamientos/
```

Ejemplo:

```text
GET /alojamientos/?page=1&limit=5
```

### Consultar alojamiento por ID

Permite visualizar los datos de un alojamiento específico.

Endpoint:

```text
GET /alojamientos/{id}
```

### Actualizar alojamiento

Permite modificar los datos de un alojamiento existente.

Endpoint:

```text
PATCH /alojamientos/{id}
```

### Eliminar alojamiento

Permite eliminar un alojamiento utilizando su identificador.

Endpoint:

```text
DELETE /alojamientos/{id}
```

Antes de realizar la eliminación, la aplicación solicita confirmación al usuario.

---

# 4. Características adicionales

La aplicación incluye:

- CRUD completo.
- Paginación de registros.
- Visualización de detalle de alojamientos.
- Formulario para crear alojamientos.
- Formulario reutilizable para actualizar alojamientos.
- Confirmación antes de eliminar registros.
- Mensajes visuales de éxito y error mediante Snackbar.
- Actualización automática de la tabla después de crear, editar o eliminar.
- API REST desarrollada con FastAPI.
- Documentación automática mediante Swagger.
- Persistencia de información con MongoDB.
- Ejecución de MongoDB mediante Docker Compose.
- Importación automática del dataset mediante un script Python.
- Interfaz gráfica desarrollada con React y Material UI.

---

# 5. Tecnologías utilizadas

## Backend

- Python
- FastAPI
- Pydantic
- PyMongo
- Uvicorn

## Frontend

- React
- Vite
- JavaScript
- Material UI
- Material Icons
- Emotion

## Base de datos

- MongoDB 8.0

## Contenedores

- Docker
- Docker Compose

## Dataset

- Sample Airbnb Listings
- Formato JSON
- Aproximadamente 5555 documentos

---

# 6. Arquitectura general

La aplicación utiliza una arquitectura cliente-servidor.

```text
┌─────────────────────────────┐
│        React + Vite         │
│          Frontend           │
│      localhost:5173         │
└──────────────┬──────────────┘
               │
               │ HTTP / JSON
               ▼
┌─────────────────────────────┐
│          FastAPI            │
│          Backend            │
│      localhost:8000         │
└──────────────┬──────────────┘
               │
               │ PyMongo
               ▼
┌─────────────────────────────┐
│          MongoDB            │
│           Docker            │
│      localhost:27017        │
└─────────────────────────────┘
```

El flujo general de información es:

```text
Usuario
  ↓
React
  ↓
alojamientoService.js
  ↓
HTTP / JSON
  ↓
FastAPI
  ↓
PyMongo
  ↓
MongoDB
```

---

# 7. Estructura del proyecto

```text
Sistema Web CRUD para la Gestión de Datos de Alojamientos Airbnb/
│
├── backend/
│   │
│   ├── app/
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── alojamientos.py
│   │   │
│   │   ├── __init__.py
│   │   ├── database.py
│   │   ├── main.py
│   │   └── schemas.py
│   │
│   ├── scripts/
│   │   └── importar_dataset.py
│   │
│   └── requirements.txt
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── alojamientos/
│   │   │   │   ├── AlojamientoTable.jsx
│   │   │   │   ├── AlojamientoFormDialog.jsx
│   │   │   │   ├── AlojamientoDetailDialog.jsx
│   │   │   │   └── DeleteDialog.jsx
│   │   │   │
│   │   │   └── layout/
│   │   │       └── AppHeader.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── AlojamientosPage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── alojamientoService.js
│   │   │
│   │   ├── styles/
│   │   │   └── global.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
├── dataset/
│   └── listingsAndReviews.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# 8. Requisitos previos

Antes de ejecutar el proyecto se deben tener instaladas las siguientes herramientas.

## Docker Desktop

Docker se utiliza para ejecutar MongoDB.

Verificar:

```bash
docker --version
```

Verificar Docker Compose:

```bash
docker compose version
```

Docker Desktop debe encontrarse iniciado antes de ejecutar el proyecto.

---

## Python

Versión utilizada durante el desarrollo:

```text
Python 3.13
```

Verificar:

```bash
python --version
```

Verificar pip:

```bash
python -m pip --version
```

---

## Node.js

Versión principal utilizada durante el desarrollo:

```text
Node.js 22
```

Verificar:

```bash
node --version
```

---

## npm

Versión principal utilizada durante el desarrollo:

```text
npm 11
```

Verificar:

```bash
npm --version
```

---

## Herramientas opcionales

No son obligatorias para ejecutar el proyecto, pero pueden utilizarse para revisar o administrar el sistema:

- Visual Studio Code.
- Git.
- MongoDB Compass.

---

# 9. Instalación y ejecución paso a paso

A continuación se describe el procedimiento completo para ejecutar el sistema desde cero.

---

## Paso 1. Descomprimir el proyecto

Descomprimir el archivo ZIP entregado.

Abrir una terminal dentro de la carpeta raíz:

```text
Sistema Web CRUD para la Gestión de Datos de Alojamientos Airbnb
```

La estructura principal debe contener:

```text
backend/
frontend/
dataset/
docker-compose.yml
README.md
```

---

## Paso 2. Iniciar Docker Desktop

Abrir **Docker Desktop** y esperar hasta que Docker esté completamente iniciado.

Comprobar desde una terminal:

```bash
docker version
```

También puede verificarse Docker Compose:

```bash
docker compose version
```

---

## Paso 3. Iniciar MongoDB con Docker Compose

Desde la carpeta raíz del proyecto ejecutar:

```bash
docker compose up -d
```

Docker descargará automáticamente la imagen de MongoDB si todavía no se encuentra en el equipo.

La imagen utilizada por el proyecto es:

```text
mongo:8.0
```

Comprobar que el contenedor esté funcionando:

```bash
docker compose ps
```

MongoDB debe aparecer con un estado similar a:

```text
Up
```

La conexión utilizada por el proyecto es:

```text
mongodb://localhost:27017
```

---

# 10. Configuración de Docker Compose

El archivo `docker-compose.yml` contiene la configuración necesaria para levantar MongoDB:

```yaml
services:
  mongodb:
    image: mongo:8.0
    ports:
      - "127.0.0.1:27017:27017"
    volumes:
      - airbnb_mongo_data:/data/db
    restart: unless-stopped

volumes:
  airbnb_mongo_data:
```

El volumen:

```text
airbnb_mongo_data
```

permite mantener los datos almacenados aunque el contenedor sea detenido.

---

## Paso 4. Ingresar al backend

Abrir una nueva terminal desde la carpeta raíz del proyecto.

Ejecutar:

```bash
cd backend
```

---

## Paso 5. Crear el entorno virtual de Python

Ejecutar:

```bash
python -m venv .venv
```

Esto crea un entorno virtual dentro de:

```text
backend/.venv
```

---

## Paso 6. Activar el entorno virtual

### Git Bash

```bash
source .venv/Scripts/activate
```

### Símbolo del sistema CMD

```cmd
.venv\Scripts\activate
```

### PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

Después de activarlo debería aparecer:

```text
(.venv)
```

al inicio de la terminal.

---

## Paso 7. Instalar las dependencias del backend

Con el entorno virtual activo ejecutar:

```bash
python -m pip install -r requirements.txt
```

El archivo:

```text
backend/requirements.txt
```

contiene las dependencias principales:

```text
fastapi==0.141.1
pydantic==2.13.5
pymongo==4.17.0
uvicorn==0.52.4
```

Las dependencias secundarias son instaladas automáticamente por pip.

No es necesario instalar `bson` de manera independiente, debido a que forma parte de PyMongo.

---

## Paso 8. Importar el dataset en MongoDB

Este paso debe realizarse cuando se ejecuta el proyecto por primera vez o cuando se ha eliminado el volumen de MongoDB.

Antes de importar, comprobar que MongoDB continúa activo:

```bash
docker compose ps
```

Desde la carpeta:

```text
backend/
```

y con el entorno virtual activo ejecutar:

```bash
python scripts/importar_dataset.py
```

El script busca automáticamente el archivo:

```text
dataset/listingsAndReviews.json
```

y realiza la importación en:

```text
Base de datos: airbnb_db
Colección: alojamientos
```

Una ejecución correcta debe mostrar un resultado similar a:

```text
Conexión a MongoDB exitosa.
Importación completada: 5555 documentos.
```

El script permite repetir la importación evitando mantener documentos duplicados en la colección.

---

## Paso 9. Ejecutar el backend FastAPI

Desde:

```text
backend/
```

con el entorno virtual activo ejecutar:

```bash
python -m uvicorn app.main:app --reload
```

Si la ejecución es correcta aparecerá:

```text
Uvicorn running on http://127.0.0.1:8000
```

Mantener esta terminal abierta.

La API estará disponible en:

```text
http://localhost:8000
```

---

## Paso 10. Abrir Swagger

FastAPI genera automáticamente la documentación interactiva de la API.

Abrir en el navegador:

```text
http://localhost:8000/docs
```

Desde Swagger pueden probarse las operaciones:

```text
GET
POST
PATCH
DELETE
```

---

## Paso 11. Abrir una nueva terminal para el frontend

No cerrar la terminal donde está funcionando FastAPI.

Abrir una nueva terminal y desde la carpeta raíz ejecutar:

```bash
cd frontend
```

---

## Paso 12. Instalar las dependencias del frontend

Ejecutar:

```bash
npm install
```

npm utilizará los archivos:

```text
package.json
package-lock.json
```

para descargar automáticamente las dependencias necesarias.

Entre las dependencias principales se encuentran:

- React.
- React DOM.
- Material UI.
- Material Icons.
- Emotion.
- Vite.

No es necesario incluir la carpeta `node_modules` en la entrega, ya que puede reconstruirse ejecutando:

```bash
npm install
```

---

## Paso 13. Ejecutar el frontend

Desde:

```text
frontend/
```

ejecutar:

```bash
npm run dev
```

Vite mostrará una dirección similar a:

```text
http://localhost:5173
```

Mantener esta terminal abierta.

---

## Paso 14. Abrir el sistema

Abrir en el navegador:

```text
http://localhost:5173
```

La interfaz deberá mostrar el listado paginado de alojamientos.

Desde esta pantalla pueden utilizarse las funciones:

```text
Nuevo alojamiento
Ver
Editar
Eliminar
Paginación
```

---

# 11. Orden resumido de ejecución

Para una instalación completamente nueva, el orden es:

```text
1. Iniciar Docker Desktop
       ↓
2. docker compose up -d
       ↓
3. Crear entorno virtual Python
       ↓
4. Instalar requirements.txt
       ↓
5. Importar dataset
       ↓
6. Ejecutar FastAPI
       ↓
7. npm install
       ↓
8. npm run dev
       ↓
9. Abrir http://localhost:5173
```

---

# 12. Resumen de comandos

## Terminal 1 - MongoDB

Desde la raíz:

```bash
docker compose up -d
```

Comprobar:

```bash
docker compose ps
```

---

## Terminal 2 - Backend

```bash
cd backend
```

Crear entorno virtual únicamente durante la instalación inicial:

```bash
python -m venv .venv
```

Activar:

```bash
source .venv/Scripts/activate
```

Instalar dependencias durante la instalación inicial:

```bash
python -m pip install -r requirements.txt
```

Importar dataset durante la instalación inicial:

```bash
python scripts/importar_dataset.py
```

Ejecutar backend:

```bash
python -m uvicorn app.main:app --reload
```

---

## Terminal 3 - Frontend

```bash
cd frontend
```

Durante la instalación inicial:

```bash
npm install
```

Ejecutar frontend:

```bash
npm run dev
```

---

# 13. URLs utilizadas

## Aplicación web

```text
http://localhost:5173
```

## API FastAPI

```text
http://localhost:8000
```

## Swagger

```text
http://localhost:8000/docs
```

## MongoDB

```text
mongodb://localhost:27017
```

---

# 14. Endpoints de la API

## Listar alojamientos

```http
GET /alojamientos/
```

Ejemplo:

```text
http://localhost:8000/alojamientos/?page=1&limit=5
```

La respuesta incluye:

```text
items
page
limit
total
total_pages
```

---

## Obtener alojamiento por ID

```http
GET /alojamientos/{id}
```

---

## Crear alojamiento

```http
POST /alojamientos/
```

---

## Actualizar alojamiento

```http
PATCH /alojamientos/{id}
```

---

## Eliminar alojamiento

```http
DELETE /alojamientos/{id}
```

---

# 15. Base de datos

La aplicación utiliza:

```text
Base de datos:
airbnb_db
```

Colección:

```text
alojamientos
```

El dataset contiene aproximadamente:

```text
5555 documentos
```

Los documentos pueden contener información como:

- Nombre.
- Tipo de propiedad.
- Tipo de habitación.
- Número de huéspedes.
- Dormitorios.
- Camas.
- Precio.
- Dirección.
- Servicios.
- Disponibilidad.
- Información del anfitrión.
- Reseñas.

La aplicación utiliza principalmente los campos necesarios para realizar las operaciones CRUD.

---

# 16. MongoDB Compass

MongoDB Compass es opcional.

Puede utilizarse para visualizar gráficamente la base de datos.

Utilizar la conexión:

```text
mongodb://localhost:27017
```

Después de conectarse se debe encontrar:

```text
airbnb_db
└── alojamientos
```

---

# 17. Detener el proyecto

## Detener React

En la terminal donde funciona Vite:

```text
Ctrl + C
```

---

## Detener FastAPI

En la terminal donde funciona Uvicorn:

```text
Ctrl + C
```

---

## Detener MongoDB

Desde la raíz:

```bash
docker compose down
```

Este comando detiene el contenedor, pero conserva los datos almacenados.

---

# 18. Volver a iniciar el proyecto

Después de haber realizado la instalación inicial, no es necesario volver a instalar todas las dependencias ni volver a importar el dataset.

## Paso 1

Iniciar MongoDB:

```bash
docker compose up -d
```

## Paso 2

Backend:

```bash
cd backend
source .venv/Scripts/activate
python -m uvicorn app.main:app --reload
```

## Paso 3

Frontend:

```bash
cd frontend
npm run dev
```

## Paso 4

Abrir:

```text
http://localhost:5173
```

---

# 19. Restablecer completamente la base de datos

Si se desea eliminar completamente el volumen de MongoDB:

```bash
docker compose down -v
```

**Advertencia:** este comando elimina los datos almacenados en MongoDB para este proyecto.

Después debe ejecutarse nuevamente:

```bash
docker compose up -d
```

Luego:

```bash
cd backend
```

Activar el entorno virtual:

```bash
source .venv/Scripts/activate
```

Reimportar:

```bash
python scripts/importar_dataset.py
```

---

# 20. Compilar el frontend

Para verificar que el frontend puede ser compilado ejecutar:

```bash
cd frontend
npm run build
```

Si la compilación es correcta, Vite generará:

```text
frontend/dist/
```

Esta carpeta es generada automáticamente y no es necesaria dentro del ZIP del proyecto.

---

# 21. Verificación con ESLint

Opcionalmente se puede revisar el código del frontend mediante:

```bash
npm run lint
```

---

# 22. Solución de problemas

## Problema: Docker no funciona

Comprobar que Docker Desktop esté iniciado.

Ejecutar:

```bash
docker version
```

Después:

```bash
docker compose ps
```

---

## Problema: MongoDB no conecta

Ejecutar:

```bash
docker compose ps
```

MongoDB debe aparecer activo.

También comprobar que el puerto:

```text
27017
```

no esté siendo utilizado por otra instalación local de MongoDB.

---

## Problema: Error No module named bson

No instalar `bson` manualmente.

Activar primero el entorno virtual:

```bash
source .venv/Scripts/activate
```

Después instalar:

```bash
python -m pip install -r requirements.txt
```

`bson` forma parte del paquete PyMongo.

---

## Problema: FastAPI no inicia

Comprobar que el entorno virtual esté activo.

Verificar FastAPI:

```bash
python -m pip show fastapi
```

Verificar PyMongo:

```bash
python -m pip show pymongo
```

Verificar Uvicorn:

```bash
python -m pip show uvicorn
```

Después ejecutar:

```bash
python -m uvicorn app.main:app --reload
```

---

## Problema: El frontend no inicia

Ingresar a:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

---

## Problema: El frontend abre pero no muestra información

Primero comprobar FastAPI:

```text
http://localhost:8000/docs
```

Después probar:

```text
http://localhost:8000/alojamientos/?page=1&limit=5
```

También comprobar MongoDB:

```bash
docker compose ps
```

---

## Problema: Puerto ocupado

El sistema utiliza los siguientes puertos:

```text
Frontend: 5173
Backend:  8000
MongoDB:  27017
```

Si alguno se encuentra utilizado por otra aplicación, cerrar el proceso correspondiente antes de ejecutar el sistema.

---

# 23. Archivos necesarios para ejecutar el proyecto

El ZIP final debe incluir:

```text
backend/
frontend/
dataset/
docker-compose.yml
README.md
.gitignore
```

También deben encontrarse:

```text
backend/requirements.txt
frontend/package.json
frontend/package-lock.json
dataset/listingsAndReviews.json
```

---

# 24. Archivos y carpetas que no deben incluirse

No deben incluirse en el ZIP:

```text
backend/.venv/
frontend/node_modules/
frontend/dist/
__pycache__/
*.pyc
.git/
```

Estas carpetas son generadas automáticamente o contienen información que no es necesaria para reproducir el proyecto.

---

# 25. Archivo requirements.txt

El backend utiliza:

```text
fastapi==0.141.1
pydantic==2.13.5
pymongo==4.17.0
uvicorn==0.52.4
```

Para instalar:

```bash
python -m pip install -r requirements.txt
```

---

# 26. Dependencias del frontend

Las dependencias del frontend están definidas en:

```text
frontend/package.json
```

Para instalarlas:

```bash
npm install
```

No se requiere entregar:

```text
node_modules/
```

---

# 27. Persistencia de MongoDB

MongoDB utiliza un volumen de Docker:

```text
airbnb_mongo_data
```

Esto permite que la base de datos continúe disponible después de:

```bash
docker compose down
```

Los datos solamente se eliminan si se utiliza explícitamente:

```bash
docker compose down -v
```

---

# 28. Flujo de una operación CRUD

Ejemplo de una consulta:

```text
Usuario
   ↓
React
   ↓
GET /alojamientos/
   ↓
FastAPI
   ↓
PyMongo
   ↓
MongoDB
   ↓
FastAPI devuelve JSON
   ↓
React actualiza la interfaz
```

Ejemplo de actualización:

```text
Usuario selecciona Editar
   ↓
React muestra formulario
   ↓
PATCH /alojamientos/{id}
   ↓
FastAPI
   ↓
MongoDB
   ↓
Respuesta
   ↓
React recarga la tabla
   ↓
Mensaje de operación exitosa
```

---

# 29. Estado del proyecto

El sistema implementa:

```text
CREATE                      COMPLETADO
READ listado                COMPLETADO
READ por ID                 COMPLETADO
UPDATE                      COMPLETADO
DELETE                      COMPLETADO
Paginación                  COMPLETADO
Confirmación de eliminación COMPLETADO
Mensajes de operación       COMPLETADO
MongoDB con Docker          COMPLETADO
Importación del dataset     COMPLETADO
Frontend React              COMPLETADO
Backend FastAPI             COMPLETADO
```

---

# 30. Ejecución rápida

Después de realizar la instalación inicial:

### Terminal 1

```bash
docker compose up -d
```

### Terminal 2

```bash
cd backend
source .venv/Scripts/activate
python -m uvicorn app.main:app --reload
```

### Terminal 3

```bash
cd frontend
npm run dev
```

### Navegador

```text
http://localhost:5173
```

Swagger:

```text
http://localhost:8000/docs
```

---

# 31. Autor

Proyecto desarrollado como parte de una actividad académica de Maestría.

**Sistema Web CRUD para la Gestión de Datos de Alojamientos Airbnb**