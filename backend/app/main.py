from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.alojamientos import router as alojamientos_router


app = FastAPI(
    title="Sistema Web CRUD para la Gestión de Datos de Alojamientos Airbnb",
    description="API desarrollada con FastAPI y MongoDB",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)    

app.include_router(alojamientos_router)


@app.get("/")
async def root():
    return {
        "message": "API de Alojamientos Airbnb funcionando"
    }