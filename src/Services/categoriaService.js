const API_URL = "http://localhost:8080/api/categorias";

export const obtenerCategorias = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const obtenerCategoriaPorId = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return await response.json();
};

export const crearCategoria = async (categoria) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  });

  return await response.json();
};

export const actualizarCategoria = async (id, categoria) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  });

  return await response.json();
};

export const eliminarCategoria = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
