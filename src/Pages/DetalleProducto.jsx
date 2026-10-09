import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  obtenerProductoPorId,
  obtenerProductos,
} from "../Services/productoService";

import Footer from "../Components/Footer";
import TarjetaProducto from "../Components/TarjetaProducto";

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
                (p) =>
                  p.categoria === data.categoria &&
                  String(p.id) !== String(data.id),
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

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 font-semibold">Cargando producto...</p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-5">
        <p className="text-gray-700 font-semibold">
          {error || "Producto no disponible."}
        </p>

        <Link
          to="/catalogo"
          className="bg-orange-500 text-white px-5 py-3 rounded-lg"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  // GALERÍA DE FOTOGRAFÍAS
  const imagenes = [producto.imagen, producto.imagen2].filter(
    (imagen) => typeof imagen === "string" && imagen.trim() !== "",
  );

  const imagenesUnicas = [...new Set(imagenes)];

  const siguienteImagen = () => {
    if (imagenesUnicas.length < 2) return;

    setImagenActual((actual) => (actual + 1) % imagenesUnicas.length);
  };

  const anteriorImagen = () => {
    if (imagenesUnicas.length < 2) return;

    setImagenActual(
      (actual) => (actual - 1 + imagenesUnicas.length) % imagenesUnicas.length,
    );
  };

  // DATOS TÉCNICOS
  let datosTecnicos = [];

  if (typeof producto.datosTecnicos === "string") {
    datosTecnicos = producto.datosTecnicos
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
    datosTecnicos = producto.datosTecnicos
      .map((dato) => [dato.nombre || dato.clave, dato.valor])
      .filter(([nombre, valor]) => nombre && valor != null);
  } else if (
    producto.datosTecnicos &&
    typeof producto.datosTecnicos === "object"
  ) {
    datosTecnicos = Object.entries(producto.datosTecnicos);
  }

  if (
    producto.marca &&
    !datosTecnicos.some(([nombre]) => String(nombre).toLowerCase() === "marca")
  ) {
    datosTecnicos.unshift(["Marca", producto.marca]);
  }

  if (
    producto.modelo &&
    !datosTecnicos.some(([nombre]) => String(nombre).toLowerCase() === "modelo")
  ) {
    datosTecnicos.push(["Modelo", producto.modelo]);
  }

  // DESCARGABLES
  const descargables = Array.isArray(producto.descargables)
    ? producto.descargables.filter(
        (archivo) => archivo && (typeof archivo === "string" || archivo.url),
      )
    : [];

  const whatsapp = (mensaje) =>
    `https://wa.me/51979501557?text=${encodeURIComponent(mensaje)}`;

  const precioFormateado =
    producto.precio != null
      ? Number(producto.precio).toLocaleString("es-PE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "Consultar";

  return (
    <>
      <main className="bg-white min-h-screen">
        {/* NAVEGACIÓN SUPERIOR */}
        <div className="border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-5 py-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <Link to="/" className="hover:text-orange-600 transition">
                Inicio
              </Link>

              <span>/</span>

              <Link to="/catalogo" className="hover:text-orange-600 transition">
                Catálogo
              </Link>

              <span>/</span>

              <span className="text-gray-800 font-medium">
                {producto.categoria}
              </span>
            </div>

            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-semibold mt-4"
            >
              <span>←</span>
              Volver al catálogo
            </Link>
          </div>
        </div>

        {/* PRODUCTO */}
        <section className="max-w-6xl mx-auto px-5 pt-9 pb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* GALERÍA IZQUIERDA */}
            <div className="min-w-0">
              <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
                <div className="relative h-[310px] sm:h-[400px] lg:h-[440px] flex items-center justify-center bg-white p-3 sm:p-5">
                  {imagenesUnicas.length > 0 ? (
                    <img
                      src={imagenesUnicas[imagenActual]}
                      alt={`${producto.nombre} - fotografía ${
                        imagenActual + 1
                      }`}
                      className="w-full h-full object-contain object-center"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <div className="text-4xl mb-3">📷</div>
                      <p className="text-sm">Imagen no disponible</p>
                    </div>
                  )}

                  {/* FLECHAS */}
                  {imagenesUnicas.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={anteriorImagen}
                        aria-label="Fotografía anterior"
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md w-10 h-10 rounded-full flex items-center justify-center text-2xl text-gray-700 hover:bg-orange-500 hover:text-white transition"
                      >
                        ‹
                      </button>

                      <button
                        type="button"
                        onClick={siguienteImagen}
                        aria-label="Fotografía siguiente"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md w-10 h-10 rounded-full flex items-center justify-center text-2xl text-gray-700 hover:bg-orange-500 hover:text-white transition"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* MINIATURAS */}
                {imagenesUnicas.length > 1 && (
                  <div className="flex justify-center gap-3 border-t border-gray-100 px-4 py-4">
                    {imagenesUnicas.map((imagen, index) => (
                      <button
                        type="button"
                        key={imagen}
                        onClick={() => setImagenActual(index)}
                        aria-label={`Ver fotografía ${index + 1}`}
                        className={`w-[76px] h-[76px] p-2 border-2 rounded-xl transition ${
                          imagenActual === index
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-orange-300"
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

              {/* INDICADOR DE FOTOGRAFÍAS */}
              {imagenesUnicas.length > 1 && (
                <p className="text-center text-xs text-gray-400 mt-3">
                  Fotografía {imagenActual + 1} de {imagenesUnicas.length}
                </p>
              )}
            </div>

            {/* INFORMACIÓN DERECHA */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {producto.marca && (
                  <span className="bg-orange-50 text-orange-600 border border-orange-100 text-xs font-bold px-3 py-1 rounded-full">
                    {producto.marca}
                  </span>
                )}

                {producto.modelo && (
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                    {producto.modelo}
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-[27px] font-extrabold text-gray-900 leading-snug">
                {producto.nombre}
              </h1>

              <p className="text-gray-500 text-sm mt-2">{producto.categoria}</p>

              {/* PRECIO Y STOCK */}
              <div className="mt-6 pb-5 border-b border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Precio de venta</p>

                <p className="text-3xl font-extrabold text-orange-600">
                  {producto.precio != null
                    ? `S/ ${precioFormateado}`
                    : precioFormateado}
                </p>

                <div className="mt-3">
                  <span
                    className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg ${
                      Number(producto.stock) > 0
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    <span>●</span>

                    {Number(producto.stock) > 0
                      ? `Stock disponible: ${producto.stock}`
                      : "Consultar disponibilidad"}
                  </span>
                </div>
              </div>

              {/* CARACTERÍSTICAS PRINCIPALES */}
              <div className="mt-5">
                <h2 className="text-sm font-bold text-gray-900 mb-4">
                  Información del producto
                </h2>

                <div className="space-y-3 text-sm">
                  {producto.marca && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Marca</span>
                      <span className="text-gray-800 font-semibold text-right">
                        {producto.marca}
                      </span>
                    </div>
                  )}

                  {producto.modelo && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Modelo</span>
                      <span className="text-gray-800 font-semibold text-right">
                        {producto.modelo}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Categoría</span>
                    <span className="text-gray-800 font-semibold text-right">
                      {producto.categoria}
                    </span>
                  </div>
                </div>
              </div>

              {/* COTIZACIÓN */}
              <div className="mt-7 bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h2 className="text-base font-bold text-gray-900">
                  ¿Te interesa este producto?
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  Contáctanos para consultar disponibilidad, características y
                  opciones de envío.
                </p>

                <div className="flex flex-wrap gap-3 mt-5">
                  <a
                    href={whatsapp(
                      `Hola, deseo cotizar el producto ${producto.nombre}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-3 rounded-lg transition"
                  >
                    Solicitar cotización
                  </a>

                  <a
                    href={whatsapp(
                      `Hola, deseo más información sobre ${producto.nombre}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-3 rounded-lg transition"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* BENEFICIOS COMPACTOS */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div className="flex items-start gap-2 border border-orange-100 bg-orange-50 rounded-xl p-3">
                  <span className="text-lg">🚚</span>

                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      Envíos nacionales
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Llegamos a todo el Perú.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 border border-green-100 bg-green-50 rounded-xl p-3">
                  <span className="text-lg">✓</span>

                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      Atención especializada
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Te ayudamos a elegir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PESTAÑAS A TODO EL ANCHO */}
          <div className="mt-12 border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
              {[
                {
                  id: "descripcion",
                  nombre: "Descripción",
                },
                {
                  id: "tecnicos",
                  nombre: "Datos Técnicos",
                },
                {
                  id: "descargables",
                  nombre: "Descargables",
                },
              ].map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setPestana(tab.id)}
                  className={`px-5 md:px-7 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition ${
                    pestana === tab.id
                      ? "bg-white border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.nombre}
                </button>
              ))}
            </div>

            <div className="p-5 md:p-8">
              {/* DESCRIPCIÓN */}
              {pestana === "descripcion" && (
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-5">
                    Descripción del producto
                  </h2>

                  <p className="text-sm md:text-[15px] text-gray-600 leading-8 whitespace-pre-wrap break-words">
                    {producto.descripcion ||
                      "No se ha registrado una descripción para este producto."}
                  </p>
                </div>
              )}

              {/* DATOS TÉCNICOS */}
              {pestana === "tecnicos" && (
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-5">
                    Especificaciones técnicas
                  </h2>

                  {datosTecnicos.length > 0 ? (
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      {datosTecnicos.map(([nombre, valor], index) => (
                        <div
                          key={`${nombre}-${index}`}
                          className={`grid grid-cols-2 text-sm ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <div className="px-4 md:px-6 py-3 font-semibold text-gray-600 border-r border-b border-gray-200 break-words">
                            {nombre}
                          </div>

                          <div className="px-4 md:px-6 py-3 text-gray-800 border-b border-gray-200 break-words">
                            {String(valor)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Todavía no se han registrado especificaciones técnicas
                      para este producto.
                    </p>
                  )}
                </div>
              )}

              {/* DESCARGABLES */}
              {pestana === "descargables" && (
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-5">
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
                            className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition"
                          >
                            <span>📄</span>
                            <span>{nombre}</span>
                            <span className="ml-auto">↗</span>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No hay documentos disponibles para descargar por el
                      momento.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PRODUCTOS RELACIONADOS */}
        {relacionados.length > 0 && (
          <section className="bg-gray-50 py-14">
            <div className="max-w-6xl mx-auto px-5">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
                Productos relacionados
              </h2>

              <p className="text-center text-gray-500 text-sm mt-3 mb-9">
                Otros equipos que podrían interesarte.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relacionados.map((item) => (
                  <TarjetaProducto key={item.id} producto={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default DetalleProducto;
