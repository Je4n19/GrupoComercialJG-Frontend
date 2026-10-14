import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function RutaProtegida({ children }) {
  const [estado, setEstado] = useState("verificando");

  useEffect(() => {
    const controlador = new AbortController();

    const verificarSesion = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
          signal: controlador.signal,
        });

        if (!respuesta.ok) {
          setEstado("no-autenticado");
          return;
        }

        const datos = await respuesta.json();

        if (datos.rol === "ADMIN") {
          setEstado("autenticado");
        } else {
          setEstado("no-autenticado");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error verificando sesión:", error);
          setEstado("no-autenticado");
        }
      }
    };

    verificarSesion();

    return () => controlador.abort();
  }, []);

  // ESPERAR RESPUESTA DEL BACKEND
  if (estado === "verificando") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F6F3]">
        <div className="w-12 h-12 border-4 border-[#009E49] border-t-transparent rounded-full animate-spin" />

        <p className="mt-5 text-[#073D27] font-bold">
          Verificando acceso administrativo...
        </p>
      </div>
    );
  }

  // SIN SESIÓN: REGRESAR AL LOGIN
  if (estado === "no-autenticado") {
    return <Navigate to="/login" replace />;
  }

  // SESIÓN ADMIN CONFIRMADA
  return children;
}

export default RutaProtegida;
