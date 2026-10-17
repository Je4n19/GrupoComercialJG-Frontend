import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { obtenerRepuestos } from "../Services/repuestoService";
import { obtenerCategoriasRepuesto } from "../Services/categoriaRepuestoService";

import Footer from "../Components/Footer";
import imagenRepuestos from "../assets/repuesto.png";

// ========================================
// CONFIGURACIÓN
// ========================================

const CLAVE_CARRITO = "jg_carrito";
const WHATSAPP = "51979501557";
const INTERVALO_STOCK = 15000;

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

const formatearPrecio = (valor) => {
  if (valor === null || valor === undefined || valor === "") {
    return "Consultar precio";
  }

  const numero = Number(valor);

  if (!Number.isFinite(numero) || numero < 0) {
    return "Consultar precio";
  }

  return `S/ ${numero.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const enlaceWhatsApp = (mensaje) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

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
    carrito: (
      <>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.5 13h12.7l2-9H6" />
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
// TARJETA DE REPUESTO
// ========================================

function TarjetaRepuesto({ repuesto, destacado }) {
  const [agregado, setAgregado] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const categoria = obtenerNombreCategoria(repuesto.categoria) || "Repuesto";

  const stockNumero = Number(repuesto.stock);

  const stockRegistrado =
    repuesto.stock !== null &&
    repuesto.stock !== undefined &&
    repuesto.stock !== "" &&
    Number.isFinite(stockNumero) &&
    stockNumero >= 0;

  const disponible = stockRegistrado && stockNumero > 0;

  const precioNumero = Number(repuesto.precio);

  const precioValido =
    repuesto.precio !== null &&
    repuesto.precio !== undefined &&
    repuesto.precio !== "" &&
    Number.isFinite(precioNumero) &&
    precioNumero >= 0;

  // ========================================
  // AGREGAR AL CARRITO
  // ========================================

  const agregarAlCarrito = () => {
    if (repuesto.id === null || repuesto.id === undefined) {
      setMensaje("No se pudo identificar el repuesto.");
      return;
    }

    if (!disponible) {
      setAgregado(false);
      setMensaje("Disponibilidad por consultar.");
      return;
    }

    try {
      const guardado = localStorage.getItem(CLAVE_CARRITO);
      const datos = guardado ? JSON.parse(guardado) : [];
      const carrito = Array.isArray(datos) ? datos : [];

      const identificador = `repuesto-${repuesto.id}`;

      const indice = carrito.findIndex(
        (item) =>
          String(item.carritoId) === identificador ||
          (item.tipo === "repuesto" && String(item.id) === String(repuesto.id)),
      );

      const nuevoCarrito = [...carrito];

      if (indice >= 0) {
        const existente = nuevoCarrito[indice];

        const cantidadActual = Math.max(
          0,
          Math.floor(Number(existente.cantidad) || 0),
        );

        if (cantidadActual >= stockNumero) {
          setAgregado(false);
          setMensaje("Ya agregaste todas las unidades disponibles.");
          return;
        }

        nuevoCarrito[indice] = {
          ...existente,
          carritoId: identificador,
          tipo: "repuesto",
          cantidad: cantidadActual + 1,
          stock: stockNumero,
          precio: precioValido ? precioNumero : null,
        };
      } else {
        nuevoCarrito.push({
          carritoId: identificador,
          id: repuesto.id,
          tipo: "repuesto",
          nombre: repuesto.nombre,
          marca: repuesto.marca || "",
          modelo: repuesto.modelo || "",
          categoria,
          descripcion: repuesto.descripcion || "",
          imagen: repuesto.imagen || "",
          precio: precioValido ? precioNumero : null,
          stock: stockNumero,
          cantidad: 1,
        });
      }

      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(nuevoCarrito));

      window.dispatchEvent(new Event("jg-carrito-actualizado"));

      setAgregado(true);
      setMensaje("¡Repuesto agregado al carrito!");
    } catch (error) {
      console.error("Error agregando repuesto:", error);
      setAgregado(false);
      setMensaje("No se pudo agregar el repuesto.");
    }
  };

  return (
    <article
      id={`repuesto-${repuesto.id}`}
      className={`
        group flex min-w-0 flex-col overflow-hidden
        rounded-[26px] border border-gray-100 bg-white
        shadow-md transition-all duration-300
        hover:-translate-y-1.5 hover:shadow-xl
        ${destacado ? "ring-4 ring-[#FF6600] ring-offset-4" : ""}
      `}
    >
      {/* IMAGEN */}

      <div className="relative h-64 overflow-hidden bg-[#F8FAF9] p-6">
        {repuesto.imagen ? (
          <img
            src={repuesto.imagen}
            alt={repuesto.nombre}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-gray-400">
            <IconoRepuesto tipo="herramienta" className="h-12 w-12" />
            <span className="text-xs font-semibold">Imagen no disponible</span>
          </div>
        )}

        {destacado && (
          <span className="absolute left-4 top-4 rounded-full bg-[#FF6600] px-3 py-2 text-xs font-black text-white shadow-md">
            Destacado
          </span>
        )}

        {/* STOCK */}

        <span
          className={`
            absolute right-4 top-4 inline-flex items-center
            gap-1.5 rounded-full px-3 py-2
            text-xs font-black shadow-sm
            ${
              !stockRegistrado
                ? "bg-white text-gray-600"
                : disponible
                  ? "bg-[#E8F7EE] text-[#00843D]"
                  : "bg-red-50 text-red-600"
            }
          `}
        >
          <span
            className={`
              h-2 w-2 rounded-full
              ${
                !stockRegistrado
                  ? "bg-gray-400"
                  : disponible
                    ? "bg-[#009E49]"
                    : "bg-red-500"
              }
            `}
          />

          {!stockRegistrado
            ? "Consultar"
            : disponible
              ? "Disponible"
              : "Sin stock"}
        </span>
      </div>

      {/* INFORMACIÓN */}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="self-start rounded-full bg-[#E8F7EE] px-4 py-2 text-xs font-black text-[#009E49]">
          {categoria}
        </span>

        <h3 className="mt-5 break-words text-xl font-black leading-snug text-[#1A1A1A] sm:text-2xl">
          {repuesto.nombre}
        </h3>

        {repuesto.marca && (
          <p className="mt-3 text-sm text-gray-500">
            Marca:{" "}
            <span className="font-bold text-[#1A1A1A]">{repuesto.marca}</span>
          </p>
        )}

        {repuesto.modelo && (
          <p className="mt-2 text-sm text-gray-500">
            Modelo:{" "}
            <span className="font-bold text-[#1A1A1A]">{repuesto.modelo}</span>
          </p>
        )}

        <p className="mt-4 line-clamp-3 min-h-[60px] text-sm leading-relaxed text-gray-600">
          {repuesto.descripcion ||
            "Consulta las características y compatibilidad de este repuesto."}
        </p>

        {/* PRECIO */}

        <div className="mt-auto pt-6">
          <div className="border-t border-gray-100 pt-5">
            <p className="text-xs font-semibold text-gray-500">
              Precio de venta
            </p>

            <p className="mt-2 break-words text-3xl font-black tracking-tight text-[#FF6600]">
              {formatearPrecio(repuesto.precio)}
            </p>

            <p className="mt-3 text-xs text-gray-500 sm:text-sm">
              {stockRegistrado
                ? disponible
                  ? `Stock disponible: ${stockNumero}`
                  : "Sin stock disponible"
                : "Stock por confirmar"}
            </p>
          </div>

          {/* AGREGAR AL CARRITO */}

          <button
            type="button"
            onClick={agregarAlCarrito}
            disabled={!disponible}
            className={`
              mt-6 inline-flex w-full items-center
              justify-center gap-3 rounded-xl px-4 py-4
              text-center text-sm font-black
              transition-all duration-300
              ${
                !disponible
                  ? "cursor-not-allowed bg-gray-200 text-gray-500"
                  : agregado
                    ? "bg-[#063D2A] text-white"
                    : "bg-[#FF6600] text-white hover:bg-[#E65C00]"
              }
            `}
          >
            <IconoRepuesto tipo={agregado ? "check" : "carrito"} />

            {!disponible
              ? stockRegistrado
                ? "Repuesto agotado"
                : "Disponibilidad por consultar"
              : agregado
                ? "¡Agregado al carrito!"
                : "Agregar al carrito"}
          </button>

          {mensaje && (
            <p
              role="status"
              aria-live="polite"
              className={`mt-3 text-center text-xs font-bold ${
                agregado ? "text-[#009E49]" : "text-red-600"
              }`}
            >
              {mensaje}
            </p>
          )}

          {/* VER CARRITO */}

          {agregado && (
            <Link
              to="/carrito"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#009E49] px-4 py-3 text-sm font-black text-[#009E49] transition hover:bg-[#E8F7EE]"
            >
              Ver mi carrito
              <IconoRepuesto tipo="flecha" />
            </Link>
          )}

          {/* WHATSAPP ORIGINAL */}

          <a
            href={enlaceWhatsApp(
              `Hola, deseo información sobre el repuesto ${repuesto.nombre}${
                repuesto.marca ? ` de la marca ${repuesto.marca}` : ""
              }. Quisiera consultar su disponibilidad y precio.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#009E49] px-4 py-4 text-center text-sm font-black text-white transition-all duration-300 hover:bg-[#00843D]"
          >
            <IconoRepuesto tipo="whatsapp" />
            Consultar Disponibilidad
            <IconoRepuesto tipo="flecha" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

// ========================================
// PÁGINA PRINCIPAL DE REPUESTOS
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
  // CARGAR DATOS Y ACTUALIZAR STOCK
  // ========================================

  useEffect(() => {
    let activo = true;
    let consultando = false;

    const actualizarRepuestos = async (cargaInicial = false) => {
      if (consultando) return;

      // No consultar cuando la pestaña esté oculta.
      if (!cargaInicial && document.hidden) return;

      consultando = true;

      try {
        const repuestosData = await obtenerRepuestos();

        if (!activo) return;

        setRepuestos(Array.isArray(repuestosData) ? repuestosData : []);

        setError("");
      } catch (err) {
        console.error("Error actualizando repuestos:", err);

        // Si una actualización falla, mantener los últimos
        // datos disponibles y volver a intentar más tarde.
        if (activo && cargaInicial) {
          setError("No se pudieron cargar los repuestos. Intenta nuevamente.");
        }
      } finally {
        consultando = false;

        if (activo && cargaInicial) {
          setCargando(false);
        }
      }
    };

    const cargarCategorias = async () => {
      try {
        const categoriasData = await obtenerCategoriasRepuesto();

        if (!activo) return;

        setCategorias(Array.isArray(categoriasData) ? categoriasData : []);
      } catch (err) {
        console.error("Error cargando categorías:", err);
      }
    };

    // Primera consulta al abrir la página.
    actualizarRepuestos(true);
    cargarCategorias();

    // Actualizar el inventario cada 15 segundos.
    const intervalo = window.setInterval(() => {
      actualizarRepuestos();
    }, INTERVALO_STOCK);

    // Consultar inmediatamente al regresar a la pestaña.
    const actualizarAlVolver = () => {
      if (!document.hidden) {
        actualizarRepuestos();
      }
    };

    document.addEventListener("visibilitychange", actualizarAlVolver);

    return () => {
      activo = false;

      window.clearInterval(intervalo);

      document.removeEventListener("visibilitychange", actualizarAlVolver);
    };
  }, []);

  // ========================================
  // BÚSQUEDA FLEXIBLE
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

  // ========================================
  // DESPLAZAMIENTO A RESULTADOS
  // ========================================

  useEffect(() => {
    if (!busquedaURL || cargando) return;

    document.getElementById("repuestos-disponibles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [busquedaURL, repuestoDestacado, cargando]);

  return (
    <>
      <main className="min-h-screen overflow-x-hidden bg-white">
        {/* ========================================
            HERO
        ======================================== */}

        <section className="relative flex min-h-[470px] items-center overflow-hidden text-white sm:min-h-[540px]">
          <img
            src={imagenRepuestos}
            alt="Repuestos para maquinaria agrícola, forestal e industrial"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#07170F]/95 via-[#07170F]/75 to-[#07170F]/25" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#009E49]/20 blur-3xl" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#75E4A4]/40 bg-[#009E49]/20 px-4 py-2 text-xs font-black text-[#B6F5D0] sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
                Grupo Comercial J&G
              </span>

              <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Repuestos para
                <span className="block text-[#75E4A4]">tu maquinaria</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg md:text-xl">
                Encuentra repuestos para maquinaria agrícola, forestal e
                industrial. Consulta disponibilidad, compatibilidad y precios
                con nuestro equipo.
              </p>

              <div className="mt-8 flex flex-col flex-wrap gap-4 sm:flex-row">
                <a
                  href="#repuestos-disponibles"
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#FF6600] px-7 py-4 text-sm font-black text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#E65C00]"
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
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                >
                  <IconoRepuesto tipo="whatsapp" />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            ESTADÍSTICAS
        ======================================== */}

        <section className="relative z-20 mx-auto -mt-9 max-w-7xl px-5 sm:-mt-11 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
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
                className="group rounded-[22px] border border-gray-100 bg-white p-4 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-[26px] sm:p-6"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7EE] text-[#009E49] transition-colors duration-300 group-hover:bg-[#009E49] group-hover:text-white sm:h-12 sm:w-12">
                  <IconoRepuesto tipo={item.icono} className="h-6 w-6" />
                </div>

                <h3 className="text-2xl font-black text-[#009E49] sm:text-3xl lg:text-4xl">
                  {item.valor}
                </h3>

                <p className="mt-2 text-xs font-semibold text-gray-500 sm:text-sm">
                  {item.titulo}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================
            LISTADO DE REPUESTOS
        ======================================== */}

        <section
          id="repuestos-disponibles"
          className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-20 pt-20 sm:px-6 lg:px-8"
        >
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-[3px] w-10 rounded-full bg-[#FF6600]" />

                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#009E49] sm:text-sm">
                  Nuestro Catálogo
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-black leading-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl">
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
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <p className="text-sm text-gray-500 sm:text-base">
                    Buscando:{" "}
                    <strong className="text-[#009E49]">{busquedaURL}</strong>
                  </p>

                  <button
                    type="button"
                    onClick={quitarBusqueda}
                    className="text-sm font-black text-[#FF6600] transition-colors hover:text-[#E65C00]"
                  >
                    Quitar búsqueda ×
                  </button>
                </div>
              ) : (
                <p className="mt-4 max-w-xl leading-relaxed text-gray-500">
                  Explora nuestros repuestos y consulta con nosotros para
                  encontrar la pieza adecuada.
                </p>
              )}
            </div>

            <span className="self-start whitespace-nowrap rounded-full bg-[#E8F7EE] px-5 py-3 text-sm font-black text-[#009E49] sm:self-auto">
              {cargando
                ? "Cargando..."
                : `${repuestosVisibles.length} resultados`}
            </span>
          </div>

          {/* ESTADO DE CARGA */}

          {cargando ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#DCEFE4] border-t-[#009E49]" />

              <p className="mt-5 font-semibold text-gray-500">
                Cargando repuestos...
              </p>
            </div>
          ) : error ? (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700"
            >
              <h3 className="text-xl font-black">
                No pudimos cargar los repuestos
              </h3>

              <p className="mt-3 text-sm">{error}</p>
            </div>
          ) : repuestosVisibles.length === 0 ? (
            <div className="rounded-[28px] border border-[#DCEFE4] bg-[#F7FAF8] p-8 text-center sm:p-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E8F7EE] text-[#009E49]">
                <IconoRepuesto tipo="buscar" className="h-10 w-10" />
              </div>

              <h3 className="mt-6 text-2xl font-black text-[#1A1A1A] sm:text-3xl">
                No encontramos repuestos
              </h3>

              <p className="mx-auto mt-4 max-w-lg leading-relaxed text-gray-500">
                {busquedaURL
                  ? "No hay repuestos que coincidan con tu búsqueda. Prueba con otro nombre, marca o modelo."
                  : "Todavía no hay repuestos registrados en el catálogo."}
              </p>

              {busquedaURL && (
                <button
                  type="button"
                  onClick={verTodos}
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#009E49] px-7 py-4 font-black text-white transition-colors hover:bg-[#00843D]"
                >
                  Ver todos los repuestos
                  <IconoRepuesto tipo="flecha" />
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {repuestosVisibles.map((repuesto) => (
                <TarjetaRepuesto
                  key={repuesto.id}
                  repuesto={repuesto}
                  destacado={repuestoDestacado === String(repuesto.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ========================================
            ASESORÍA PERSONALIZADA
        ======================================== */}

        <section className="relative overflow-hidden bg-[#073D27] py-16 text-white sm:py-20">
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#009E49]/20 blur-3xl" />

          <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#75E4A4]">
              <IconoRepuesto tipo="herramienta" className="h-8 w-8" />
            </div>

            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#FFB17A] sm:text-sm">
              Asesoría Personalizada
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              ¿No encuentras
              <span className="block text-[#75E4A4]">el repuesto?</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-green-50/80 sm:text-lg">
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
              className="mt-9 inline-flex items-center justify-center gap-3 rounded-xl bg-[#FF6600] px-8 py-4 font-black text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#E65C00]"
            >
              <IconoRepuesto tipo="whatsapp" className="h-6 w-6" />
              Solicitar Repuesto
              <IconoRepuesto tipo="flecha" className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Repuestos;
