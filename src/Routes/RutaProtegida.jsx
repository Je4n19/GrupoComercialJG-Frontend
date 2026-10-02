import { Navigate } from "react-router-dom";

function RutaProtegida({ children }) {
  const autenticado = localStorage.getItem("auth");

  if (autenticado !== "true") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaProtegida;
