import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/logoJ&G.png";
import { logout } from "../Services/authService";

/* ========================================
   ICONOS DEL MENÚ
======================================== */

function Icono({ tipo, className = "w-5 h-5" }) {
  const iconos = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),

    productos: (
      <>
        <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z" />
        <path d="m3 7.5 9 4.5 9-4.5" />
        <path d="M12 12v9" />
      </>
    ),

    repuestos: (
      <path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18a2.1 2.1 0 0 0 3 3l5.3-5.3a5 5 0 0 0 6.4-6.4L14 13l-3-3 3.7-3.7Z" />
    ),

    categorias: (
      <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    ),

    etiquetas: (
      <>
        <path d="M20 13 13 20a2 2 0 0 1-2.8 0L3 12.8V4a1 1 0 0 1 1-1h8.8L20 10.2a2 2 0 0 1 0 2.8Z" />
        <circle cx="7.5" cy="7.5" r="1" />
      </>
    ),

    inventario: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),

    configuracion: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.86 2.86-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1.1 1.6V21h-4v-.1A1.7 1.7 0 0 0 8.8 19.3a1.7 1.7 0 0 0-1.88.34l-.06.06L4 16.84l.06-.06A1.7 1.7 0 0 0 4.4 14.9a1.7 1.7 0 0 0-1.6-1.1H2v-4h.8A1.7 1.7 0 0 0 15 4.3a1.7 1.7 0 0 0 1.88-.34l.06-.06L19.8 6.76l-.06.06A1.7 1.7 0 0 0 19.4 8.7a1.7 1.7 0 0 0 1.6 1.1h1v4h-1a1.7 1.7 0 0 0-1.6 1.2Z" />
      </>
    ),

    salir: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="m16 17 5-5-5-5" />
        <path d="M21 12H9" />
      </>
    ),

    flecha: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),

    menu: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    ),

    cerrar: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconos[tipo]}
    </svg>
  );
}

/* ========================================
   MENÚ ADMINISTRATIVO RESPONSIVE
======================================== */

