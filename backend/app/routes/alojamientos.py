from fastapi import APIRouter, HTTPException
from bson.decimal128 import Decimal128
from uuid import uuid4

from app.database import alojamientos_collection
from app.schemas import AlojamientoCreate, AlojamientoUpdate


router = APIRouter(
    prefix="/alojamientos",
    tags=["Alojamientos"]
)


@router.get("/")
async def listar_alojamientos():

    alojamientos = list(
        alojamientos_collection.find(
            {},
            {
                "_id": 1,
                "name": 1,
                "property_type": 1,
                "room_type": 1,
                "accommodates": 1,
                "bedrooms": 1,
                "beds": 1,
                "price": 1
            }
        ).limit(20)
    )

    for alojamiento in alojamientos:
        precio = alojamiento["price"].to_decimal()
        alojamiento["price"] = f"{precio:.2f}"

    return alojamientos


@router.get("/{id}")
async def obtener_alojamiento(id: str):

    alojamiento = alojamientos_collection.find_one(
        {"_id": id},
        {
            "_id": 1,
            "name": 1,
            "property_type": 1,
            "room_type": 1,
            "accommodates": 1,
            "bedrooms": 1,
            "beds": 1,
            "price": 1
        }
    )

    if not alojamiento:
        raise HTTPException(
            status_code=404,
            detail="Alojamiento no encontrado"
        )

    precio = alojamiento["price"].to_decimal()
    alojamiento["price"] = f"{precio:.2f}"

    return alojamiento


@router.post("/", status_code=201)
async def crear_alojamiento(alojamiento: AlojamientoCreate):

    nuevo_alojamiento = alojamiento.model_dump()

    nuevo_alojamiento["_id"] = str(uuid4())

    nuevo_alojamiento["price"] = Decimal128(
        nuevo_alojamiento["price"]
    )

    resultado = alojamientos_collection.insert_one(
        nuevo_alojamiento
    )

    return {
        "message": "Alojamiento creado correctamente",
        "id": str(resultado.inserted_id)
    }


@router.patch("/{id}")
async def actualizar_alojamiento(
    id: str,
    alojamiento: AlojamientoUpdate
):

    datos_actualizados = alojamiento.model_dump(
        exclude_unset=True,
        exclude_none=True
    )

    if not datos_actualizados:
        raise HTTPException(
            status_code=400,
            detail="Debe enviar al menos un campo para actualizar"
        )

    if "price" in datos_actualizados:
        datos_actualizados["price"] = Decimal128(
            datos_actualizados["price"]
        )

    resultado = alojamientos_collection.update_one(
        {"_id": id},
        {"$set": datos_actualizados}
    )

    if resultado.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Alojamiento no encontrado"
        )

    return {
        "message": "Alojamiento actualizado correctamente"
    }


@router.delete("/{id}")
async def eliminar_alojamiento(id: str):

    resultado = alojamientos_collection.delete_one(
        {"_id": id}
    )

    if resultado.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Alojamiento no encontrado"
        )

    return {
        "message": "Alojamiento eliminado correctamente"
    }