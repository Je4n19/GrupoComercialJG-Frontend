import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logoJ&G.png";
import { obtenerCategorias } from "../Services/categoriaService";

function Encabezado() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data || []);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    cargarCategorias();
  }, []);

  const cerrarMenu = () => {
    setMenuAbierto(false);
    setCategoriasAbiertas(false);
  };

  // Agrupar categorías por el campo "grupo"
  const categoriasAgrupadas = categorias.reduce((grupos, categoria) => {
    if (!categoria.grupo || !categoria.nombre) {
      return grupos;
    }

    const nombreGrupo = categoria.grupo.trim();

    if (!grupos[nombreGrupo]) {
      grupos[nombreGrupo] = [];
    }

    grupos[nombreGrupo].push(categoria);

    return grupos;
  }, {});

  // Ordenar alfabéticamente los grupos
  const gruposOrdenados = Object.entries(categoriasAgrupadas).sort(
    ([grupoA], [grupoB]) => grupoA.localeCompare(grupoB),
  );

  return (
    <>
      {/* =========================
    BARRA SUPERIOR
========================== */}

      <div className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex justify-between items-center text-xs sm:text-sm">
          {/* INFORMACIÓN IZQUIERDA */}
          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href="tel:+51979501557"
              className="flex items-center gap-1.5 hover:text-orange-100 transition"
            >
              <span>📞</span>
              <span>+51 979 501 557</span>
            </a>

            <span className="hidden sm:flex items-center gap-1.5">
              <span>🚚</span>
              <span>Cobertura a nivel nacional</span>
            </span>
          </div>

          {/* REDES SOCIALES DERECHA */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-medium text-white whitespace-nowrap">
              Síguenos en todas nuestras redes:
            </span>

            {/* FACEBOOK */}
            <a
              href="https://www.facebook.com/p/Grupo-Comercial-JG-61572533279515/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Grupo Comercial J&G"
              title="Facebook"
              className="
          flex items-center justify-center
          text-white
          hover:text-orange-200
          hover:-translate-y-0.5
          transition-all duration-200
        "
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[17px] h-[17px] fill-current"
                aria-hidden="true"
              >
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.099 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.974h-1.513c-1.491 0-1.956.931-1.956 1.887v2.26h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.099 24 12.073z" />
              </svg>
            </a>

            {/* INSTAGRAM */}
            <a
              href="https://www.instagram.com/grupocomercialjg/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Grupo Comercial J&G"
              title="Instagram"
              className="
          flex items-center justify-center
          text-white
          hover:text-orange-200
          hover:-translate-y-0.5
          transition-all duration-200
        "
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px] fill-current"
                aria-hidden="true"
              >
                <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zm8.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
            </a>

            {/* YOUTUBE */}
            <span
              aria-label="YouTube"
              title="YouTube"
              className="
          hidden sm:flex
          items-center justify-center
          text-white/60
          cursor-default
        "
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[20px] h-[20px] fill-current"
                aria-hidden="true"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </span>

            {/* LINKEDIN */}
            <span
              aria-label="LinkedIn"
              title="LinkedIn"
              className="
          hidden sm:flex
          items-center justify-center
          text-white/60
          cursor-default
        "
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px] fill-current"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.047c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* =========================
    HEADER PRINCIPAL
