import { useLocation } from "react-router-dom";

import Encabezado from "./Components/Encabezado";
import RutasApp from "./Routes/RutasApp";

function App() {
  const location = useLocation();

  // Identificar las rutas del panel administrativo
  const esRutaAdmin =
    location.pathname === "/admin" || location.pathname.startsWith("/admin/");

  return (
    <>
      {/* Mostrar encabezado solo en la página pública */}
      {!esRutaAdmin && <Encabezado />}

      {/* Mantener todas las rutas de la aplicación */}
      <RutasApp />
    </>
  );
}

export default App;
