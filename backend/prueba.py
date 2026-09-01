from app.database import client, alojamientos_collection

reusltado = client.admin.command('ping')
print("Conexión exitosa:", reusltado)

cantidad = alojamientos_collection.count_documents({})
print("cantida de alojamientos:", cantidad)

documento = alojamientos_collection.find_one()
print(documento)