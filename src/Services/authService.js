/* ========================================
   CONFIGURACIÓN DEL BACKEND
======================================== */

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://grupocomercialjg-backend.onrender.com";

const API_URL = `${BASE_URL.replace(/\/+$/, "")}/api/auth`;

/* ========================================
   OBTENER TOKEN CSRF
======================================== */

export const obtenerCsrfToken = async () => {
  const response = await fetch(`${API_URL}/csrf`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    const error = new Error("No se pudo obtener el token de seguridad CSRF.");

    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  if (!data?.token) {
    throw new Error("El servidor no devolvió un token CSRF válido.");
  }

  return {
    token: data.token,
    headerName: data.headerName || "X-CSRF-TOKEN",
  };
};

/* ========================================
   INICIAR SESIÓN ADMINISTRATIVA
======================================== */

export const login = async (username, password) => {
  const csrf = await obtenerCsrfToken();

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      [csrf.headerName]: csrf.token,
    },
    body: JSON.stringify({
      username: username.trim(),
      password,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data.message ||
        data.error ||
        "No se pudo iniciar sesión. Verifica tus credenciales.",
    );

    error.status = response.status;
    throw error;
  }

  return data;
};

/* ========================================
   CONSULTAR SESIÓN ACTIVA
======================================== */

export const obtenerSesion = async () => {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    const error = new Error("No hay una sesión administrativa activa.");

    error.status = response.status;
    throw error;
  }

  return await response.json();
};

/* ========================================
   CERRAR SESIÓN EN SPRING BOOT
======================================== */

export const logout = async () => {
  const csrf = await obtenerCsrfToken();

  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    headers: {
      [csrf.headerName]: csrf.token,
    },
  });

  if (!response.ok) {
    const error = new Error("No se pudo cerrar la sesión en el servidor.");

    error.status = response.status;
    throw error;
  }

  // Limpiar datos de autenticación antiguos
  localStorage.removeItem("token");
  localStorage.removeItem("auth");

  return true;
};

/* ========================================
   COMPATIBILIDAD CON CÓDIGO ANTIGUO
======================================== */

// Estas funciones se mantienen para evitar
// errores de importación en componentes antiguos.
// La autenticación real utiliza cookies de sesión.

export const guardarToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

export const obtenerToken = () => {
  return localStorage.getItem("token");
};
