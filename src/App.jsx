import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Encabezado from "./Components/Encabezado";
import RutasApp from "./Routes/RutasApp";

// Hace que cada página nueva comience desde arriba
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();

  // Identificar las rutas del panel administrativo
  const esRutaAdmin =
    location.pathname === "/admin" || location.pathname.startsWith("/admin/");

  return (
    <>
      {/* Restablecer desplazamiento al cambiar de página */}
      <ScrollToTop />

      {/* Mostrar encabezado solo en la página pública */}
      {!esRutaAdmin && <Encabezado />}

      {/* Mantener todas las rutas de la aplicación */}
      <RutasApp />
    </>
  );
}

export default App;
