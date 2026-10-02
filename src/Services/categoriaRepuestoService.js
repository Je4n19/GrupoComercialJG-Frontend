const API_URL = "http://localhost:8080/api/categorias-repuesto";

export const obtenerCategoriasRepuesto = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const crearCategoriaRepuesto = async (categoria) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  });

  return await response.json();
};

export const obtenerCategoriaRepuestoPorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return await response.json();
};

export const actualizarCategoriaRepuesto = async (id, categoria) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  });

  return await response.json();
};

export const eliminarCategoriaRepuesto = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
