import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  obtenerProductoPorId,
  obtenerProductos,
} from "../Services/productoService";

import Footer from "../Components/Footer";
import TarjetaProducto from "../Components/TarjetaProducto";

// ========================================
// FUNCIONES AUXILIARES
// ========================================

const nombreCategoria = (categoria) => {
  if (typeof categoria === "string") return categoria;
  return categoria?.nombre || "Sin categoría";
};

const claveCategoria = (categoria) => {
  if (categoria && typeof categoria === "object") {
    if (categoria.id != null) return `id:${categoria.id}`;
    return `nombre:${String(categoria.nombre || "").toLowerCase()}`;
  }

  return `nombre:${String(categoria || "").toLowerCase()}`;
};

const obtenerImagenes = (producto) => [
  ...new Set(
    [producto.imagen, producto.imagen2].filter(
      (imagen) => typeof imagen === "string" && imagen.trim() !== "",
    ),
  ),
];

const obtenerDatosTecnicos = (producto) => {
  let datos = [];

  if (typeof producto.datosTecnicos === "string") {
    datos = producto.datosTecnicos
      .split("\n")
      .map((linea) => {
        const posicion = linea.indexOf(":");
        if (posicion === -1) return null;

        const nombre = linea.slice(0, posicion).trim();
        const valor = linea.slice(posicion + 1).trim();

        return nombre && valor ? [nombre, valor] : null;
      })
      .filter(Boolean);
  } else if (Array.isArray(producto.datosTecnicos)) {
    datos = producto.datosTecnicos
      .map((dato) => [dato.nombre || dato.clave, dato.valor])
      .filter(([nombre, valor]) => nombre && valor != null);
  } else if (
    producto.datosTecnicos &&
    typeof producto.datosTecnicos === "object"
  ) {
    datos = Object.entries(producto.datosTecnicos);
  }

  if (
    producto.marca &&
    !datos.some(([nombre]) => String(nombre).toLowerCase() === "marca")
  ) {
    datos.unshift(["Marca", producto.marca]);
  }

  if (
    producto.modelo &&
    !datos.some(([nombre]) => String(nombre).toLowerCase() === "modelo")
  ) {
    datos.push(["Modelo", producto.modelo]);
  }

  return datos;
};

const whatsapp = (mensaje) =>
  `https://wa.me/51979501557?text=${encodeURIComponent(mensaje)}`;

// ========================================
// ICONOS
// ========================================

