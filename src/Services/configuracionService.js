import axios from "axios";
import { obtenerCsrfToken } from "./authService";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://grupocomercialjg-backend.onrender.com";

const API_URL = `${BASE_URL.replace(/\/$/, "")}/api/configuracion`;

// Cliente Axios para configuración
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Procesar errores del backend
const procesarError = (error) => {
  const estado = error.response?.status;

  let mensaje = "No se pudo conectar con el servidor. Inténtalo nuevamente.";

  if (estado === 400) {
    mensaje = "Los datos enviados no son válidos. Revisa la configuración.";
  } else if (estado === 401) {
    mensaje = "Tu sesión ha expirado. Inicia sesión nuevamente.";
  } else if (estado === 403) {
    mensaje = "Acceso denegado (403). Verifica tu sesión y el token CSRF.";
  } else if (estado === 404) {
    mensaje = "No se encontró el servicio de configuración.";
  } else if (estado >= 500) {
    mensaje = "El servidor presentó un problema. Inténtalo nuevamente.";
  } else if (typeof error.response?.data?.message === "string") {
    mensaje = error.response.data.message;
  } else if (error.code === "ECONNABORTED") {
    mensaje = "La solicitud tardó demasiado. Inténtalo nuevamente.";
  }

  const nuevoError = new Error(mensaje);

  nuevoError.status = estado;
  nuevoError.cause = error;

  return nuevoError;
};

// Obtener configuración de la empresa
export const obtenerConfiguracion = async () => {
  try {
    const response = await api.get("");

    return response.data;
  } catch (error) {
    throw procesarError(error);
  }
};

// Guardar configuración de la empresa
export const guardarConfiguracion = async (configuracion) => {
  try {
    // Obtener el token CSRF de Spring Security
    const csrf = await obtenerCsrfToken();

    const response = await api.post("", configuracion, {
      headers: {
        [csrf.headerName]: csrf.token,
      },
    });

    return response.data;
  } catch (error) {
    // Conservar errores que ya tienen estado HTTP
    if (error.status !== undefined && !error.response) {
      throw error;
    }

    throw procesarError(error);
  }
};
