import axios from "axios";
import { obtenerCsrfToken } from "./authService";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://grupocomercialjg-backend.onrender.com";

const API_URL = `${BASE_URL.replace(/\/$/, "")}/api/productos`;

// Cliente Axios para productos
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 60000,
});

// Procesar errores del backend
const procesarError = (error) => {
  // Conservar errores previamente procesados
  if (error.status !== undefined && !error.response) {
    return error;
  }

  const estado = error.response?.status;
  const datos = error.response?.data;

  let mensaje = "No se pudo conectar con el servidor. Inténtalo nuevamente.";

  if (estado === 400) {
    mensaje = "Los datos del producto no son válidos. Revisa los campos.";
  } else if (estado === 401) {
    mensaje = "Tu sesión ha expirado. Inicia sesión nuevamente.";
  } else if (estado === 403) {
    mensaje = "Acceso denegado (403). Verifica tu sesión y el token CSRF.";
  } else if (estado === 404) {
    mensaje = "No se encontró el producto solicitado.";
  } else if (estado === 409) {
    mensaje =
      "No se pudo completar la operación porque existen registros relacionados.";
  } else if (estado >= 500) {
    mensaje = "El servidor presentó un problema. Inténtalo nuevamente.";
  } else if (
    datos &&
    typeof datos === "object" &&
    typeof datos.message === "string"
  ) {
    mensaje = datos.message;
  } else if (error.code === "ECONNABORTED") {
    mensaje = "La solicitud tardó demasiado. Inténtalo nuevamente.";
  }

  const nuevoError = new Error(mensaje);

  nuevoError.status = estado;
  nuevoError.cause = error;

  return nuevoError;
};

// Configuración de los datos enviados
const obtenerHeaders = (producto, csrf) => {
  const headers = {
    [csrf.headerName]: csrf.token,
  };

  // Si se envía FormData, Axios debe generar
  // automáticamente el Content-Type con su boundary.
  if (!(producto instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

// Obtener todos los productos
export const obtenerProductos = async () => {
  try {
    const response = await api.get("");

    return response.data;
  } catch (error) {
    throw procesarError(error);
  }
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (id) => {
  try {
    const response = await api.get(`/${encodeURIComponent(id)}`);

    return response.data;
  } catch (error) {
    throw procesarError(error);
  }
};

// Crear un nuevo producto
export const guardarProducto = async (producto) => {
  try {
    const csrf = await obtenerCsrfToken();

    const response = await api.post("", producto, {
      headers: obtenerHeaders(producto, csrf),
    });

    return response.data;
  } catch (error) {
    throw procesarError(error);
  }
};

// Actualizar un producto existente
export const actualizarProducto = async (id, producto) => {
  try {
    const csrf = await obtenerCsrfToken();

    const response = await api.put(`/${encodeURIComponent(id)}`, producto, {
      headers: obtenerHeaders(producto, csrf),
    });

    return response.data;
  } catch (error) {
    throw procesarError(error);
  }
};

// Eliminar un producto
export const eliminarProducto = async (id) => {
  try {
    const csrf = await obtenerCsrfToken();

    const response = await api.delete(`/${encodeURIComponent(id)}`, {
      headers: {
        [csrf.headerName]: csrf.token,
      },
    });

    return response.data;
  } catch (error) {
    throw procesarError(error);
  }
};
