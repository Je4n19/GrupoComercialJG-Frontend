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

// CARRITO DE COTIZACIÓN
import Carrito from "../Pages/Carrito";

// FINALIZAR COMPRA
import Checkout from "../Pages/Checkout";

// RASTREAR PEDIDO
import RastrearPedido from "../Pages/RastrearPedido";

/* ========================================
   PÁGINAS LEGALES - GRUPO COMERCIAL J&G
======================================== */

// TÉRMINOS Y CONDICIONES
import TerminosCondiciones from "../Pages/TerminosCondiciones";

// POLÍTICA DE PRIVACIDAD
import PoliticaPrivacidad from "../Pages/PoliticaPrivacidad";

// CAMBIOS Y DEVOLUCIONES
import CambiosDevoluciones from "../Pages/CambiosDevoluciones";

// LIBRO DE RECLAMACIONES
import LibroReclamaciones from "../Pages/LibroReclamaciones";

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

// GESTIÓN DE PEDIDOS
import PedidosAdmin from "../Admin/PedidosAdmin";

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

      {/* CARRITO */}
      <Route path="/carrito" element={<Carrito />} />

      {/* FINALIZAR COMPRA */}
      <Route path="/checkout" element={<Checkout />} />

      {/* DETALLE DE PRODUCTO */}
      <Route path="/producto/:id" element={<DetalleProducto />} />

      {/* RASTREAR PEDIDO */}
      <Route path="/rastrear-pedido" element={<RastrearPedido />} />

      {/* ========================================
          INFORMACIÓN LEGAL
          GRUPO COMERCIAL J&G
      ======================================== */}

      {/* TÉRMINOS Y CONDICIONES */}
      <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />

      {/* POLÍTICA DE PRIVACIDAD */}
      <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />

      {/* CAMBIOS Y DEVOLUCIONES */}
      <Route path="/cambios-y-devoluciones" element={<CambiosDevoluciones />} />

      {/* LIBRO DE RECLAMACIONES */}
      <Route path="/libro-de-reclamaciones" element={<LibroReclamaciones />} />

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

      {/* ========================================
          PRODUCTOS
      ======================================== */}

      {/* LISTAR PRODUCTOS */}
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

      {/* ========================================
          REPUESTOS
      ======================================== */}

      {/* LISTAR REPUESTOS */}
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

      {/* ========================================
          CATEGORÍAS DE PRODUCTOS
      ======================================== */}

      {/* LISTAR CATEGORÍAS */}
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

      {/* ========================================
          CATEGORÍAS DE REPUESTOS
      ======================================== */}

      {/* LISTAR CATEGORÍAS DE REPUESTOS */}
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

      {/* ========================================
          INVENTARIO
      ======================================== */}

      <Route
        path="/admin/inventario"
        element={
          <RutaProtegida>
            <Inventario />
          </RutaProtegida>
        }
      />

      {/* ========================================
          GESTIÓN DE PEDIDOS
      ======================================== */}

      <Route
        path="/admin/pedidos"
        element={
          <RutaProtegida>
            <PedidosAdmin />
          </RutaProtegida>
        }
      />

      {/* ========================================
          CONFIGURACIÓN
      ======================================== */}

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
