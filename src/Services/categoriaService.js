import { obtenerCsrfToken } from "./authService";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://grupocomercialjg-backend.onrender.com";

const API_URL = `${BASE_URL.replace(/\/$/, "")}/api/categorias`;

// Procesar respuestas del backend
const procesarRespuesta = async (response) => {
  const texto = await response.text();

  let data = null;

  if (texto) {
    try {
      data = JSON.parse(texto);
    } catch {
      data = texto;
    }
  }

  if (!response.ok) {
    let mensaje = "Ocurrió un error al procesar la solicitud.";

    if (response.status === 401) {
      mensaje = "Tu sesión ha expirado. Inicia sesión nuevamente.";
    } else if (response.status === 403) {
      mensaje = "Acceso denegado (403). Verifica tu sesión y el token CSRF.";
    } else if (response.status === 404) {
      mensaje = "No se encontró la categoría solicitada.";
    } else if (response.status === 409) {
      mensaje =
        "No se puede completar la operación porque existen registros relacionados.";
    } else if (response.status >= 500) {
      mensaje = "El servidor presentó un problema. Inténtalo nuevamente.";
    } else if (
      data &&
      typeof data === "object" &&
      typeof data.message === "string"
    ) {
      mensaje = data.message;
    }

    const error = new Error(mensaje);
    error.status = response.status;
    throw error;
  }

  return data;
};

// Obtener todas las categorías
export const obtenerCategorias = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  return await procesarRespuesta(response);
};

// Obtener una categoría por ID
export const obtenerCategoriaPorId = async (id) => {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: "GET",
    credentials: "include",
  });

  return await procesarRespuesta(response);
};

// Crear una categoría
export const crearCategoria = async (categoria) => {
  const csrf = await obtenerCsrfToken();

  const response = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      [csrf.headerName]: csrf.token,
    },
    body: JSON.stringify(categoria),
  });

  return await procesarRespuesta(response);
};

// Actualizar una categoría
export const actualizarCategoria = async (id, categoria) => {
  const csrf = await obtenerCsrfToken();

  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      [csrf.headerName]: csrf.token,
    },
    body: JSON.stringify(categoria),
  });

  return await procesarRespuesta(response);
};

// Eliminar una categoría
export const eliminarCategoria = async (id) => {
  const csrf = await obtenerCsrfToken();

  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      [csrf.headerName]: csrf.token,
    },
  });

  return await procesarRespuesta(response);
};
