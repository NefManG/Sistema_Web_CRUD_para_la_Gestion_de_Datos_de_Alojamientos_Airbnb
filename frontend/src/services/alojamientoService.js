const API_URL = "http://localhost:8000/alojamientos/"


export async function listarAlojamientos(page = 1, limit = 5) {
  const response = await fetch(
    `${API_URL}?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("No se pudieron obtener los alojamientos");
  }

  return response.json();
}

export async function obtenerAlojamiento(id) {
  const response = await fetch(`${API_URL}${id}`);

  if (!response.ok) {
    throw new Error("No se pudo obtener el alojamiento");
  }

  return response.json();
}

export async function crearAlojamiento(alojamiento) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alojamiento),
  })

  if (!response.ok) {
    throw new Error("No se pudo crear el alojamiento")
  }

  return response.json()
}

export async function eliminarAlojamiento(id) {
  const response = await fetch(`${API_URL}${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar el alojamiento");
  }

  return response.json();
}

export async function actualizarAlojamiento(id, alojamiento) {
  const response = await fetch(`${API_URL}${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alojamiento),
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar el alojamiento");
  }

  return response.json();
}