========================== */}

      <header className="bg-[#c94e14] shadow-xl sticky top-0 z-50 border-b border-[#c94104]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* LOGO */}

            <Link
              to="/"
              onClick={cerrarMenu}
              className="flex items-center gap-3 sm:gap-4 group"
            >
              <div className="bg-white rounded-xl p-1.5 sm:p-2 shadow-md group-hover:scale-105 transition">
                <img
                  src={logo}
                  alt="Grupo Comercial J&G"
                  className="h-11 sm:h-14 w-auto"
                />
              </div>

              <div className="hidden sm:block">
                <h1 className="font-black text-xl lg:text-2xl text-white">
                  Grupo Comercial J&G
                </h1>

                <p className="text-xs lg:text-sm text-orange-200 font-semibold">
                  Agricultura • Forestal • Industria
                </p>
              </div>
            </Link>

            {/* =========================
                MENÚ ESCRITORIO
            ========================== */}

            <nav className="hidden lg:flex items-center gap-7 h-full">
              <Link
                to="/"
                className="font-bold text-white hover:text-orange-200 transition"
              >
                Inicio
              </Link>

              {/* CATEGORÍAS PRODUCTOS */}

              <div className="relative group h-full flex items-center">
                <button
                  type="button"
                  className="flex items-center gap-2 font-bold text-white hover:text-orange-200 transition h-full"
                >
                  Categorías de Productos
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* MEGA MENÚ */}

                <div
                  className="
                    invisible
                    opacity-0
                    translate-y-2
                    group-hover:visible
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    absolute
                    top-full
                    left-1/2
                    -translate-x-1/2
                    w-[min(1200px,94vw)]
                    bg-white
                    text-gray-800
                    shadow-2xl
                    rounded-b-3xl
                    border
                    border-gray-100
                    transition-all
                    duration-200
                    z-[100]
                  "
                >
                  {/* CABECERA MEGA MENÚ */}

                  <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
                    <div>
                      <p className="text-xs font-black tracking-[0.2em] text-[#c94e14] uppercase">
                        Grupo Comercial J&G
                      </p>

                      <h2 className="text-2xl font-black text-gray-900 mt-1">
                        Categorías de Productos
                      </h2>
                    </div>

                    <Link
                      to="/catalogo"
                      className="text-sm font-bold text-[#c94e14] hover:underline"
                    >
                      Ver todo el catálogo →
                    </Link>
                  </div>

                  {/* GRUPOS */}

                  <div className="p-8 max-h-[65vh] overflow-y-auto">
                    {gruposOrdenados.length > 0 ? (
                      <div className="grid grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-9">
                        {gruposOrdenados.map(([grupo, categoriasGrupo]) => (
                          <div key={grupo}>
                            {/* NOMBRE DEL GRUPO */}

                            <div className="flex items-center gap-2 mb-4">
                              <span className="w-2 h-2 bg-[#c94e14] rounded-full"></span>

                              <h3 className="font-black text-sm text-gray-900 uppercase tracking-wide">
                                {grupo}
                              </h3>
                            </div>

                            {/* SUBCATEGORÍAS */}

                            <div className="space-y-2.5">
                              {categoriasGrupo
                                .sort((a, b) =>
                                  a.nombre.localeCompare(b.nombre),
                                )
                                .map((categoria) => (
                                  <Link
                                    key={categoria.id}
                                    to={`/catalogo?categoria=${encodeURIComponent(
                                      categoria.nombre,
                                    )}`}
                                    className="group/item flex items-center gap-2 text-sm text-gray-600 hover:text-[#c94e14] transition"
                                  >
                                    <span className="text-gray-300 group-hover/item:text-[#c94e14] transition">
                                      ›
                                    </span>

                                    <span className="font-medium">
                                      {categoria.nombre}
                                    </span>
                                  </Link>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-10 text-center">
                        <p className="text-gray-500">
                          Las categorías estarán disponibles próximamente.
                        </p>

                        <Link
                          to="/catalogo"
                          className="inline-block mt-4 font-bold text-[#c94e14]"
                        >
                          Ver catálogo
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* PARTE INFERIOR */}

                  <div className="bg-gray-50 px-8 py-4 rounded-b-3xl flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Encuentra maquinaria y equipos según el trabajo que
                      necesitas.
                    </p>

                    <a
                      href="https://wa.me/51979501557?text=Hola,%20necesito%20ayuda%20para%20elegir%20un%20producto"
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-sm text-green-600 hover:text-green-700"
                    >
                      ¿Necesitas ayuda? WhatsApp →
                    </a>
                  </div>
                </div>
              </div>

              <Link
                to="/repuestos"
                className="font-bold text-white hover:text-orange-200 transition"
              >
                Repuestos
              </Link>

              <Link
                to="/contacto"
                className="font-bold text-white hover:text-orange-200 transition"
              >
                Contacto
              </Link>
            </nav>

            {/* =========================
                BOTONES ESCRITORIO
            ========================== */}

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://wa.me/51979501557"
                target="_blank"
                rel="noreferrer"
                className="hidden xl:flex bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold shadow-md transition"
              >
                WhatsApp
              </a>

              <a
                href="https://wa.me/51979501557?text=Hola,%20deseo%20una%20cotización"
                target="_blank"
                rel="noreferrer"
                className="bg-orange-500 hover:bg-orange-400 text-white px-5 py-3 rounded-xl font-bold shadow-lg transition hover:-translate-y-0.5"
              >
                Cotizar Ahora
              </a>
            </div>

            {/* =========================
                HAMBURGUESA
            ========================== */}

            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-[5px] bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition"
              aria-label="Abrir menú"
              aria-expanded={menuAbierto}
            >
              <span
                className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${
                  menuAbierto ? "translate-y-[7px] rotate-45" : ""
                }`}
              ></span>

              <span
                className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${
                  menuAbierto ? "opacity-0" : ""
                }`}
              ></span>

              <span
                className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${
                  menuAbierto ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              ></span>
            </button>
          </div>

          {/* =========================
              MENÚ MÓVIL
          ========================== */}

          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              menuAbierto
                ? "max-h-[80vh] opacity-100 pb-5"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[70vh] overflow-y-auto">
              <nav className="flex flex-col p-3">
                {/* INICIO */}

                <Link
                  to="/"
                  onClick={cerrarMenu}
                  className="flex items-center justify-between px-5 py-4 rounded-xl font-bold text-gray-800 hover:bg-orange-50 hover:text-[#c94e14] transition"
                >
                  <span>Inicio</span>
                  <span className="text-gray-300">›</span>
                </Link>

                {/* CATEGORÍAS PRODUCTOS */}

                <button
                  type="button"
                  onClick={() => setCategoriasAbiertas(!categoriasAbiertas)}
                  className="w-full flex items-center justify-between px-5 py-4 rounded-xl font-bold text-gray-800 hover:bg-orange-50 hover:text-[#c94e14] transition"
                >
                  <span>Categorías de Productos</span>

                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      categoriasAbiertas ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* SUBMENÚ MÓVIL */}

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    categoriasAbiertas
                      ? "max-h-[3000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="mx-3 mb-3 bg-gray-50 rounded-2xl p-4">
                    <Link
                      to="/catalogo"
                      onClick={cerrarMenu}
                      className="block bg-[#c94e14] text-white text-center py-3 px-4 rounded-xl font-bold mb-5"
                    >
                      Ver todos los productos
                    </Link>

                    {gruposOrdenados.length > 0 ? (
                      <div className="space-y-6">
                        {gruposOrdenados.map(([grupo, categoriasGrupo]) => (
                          <div key={grupo}>
                            <h3 className="text-xs font-black text-[#c94e14] uppercase tracking-wider mb-3">
                              {grupo}
                            </h3>

                            <div className="space-y-1">
                              {categoriasGrupo
                                .sort((a, b) =>
                                  a.nombre.localeCompare(b.nombre),
                                )
                                .map((categoria) => (
                                  <Link
                                    key={categoria.id}
                                    to={`/catalogo?categoria=${encodeURIComponent(
                                      categoria.nombre,
                                    )}`}
                                    onClick={cerrarMenu}
                                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-white hover:text-[#c94e14] font-medium transition"
                                  >
                                    <span className="text-gray-300">›</span>
                                    {categoria.nombre}
                                  </Link>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-3">
                        No hay categorías disponibles.
                      </p>
                    )}
                  </div>
                </div>

                {/* REPUESTOS */}

                <Link
                  to="/repuestos"
                  onClick={cerrarMenu}
                  className="flex items-center justify-between px-5 py-4 rounded-xl font-bold text-gray-800 hover:bg-orange-50 hover:text-[#c94e14] transition"
                >
                  <span>Repuestos</span>
                  <span className="text-gray-300">›</span>
                </Link>

                {/* CONTACTO */}

                <Link
                  to="/contacto"
                  onClick={cerrarMenu}
                  className="flex items-center justify-between px-5 py-4 rounded-xl font-bold text-gray-800 hover:bg-orange-50 hover:text-[#c94e14] transition"
                >
                  <span>Contacto</span>
                  <span className="text-gray-300">›</span>
                </Link>
              </nav>

              {/* SEPARADOR */}

              <div className="h-px bg-gray-100 mx-5"></div>

              {/* ACCIONES */}

              <div className="p-4 grid sm:grid-cols-2 gap-3">
                <a
                  href="https://wa.me/51979501557"
                  target="_blank"
                  rel="noreferrer"
                  onClick={cerrarMenu}
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 py-4 rounded-xl font-black transition"
                >
                  WhatsApp
                </a>

                <a
                  href="https://wa.me/51979501557?text=Hola,%20deseo%20una%20cotización"
                  target="_blank"
                  rel="noreferrer"
                  onClick={cerrarMenu}
                  className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-4 rounded-xl font-black transition"
                >
                  Cotizar Ahora
                </a>
              </div>

              {/* INFORMACIÓN */}

              <div className="bg-gray-50 px-5 py-4 text-center">
                <p className="text-xs text-gray-500">
                  Maquinaria • Repuestos • Servicio Técnico
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Encabezado;
