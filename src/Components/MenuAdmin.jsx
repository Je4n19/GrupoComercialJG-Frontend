import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logoJ&G.png";

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
      <>
        <path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18a2.1 2.1 0 0 0 3 3l5.3-5.3a5 5 0 0 0 6.4-6.4L14 13l-3-3 3.7-3.7Z" />
      </>
    ),
    categorias: (
      <>
        <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
      </>
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
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.86 2.86-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1.1 1.6V21h-4v-.1A1.7 1.7 0 0 0 8.8 19.3a1.7 1.7 0 0 0-1.88.34l-.06.06L4 16.84l.06-.06A1.7 1.7 0 0 0 4.4 14.9 1.7 1.7 0 0 0 2.8 13.8H2v-4h.8A1.7 1.7 0 0 0 4.4 8.7a1.7 1.7 0 0 0-.34-1.88L4 6.76 6.86 3.9l.06.06A1.7 1.7 0 0 0 8.8 4.3 1.7 1.7 0 0 0 9.9 2.7V2h4v.7A1.7 1.7 0 0 0 15 4.3a1.7 1.7 0 0 0 1.88-.34l.06-.06L19.8 6.76l-.06.06A1.7 1.7 0 0 0 19.4 8.7 1.7 1.7 0 0 0 21 9.8h1v4h-1a1.7 1.7 0 0 0-1.6 1.2Z" />
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

function MenuAdmin() {
  const location = useLocation();

  const cerrarSesion = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

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

  return (
    <aside
      className="
        w-full
        lg:w-72
        lg:min-h-screen
        lg:shrink-0
        bg-[#080F0C]
        text-white
        flex
        flex-col
        border-b
        lg:border-b-0
        lg:border-r
        border-white/10
        shadow-2xl
      "
    >
      {/* CABECERA */}
      <div className="px-5 py-5 lg:px-6 lg:py-7 border-b border-white/10">
        <Link to="/admin" className="flex items-center gap-3 group">
          <div
            className="
              bg-white
              rounded-2xl
              p-2
              shrink-0
              shadow-lg
              group-hover:scale-105
              transition-transform
              duration-300
            "
          >
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

        {/* INDICADOR */}
        <div
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            bg-[#009E49]/10
            border
            border-[#009E49]/25
            rounded-full
            px-3
            py-1.5
          "
        >
          <span className="w-2 h-2 rounded-full bg-[#009E49]" />

          <span className="text-[#5FE29C] text-[11px] font-bold">
            Área administrativa
          </span>
        </div>
      </div>

      {/* NAVEGACIÓN */}
      <nav className="flex-1 min-w-0 p-3 lg:p-4">
        <p
          className="
            hidden
            lg:block
            text-[11px]
            uppercase
            tracking-[0.18em]
            text-gray-500
            font-bold
            px-3
            mb-4
          "
        >
          Navegación
        </p>

        <ul
          className="
            flex
            lg:flex-col
            gap-2
            overflow-x-auto
            lg:overflow-visible
            pb-1
            lg:pb-0
          "
        >
          {menus.map((item) => {
            const activo = estaActivo(item.ruta);

            return (
              <li key={item.ruta} className="shrink-0 lg:w-full">
                <Link
                  to={item.ruta}
                  aria-current={activo ? "page" : undefined}
                  className={`
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3.5
                    rounded-xl
                    font-semibold
                    text-sm
                    whitespace-nowrap
                    lg:whitespace-normal
                    transition-all
                    duration-300
                    ${
                      activo
                        ? "bg-[#009E49] text-white shadow-lg shadow-green-950/30"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  {/* BARRA NARANJA DEL ACTIVO */}
                  {activo && (
                    <span
                      className="
                        absolute
                        left-0
                        top-3
                        bottom-3
                        w-1
                        rounded-r-full
                        bg-[#FF6600]
                      "
                    />
                  )}

                  {/* ICONO */}
                  <span
                    className={`
                      shrink-0
                      transition-colors
                      ${
                        activo
                          ? "text-white"
                          : "text-[#5FE29C] group-hover:text-[#FF6600]"
                      }
                    `}
                  >
                    <Icono tipo={item.icono} />
                  </span>

                  {/* TEXTO */}
                  <span className="flex-1">{item.nombre}</span>

                  {/* FLECHA */}
                  <span
                    className={`
                      hidden
                      lg:block
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

      {/* PERFIL Y CERRAR SESIÓN */}
      <div className="p-4 lg:p-5 border-t border-white/10">
        {/* TARJETA ADMINISTRADOR */}
        <div
          className="
            bg-white/5
            rounded-2xl
            p-4
            border
            border-white/10
          "
        >
          <div className="flex items-center gap-3">
            {/* AVATAR */}
            <div
              className="
                w-11
                h-11
                shrink-0
                rounded-xl
                bg-[#009E49]
                flex
                items-center
                justify-center
                font-black
                text-lg
                text-white
                border-b-[3px]
                border-[#FF6600]
              "
            >
              A
            </div>

            {/* INFORMACIÓN */}
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
          className="
            w-full
            mt-4
            flex
            items-center
            justify-center
            gap-3
            bg-[#FF6600]
            hover:bg-[#E65C00]
            text-white
            px-4
            py-3.5
            rounded-xl
            font-black
            text-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            shadow-lg
            shadow-orange-950/20
          "
        >
          <Icono tipo="salir" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

export default MenuAdmin;
