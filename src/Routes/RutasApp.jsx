import { Routes, Route } from "react-router-dom";

/* ========================================
   PÁGINAS WEB
======================================== */

import Inicio from "../Pages/Inicio";
import Catalogo from "../Pages/Catalogo";
import Repuestos from "../Pages/Repuestos";
import Contacto from "../Pages/Contacto";
import DetalleProducto from "../Pages/DetalleProducto";
import Login from "../Pages/Login";
import NoEncontrado from "../Pages/NoEncontrado";

// NUEVA PÁGINA: RASTREAR PEDIDO
import RastrearPedido from "../Pages/RastrearPedido";

/* ========================================
   SEGURIDAD
======================================== */

import RutaProtegida from "./RutaProtegida";

/* ========================================
   ADMINISTRACIÓN
======================================== */

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

/* ========================================
   COMPONENTE DE RUTAS
======================================== */

function RutasApp() {
  return (
    <Routes>
      {/* ========================================
          PÁGINAS PÚBLICAS
      ======================================== */}

      {/* INICIO */}
      <Route path="/" element={<Inicio />} />

      {/* CATÁLOGO */}
      <Route path="/catalogo" element={<Catalogo />} />

      {/* REPUESTOS */}
      <Route path="/repuestos" element={<Repuestos />} />

      {/* CONTACTO */}
      <Route path="/contacto" element={<Contacto />} />

      {/* DETALLE DE PRODUCTO */}
      <Route path="/producto/:id" element={<DetalleProducto />} />

      {/* RASTREAR PEDIDO - NUEVA RUTA */}
      <Route path="/rastrear-pedido" element={<RastrearPedido />} />

      {/* ========================================
          LOGIN ADMINISTRATIVO
      ======================================== */}

      <Route path="/login" element={<Login />} />

      {/* ========================================
          PANEL ADMINISTRATIVO PROTEGIDO
      ======================================== */}

      {/* DASHBOARD */}
      <Route
        path="/admin"
        element={
          <RutaProtegida>
            <PanelControl />
          </RutaProtegida>
        }
      />

      {/* PRODUCTOS */}
      <Route
        path="/admin/productos"
        element={
          <RutaProtegida>
            <Productos />
          </RutaProtegida>
        }
      />

      {/* NUEVO PRODUCTO */}
      <Route
        path="/admin/productos/nuevo"
        element={
          <RutaProtegida>
            <FormularioProducto />
          </RutaProtegida>
        }
      />

      {/* EDITAR PRODUCTO */}
      <Route
        path="/admin/productos/editar/:id"
        element={
          <RutaProtegida>
            <FormularioProducto />
          </RutaProtegida>
        }
      />

      {/* REPUESTOS ADMIN */}
      <Route
        path="/admin/repuestos"
        element={
          <RutaProtegida>
            <RepuestosAdmin />
          </RutaProtegida>
        }
      />

      {/* NUEVO REPUESTO */}
      <Route
        path="/admin/repuestos/nuevo"
        element={
          <RutaProtegida>
            <FormularioRepuesto />
          </RutaProtegida>
        }
      />

      {/* EDITAR REPUESTO */}
      <Route
        path="/admin/repuestos/editar/:id"
        element={
          <RutaProtegida>
            <FormularioRepuesto />
          </RutaProtegida>
        }
      />

      {/* CATEGORÍAS */}
      <Route
        path="/admin/categorias"
        element={
          <RutaProtegida>
            <Categorias />
          </RutaProtegida>
        }
      />

      {/* NUEVA CATEGORÍA */}
      <Route
        path="/admin/categorias/nuevo"
        element={
          <RutaProtegida>
            <FormularioCategoria />
          </RutaProtegida>
        }
      />

      {/* EDITAR CATEGORÍA */}
      <Route
        path="/admin/categorias/editar/:id"
        element={
          <RutaProtegida>
            <FormularioCategoria />
          </RutaProtegida>
        }
      />

      {/* CATEGORÍAS DE REPUESTOS */}
      <Route
        path="/admin/categorias-repuesto"
        element={
          <RutaProtegida>
            <CategoriasRepuesto />
          </RutaProtegida>
        }
      />

      {/* NUEVA CATEGORÍA DE REPUESTO */}
      <Route
        path="/admin/categorias-repuesto/nuevo"
        element={
          <RutaProtegida>
            <FormularioCategoriaRepuesto />
          </RutaProtegida>
        }
      />

      {/* EDITAR CATEGORÍA DE REPUESTO */}
      <Route
        path="/admin/categorias-repuesto/editar/:id"
        element={
          <RutaProtegida>
            <FormularioCategoriaRepuesto />
          </RutaProtegida>
        }
      />

      {/* INVENTARIO */}
      <Route
        path="/admin/inventario"
        element={
          <RutaProtegida>
            <Inventario />
          </RutaProtegida>
        }
      />

      {/* CONFIGURACIÓN */}
      <Route
        path="/admin/configuracion"
        element={
          <RutaProtegida>
            <Configuracion />
          </RutaProtegida>
        }
      />

      {/* ========================================
          ERROR 404
      ======================================== */}

      <Route path="*" element={<NoEncontrado />} />
    </Routes>
  );
}

export default RutasApp;