function MenuAdmin() {
  const location = useLocation();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [cerrandoSesion, setCerrandoSesion] = useState(false);
  const [errorSesion, setErrorSesion] = useState("");

  /* ========================================
     CERRAR MENÚ AL CAMBIAR DE PÁGINA
  ======================================== */

  useEffect(() => {
    setMenuAbierto(false);
  }, [location.pathname]);

  /* ========================================
     BLOQUEAR SCROLL AL ABRIR MENÚ MÓVIL
  ======================================== */

  useEffect(() => {
    if (!menuAbierto) return;

    const overflowAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, [menuAbierto]);

  /* ========================================
     CERRAR MENÚ CON ESCAPE
  ======================================== */

  useEffect(() => {
    if (!menuAbierto) return;

    const manejarTeclado = (event) => {
      if (event.key === "Escape") {
        setMenuAbierto(false);
      }
    };

    window.addEventListener("keydown", manejarTeclado);

    return () => {
      window.removeEventListener("keydown", manejarTeclado);
    };
  }, [menuAbierto]);

  /* ========================================
     CERRAR SESIÓN CON SPRING BOOT
  ======================================== */

  const cerrarSesion = async () => {
    if (cerrandoSesion) return;

    setCerrandoSesion(true);
    setErrorSesion("");

    try {
      await logout();

      window.location.replace("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);

      setErrorSesion(
        "No se pudo cerrar la sesión. Verifica tu conexión e inténtalo nuevamente.",
      );

      setCerrandoSesion(false);
    }
  };

  /* ========================================
     OPCIONES DEL MENÚ
  ======================================== */

  const menus = [
    {
      nombre: "Dashboard",
      ruta: "/admin",
      icono: "dashboard",
    },
    {
      nombre: "Productos",
      ruta: "/admin/productos",
      icono: "productos",
    },
    {
      nombre: "Repuestos",
      ruta: "/admin/repuestos",
      icono: "repuestos",
    },
    {
      nombre: "Categorías Productos",
      ruta: "/admin/categorias",
      icono: "categorias",
    },
    {
      nombre: "Categorías Repuestos",
      ruta: "/admin/categorias-repuesto",
      icono: "etiquetas",
    },
    {
      nombre: "Inventario",
      ruta: "/admin/inventario",
      icono: "inventario",
    },
    {
      nombre: "Configuración",
      ruta: "/admin/configuracion",
      icono: "configuracion",
    },
  ];

  const estaActivo = (ruta) => {
    if (ruta === "/admin") {
      return location.pathname === "/admin";
    }

    return (
      location.pathname === ruta || location.pathname.startsWith(`${ruta}/`)
    );
  };

  /* ========================================
     CONTENIDO DEL MENÚ
  ======================================== */

  const contenidoMenu = (
    <>
      {/* CABECERA */}

      <div className="px-5 py-5 lg:px-6 lg:py-7 border-b border-white/10">
        <Link
          to="/admin"
          onClick={() => setMenuAbierto(false)}
          className="flex items-center gap-3 group"
        >
          <div className="bg-white rounded-2xl p-2 shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
            <img
              src={logo}
              alt="Grupo Comercial J&G"
              className="w-12 h-12 object-contain"
            />
          </div>

          <div className="min-w-0">
            <h1 className="font-black text-base leading-tight text-white">
              Grupo Comercial
              <span className="block text-[#FF6600]">J&G</span>
            </h1>

            <p className="text-gray-400 text-xs mt-1">Panel Administrativo</p>
          </div>
        </Link>

        <div className="mt-5 inline-flex items-center gap-2 bg-[#009E49]/10 border border-[#009E49]/25 rounded-full px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-[#009E49]" />

          <span className="text-[#5FE29C] text-[11px] font-bold">
            Área administrativa
          </span>
        </div>
      </div>

      {/* NAVEGACIÓN */}

      <nav className="flex-1 min-h-0 overflow-y-auto p-3 lg:p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 font-bold px-3 mb-4">
          Navegación
        </p>

        <ul className="flex flex-col gap-2">
          {menus.map((item) => {
            const activo = estaActivo(item.ruta);

            return (
              <li key={item.ruta} className="w-full">
                <Link
                  to={item.ruta}
                  onClick={() => setMenuAbierto(false)}
                  aria-current={activo ? "page" : undefined}
                  className={`
                    group relative flex items-center gap-3
                    px-4 py-3.5 rounded-xl font-semibold
                    text-sm transition-all duration-300
                    ${
                      activo
                        ? "bg-[#009E49] text-white shadow-lg shadow-green-950/30"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  {activo && (
                    <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-[#FF6600]" />
                  )}

                  <span
                    className={`
                      shrink-0 transition-colors
                      ${
                        activo
                          ? "text-white"
                          : "text-[#5FE29C] group-hover:text-[#FF6600]"
                      }
                    `}
                  >
                    <Icono tipo={item.icono} />
                  </span>

                  <span className="flex-1 min-w-0">{item.nombre}</span>

                  <span
                    className={`
                      transition-all
                      ${
                        activo
                          ? "text-white"
                          : "text-gray-600 group-hover:text-white"
                      }
                    `}
                  >
                    <Icono tipo="flecha" className="w-4 h-4" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* PERFIL ADMINISTRADOR */}

      <div className="p-4 lg:p-5 border-t border-white/10">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#009E49] flex items-center justify-center font-black text-lg text-white border-b-[3px] border-[#FF6600]">
              A
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-white text-sm">Administrador</h3>

              <p className="text-xs text-gray-400 mt-1 truncate">
                Grupo Comercial J&G
              </p>
            </div>
          </div>
        </div>

        {/* CERRAR SESIÓN */}

        <button
          type="button"
          onClick={cerrarSesion}
          disabled={cerrandoSesion}
          className="
            w-full mt-4 flex items-center justify-center
            gap-3 bg-[#FF6600] hover:bg-[#E65C00]
            disabled:opacity-60 disabled:cursor-not-allowed
            text-white px-4 py-3.5 rounded-xl
            font-black text-sm transition-all duration-300
            hover:-translate-y-0.5 shadow-lg
            shadow-orange-950/20
          "
        >
          <Icono tipo="salir" />

          {cerrandoSesion ? "Cerrando sesión..." : "Cerrar Sesión"}
        </button>

        {errorSesion && (
          <p role="alert" className="mt-3 text-sm text-red-300 text-center">
            {errorSesion}
          </p>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* ========================================
          BARRA SUPERIOR PARA CELULARES
      ======================================== */}

      <div className="lg:hidden w-full min-w-0 bg-[#080F0C] text-white border-b border-white/10">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <Link to="/admin" className="flex items-center gap-3 min-w-0">
            <div className="bg-white rounded-xl p-1.5 shrink-0">
              <img
                src={logo}
                alt="Grupo Comercial J&G"
                className="w-9 h-9 object-contain"
              />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-black text-white truncate">
                Grupo Comercial J&G
              </p>

              <p className="text-[11px] text-[#5FE29C]">Administración</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMenuAbierto(true)}
            aria-label="Abrir menú administrativo"
            aria-expanded={menuAbierto}
            aria-controls="menu-admin-movil"
            className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-[#009E49] hover:bg-[#007A39] transition"
          >
            <Icono tipo="menu" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* ========================================
          FONDO OSCURO DEL MENÚ MÓVIL
      ======================================== */}

      {menuAbierto && (
        <button
          type="button"
          onClick={() => setMenuAbierto(false)}
          aria-label="Cerrar menú administrativo"
          className="lg:hidden fixed inset-0 z-40 bg-black/70"
        />
      )}

      {/* ========================================
          MENÚ DESPLEGABLE PARA CELULARES
      ======================================== */}

      <div
        id="menu-admin-movil"
        aria-hidden={!menuAbierto}
        inert={!menuAbierto}
        className={`
          lg:hidden fixed inset-y-0 left-0 z-50
          w-[min(85vw,320px)] max-w-full
          bg-[#080F0C] text-white
          flex flex-col shadow-2xl
          transform transition-transform duration-300
          ${menuAbierto ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          type="button"
          onClick={() => setMenuAbierto(false)}
          aria-label="Cerrar menú"
          className="
            absolute top-5 right-4 z-10
            flex items-center justify-center
            w-9 h-9 rounded-lg
            bg-white/10 hover:bg-[#FF6600]
            text-white transition
          "
        >
          <Icono tipo="cerrar" />
        </button>

        {contenidoMenu}
      </div>

      {/* ========================================
          MENÚ LATERAL PARA COMPUTADORAS
      ======================================== */}

      <aside
        className="
          hidden lg:flex
          lg:w-72 lg:min-h-screen lg:shrink-0
          bg-[#080F0C] text-white
          flex-col
          border-r border-white/10
          shadow-2xl
        "
      >
        {contenidoMenu}
      </aside>
    </>
  );
}

export default MenuAdmin;
