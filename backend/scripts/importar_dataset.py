from pathlib import Path

from pymongo import MongoClient
from bson.json_util import loads


MONGO_URI = "mongodb://localhost:27017"
BASE_DATOS = "airbnb_db"
COLECCION = "alojamientos"


RUTA_PROYECTO = Path(__file__).resolve().parents[2]

RUTA_DATASET = (
    RUTA_PROYECTO
    / "dataset"
    / "listingsAndReviews.json"
)


def importar_dataset():

    if not RUTA_DATASET.exists():
        print("Error: No se encontró el archivo del dataset.")
        print(f"Ruta buscada: {RUTA_DATASET}")
        return

    client = MongoClient(MONGO_URI)

    try:
        client.admin.command("ping")
        print("Conexión a MongoDB exitosa.")

        db = client[BASE_DATOS]
        collection = db[COLECCION]

        # Limpiar la colección para evitar registros duplicados
        collection.delete_many({})

        documentos = []

        with RUTA_DATASET.open(
            "r",
            encoding="utf-8"
        ) as archivo:

            for linea in archivo:

                if linea.strip():
                    documento = loads(linea)
                    documentos.append(documento)

        if documentos:
            resultado = collection.insert_many(documentos)

            print(
                f"Importación completada: "
                f"{len(resultado.inserted_ids)} documentos."
            )

        else:
            print("El dataset no contiene documentos.")

    except Exception as error:
        print(f"Error durante la importación: {error}")

    finally:
        client.close()


if __name__ == "__main__":
    importar_dataset()