function Icono({ tipo, className = "w-5 h-5" }) {
  const iconos = {
    flecha: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    atras: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
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
    documento: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v5h4M9 13h6M9 17h6" />
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

function DetalleProducto() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [imagenActual, setImagenActual] = useState(0);
  const [pestana, setPestana] = useState("descripcion");

  useEffect(() => {
    let activo = true;

    const cargarProducto = async () => {
      setCargando(true);
      setError("");
      setProducto(null);
      setRelacionados([]);
      setImagenActual(0);
      setPestana("descripcion");

      try {
        const data = await obtenerProductoPorId(id);

        if (!activo) return;

        if (!data) {
          setError("No se encontró el producto.");
          return;
        }

        setProducto(data);

        try {
          const todos = await obtenerProductos();

          if (!activo) return;

          const lista = Array.isArray(todos) ? todos : [];

          setRelacionados(
            lista
              .filter(
                (item) =>
                  String(item.id) !== String(data.id) &&
                  claveCategoria(item.categoria) ===
                    claveCategoria(data.categoria),
              )
              .slice(0, 3),
          );
        } catch (err) {
          console.error("Error cargando relacionados:", err);
        }
      } catch (err) {
        console.error("Error cargando producto:", err);

        if (activo) {
          setError("No se pudo cargar el producto.");
        }
      } finally {
        if (activo) setCargando(false);
      }
    };

    cargarProducto();

    return () => {
      activo = false;
    };
  }, [id]);

  // ========================================
  // ESTADO DE CARGA
  // ========================================

  if (cargando) {
    return (
      <>
        <main className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F7FAF8] px-5">
          <div className="w-14 h-14 border-4 border-[#DCEFE4] border-t-[#009E49] rounded-full animate-spin" />

          <h2 className="text-xl font-black text-[#1A1A1A] mt-6">
            Cargando producto...
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Estamos preparando la información.
          </p>
        </main>
        <Footer />
      </>
    );
  }

  // ========================================
  // ESTADO DE ERROR
  // ========================================

  if (error || !producto) {
    return (
      <>
        <main className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F7FAF8] px-5 text-center">
          <div className="w-20 h-20 bg-[#E8F7EE] text-[#009E49] rounded-3xl flex items-center justify-center text-4xl">
            !
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mt-6">
            Producto no disponible
          </h2>

          <p className="text-gray-500 mt-3">
            {error || "No se encontró el producto solicitado."}
          </p>

          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 mt-7 bg-[#009E49] hover:bg-[#00843D] text-white px-7 py-4 rounded-xl font-black transition-colors"
          >
            <Icono tipo="atras" />
            Volver al catálogo
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // ========================================
  // INFORMACIÓN DEL PRODUCTO
  // ========================================

  const imagenes = obtenerImagenes(producto);
  const datosTecnicos = obtenerDatosTecnicos(producto);

  const descargables = Array.isArray(producto.descargables)
    ? producto.descargables.filter(
        (archivo) => archivo && (typeof archivo === "string" || archivo.url),
      )
    : [];

  const categoria = nombreCategoria(producto.categoria);

  const precioNumero = Number(producto.precio);

  const tienePrecio =
    producto.precio !== null &&
    producto.precio !== undefined &&
    producto.precio !== "" &&
    Number.isFinite(precioNumero);

  const precioFormateado = tienePrecio
    ? `S/ ${precioNumero.toLocaleString("es-PE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "Consultar precio";

  const stockNumero = Number(producto.stock);

  const tieneStock =
    producto.stock !== null &&
    producto.stock !== undefined &&
    producto.stock !== "" &&
    Number.isFinite(stockNumero);

  const disponible = tieneStock && stockNumero > 0;

  const siguienteImagen = () => {
    if (imagenes.length < 2) return;

    setImagenActual((actual) => (actual + 1) % imagenes.length);
  };

  const anteriorImagen = () => {
    if (imagenes.length < 2) return;

    setImagenActual(
      (actual) => (actual - 1 + imagenes.length) % imagenes.length,
    );
  };

  const pestanas = [
    { id: "descripcion", nombre: "Descripción" },
    { id: "tecnicos", nombre: "Datos Técnicos" },
    { id: "descargables", nombre: "Descargables" },
  ];

  return (
    <>
      <main className="bg-white min-h-screen">
        {/* ======================================== */}
        {/* NAVEGACIÓN SUPERIOR */}
        {/* ======================================== */}

        <div className="bg-[#F7FAF8] border-b border-[#E1EEE6]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-5">
            <nav
              aria-label="Ruta de navegación"
              className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500"
            >
              <Link to="/" className="hover:text-[#009E49] transition-colors">
                Inicio
              </Link>

              <span>/</span>

              <Link
                to="/catalogo"
                className="hover:text-[#009E49] transition-colors"
              >
                Catálogo
              </Link>

              <span>/</span>

              <span className="text-[#009E49] font-bold">{categoria}</span>
            </nav>

            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-sm text-[#009E49] hover:text-[#FF6600] font-black mt-4 transition-colors"
            >
              <Icono tipo="atras" className="w-4 h-4" />
              Volver al catálogo
            </Link>
          </div>
        </div>

        {/* ======================================== */}
        {/* INFORMACIÓN PRINCIPAL */}
        {/* ======================================== */}

        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 lg:gap-14 items-start">
            {/* ======================================== */}
            {/* GALERÍA DE IMÁGENES */}
            {/* ======================================== */}

            <div className="min-w-0">
              <div className="border border-gray-100 rounded-[28px] bg-[#F8FAF9] overflow-hidden shadow-sm">
                <div className="relative h-[310px] sm:h-[420px] lg:h-[490px] flex items-center justify-center p-6 sm:p-8">
                  {/* ETIQUETA DE CATEGORÍA */}
                  <div className="absolute top-5 left-5 z-10 max-w-[75%]">
                    <span className="inline-block bg-[#009E49] text-white px-4 py-2 rounded-full text-xs font-black shadow-md truncate max-w-full">
                      {categoria}
                    </span>
                  </div>

                  {imagenes.length > 0 ? (
                    <img
                      src={imagenes[imagenActual]}
                      alt={`${producto.nombre} - fotografía ${
                        imagenActual + 1
                      }`}
                      className="w-full h-full object-contain object-center"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <div className="text-5xl mb-4">📷</div>
                      <p className="text-sm font-semibold">
                        Imagen no disponible
                      </p>
                    </div>
                  )}

                  {/* FLECHAS */}
                  {imagenes.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={anteriorImagen}
                        aria-label="Fotografía anterior"
                        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-white border border-gray-100 shadow-lg w-11 h-11 rounded-full flex items-center justify-center text-3xl text-[#009E49] hover:bg-[#009E49] hover:text-white transition-all duration-300"
                      >
                        ‹
                      </button>

                      <button
                        type="button"
                        onClick={siguienteImagen}
                        aria-label="Fotografía siguiente"
                        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-white border border-gray-100 shadow-lg w-11 h-11 rounded-full flex items-center justify-center text-3xl text-[#009E49] hover:bg-[#009E49] hover:text-white transition-all duration-300"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* MINIATURAS */}
                {imagenes.length > 1 && (
                  <div className="flex justify-center flex-wrap gap-3 border-t border-gray-100 bg-white px-4 py-5">
                    {imagenes.map((imagen, index) => (
                      <button
                        type="button"
                        key={imagen}
                        onClick={() => setImagenActual(index)}
                        aria-label={`Ver fotografía ${index + 1}`}
                        aria-pressed={imagenActual === index}
                        className={`w-[76px] h-[76px] p-2 border-2 rounded-xl transition-all duration-300 ${
                          imagenActual === index
                            ? "border-[#009E49] bg-[#E8F7EE]"
                            : "border-gray-200 hover:border-[#009E49]/50"
                        }`}
                      >
                        <img
                          src={imagen}
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {imagenes.length > 1 && (
                <p className="text-center text-xs text-gray-500 mt-4">
                  Fotografía {imagenActual + 1} de {imagenes.length}
                </p>
              )}

              {/* MENSAJE DE CONFIANZA */}
              <div className="mt-6 bg-[#E8F7EE] border border-[#D5EEDF] rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-[#009E49] text-white flex items-center justify-center">
                    <Icono tipo="check" />
                  </div>

                  <div>
                    <h3 className="font-black text-[#073D27] text-sm">
                      Grupo Comercial J&G
                    </h3>
                    <p className="text-[#397453] text-xs sm:text-sm mt-1">
                      Maquinaria, repuestos y atención especializada.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================== */}
            {/* INFORMACIÓN DEL PRODUCTO */}
            {/* ======================================== */}

            <div className="min-w-0">
              {/* MARCA Y MODELO */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {producto.marca && (
                  <span className="bg-[#E8F7EE] text-[#00843D] border border-[#D4EBDD] text-xs font-black px-4 py-2 rounded-full uppercase tracking-wide">
                    {producto.marca}
                  </span>
                )}

                {producto.modelo && (
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-4 py-2 rounded-full">
                    {producto.modelo}
                  </span>
                )}
              </div>

              {/* NOMBRE */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1A1A1A] leading-tight tracking-tight">
                {producto.nombre}
              </h1>

              <div className="flex items-center gap-3 mt-4">
                <span className="w-9 h-[3px] bg-[#FF6600] rounded-full" />
                <p className="text-[#009E49] text-sm font-bold">{categoria}</p>
              </div>

              {/* PRECIO Y STOCK */}
              <div className="mt-8 pb-7 border-b border-gray-200">
                <p className="text-sm text-gray-500 font-medium">
                  Precio de venta
                </p>

                <p className="text-4xl sm:text-5xl font-black text-[#FF6600] mt-2 tracking-tight break-words">
                  {precioFormateado}
                </p>

                <div className="mt-5">
                  <span
                    className={`inline-flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-full ${
                      !tieneStock
                        ? "bg-gray-100 text-gray-600"
                        : disponible
                          ? "bg-[#E8F7EE] text-[#00843D]"
                          : "bg-red-50 text-red-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        !tieneStock
                          ? "bg-gray-400"
                          : disponible
                            ? "bg-[#009E49]"
                            : "bg-red-500"
                      }`}
                    />

                    {!tieneStock
                      ? "Consultar disponibilidad"
                      : disponible
                        ? `Stock disponible: ${producto.stock}`
                        : "Consultar disponibilidad"}
                  </span>
                </div>
              </div>

              {/* INFORMACIÓN BÁSICA */}
              <div className="mt-7">
                <h2 className="text-lg font-black text-[#1A1A1A] mb-5">
                  Información del producto
                </h2>

                <div className="space-y-4 text-sm">
                  {producto.marca && (
                    <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                      <span className="text-gray-500">Marca</span>
                      <span className="text-[#1A1A1A] font-bold text-right">
                        {producto.marca}
                      </span>
                    </div>
                  )}

                  {producto.modelo && (
                    <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                      <span className="text-gray-500">Modelo</span>
                      <span className="text-[#1A1A1A] font-bold text-right">
                        {producto.modelo}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                    <span className="text-gray-500">Categoría</span>
                    <span className="text-[#1A1A1A] font-bold text-right">
                      {categoria}
                    </span>
                  </div>
                </div>
              </div>

              {/* ======================================== */}
              {/* COTIZACIÓN */}
              {/* ======================================== */}

              <div className="mt-8 bg-[#F7FAF8] border border-[#DCEFE4] rounded-[24px] p-6">
                <h2 className="text-xl font-black text-[#1A1A1A]">
                  ¿Te interesa este producto?
                </h2>

                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  Contáctanos para consultar disponibilidad, características y
                  opciones de envío.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
                  <a
                    href={whatsapp(
                      `Hola, deseo cotizar el producto ${producto.nombre}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#FF6600] hover:bg-[#E65C00] text-white text-sm font-black px-6 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Solicitar Cotización
                    <Icono tipo="flecha" />
                  </a>

                  <a
                    href={whatsapp(
                      `Hola, deseo más información sobre ${producto.nombre}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#009E49] hover:bg-[#00843D] text-white text-sm font-black px-6 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icono tipo="whatsapp" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* BENEFICIOS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                <div className="flex items-start gap-3 border border-[#DCEFE4] bg-[#F7FAF8] rounded-2xl p-4">
                  <div className="w-10 h-10 shrink-0 bg-[#E8F7EE] text-[#009E49] rounded-xl flex items-center justify-center">
                    <Icono tipo="camion" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-[#1A1A1A]">
                      Envíos nacionales
                    </p>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      Consultas de envío a todo el Perú.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border border-[#DCEFE4] bg-[#F7FAF8] rounded-2xl p-4">
                  <div className="w-10 h-10 shrink-0 bg-[#E8F7EE] text-[#009E49] rounded-xl flex items-center justify-center">
                    <Icono tipo="check" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-[#1A1A1A]">
                      Atención especializada
                    </p>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      Te ayudamos a elegir el equipo adecuado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================== */}
          {/* PESTAÑAS DE INFORMACIÓN */}
          {/* ======================================== */}

          <div className="mt-14 border border-gray-100 rounded-[26px] overflow-hidden bg-white shadow-sm">
            {/* CABECERA */}
            <div
              role="tablist"
              aria-label="Información del producto"
              className="flex overflow-x-auto border-b border-gray-100 bg-[#F7FAF8]"
            >
              {pestanas.map((tab) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={pestana === tab.id}
                  key={tab.id}
                  onClick={() => setPestana(tab.id)}
                  className={`px-5 sm:px-8 py-5 text-sm font-black whitespace-nowrap border-b-[3px] transition-colors duration-300 ${
                    pestana === tab.id
                      ? "bg-white border-[#009E49] text-[#009E49]"
                      : "border-transparent text-gray-500 hover:text-[#009E49]"
                  }`}
                >
                  {tab.nombre}
                </button>
              ))}
            </div>

            {/* CONTENIDO */}
            <div className="p-6 sm:p-8 lg:p-10 min-h-[180px]">
              {/* DESCRIPCIÓN */}
              {pestana === "descripcion" && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A] mb-6">
                    Descripción del producto
                  </h2>

                  <p className="text-sm sm:text-base text-gray-600 leading-8 whitespace-pre-wrap break-words">
                    {producto.descripcion ||
                      "No se ha registrado una descripción para este producto."}
                  </p>
                </div>
              )}

              {/* DATOS TÉCNICOS */}
              {pestana === "tecnicos" && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A] mb-6">
                    Especificaciones técnicas
                  </h2>

                  {datosTecnicos.length > 0 ? (
                    <div className="border border-gray-100 rounded-2xl overflow-hidden">
                      {datosTecnicos.map(([nombre, valor], index) => (
                        <div
                          key={`${nombre}-${index}`}
                          className={`grid grid-cols-2 text-sm ${
                            index % 2 === 0 ? "bg-[#F7FAF8]" : "bg-white"
                          }`}
                        >
                          <div className="px-4 sm:px-6 py-4 font-bold text-[#1A1A1A] border-r border-b border-gray-100 break-words">
                            {nombre}
                          </div>

                          <div className="px-4 sm:px-6 py-4 text-gray-600 border-b border-gray-100 break-words">
                            {String(valor)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      Todavía no se han registrado especificaciones técnicas
                      para este producto.
                    </p>
                  )}
                </div>
              )}

              {/* DESCARGABLES */}
              {pestana === "descargables" && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A] mb-6">
                    Manuales y fichas técnicas
                  </h2>

                  {descargables.length > 0 ? (
                    <div className="space-y-3">
                      {descargables.map((archivo, index) => {
                        const url =
                          typeof archivo === "string" ? archivo : archivo.url;

                        const nombre =
                          typeof archivo === "string"
                            ? `Documento ${index + 1}`
                            : archivo.nombre || `Documento ${index + 1}`;

                        return (
                          <a
                            key={`${url}-${index}`}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 border border-gray-200 rounded-xl p-4 sm:p-5 hover:bg-[#E8F7EE] hover:border-[#009E49]/30 transition-all duration-300"
                          >
                            <div className="w-11 h-11 shrink-0 bg-[#E8F7EE] text-[#009E49] rounded-xl flex items-center justify-center">
                              <Icono tipo="documento" className="w-6 h-6" />
                            </div>

                            <span className="font-bold text-[#1A1A1A] group-hover:text-[#009E49] text-sm sm:text-base break-all">
                              {nombre}
                            </span>

                            <span className="ml-auto text-[#009E49] font-black">
                              ↗
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No hay documentos disponibles para descargar por el
                      momento.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ======================================== */}
        {/* PRODUCTOS RELACIONADOS */}
        {/* ======================================== */}

        {relacionados.length > 0 && (
          <section className="bg-[#F7FAF8] py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-11">
                <div className="flex items-center justify-center gap-3">
                  <span className="w-9 h-[3px] bg-[#FF6600] rounded-full" />

                  <span className="text-[#009E49] font-black uppercase tracking-[0.16em] text-xs sm:text-sm">
                    Descubre Más
                  </span>

                  <span className="w-9 h-[3px] bg-[#FF6600] rounded-full" />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] mt-5 leading-tight">
                  Productos
                  <span className="text-[#009E49]"> Relacionados</span>
                </h2>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  Otros equipos que podrían interesarte.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {relacionados.map((item) => (
                  <TarjetaProducto key={item.id} producto={item} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  to="/catalogo"
                  className="inline-flex items-center justify-center gap-3 bg-[#009E49] hover:bg-[#00843D] text-white px-8 py-4 rounded-xl font-black transition-all duration-300 hover:-translate-y-1"
                >
                  Ver Todo el Catálogo
                  <Icono tipo="flecha" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ======================================== */}
        {/* CTA FINAL */}
        {/* ======================================== */}

        <section className="relative bg-[#073D27] text-white py-16 sm:py-20 overflow-hidden">
          <div className="pointer-events-none absolute -right-32 -top-32 w-80 h-80 rounded-full bg-[#009E49]/25 blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-5 sm:px-6 text-center">
            <span className="text-[#FFB17A] font-black uppercase tracking-[0.16em] text-xs sm:text-sm">
              Grupo Comercial J&G
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-5 leading-tight">
              ¿Tienes dudas sobre
              <span className="block text-[#75E4A4]">este producto?</span>
            </h2>

            <p className="text-green-50/80 mt-6 text-base sm:text-lg leading-relaxed">
              Contáctanos para conocer más detalles y recibir orientación antes
              de realizar tu compra.
            </p>

            <a
              href={whatsapp(
                `Hola, necesito asesoría sobre el producto ${producto.nombre}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 mt-9 bg-[#FF6600] hover:bg-[#E65C00] text-white px-8 py-4 rounded-xl font-black shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Icono tipo="whatsapp" className="w-6 h-6" />
              Solicitar Asesoría
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default DetalleProducto;
