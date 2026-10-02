import { Routes, Route } from "react-router-dom";

/* Pages */
import Inicio from "../Pages/Inicio";
import Catalogo from "../Pages/Catalogo";
import Repuestos from "../Pages/Repuestos";
import Contacto from "../Pages/Contacto";
import DetalleProducto from "../Pages/DetalleProducto";
import Login from "../Pages/Login";
import NoEncontrado from "../Pages/NoEncontrado";

/* Seguridad */
import RutaProtegida from "./RutaProtegida";

/* Admin */
import PanelControl from "../Admin/PanelControl";
import Productos from "../Admin/Productos";
import FormularioCategoria from "../Admin/FormularioCategoria";
import FormularioProducto from "../Admin/FormularioProducto";
import RepuestosAdmin from "../Admin/Repuestos";
import FormularioRepuesto from "../Admin/FormularioRepuesto";
import Categorias from "../Admin/Categorias";
import CategoriasRepuesto from "../Admin/CategoriasRepuesto";
import FormularioCategoriaRepuesto from "../Admin/FormularioCategoriaRepuesto";
import Inventario from "../Admin/Inventario";
import Configuracion from "../Admin/Configuracion";

function RutasApp() {
  return (
    <Routes>
      {/* WEB */}

      <Route path="/" element={<Inicio />} />

      <Route path="/catalogo" element={<Catalogo />} />

      <Route path="/repuestos" element={<Repuestos />} />

      <Route path="/contacto" element={<Contacto />} />

      <Route path="/producto/:id" element={<DetalleProducto />} />

      {/* LOGIN */}

      <Route path="/login" element={<Login />} />

      {/* ADMIN PROTEGIDO */}

      <Route
        path="/admin"
        element={
          <RutaProtegida>
            <PanelControl />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/productos"
        element={
          <RutaProtegida>
            <Productos />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/productos/nuevo"
        element={
          <RutaProtegida>
            <FormularioProducto />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/productos/editar/:id"
        element={
          <RutaProtegida>
            <FormularioProducto />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/repuestos"
        element={
          <RutaProtegida>
            <RepuestosAdmin />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/repuestos/nuevo"
        element={
          <RutaProtegida>
            <FormularioRepuesto />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/repuestos/editar/:id"
        element={
          <RutaProtegida>
            <FormularioRepuesto />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/categorias"
        element={
          <RutaProtegida>
            <Categorias />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/categorias/nuevo"
        element={
          <RutaProtegida>
            <FormularioCategoria />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/categorias/editar/:id"
        element={
          <RutaProtegida>
            <FormularioCategoria />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/categorias-repuesto"
        element={
          <RutaProtegida>
            <CategoriasRepuesto />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/categorias-repuesto/nuevo"
        element={
          <RutaProtegida>
            <FormularioCategoriaRepuesto />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/categorias-repuesto/editar/:id"
        element={
          <RutaProtegida>
            <FormularioCategoriaRepuesto />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/inventario"
        element={
          <RutaProtegida>
            <Inventario />
          </RutaProtegida>
        }
      />

      <Route
        path="/admin/configuracion"
        element={
          <RutaProtegida>
            <Configuracion />
          </RutaProtegida>
        }
      />

      {/* 404 */}

      <Route path="*" element={<NoEncontrado />} />
    </Routes>
  );
}

export default RutasApp;
