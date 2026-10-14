import axios from "axios";
import { obtenerCsrfToken } from "./authService";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://grupocomercialjg-backend.onrender.com";

const API_URL = `${BASE_URL.replace(/\/$/, "")}/api/repuestos`;

// Cliente Axios para repuestos
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 60000,
});

// Procesar errores del backend
const procesarError = (error) => {
  // Conservar errores que ya fueron procesados
  if (error.status !== undefined && !error.response) {
    return error;
  }

  const estado = error.response?.status;
  const datos = error.response?.data;

  let mensaje = "No se pudo conectar con el servidor. Inténtalo nuevamente.";

  if (estado === 400) {
    mensaje = "Los datos del repuesto no son válidos. Revisa los campos.";
  } else if (estado === 401) {
    mensaje = "Tu sesión ha expirado. Inicia sesión nuevamente.";
  } else if (estado === 403) {
    mensaje = "Acceso denegado (403). Verifica tu sesión y el token CSRF.";
  } else if (estado === 404) {
    mensaje = "No se encontró el repuesto solicitado.";
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

// Preparar cabeceras para crear y actualizar
const obtenerHeaders = (repuesto, csrf) => {
  const headers = {
    [csrf.headerName]: csrf.token,
  };

  // Si se envía FormData, Axios debe establecer
  // automáticamente el Content-Type correspondiente.
  if (!(repuesto instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

// Obtener todos los repuestos
export const obtenerRepuestos = async () => {
  try {
    const response = await api.get("");

    return response.data;
  } catch (error) {
    throw procesarError(error);
  }
};

// Obtener un repuesto por ID
export const obtenerRepuestoPorId = async (id) => {
  try {
    const response = await api.get(`/${encodeURIComponent(id)}`);

    return response.data;
  } catch (error) {
    throw procesarError(error);
  }
};

// Crear un nuevo repuesto
export const guardarRepuesto = async (repuesto) => {
  try {
    const csrf = await obtenerCsrfToken();

    const response = await api.post("", repuesto, {
      headers: obtenerHeaders(repuesto, csrf),
    });

    return response.data;
  } catch (error) {
    throw procesarError(error);
  }
};

// Actualizar un repuesto existente
export const actualizarRepuesto = async (id, repuesto) => {
  try {
    const csrf = await obtenerCsrfToken();

    const response = await api.put(`/${encodeURIComponent(id)}`, repuesto, {
      headers: obtenerHeaders(repuesto, csrf),
    });

    return response.data;
  } catch (error) {
    throw procesarError(error);
  }
};

// Eliminar un repuesto
export const eliminarRepuesto = async (id) => {
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
