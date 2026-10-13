import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/logoJ&G.png";
import { obtenerCategorias } from "../Services/categoriaService";
import Buscador from "./Buscador";

const TELEFONO = "979501557";
const CORREO = "grupo.comercial@yahoo.es";

const FACEBOOK_URL =
  "https://www.facebook.com/p/Grupo-Comercial-JG-61572533279515/";

const INSTAGRAM_URL = "https://www.instagram.com/grupocomercialjg/";

// ICONOS
function Icono({ tipo, className = "w-5 h-5" }) {
  const iconos = {
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
      {iconos[tipo]}
    </svg>
  );
}

// FACEBOOK
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

// INSTAGRAM
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

// REDES SOCIALES
function RedesSociales({ oscuro = false }) {
  const estilo = oscuro
    ? "text-gray-700 hover:text-orange-600"
    : "text-white hover:text-orange-200";

  return (
    <div className="flex items-center gap-4">
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={`${estilo} transition`}
      >
        <FacebookIcon />
      </a>

      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={`${estilo} transition`}
      >
        <InstagramIcon />
      </a>
    </div>
  );
}

function Encabezado() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(false);

  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // CARGAR CATEGORÍAS DESDE EL BACKEND
  useEffect(() => {
    let activo = true;

    const cargarCategorias = async () => {
      try {
        const datos = await obtenerCategorias();

        if (activo) {
          setCategorias(Array.isArray(datos) ? datos : []);
        }
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    cargarCategorias();

    return () => {
      activo = false;
    };
  }, []);

  // SINCRONIZAR BÚSQUEDA CON LA URL
  useEffect(() => {
    const parametros = new URLSearchParams(location.search);

    setBusqueda(parametros.get("buscar") || "");
    setMenuAbierto(false);
    setCategoriasAbiertas(false);
  }, [location.pathname, location.search]);

  const cerrarMenu = () => {
    setMenuAbierto(false);
    setCategoriasAbiertas(false);
  };

  // BUSCADOR GLOBAL
  const buscar = (texto) => {
    const consulta = String(texto || "").trim();

    if (!consulta) return;

    cerrarMenu();
    setBusqueda(consulta);

    const esRepuesto =
      location.pathname === "/repuestos" ||
      /\b(repuesto|repuestos|cadena|cadenas|espada|espadas|carburador|carburadores|filtro|filtros)\b/i.test(
        consulta,
      );

    const destino = esRepuesto ? "/repuestos" : "/catalogo";

    const parametros = new URLSearchParams({
      buscar: consulta,
    });

    navigate(`${destino}?${parametros.toString()}`);
  };

  // ORGANIZAR CATEGORÍAS POR GRUPOS
  const gruposOrdenados = useMemo(() => {
    const grupos = categorias.reduce((resultado, categoria) => {
      if (!categoria?.grupo || !categoria?.nombre) {
        return resultado;
      }

      const nombreGrupo = String(categoria.grupo).trim();

      if (!resultado[nombreGrupo]) {
        resultado[nombreGrupo] = [];
      }

      resultado[nombreGrupo].push(categoria);

      return resultado;
    }, {});

    return Object.entries(grupos)
      .map(([grupo, items]) => [
        grupo,
        [...items].sort((a, b) => a.nombre.localeCompare(b.nombre, "es")),
      ])
      .sort(([a], [b]) => a.localeCompare(b, "es"));
  }, [categorias]);

  const enlaceCategoria = (nombre) =>
    `/catalogo?categoria=${encodeURIComponent(nombre)}`;

  return (
    <>
      {/* ===================================== */}
      {/* BARRA SUPERIOR - DISEÑO HORIZONTAL */}
      {/* ===================================== */}

      <div className="bg-[#f45100] text-white">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* ESCRITORIO */}
          <div className="hidden xl:flex items-center justify-between gap-5 py-3">
            <div className="flex items-center gap-5 2xl:gap-8 min-w-0">
              {/* TELÉFONO */}
              <a
                href={`tel:+51${TELEFONO}`}
                className="flex items-center gap-2 whitespace-nowrap text-[13px] 2xl:text-sm hover:text-orange-100 transition"
              >
                <Icono tipo="telefono" className="w-6 h-6 shrink-0" />

                <span className="font-bold">¡Llámanos!</span>

                <span className="font-semibold">{TELEFONO}</span>
              </a>

              {/* SEPARADOR */}
              <div className="w-px h-9 bg-white/50 shrink-0" />

              {/* CORREO */}
              <a
                href={`mailto:${CORREO}`}
                className="flex items-center gap-2 whitespace-nowrap text-[13px] 2xl:text-sm hover:text-orange-100 transition"
              >
                <Icono tipo="correo" className="w-6 h-6 shrink-0" />

                <span className="font-bold">¡Escríbenos!</span>

                <span className="font-semibold">{CORREO}</span>
              </a>

              {/* SEPARADOR */}
              <div className="w-px h-9 bg-white/50 shrink-0" />

              {/* HORARIO */}
              <div className="flex items-center gap-2 whitespace-nowrap text-[13px] 2xl:text-sm font-semibold">
                <Icono tipo="reloj" className="w-6 h-6 shrink-0" />

                <span>Lun - Vie: 8:45 - 18:00 / Sab. 8:45 - 13:00</span>
              </div>
            </div>

            {/* REDES SOCIALES A LA DERECHA */}
            <div className="flex items-center gap-4 shrink-0 ml-auto">
              <span className="text-[13px] 2xl:text-sm font-semibold whitespace-nowrap">
                Síguenos en nuestras redes:
              </span>

              <RedesSociales />
            </div>
          </div>

          {/* TABLETS Y CELULARES */}
          <div className="xl:hidden py-3">
            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
              {/* TELÉFONO */}
              <a
                href={`tel:+51${TELEFONO}`}
                className="flex items-center gap-2 text-xs sm:text-sm hover:text-orange-100 transition"
              >
                <Icono tipo="telefono" className="w-4 h-4 shrink-0" />

                <span className="font-bold">¡Llámanos!</span>

                <span className="font-semibold">{TELEFONO}</span>
              </a>

              {/* CORREO */}
              <a
                href={`mailto:${CORREO}`}
                className="flex items-center gap-2 text-xs sm:text-sm hover:text-orange-100 transition"
              >
                <Icono tipo="correo" className="w-4 h-4 shrink-0" />

                <span className="font-bold">¡Escríbenos!</span>

                <span className="font-semibold break-all">{CORREO}</span>
              </a>

              {/* HORARIO */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                <Icono tipo="reloj" className="w-4 h-4 shrink-0" />

                <span>Lun - Vie: 8:45 - 18:00 / Sab. 8:45 - 13:00</span>
              </div>

              {/* REDES SOCIALES */}
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-semibold">
                  Síguenos:
                </span>

                <RedesSociales />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================== */}
      {/* ENCABEZADO PRINCIPAL */}
      {/* ===================================== */}

      <header className="bg-[#c94e14] shadow-xl sticky top-0 z-50 border-b border-orange-700">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 xl:gap-5 min-h-20 py-3">
            {/* LOGO Y NOMBRE */}
            <Link
              to="/"
              onClick={cerrarMenu}
              className="flex items-center gap-3 shrink-0 group"
            >
              <div className="bg-white rounded-xl p-1.5 shadow-md group-hover:scale-105 transition">
                <img
                  src={logo}
                  alt="Grupo Comercial J&G"
                  className="h-11 xl:h-12 w-auto"
                />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-white font-black text-base xl:text-lg whitespace-nowrap">
                  Grupo Comercial J&G
                </h1>

                <p className="text-orange-100 text-[11px] font-semibold">
                  Agricultura • Forestal • Industria
                </p>
              </div>
            </Link>

            {/* BUSCADOR GLOBAL - ESCRITORIO */}
            <div className="hidden md:block flex-1 min-w-0 max-w-[480px] mx-auto relative z-[60]">
              <Buscador
                valor={busqueda}
                onChange={setBusqueda}
                onBuscar={buscar}
                compacto
              />
            </div>

            {/* NAVEGACIÓN ESCRITORIO */}
            <nav className="hidden xl:flex items-center justify-end gap-4 2xl:gap-6 h-16 shrink-0">
              <Link
                to="/"
                className="font-bold text-white hover:text-orange-200 transition whitespace-nowrap text-sm"
              >
                Inicio
              </Link>

              {/* CATEGORÍAS DINÁMICAS */}
              <div className="relative group h-full flex items-center">
                <button
                  type="button"
                  className="flex items-center gap-1 font-bold text-white hover:text-orange-200 transition whitespace-nowrap text-sm h-full"
                >
                  Categorías de Productos
                  <Icono
                    tipo="flecha"
                    className="w-4 h-4 transition group-hover:rotate-180"
                  />
                </button>

                {/* MEGA MENÚ */}
                <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute top-full right-0 w-[min(1050px,92vw)] bg-white text-gray-800 shadow-2xl rounded-b-3xl border border-gray-100 transition-all duration-200 z-[100]">
                  <div className="flex justify-between items-center gap-4 px-7 py-5 border-b">
                    <div>
                      <p className="text-xs font-black text-orange-600 uppercase">
                        Grupo Comercial J&G
                      </p>

                      <h2 className="text-xl font-black mt-1">
                        Categorías de Productos
                      </h2>
                    </div>

                    <Link
                      to="/catalogo"
                      className="text-sm font-bold text-orange-600 hover:underline"
                    >
                      Ver todo el catálogo →
                    </Link>
                  </div>

                  <div className="p-7 max-h-[65vh] overflow-y-auto">
                    {gruposOrdenados.length > 0 ? (
                      <div className="grid grid-cols-3 gap-7">
                        {gruposOrdenados.map(([grupo, items]) => (
                          <div key={grupo}>
                            <h3 className="font-black text-sm text-orange-600 uppercase mb-3">
                              {grupo}
                            </h3>

                            <div className="space-y-2">
                              {items.map((categoria) => (
                                <Link
                                  key={categoria.id}
                                  to={enlaceCategoria(categoria.nombre)}
                                  className="block text-sm text-gray-600 hover:text-orange-600 transition"
                                >
                                  › {categoria.nombre}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        No hay categorías disponibles.
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 px-7 py-4 rounded-b-3xl flex justify-between gap-4">
                    <span className="text-sm text-gray-500">
                      Encuentra maquinaria para cada trabajo.
                    </span>

                    <a
                      href="https://wa.me/51979501557"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-green-600"
                    >
                      ¿Necesitas ayuda? WhatsApp →
                    </a>
                  </div>
                </div>
              </div>

              <Link
                to="/repuestos"
                className="font-bold text-white hover:text-orange-200 transition whitespace-nowrap text-sm"
              >
                Repuestos
              </Link>

              <Link
                to="/contacto"
                className="font-bold text-white hover:text-orange-200 transition whitespace-nowrap text-sm"
              >
                Contacto
              </Link>
            </nav>

            {/* BOTÓN MENÚ MÓVIL */}
            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="xl:hidden shrink-0 w-11 h-11 flex items-center justify-center bg-white/10 border border-white/20 rounded-xl text-white ml-auto"
              aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuAbierto}
            >
              <Icono
                tipo={menuAbierto ? "cerrar" : "menu"}
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* BUSCADOR GLOBAL - CELULARES */}
          <div className="md:hidden pb-4 relative z-[60]">
            <Buscador
              valor={busqueda}
              onChange={setBusqueda}
              onBuscar={buscar}
              compacto
            />
          </div>

          {/* MENÚ RESPONSIVE */}
          {menuAbierto && (
            <div className="xl:hidden pb-5">
              <div className="bg-white rounded-2xl shadow-2xl max-h-[75vh] overflow-y-auto p-3">
                <nav className="flex flex-col">
                  <Link
                    to="/"
                    onClick={cerrarMenu}
                    className="px-5 py-4 font-bold text-gray-800 hover:bg-orange-50 rounded-xl"
                  >
                    Inicio
                  </Link>

                  <button
                    type="button"
                    onClick={() => setCategoriasAbiertas(!categoriasAbiertas)}
                    className="flex justify-between items-center px-5 py-4 font-bold text-gray-800 hover:bg-orange-50 rounded-xl"
                  >
                    Categorías de Productos
                    <Icono
                      tipo="flecha"
                      className={`w-5 h-5 transition ${
                        categoriasAbiertas ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {categoriasAbiertas && (
                    <div className="bg-gray-50 rounded-xl p-4 mx-2">
                      <Link
                        to="/catalogo"
                        onClick={cerrarMenu}
                        className="block bg-orange-600 text-white text-center py-3 rounded-xl font-bold mb-4"
                      >
                        Ver todos los productos
                      </Link>

                      {gruposOrdenados.map(([grupo, items]) => (
                        <div key={grupo} className="mb-5">
                          <h3 className="text-sm font-black text-orange-600 uppercase mb-2">
                            {grupo}
                          </h3>

                          {items.map((categoria) => (
                            <Link
                              key={categoria.id}
                              to={enlaceCategoria(categoria.nombre)}
                              onClick={cerrarMenu}
                              className="block px-3 py-2 text-sm text-gray-700 hover:text-orange-600"
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
                    className="px-5 py-4 font-bold text-gray-800 hover:bg-orange-50 rounded-xl"
                  >
                    Repuestos
                  </Link>

                  <Link
                    to="/contacto"
                    onClick={cerrarMenu}
                    className="px-5 py-4 font-bold text-gray-800 hover:bg-orange-50 rounded-xl"
                  >
                    Contacto
                  </Link>
                </nav>

                <div className="border-t mt-3 pt-4 px-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Síguenos:</span>

                  <RedesSociales oscuro />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Encabezado;
