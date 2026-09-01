from fastapi import FastAPI

from app.routes.alojamientos import router as alojamientos_router


app = FastAPI(
    title="Sistema Web CRUD para la Gestión de Datos de Alojamientos Airbnb",
    description="API desarrollada con FastAPI y MongoDB",
    version="1.0.0"
)


app.include_router(alojamientos_router)


@app.get("/")
async def root():
    return {
        "message": "API de Alojamientos Airbnb funcionando"
    }