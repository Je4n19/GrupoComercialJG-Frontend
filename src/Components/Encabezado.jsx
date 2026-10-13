import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logoJ&G.png";
import { obtenerCategorias } from "../Services/categoriaService";
import Buscador from "./Buscador";

const TELEFONO = "979501557";
const CORREO = "grupo.comercial@yahoo.es";
const FACEBOOK_URL =
  "https://www.facebook.com/p/Grupo-Comercial-JG-61572533279515/";
const INSTAGRAM_URL = "https://www.instagram.com/grupocomercialjg/";

function Icono({ tipo, className = "w-5 h-5" }) {
  const paths = {
    telefono: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.8a2 2 0 0 1-.45 2.11L9.03 10.9a16 16 0 0 0 4.07 4.07l1.27-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.68A2 2 0 0 1 22 16.92z" />
    ),
    correo: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </>
    ),
    reloj: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    flecha: <path d="m6 9 6 6 6-6" />,
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
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[tipo]}
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 fill-current"
      aria-hidden="true"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.099 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.974h-1.513c-1.491 0-1.956.931-1.956 1.887v2.26h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.099 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 fill-current"
      aria-hidden="true"
    >
      <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zm8.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  );
}

function RedesSociales({ oscuro = false }) {
  const color = oscuro
    ? "text-gray-700 hover:text-orange-600"
    : "text-white hover:text-orange-200";
  return (
    <div className="flex items-center gap-4">
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={`${color} transition`}
      >
        <FacebookIcon />
      </a>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={`${color} transition`}
      >
        <InstagramIcon />
      </a>
    </div>
  );
}

