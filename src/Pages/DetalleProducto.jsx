import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  obtenerProductoPorId,
  obtenerProductos,
} from "../Services/productoService";

import Footer from "../Components/Footer";
import TarjetaProducto from "../Components/TarjetaProducto";

const CLAVE_CARRITO = "jg_carrito";

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

const obtenerImagenes = (producto) => {
  return [
    ...new Set(
      [producto.imagen, producto.imagen2].filter(
        (imagen) => typeof imagen === "string" && imagen.trim() !== "",
      ),
    ),
  ];
};

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

const formatearPrecio = (precio) => {
  if (
    precio === null ||
    precio === undefined ||
    precio === "" ||
    !Number.isFinite(Number(precio))
  ) {
    return "Consultar precio";
  }

  return `S/ ${Number(precio).toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

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

  const [agregado, setAgregado] = useState(false);
  const [mensajeCarrito, setMensajeCarrito] = useState("");

  // ========================================
  // CORRECCIÓN: SUBIR AUTOMÁTICAMENTE
  // AL INICIO AL ABRIR UN PRODUCTO
  // ========================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Repetir después de que React actualice la vista.
    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => cancelAnimationFrame(frame);
  }, [id]);

  // ========================================
  // CARGAR PRODUCTO
  // ========================================

  useEffect(() => {
    let activo = true;

    const cargarProducto = async () => {
      setCargando(true);
      setError("");
      setProducto(null);
      setRelacionados([]);
      setImagenActual(0);
      setPestana("descripcion");
      setAgregado(false);
      setMensajeCarrito("");

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
          console.error("Error cargando productos relacionados:", err);
        }
      } catch (err) {
        console.error("Error cargando producto:", err);

        if (activo) {
          setError("No se pudo cargar el producto.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarProducto();

    return () => {
      activo = false;
    };
  }, [id]);

  // ========================================
  // AGREGAR PRODUCTO AL CARRITO
  // ========================================

  const agregarAlCarrito = () => {
    if (!producto || producto.id == null) {
      setMensajeCarrito("No se pudo identificar el producto.");
      setAgregado(false);
      return;
    }

    const stock = Number(producto.stock);

    const stockValido =
      producto.stock !== null &&
      producto.stock !== undefined &&
      producto.stock !== "" &&
      Number.isFinite(stock) &&
      stock > 0;

    if (!stockValido) {
      setMensajeCarrito("Disponibilidad por consultar.");
      setAgregado(false);
      return;
    }

    try {
      const guardado = localStorage.getItem(CLAVE_CARRITO);
      const datos = guardado ? JSON.parse(guardado) : [];
      const carrito = Array.isArray(datos) ? datos : [];

      const carritoId = `producto-${producto.id}`;

      const indice = carrito.findIndex(
        (item) =>
          String(item.carritoId) === carritoId ||
          (item.tipo === "producto" && String(item.id) === String(producto.id)),
      );

      const precio = Number(producto.precio);

      const precioValido =
        producto.precio !== null &&
        producto.precio !== undefined &&
        producto.precio !== "" &&
        Number.isFinite(precio) &&
        precio >= 0;

      const nuevoCarrito = [...carrito];

      if (indice >= 0) {
        const existente = nuevoCarrito[indice];

        const cantidadActual = Math.max(
          0,
          Math.floor(Number(existente.cantidad) || 0),
        );

        if (cantidadActual >= stock) {
          setAgregado(false);
          setMensajeCarrito("Ya agregaste todas las unidades disponibles.");
          return;
        }

        nuevoCarrito[indice] = {
          ...existente,
          carritoId,
          tipo: "producto",
          cantidad: cantidadActual + 1,
          stock,
          precio: precioValido ? precio : null,
        };
      } else {
        nuevoCarrito.push({
          carritoId,
          id: producto.id,
          tipo: "producto",
          nombre: producto.nombre,
          marca: producto.marca || "",
          modelo: producto.modelo || "",
          categoria: nombreCategoria(producto.categoria),
          descripcion: producto.descripcion || "",
          imagen: producto.imagen || "",
          precio: precioValido ? precio : null,
          stock,
          cantidad: 1,
        });
      }

      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(nuevoCarrito));

      window.dispatchEvent(new Event("jg-carrito-actualizado"));

      setAgregado(true);
      setMensajeCarrito("¡Producto agregado al carrito!");
    } catch (err) {
      console.error("Error agregando al carrito:", err);
      setAgregado(false);
      setMensajeCarrito("No se pudo agregar el producto.");
    }
  };

  // ========================================
  // PANTALLA DE CARGA
  // ========================================

  if (cargando) {
    return (
      <>
        <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F7FAF8] px-5">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#DCEFE4] border-t-[#009E49]" />

          <h2 className="mt-6 text-xl font-black text-[#1A1A1A]">
            Cargando producto...
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Estamos preparando la información.
          </p>
        </main>

        <Footer />
      </>
    );
  }

  // ========================================
  // PRODUCTO NO ENCONTRADO
  // ========================================

  if (error || !producto) {
    return (
      <>
        <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F7FAF8] px-5 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E8F7EE] text-4xl text-[#009E49]">
            !
          </div>

          <h2 className="mt-6 text-2xl font-black text-[#1A1A1A] sm:text-3xl">
            Producto no disponible
          </h2>

          <p className="mt-3 text-gray-500">
            {error || "No se encontró el producto solicitado."}
          </p>

          <Link
            to="/catalogo"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#009E49] px-7 py-4 font-black text-white hover:bg-[#00843D]"
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
  const precioFormateado = formatearPrecio(producto.precio);

  const stockNumero = Number(producto.stock);

  const tieneStock =
    producto.stock !== null &&
    producto.stock !== undefined &&
    producto.stock !== "" &&
    Number.isFinite(stockNumero) &&
    stockNumero >= 0;

  const disponible = tieneStock && stockNumero > 0;

  // ========================================
  // GALERÍA DE IMÁGENES
  // ========================================

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

  // ========================================
  // INTERFAZ PRINCIPAL
  // ========================================

  return (
    <>
      <main className="min-h-screen overflow-x-hidden bg-white">
        {/* ========================================
            NAVEGACIÓN SUPERIOR
        ======================================== */}

        <div className="border-b border-[#E1EEE6] bg-[#F7FAF8]">
          <div className="mx-auto max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
            <nav
              aria-label="Ruta de navegación"
              className="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm"
            >
              <Link to="/" className="transition-colors hover:text-[#009E49]">
                Inicio
              </Link>

              <span>/</span>

              <Link
                to="/catalogo"
                className="transition-colors hover:text-[#009E49]"
              >
                Catálogo
              </Link>

              <span>/</span>

              <span className="font-bold text-[#009E49]">{categoria}</span>
            </nav>

            <Link
              to="/catalogo"
              className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#009E49] transition-colors hover:text-[#FF6600]"
            >
              <Icono tipo="atras" className="h-4 w-4" />
              Volver al catálogo
            </Link>
          </div>
        </div>

        {/* ========================================
            INFORMACIÓN PRINCIPAL
        ======================================== */}

        <section className="mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-2 lg:gap-14">
            {/* ========================================
                GALERÍA
            ======================================== */}

            <div className="min-w-0">
              <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-[#F8FAF9] shadow-sm">
                <div className="relative flex h-[310px] items-center justify-center p-6 sm:h-[420px] sm:p-8 lg:h-[490px]">
                  <div className="absolute left-5 top-5 z-10 max-w-[75%]">
                    <span className="inline-block max-w-full truncate rounded-full bg-[#009E49] px-4 py-2 text-xs font-black text-white shadow-md">
                      {categoria}
                    </span>
                  </div>

                  {imagenes.length > 0 ? (
                    <img
                      src={imagenes[imagenActual]}
                      alt={`${producto.nombre} - fotografía ${
                        imagenActual + 1
                      }`}
                      className="h-full w-full object-contain object-center"
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <div className="mb-4 text-5xl">📷</div>

                      <p className="text-sm font-semibold">
                        Imagen no disponible
                      </p>
                    </div>
                  )}

                  {imagenes.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={anteriorImagen}
                        aria-label="Fotografía anterior"
                        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white text-3xl text-[#009E49] shadow-lg transition hover:bg-[#009E49] hover:text-white sm:left-5"
                      >
                        ‹
                      </button>

                      <button
                        type="button"
                        onClick={siguienteImagen}
                        aria-label="Fotografía siguiente"
                        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white text-3xl text-[#009E49] shadow-lg transition hover:bg-[#009E49] hover:text-white sm:right-5"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* MINIATURAS */}

                {imagenes.length > 1 && (
                  <div className="flex flex-wrap justify-center gap-3 border-t border-gray-100 bg-white px-4 py-5">
                    {imagenes.map((imagen, index) => (
                      <button
                        type="button"
                        key={imagen}
                        onClick={() => setImagenActual(index)}
                        aria-label={`Ver fotografía ${index + 1}`}
                        aria-pressed={imagenActual === index}
                        className={`h-[76px] w-[76px] rounded-xl border-2 p-2 transition ${
                          imagenActual === index
                            ? "border-[#009E49] bg-[#E8F7EE]"
                            : "border-gray-200 hover:border-[#009E49]/50"
                        }`}
                      >
                        <img
                          src={imagen}
                          alt={`Miniatura ${index + 1}`}
                          className="h-full w-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {imagenes.length > 1 && (
                <p className="mt-4 text-center text-xs text-gray-500">
                  Fotografía {imagenActual + 1} de {imagenes.length}
                </p>
              )}

              {/* GARANTÍA DE ATENCIÓN */}

              <div className="mt-6 rounded-2xl border border-[#D5EEDF] bg-[#E8F7EE] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#009E49] text-white">
                    <Icono tipo="check" />
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-[#073D27]">
                      Grupo Comercial J&G
                    </h3>

                    <p className="mt-1 text-xs text-[#397453] sm:text-sm">
                      Maquinaria, repuestos y atención especializada.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================
                INFORMACIÓN DEL PRODUCTO
            ======================================== */}

            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {producto.marca && (
                  <span className="rounded-full border border-[#D4EBDD] bg-[#E8F7EE] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#00843D]">
                    {producto.marca}
                  </span>
                )}

                {producto.modelo && (
                  <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-bold text-gray-600">
                    {producto.modelo}
                  </span>
                )}
              </div>

              <h1 className="break-words text-3xl font-black leading-tight tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-[42px]">
                {producto.nombre}
              </h1>

              <div className="mt-4 flex items-center gap-3">
                <span className="h-[3px] w-9 rounded-full bg-[#FF6600]" />

                <p className="text-sm font-bold text-[#009E49]">{categoria}</p>
              </div>

              {/* ========================================
                  PRECIO Y STOCK
              ======================================== */}

              <div className="mt-8 border-b border-gray-200 pb-7">
                <p className="text-sm font-medium text-gray-500">
                  Precio de venta
                </p>

                <p className="mt-2 break-words text-4xl font-black tracking-tight text-[#FF6600] sm:text-5xl">
                  {precioFormateado}
                </p>

                <div className="mt-5">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold ${
                      !tieneStock
                        ? "bg-gray-100 text-gray-600"
                        : disponible
                          ? "bg-[#E8F7EE] text-[#00843D]"
                          : "bg-red-50 text-red-600"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
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
                        : "Sin stock disponible"}
                  </span>
                </div>
              </div>

              {/* ========================================
                  INFORMACIÓN BÁSICA
              ======================================== */}

              <div className="mt-7">
                <h2 className="mb-5 text-lg font-black text-[#1A1A1A]">
                  Información del producto
                </h2>

                <div className="space-y-4 text-sm">
                  {producto.marca && (
                    <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                      <span className="text-gray-500">Marca</span>

                      <span className="break-words text-right font-bold text-[#1A1A1A]">
                        {producto.marca}
                      </span>
                    </div>
                  )}

                  {producto.modelo && (
                    <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                      <span className="text-gray-500">Modelo</span>

                      <span className="break-words text-right font-bold text-[#1A1A1A]">
                        {producto.modelo}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
                    <span className="text-gray-500">Categoría</span>

                    <span className="break-words text-right font-bold text-[#1A1A1A]">
                      {categoria}
                    </span>
                  </div>
                </div>
              </div>

              {/* ========================================
                  AGREGAR AL CARRITO
              ======================================== */}

              <div className="mt-8 rounded-[24px] border-2 border-[#DCEFE4] bg-[#F7FAF8] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F7EE] text-[#009E49]">
                    <Icono tipo="carrito" className="h-6 w-6" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-xl font-black text-[#073D27]">
                      Agrega este producto a tu carrito
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      Añade este producto a tu carrito junto con otros productos
                      y repuestos para continuar con tu pedido.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={agregarAlCarrito}
                  disabled={!disponible}
                  className={`mt-6 flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-sm font-black transition-all duration-300 sm:text-base ${
                    !disponible
                      ? "cursor-not-allowed bg-gray-200 text-gray-500"
                      : agregado
                        ? "bg-[#063D2A] text-white hover:bg-[#052D20]"
                        : "bg-[#FF6600] text-white hover:-translate-y-0.5 hover:bg-[#E65C00]"
                  }`}
                >
                  <Icono
                    tipo={agregado ? "check" : "carrito"}
                    className="h-5 w-5"
                  />

                  {!disponible
                    ? "Disponibilidad por consultar"
                    : agregado
                      ? "¡Agregado al carrito!"
                      : "Agregar al carrito"}
                </button>

                {mensajeCarrito && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`mt-3 text-center text-sm font-bold ${
                      agregado ? "text-[#009E49]" : "text-red-600"
                    }`}
                  >
                    {mensajeCarrito}
                  </p>
                )}

                {agregado && (
                  <Link
                    to="/carrito"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#009E49] bg-white px-5 py-3.5 text-sm font-black text-[#009E49] transition hover:bg-[#E8F7EE]"
                  >
                    <Icono tipo="carrito" />
                    Ver mi carrito
                    <Icono tipo="flecha" className="h-4 w-4" />
                  </Link>
                )}

                <p className="mt-4 text-center text-xs leading-relaxed text-gray-500">
                  Agregar al carrito no confirma una compra ni reserva el stock.
                </p>
              </div>

              {/* ========================================
                  CONSULTAS POR WHATSAPP
              ======================================== */}

              <div className="mt-5 rounded-[24px] border border-[#DCEFE4] bg-white p-5 sm:p-6">
                <h2 className="text-xl font-black text-[#1A1A1A]">
                  ¿Necesitas más información?
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Consulta directamente con nuestro equipo sobre las
                  características del producto, disponibilidad y opciones de
                  envío.
                </p>

                <a
                  href={whatsapp(
                    `Hola, deseo más información sobre el producto ${producto.nombre}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-3 rounded-xl bg-[#009E49] px-6 py-4 text-sm font-black text-white transition hover:bg-[#00843D]"
                >
                  <Icono tipo="whatsapp" />
                  Consultar por WhatsApp
                  <Icono tipo="flecha" />
                </a>
              </div>

              {/* ========================================
                  BENEFICIOS
              ======================================== */}

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-[#DCEFE4] bg-[#F7FAF8] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F7EE] text-[#009E49]">
                    <Icono tipo="camion" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-[#1A1A1A]">
                      Envíos nacionales
                    </p>

                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                      Consultas de envío a todo el Perú.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-[#DCEFE4] bg-[#F7FAF8] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F7EE] text-[#009E49]">
                    <Icono tipo="check" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-[#1A1A1A]">
                      Atención especializada
                    </p>

                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                      Te ayudamos a elegir el equipo adecuado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================
              PESTAÑAS DE INFORMACIÓN
          ======================================== */}

          <div className="mt-14 overflow-hidden rounded-[26px] border border-gray-100 bg-white shadow-sm">
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
                  className={`whitespace-nowrap border-b-[3px] px-5 py-5 text-sm font-black transition-colors sm:px-8 ${
                    pestana === tab.id
                      ? "border-[#009E49] bg-white text-[#009E49]"
                      : "border-transparent text-gray-500 hover:text-[#009E49]"
                  }`}
                >
                  {tab.nombre}
                </button>
              ))}
            </div>

            <div className="min-h-[180px] p-6 sm:p-8 lg:p-10">
              {/* DESCRIPCIÓN */}

              {pestana === "descripcion" && (
                <div>
                  <h2 className="mb-6 text-xl font-black text-[#1A1A1A] sm:text-2xl">
                    Descripción del producto
                  </h2>

                  <p className="whitespace-pre-wrap break-words text-sm leading-8 text-gray-600 sm:text-base">
                    {producto.descripcion ||
                      "No se ha registrado una descripción para este producto."}
                  </p>
                </div>
              )}

              {/* DATOS TÉCNICOS */}

              {pestana === "tecnicos" && (
                <div>
                  <h2 className="mb-6 text-xl font-black text-[#1A1A1A] sm:text-2xl">
                    Especificaciones técnicas
                  </h2>

                  {datosTecnicos.length > 0 ? (
                    <div className="overflow-hidden rounded-2xl border border-gray-100">
                      {datosTecnicos.map(([nombre, valor], index) => (
                        <div
                          key={`${nombre}-${index}`}
                          className={`grid grid-cols-2 text-sm ${
                            index % 2 === 0 ? "bg-[#F7FAF8]" : "bg-white"
                          }`}
                        >
                          <div className="break-words border-b border-r border-gray-100 px-4 py-4 font-bold text-[#1A1A1A] sm:px-6">
                            {nombre}
                          </div>

                          <div className="break-words border-b border-gray-100 px-4 py-4 text-gray-600 sm:px-6">
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
                  <h2 className="mb-6 text-xl font-black text-[#1A1A1A] sm:text-2xl">
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
                            className="group flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-[#009E49]/30 hover:bg-[#E8F7EE] sm:p-5"
                          >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F7EE] text-[#009E49]">
                              <Icono tipo="documento" className="h-6 w-6" />
                            </div>

                            <span className="break-all text-sm font-bold text-[#1A1A1A] group-hover:text-[#009E49] sm:text-base">
                              {nombre}
                            </span>

                            <span className="ml-auto font-black text-[#009E49]">
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

        {/* ========================================
            PRODUCTOS RELACIONADOS
        ======================================== */}

        {relacionados.length > 0 && (
          <section className="bg-[#F7FAF8] py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <div className="mx-auto mb-11 max-w-2xl text-center">
                <div className="flex items-center justify-center gap-3">
                  <span className="h-[3px] w-9 rounded-full bg-[#FF6600]" />

                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#009E49] sm:text-sm">
                    Descubre Más
                  </span>

                  <span className="h-[3px] w-9 rounded-full bg-[#FF6600]" />
                </div>

                <h2 className="mt-5 text-3xl font-black leading-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl">
                  Productos
                  <span className="text-[#009E49]"> Relacionados</span>
                </h2>

                <p className="mt-4 leading-relaxed text-gray-600">
                  Otros equipos que podrían interesarte.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {relacionados.map((item) => (
                  <TarjetaProducto key={item.id} producto={item} />
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  to="/catalogo"
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#009E49] px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#00843D]"
                >
                  Ver Todo el Catálogo
                  <Icono tipo="flecha" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ========================================
            SECCIÓN FINAL DE ASESORÍA
        ======================================== */}

        <section className="relative overflow-hidden bg-[#073D27] py-16 text-white sm:py-20">
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#009E49]/25 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#FFB17A] sm:text-sm">
              Grupo Comercial J&G
            </span>

            <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              ¿Tienes dudas sobre
              <span className="block text-[#75E4A4]">este producto?</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-green-50/80 sm:text-lg">
              Contáctanos para conocer más detalles y recibir orientación antes
              de realizar tu compra.
            </p>

            <a
              href={whatsapp(
                `Hola, necesito asesoría sobre el producto ${producto.nombre}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center justify-center gap-3 rounded-xl bg-[#FF6600] px-8 py-4 font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#E65C00]"
            >
              <Icono tipo="whatsapp" className="h-6 w-6" />
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
