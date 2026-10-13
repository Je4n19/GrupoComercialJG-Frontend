import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { obtenerRepuestos } from "../Services/repuestoService";
import { obtenerCategoriasRepuesto } from "../Services/categoriaRepuestoService";

import Footer from "../Components/Footer";
import imagenRepuestos from "../assets/repuesto.png";

// ========================================
// FUNCIONES AUXILIARES
// ========================================

const normalizar = (valor) =>
  String(valor ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/([a-z])(\d)/g, "$1 $2")
    .replace(/(\d)([a-z])/g, "$1 $2")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const compactar = (valor) => normalizar(valor).replace(/\s+/g, "");

const obtenerNombreCategoria = (categoria) => {
  if (typeof categoria === "string") return categoria;
  return categoria?.nombre || "";
};

const formatearPrecio = (precio) => {
  if (precio === null || precio === undefined || precio === "") {
    return "Consultar precio";
  }

  const numero = Number(precio);

  if (!Number.isFinite(numero)) {
    return "Consultar precio";
  }

  return `S/ ${numero.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const enlaceWhatsApp = (mensaje) =>
  `https://wa.me/51979501557?text=${encodeURIComponent(mensaje)}`;

// ========================================
// ICONOS
// ========================================

function IconoRepuesto({ tipo, className = "w-5 h-5" }) {
  const iconos = {
    flecha: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3a8.5 8.5 0 0 1 8.5 8.5Z" />
        <path d="M8 11.5h9M8 15h6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    camion: (
      <>
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 4v3h-7" />
        <circle cx="7.5" cy="18" r="2" />
        <circle cx="17.5" cy="18" r="2" />
      </>
    ),
    herramienta: (
      <path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 17.6 6.4 21l5.3-5.3a5 5 0 0 0 6.4-6.4L15 12l-3-3 2.7-2.7Z" />
    ),
    buscar: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    caja: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="M3 7v10l9 5 9-5V7M12 12v10" />
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

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

function Repuestos() {
  const [searchParams, setSearchParams] = useSearchParams();

  const busquedaURL = searchParams.get("buscar") || "";
  const repuestoDestacado = searchParams.get("destacado");

  const [repuestos, setRepuestos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // CARGAR REPUESTOS Y CATEGORÍAS
  // ========================================

  useEffect(() => {
    let activo = true;

    const cargarDatos = async () => {
      setCargando(true);
      setError("");

      try {
        const [repuestosData, categoriasData] = await Promise.all([
          obtenerRepuestos(),
          obtenerCategoriasRepuesto(),
        ]);

        if (!activo) return;

        setRepuestos(Array.isArray(repuestosData) ? repuestosData : []);

        setCategorias(Array.isArray(categoriasData) ? categoriasData : []);
      } catch (err) {
        console.error("Error cargando repuestos:", err);

        if (activo) {
          setError("No se pudieron cargar los repuestos. Intenta nuevamente.");
        }
      } finally {
        if (activo) setCargando(false);
      }
    };

    cargarDatos();

    return () => {
      activo = false;
    };
  }, []);

  // ========================================
  // BÚSQUEDA DESDE EL ENCABEZADO
  // ========================================

  const palabras = useMemo(
    () => normalizar(busquedaURL).split(/\s+/).filter(Boolean),
    [busquedaURL],
  );

  const repuestosVisibles = useMemo(() => {
    return repuestos
      .filter((repuesto) => {
        const categoria = obtenerNombreCategoria(repuesto.categoria);

        const textoRepuesto = [
          repuesto.nombre,
          repuesto.marca,
          repuesto.modelo,
          categoria,
          repuesto.descripcion,
          repuesto.codigo,
        ]
          .filter(Boolean)
          .join(" ");

        const texto = normalizar(textoRepuesto);
        const compacto = compactar(textoRepuesto);

        return palabras.every((palabra) => {
          const token = compactar(palabra);

          return texto.includes(palabra) || compacto.includes(token);
        });
      })
      .sort((a, b) => {
        if (repuestoDestacado) {
          if (String(a.id) === repuestoDestacado) return -1;
          if (String(b.id) === repuestoDestacado) return 1;
        }

        return String(a.nombre ?? "").localeCompare(
          String(b.nombre ?? ""),
          "es",
        );
      });
  }, [repuestos, palabras, repuestoDestacado]);

  const quitarBusqueda = () => {
    const parametros = new URLSearchParams(searchParams);

    parametros.delete("buscar");
    parametros.delete("destacado");

    setSearchParams(parametros);
  };

  const verTodos = () => setSearchParams({});

  // Desplazamiento automático hacia resultados
  useEffect(() => {
    if (!busquedaURL || cargando) return;

    document.getElementById("repuestos-disponibles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [busquedaURL, repuestoDestacado, cargando]);

  return (
    <>
      <main className="bg-white min-h-screen overflow-x-hidden">
        {/* ======================================== */}
        {/* HERO */}
        {/* ======================================== */}

        <section className="relative min-h-[470px] sm:min-h-[540px] flex items-center text-white overflow-hidden">
          <img
            src={imagenRepuestos}
            alt="Repuestos para maquinaria agrícola, forestal e industrial"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#07170F]/95 via-[#07170F]/75 to-[#07170F]/25" />

          <div className="pointer-events-none absolute -left-24 -bottom-32 w-96 h-96 bg-[#009E49]/20 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full py-20">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 bg-[#009E49]/20 border border-[#75E4A4]/40 text-[#B6F5D0] px-4 py-2 rounded-full font-black text-xs sm:text-sm">
                <span className="w-2 h-2 bg-[#FF6600] rounded-full" />
                Grupo Comercial J&G
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mt-7 leading-tight tracking-tight">
                Repuestos para
                <span className="block text-[#75E4A4]">tu maquinaria</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-200 mt-6 max-w-xl leading-relaxed">
                Encuentra repuestos para maquinaria agrícola, forestal e
                industrial. Consulta disponibilidad, compatibilidad y precios
                con nuestro equipo.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8">
                <a
                  href="#repuestos-disponibles"
                  className="inline-flex items-center justify-center gap-3 bg-[#FF6600] hover:bg-[#E65C00] text-white px-7 py-4 rounded-xl font-black text-sm shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Ver Repuestos
                  <IconoRepuesto tipo="flecha" />
                </a>

                <a
                  href={enlaceWhatsApp(
                    "Hola, deseo consultar por un repuesto.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white px-7 py-4 rounded-xl font-black text-sm transition-all duration-300"
                >
                  <IconoRepuesto tipo="whatsapp" />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================== */}
        {/* ESTADÍSTICAS */}
        {/* ======================================== */}

        <section className="relative z-20 -mt-9 sm:-mt-11 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {[
              {
                valor: cargando ? "..." : repuestos.length,
                titulo: "Repuestos",
                icono: "caja",
              },
              {
                valor: cargando ? "..." : categorias.length,
                titulo: "Categorías",
                icono: "herramienta",
              },
              {
                valor: "J&G",
                titulo: "Asesoría personalizada",
                icono: "check",
              },
              {
                valor: "Perú",
                titulo: "Cobertura nacional",
                icono: "camion",
              },
            ].map((item) => (
              <div
                key={item.titulo}
                className="group bg-white rounded-[22px] sm:rounded-[26px] shadow-lg border border-gray-100 p-4 sm:p-6 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 mx-auto bg-[#E8F7EE] text-[#009E49] rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#009E49] group-hover:text-white transition-colors duration-300">
                  <IconoRepuesto tipo={item.icono} className="w-6 h-6" />
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#009E49]">
                  {item.valor}
                </h3>

                <p className="text-gray-500 text-xs sm:text-sm mt-2 font-semibold">
                  {item.titulo}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================== */}
        {/* LISTADO DE REPUESTOS */}
        {/* ======================================== */}

        <section
          id="repuestos-disponibles"
          className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-20 pb-20 scroll-mt-28"
        >
          {/* ENCABEZADO */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-5 mb-10">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-[3px] bg-[#FF6600] rounded-full" />

                <span className="text-[#009E49] font-black uppercase tracking-[0.16em] text-xs sm:text-sm">
                  Nuestro Catálogo
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] mt-4 leading-tight">
                {busquedaURL ? (
                  "Resultados de búsqueda"
                ) : (
                  <>
                    Repuestos
                    <span className="text-[#009E49]"> Disponibles</span>
                  </>
                )}
              </h2>

              {busquedaURL ? (
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <p className="text-gray-500 text-sm sm:text-base">
                    Buscando:{" "}
                    <strong className="text-[#009E49]">{busquedaURL}</strong>
                  </p>

                  <button
                    type="button"
                    onClick={quitarBusqueda}
                    className="text-sm font-black text-[#FF6600] hover:text-[#E65C00] transition-colors"
                  >
                    Quitar búsqueda ×
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 mt-4 max-w-xl leading-relaxed">
                  Explora nuestros repuestos y consulta con nosotros para
                  encontrar la pieza adecuada.
                </p>
              )}
            </div>

            <span className="self-start sm:self-auto bg-[#E8F7EE] text-[#009E49] px-5 py-3 rounded-full font-black text-sm whitespace-nowrap">
              {cargando
                ? "Cargando..."
                : `${repuestosVisibles.length} resultados`}
            </span>
          </div>

          {/* ======================================== */}
          {/* ESTADO DE CARGA */}
          {/* ======================================== */}

          {cargando ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#DCEFE4] border-t-[#009E49] rounded-full animate-spin" />

              <p className="text-gray-500 font-semibold mt-5">
                Cargando repuestos...
              </p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-black">
                No pudimos cargar los repuestos
              </h3>

              <p className="mt-3 text-sm">{error}</p>
            </div>
          ) : repuestosVisibles.length === 0 ? (
            /* SIN RESULTADOS */
            <div className="bg-[#F7FAF8] rounded-[28px] border border-[#DCEFE4] p-8 sm:p-12 text-center">
              <div className="w-20 h-20 mx-auto bg-[#E8F7EE] text-[#009E49] rounded-3xl flex items-center justify-center">
                <IconoRepuesto tipo="buscar" className="w-10 h-10" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mt-6">
                No encontramos repuestos
              </h3>

              <p className="text-gray-500 mt-4 max-w-lg mx-auto leading-relaxed">
                {busquedaURL
                  ? "No hay repuestos que coincidan con tu búsqueda. Prueba con otro nombre, marca o modelo."
                  : "Todavía no hay repuestos registrados en el catálogo."}
              </p>

              {busquedaURL && (
                <button
                  type="button"
                  onClick={verTodos}
                  className="inline-flex items-center justify-center gap-2 mt-7 bg-[#009E49] hover:bg-[#00843D] text-white px-7 py-4 rounded-xl font-black transition-colors"
                >
                  Ver todos los repuestos
                  <IconoRepuesto tipo="flecha" />
                </button>
              )}
            </div>
          ) : (
            /* ======================================== */
            /* TARJETAS DE REPUESTOS */
            /* ======================================== */

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {repuestosVisibles.map((repuesto) => {
                const destacado = repuestoDestacado === String(repuesto.id);

                const categoria =
                  obtenerNombreCategoria(repuesto.categoria) || "Repuesto";

                const stockNumero = Number(repuesto.stock);

                const stockRegistrado =
                  repuesto.stock !== null &&
                  repuesto.stock !== undefined &&
                  repuesto.stock !== "" &&
                  Number.isFinite(stockNumero);

                const disponible = stockRegistrado && stockNumero > 0;

                return (
                  <article
                    key={repuesto.id}
                    id={`repuesto-${repuesto.id}`}
                    className={`group flex flex-col bg-white rounded-[26px] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 ${
                      destacado ? "ring-4 ring-[#FF6600] ring-offset-4" : ""
                    }`}
                  >
                    {/* IMAGEN */}
                    <div className="relative h-64 bg-[#F8FAF9] p-6 overflow-hidden">
                      {repuesto.imagen ? (
                        <img
                          src={repuesto.imagen}
                          alt={repuesto.nombre}
                          loading="lazy"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                          <IconoRepuesto
                            tipo="herramienta"
                            className="w-12 h-12"
                          />
                          <span className="text-xs font-semibold">
                            Imagen no disponible
                          </span>
                        </div>
                      )}

                      {/* ETIQUETA DESTACADO */}
                      {destacado && (
                        <span className="absolute top-4 left-4 bg-[#FF6600] text-white text-xs font-black px-3 py-2 rounded-full shadow-md">
                          Destacado
                        </span>
                      )}

                      {/* STOCK */}
                      <span
                        className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-black shadow-sm ${
                          !stockRegistrado
                            ? "bg-white text-gray-600"
                            : disponible
                              ? "bg-[#E8F7EE] text-[#00843D]"
                              : "bg-red-50 text-red-600"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            !stockRegistrado
                              ? "bg-gray-400"
                              : disponible
                                ? "bg-[#009E49]"
                                : "bg-red-500"
                          }`}
                        />

                        {!stockRegistrado
                          ? "Consultar"
                          : disponible
                            ? "Disponible"
                            : "Sin stock"}
                      </span>
                    </div>

                    {/* INFORMACIÓN */}
                    <div className="flex flex-col flex-1 p-6 sm:p-7">
                      {/* CATEGORÍA */}
                      <span className="self-start bg-[#E8F7EE] text-[#009E49] px-4 py-2 rounded-full text-xs font-black">
                        {categoria}
                      </span>

                      {/* NOMBRE */}
                      <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A] mt-5 leading-snug">
                        {repuesto.nombre}
                      </h3>

                      {/* MARCA */}
                      {repuesto.marca && (
                        <p className="text-sm text-gray-500 mt-3">
                          Marca:{" "}
                          <span className="font-bold text-[#1A1A1A]">
                            {repuesto.marca}
                          </span>
                        </p>
                      )}

                      {/* MODELO */}
                      {repuesto.modelo && (
                        <p className="text-sm text-gray-500 mt-2">
                          Modelo:{" "}
                          <span className="font-bold text-[#1A1A1A]">
                            {repuesto.modelo}
                          </span>
                        </p>
                      )}

                      {/* DESCRIPCIÓN */}
                      <p className="text-gray-600 text-sm leading-relaxed mt-4 line-clamp-3 min-h-[60px]">
                        {repuesto.descripcion ||
                          "Consulta las características y compatibilidad de este repuesto."}
                      </p>

                      {/* PRECIO */}
                      <div className="mt-auto pt-6">
                        <div className="border-t border-gray-100 pt-5">
                          <p className="text-xs text-gray-500 font-semibold">
                            Precio de venta
                          </p>

                          <p className="text-3xl font-black text-[#FF6600] mt-2 tracking-tight">
                            {formatearPrecio(repuesto.precio)}
                          </p>

                          <p className="text-xs sm:text-sm text-gray-500 mt-3">
                            {stockRegistrado
                              ? disponible
                                ? `Stock disponible: ${repuesto.stock}`
                                : "Consultar disponibilidad"
                              : "Stock por confirmar"}
                          </p>
                        </div>

                        {/* BOTÓN WHATSAPP */}
                        <a
                          href={enlaceWhatsApp(
                            `Hola, deseo información sobre el repuesto ${repuesto.nombre}${
                              repuesto.marca
                                ? ` de la marca ${repuesto.marca}`
                                : ""
                            }. Quisiera consultar su disponibilidad y precio.`,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-3 text-center mt-6 bg-[#009E49] hover:bg-[#00843D] text-white py-4 px-4 rounded-xl font-black text-sm transition-all duration-300"
                        >
                          <IconoRepuesto tipo="whatsapp" className="w-5 h-5" />
                          Consultar Disponibilidad
                          <IconoRepuesto tipo="flecha" className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ======================================== */}
        {/* ASESORÍA FINAL */}
        {/* ======================================== */}

        <section className="relative bg-[#073D27] text-white py-16 sm:py-20 overflow-hidden">
          <div className="pointer-events-none absolute -right-32 -bottom-32 w-96 h-96 bg-[#009E49]/20 blur-3xl rounded-full" />

          <div className="relative max-w-5xl mx-auto text-center px-5 sm:px-6">
            <div className="w-16 h-16 mx-auto bg-white/10 border border-white/15 text-[#75E4A4] rounded-2xl flex items-center justify-center mb-6">
              <IconoRepuesto tipo="herramienta" className="w-8 h-8" />
            </div>

            <span className="text-[#FFB17A] font-black uppercase tracking-[0.16em] text-xs sm:text-sm">
              Asesoría Personalizada
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-5 leading-tight">
              ¿No encuentras
              <span className="block text-[#75E4A4]">el repuesto?</span>
            </h2>

            <p className="text-green-50/80 text-base sm:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              Nuestro equipo puede ayudarte a identificar el repuesto adecuado
              para tu maquinaria. Escríbenos con la marca y el modelo de tu
              equipo.
            </p>

            <a
              href={enlaceWhatsApp(
                "Hola, estoy buscando un repuesto para mi maquinaria. Necesito asesoría para encontrar el adecuado.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 mt-9 bg-[#FF6600] hover:bg-[#E65C00] text-white px-8 py-4 rounded-xl font-black shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <IconoRepuesto tipo="whatsapp" className="w-6 h-6" />
              Solicitar Repuesto
              <IconoRepuesto tipo="flecha" className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Repuestos;