function Encabezado() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let activo = true;
    obtenerCategorias()
      .then((data) => {
        if (activo) setCategorias(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error cargando categorías:", error));
    return () => {
      activo = false;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setBusqueda(params.get("buscar") || "");
  }, [location.pathname, location.search]);

  const cerrarMenu = () => {
    setMenuAbierto(false);
    setCategoriasAbiertas(false);
  };

  const buscar = (texto) => {
    const destino =
      location.pathname === "/repuestos" ? "/repuestos" : "/catalogo";
    const params = new URLSearchParams();
    if (texto) params.set("buscar", texto);
    navigate(`${destino}${params.toString() ? `?${params}` : ""}`);
    cerrarMenu();
  };

  const categoriasAgrupadas = categorias.reduce((grupos, categoria) => {
    if (!categoria.grupo || !categoria.nombre) return grupos;
    const grupo = categoria.grupo.trim();
    if (!grupos[grupo]) grupos[grupo] = [];
    grupos[grupo].push(categoria);
    return grupos;
  }, {});
  const gruposOrdenados = Object.entries(categoriasAgrupadas).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return (
    <>
      {/* BARRA SUPERIOR */}
      <div className="bg-orange-600 text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-y-3 gap-x-4 lg:gap-x-6">
              <a
                href={`tel:+51${TELEFONO}`}
                className="flex items-center gap-2.5 hover:text-orange-100 transition"
              >
                <Icono tipo="telefono" className="w-6 h-6 shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold">¡Llámanos!</span>
                  <span className="text-sm font-semibold">{TELEFONO}</span>
                </div>
              </a>
              <div className="hidden sm:block w-px h-10 bg-white/60" />
              <a
                href={`mailto:${CORREO}`}
                className="flex items-center gap-2.5 hover:text-orange-100 transition"
              >
                <Icono tipo="correo" className="w-6 h-6 shrink-0" />
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold">¡Escríbenos!</span>
                  <span className="text-sm font-semibold break-all">
                    {CORREO}
                  </span>
                </div>
              </a>
              <div className="hidden lg:block w-px h-10 bg-white/60" />
              <div className="flex items-center gap-2.5">
                <Icono tipo="reloj" className="w-6 h-6 shrink-0" />
                <div className="text-sm font-semibold leading-tight">
                  Lun - Vie: 8:45 - 18:00{" "}
                  <span className="mx-2 text-white/70">/</span> Sab. 8:45 -
                  13:00
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 xl:justify-end shrink-0">
              <span className="text-sm font-semibold text-white/90">
                Síguenos en nuestras redes:
              </span>
              <RedesSociales />
            </div>
          </div>
        </div>
      </div>

      {/* ENCABEZADO PRINCIPAL */}
      <header className="bg-[#c94e14] shadow-xl sticky top-0 z-50 border-b border-[#c94104]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 xl:gap-6 min-h-20 lg:min-h-24 py-3">
            {/* LOGO */}
            <Link
              to="/"
              onClick={cerrarMenu}
              className="flex items-center gap-3 shrink-0 group"
            >
              <div className="bg-white rounded-xl p-1.5 shadow-md group-hover:scale-105 transition">
                <img
                  src={logo}
                  alt="Grupo Comercial J&G"
                  className="h-11 xl:h-14 w-auto"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-black text-base xl:text-xl 2xl:text-2xl text-white whitespace-nowrap">
                  Grupo Comercial J&G
                </h1>
                <p className="text-[11px] xl:text-xs text-orange-200 font-semibold whitespace-nowrap">
                  Agricultura • Forestal • Industria
                </p>
              </div>
            </Link>

            {/* BUSCADOR EN EL CENTRO, SIN OCUPAR TODA LA FILA */}
            <div className="hidden md:block flex-1 min-w-0 max-w-[450px] lg:max-w-[380px] xl:max-w-[450px] mx-auto">
              <Buscador
                valor={busqueda}
                onChange={setBusqueda}
                onBuscar={buscar}
                categorias={categorias}
                compacto
              />
            </div>

            {/* MENÚ A LA DERECHA */}
            <nav className="hidden lg:flex items-center justify-end gap-3 xl:gap-5 2xl:gap-7 shrink-0 whitespace-nowrap">
              <Link
                to="/"
                className="font-bold text-white hover:text-orange-200 transition text-xs xl:text-sm 2xl:text-base"
              >
                Inicio
              </Link>
              <div className="relative group">
                <button
                  type="button"
                  aria-haspopup="true"
                  className="flex items-center gap-1 font-bold text-white hover:text-orange-200 transition text-xs xl:text-sm 2xl:text-base py-5"
                >
                  Categorías de Productos
                  <Icono
                    tipo="flecha"
                    className="w-4 h-4 group-hover:rotate-180 transition"
                  />
                </button>
                {/* MEGA MENÚ: conservamos categorías reales del backend */}
                <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 absolute top-full right-0 w-[min(1000px,90vw)] bg-white text-gray-800 shadow-2xl rounded-b-2xl border border-gray-100 transition-all duration-200 z-[100] whitespace-normal">
                  <div className="flex items-center justify-between gap-3 px-6 py-5 border-b border-gray-100">
                    <h2 className="text-xl font-black text-gray-900">
                      Categorías de Productos
                    </h2>
                    <Link
                      to="/catalogo"
                      className="text-sm font-bold text-[#c94e14] hover:underline"
                    >
                      Ver todo el catálogo →
                    </Link>
                  </div>
                  <div className="p-6 max-h-[65vh] overflow-y-auto">
                    {gruposOrdenados.length ? (
                      <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
                        {gruposOrdenados.map(([grupo, lista]) => (
                          <div key={grupo}>
                            <h3 className="font-black text-sm text-gray-900 uppercase mb-3 border-l-4 border-orange-500 pl-2">
                              {grupo}
                            </h3>
                            <div className="space-y-2">
                              {[...lista]
                                .sort((a, b) =>
                                  a.nombre.localeCompare(b.nombre),
                                )
                                .map((categoria) => (
                                  <Link
                                    key={categoria.id}
                                    to={`/catalogo?categoria=${encodeURIComponent(categoria.nombre)}`}
                                    className="block text-sm text-gray-600 hover:text-[#c94e14] transition"
                                  >
                                    › {categoria.nombre}
                                  </Link>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-6">
                        Las categorías estarán disponibles próximamente.
                      </p>
                    )}
                  </div>
                  <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-500">
                      Encuentra maquinaria y equipos según tu trabajo.
                    </span>
                    <a
                      href="https://wa.me/51979501557?text=Hola,%20necesito%20ayuda%20para%20elegir%20un%20producto"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-sm text-green-600 hover:text-green-700"
                    >
                      ¿Necesitas ayuda? WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
              <Link
                to="/repuestos"
                className="font-bold text-white hover:text-orange-200 transition text-xs xl:text-sm 2xl:text-base"
              >
                Repuestos
              </Link>
              <Link
                to="/contacto"
                className="font-bold text-white hover:text-orange-200 transition text-xs xl:text-sm 2xl:text-base"
              >
                Contacto
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="lg:hidden ml-auto w-11 h-11 shrink-0 flex items-center justify-center bg-white/10 border border-white/20 rounded-xl text-white"
              aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuAbierto}
            >
              <Icono
                tipo={menuAbierto ? "cerrar" : "menu"}
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* BUSCADOR PARA CELULARES */}
          <div className="md:hidden pb-3">
            <Buscador
              valor={busqueda}
              onChange={setBusqueda}
              onBuscar={buscar}
              categorias={categorias}
              compacto
            />
          </div>

          {/* MENÚ MÓVIL */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${menuAbierto ? "max-h-[80vh] opacity-100 pb-4" : "max-h-0 opacity-0"}`}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[70vh]">
              <nav className="flex flex-col p-3">
                <Link
                  to="/"
                  onClick={cerrarMenu}
                  className="px-5 py-4 rounded-xl font-bold text-gray-800 hover:bg-orange-50"
                >
                  Inicio
                </Link>
                <button
                  type="button"
                  onClick={() => setCategoriasAbiertas(!categoriasAbiertas)}
                  className="flex justify-between items-center px-5 py-4 rounded-xl font-bold text-gray-800 hover:bg-orange-50"
                >
                  Categorías de Productos{" "}
                  <Icono
                    tipo="flecha"
                    className={`w-5 h-5 transition ${categoriasAbiertas ? "rotate-180" : ""}`}
                  />
                </button>
                {categoriasAbiertas && (
                  <div className="mx-3 mb-3 bg-gray-50 rounded-2xl p-4">
                    <Link
                      to="/catalogo"
                      onClick={cerrarMenu}
                      className="block bg-[#c94e14] text-white text-center py-3 rounded-xl font-bold mb-4"
                    >
                      Ver todos los productos
                    </Link>
                    {gruposOrdenados.map(([grupo, lista]) => (
                      <div key={grupo} className="mb-5">
                        <h3 className="text-xs font-black text-[#c94e14] uppercase mb-2">
                          {grupo}
                        </h3>
                        {[...lista]
                          .sort((a, b) => a.nombre.localeCompare(b.nombre))
                          .map((categoria) => (
                            <Link
                              key={categoria.id}
                              to={`/catalogo?categoria=${encodeURIComponent(categoria.nombre)}`}
                              onClick={cerrarMenu}
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg"
                            >
                              › {categoria.nombre}
                            </Link>
                          ))}
                      </div>
                    ))}
                  </div>
                )}
                <Link
                  to="/repuestos"
                  onClick={cerrarMenu}
                  className="px-5 py-4 rounded-xl font-bold text-gray-800 hover:bg-orange-50"
                >
                  Repuestos
                </Link>
                <Link
                  to="/contacto"
                  onClick={cerrarMenu}
                  className="px-5 py-4 rounded-xl font-bold text-gray-800 hover:bg-orange-50"
                >
                  Contacto
                </Link>
              </nav>
              <div className="bg-gray-50 px-5 py-4 flex items-center justify-center gap-4">
                <span className="text-xs font-semibold text-gray-500">
                  Síguenos en nuestras redes:
                </span>
                <RedesSociales oscuro />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Encabezado;
