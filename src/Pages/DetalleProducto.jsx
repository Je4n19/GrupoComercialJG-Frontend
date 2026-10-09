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
        const productoData = await obtenerProductoPorId(id);

        if (!activo) return;

        if (!productoData) {
          setError("No se encontró el producto.");
          return;
        }

        setProducto(productoData);

        try {
          const productosData = await obtenerProductos();

          if (!activo) return;

          const relacionadosData = (
            Array.isArray(productosData) ? productosData : []
          )
            .filter(
              (p) =>
                p.categoria === productoData.categoria &&
                String(p.id) !== String(productoData.id),
            )
            .slice(0, 3);

          setRelacionados(relacionadosData);
        } catch (errorRelacionados) {
          console.error("Error al cargar relacionados:", errorRelacionados);
        }
      } catch (errorCarga) {
        console.error("Error al cargar producto:", errorCarga);

        if (activo) {
          setError("No se pudo cargar la información del producto.");
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
        <p className="text-lg font-semibold text-gray-600">
          Cargando producto...
        </p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="min-h-screen flex flex-col gap-5 items-center justify-center px-6">
        <p className="text-lg font-semibold text-gray-700">
          {error || "Producto no disponible."}
        </p>

        <Link
          to="/catalogo"
          className="bg-orange-500 text-white px-6 py-3 rounded-xl"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  // La segunda imagen aparecerá cuando exista en la API.
  const imagenes = [producto.imagen, producto.imagen2].filter(
    (imagen) => typeof imagen === "string" && imagen.trim(),
  );

  const imagenesUnicas = [...new Set(imagenes)];

  const siguienteImagen = () => {
    setImagenActual((anterior) => (anterior + 1) % imagenesUnicas.length);
  };

  const anteriorImagen = () => {
    setImagenActual(
      (anterior) =>
        (anterior - 1 + imagenesUnicas.length) % imagenesUnicas.length,
    );
  };

  // Admite datos técnicos como objeto o lista.
  // No inventa especificaciones si aún no están registradas.
  let datosTecnicos = [];

  if (
    producto.datosTecnicos &&
    typeof producto.datosTecnicos === "object" &&
    !Array.isArray(producto.datosTecnicos)
  ) {
    datosTecnicos = Object.entries(producto.datosTecnicos).filter(
      ([, valor]) => valor !== null && valor !== "",
    );
  } else if (Array.isArray(producto.datosTecnicos)) {
    datosTecnicos = producto.datosTecnicos
      .map((dato) => [dato.nombre || dato.clave, dato.valor])
      .filter(([nombre, valor]) => nombre && valor != null);
  } else if (typeof producto.datosTecnicos === "string") {
    datosTecnicos = producto.datosTecnicos
      .split("\n")
      .map((linea) => {
        const separador = linea.indexOf(":");

        if (separador === -1) return null;

        return [
          linea.slice(0, separador).trim(),
          linea.slice(separador + 1).trim(),
        ];
      })
      .filter((dato) => dato && dato[0] && dato[1]);
  }

  if (
    producto.marca &&
    !datosTecnicos.some(([nombre]) => nombre.toLowerCase() === "marca")
  ) {
    datosTecnicos.unshift(["Marca", producto.marca]);
  }

  const descargables = Array.isArray(producto.descargables)
    ? producto.descargables.filter(
        (archivo) => archivo && (typeof archivo === "string" || archivo.url),
      )
    : [];

  const enlaceWhatsApp = (mensaje) =>
    `https://wa.me/51979501557?text=${encodeURIComponent(mensaje)}`;

  return (
    <>
      {/* ENCABEZADO COMPACTO */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <p className="text-xs text-orange-100 font-semibold uppercase tracking-wider">
            Grupo Comercial J&G / Catálogo
          </p>

          <h1 className="text-2xl md:text-3xl font-extrabold mt-2">
            {producto.nombre}
          </h1>

          <p className="text-orange-100 text-sm mt-2">
            {producto.marca} • {producto.categoria}
          </p>
        </div>
      </section>

      {/* VOLVER */}
      <div className="max-w-7xl mx-auto px-5 md:px-6 pt-7">
        <Link
          to="/catalogo"
          className="text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          ← Volver al catálogo
        </Link>
      </div>

      {/* DETALLE PRINCIPAL */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 py-9">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* GALERÍA */}
          <div className="w-full min-w-0">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-6">
              <div className="relative w-full h-[300px] sm:h-[390px] lg:h-[450px] bg-white rounded-xl flex items-center justify-center overflow-hidden">
                {imagenesUnicas.length > 0 ? (
                  <img
                    src={imagenesUnicas[imagenActual]}
                    alt={`${producto.nombre} - imagen ${imagenActual + 1}`}
                    className="w-full h-full object-contain object-center"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <p className="text-5xl mb-3">📦</p>
                    <p className="text-sm">Imagen no disponible</p>
                  </div>
                )}

                {imagenesUnicas.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={anteriorImagen}
                      aria-label="Imagen anterior"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 border border-gray-200 shadow-md rounded-full flex items-center justify-center text-gray-800 hover:bg-orange-500 hover:text-white transition text-2xl"
                    >
                      ‹
                    </button>

                    <button
                      type="button"
                      onClick={siguienteImagen}
                      aria-label="Imagen siguiente"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 border border-gray-200 shadow-md rounded-full flex items-center justify-center text-gray-800 hover:bg-orange-500 hover:text-white transition text-2xl"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* MINIATURAS */}
              {imagenesUnicas.length > 1 && (
                <div className="flex flex-wrap justify-center gap-3 mt-5 pt-5 border-t border-gray-100">
                  {imagenesUnicas.map((imagen, index) => (
                    <button
                      type="button"
                      key={imagen}
                      onClick={() => setImagenActual(index)}
                      aria-label={`Ver imagen ${index + 1}`}
                      className={`w-20 h-20 sm:w-24 sm:h-24 p-2 rounded-xl border-2 bg-white transition ${
                        imagenActual === index
                          ? "border-orange-500 shadow-md"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <img
                        src={imagen}
                        alt={`${producto.nombre} miniatura ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* INFORMACIÓN DEL PRODUCTO */}
          <div className="min-w-0">
            <span className="inline-block bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold">
              {producto.marca}
            </span>

            <h2 className="text-2xl md:text-[28px] font-extrabold text-gray-900 mt-4 leading-tight">
              {producto.nombre}
            </h2>

            <p className="text-gray-500 text-sm mt-2">{producto.categoria}</p>

            <div className="mt-6 pb-6 border-b border-gray-200">
              <p className="text-xs text-gray-500 font-medium">Precio</p>

              <h3 className="text-3xl md:text-4xl font-extrabold text-orange-500 mt-1">
                S/ {producto.precio}
              </h3>

              <p
                className={`text-sm font-semibold mt-3 ${
                  Number(producto.stock) > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {Number(producto.stock) > 0
                  ? `● Stock disponible: ${producto.stock}`
                  : "● Consultar disponibilidad"}
              </p>
            </div>

            {/* DESCRIPCIÓN BREVE */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Descripción del Producto
              </h3>

              <p className="text-gray-600 text-sm leading-7 whitespace-pre-wrap break-words">
                {producto.descripcion ||
                  "Consulta con nuestro equipo para conocer más sobre este producto."}
              </p>
            </div>

            {/* BENEFICIOS */}
            <div className="grid sm:grid-cols-2 gap-4 mt-7">
              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
                <h3 className="text-sm font-bold text-orange-600">
                  🚚 Envíos Nacionales
                </h3>

                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  Realizamos envíos a todo el Perú.
                </p>
              </div>

              <div className="bg-green-50 border border-green-100 p-4 rounded-xl">
                <h3 className="text-sm font-bold text-green-700">
                  ✅ Respaldo
                </h3>

                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  Atención y orientación sobre nuestros productos.
                </p>
              </div>
            </div>

            {/* CONTACTO */}
            <div className="mt-7 bg-gray-50 border border-gray-200 rounded-2xl p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Solicita Información
              </h3>

              <div className="flex flex-wrap gap-3">
                <a
                  href={enlaceWhatsApp(
                    `Hola, deseo cotizar ${producto.nombre}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl text-sm font-bold transition"
                >
                  Solicitar Cotización
                </a>

                <a
                  href={enlaceWhatsApp(
                    `Hola, deseo más información sobre ${producto.nombre}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl text-sm font-bold transition"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            PESTAÑAS DE INFORMACIÓN
        ========================== */}
        <div className="mt-12 border border-gray-200 rounded-2xl bg-white overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
            {[
              { id: "descripcion", nombre: "Descripción" },
              { id: "tecnicos", nombre: "Datos Técnicos" },
              { id: "descargables", nombre: "Descargables" },
            ].map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setPestana(tab.id)}
                className={`px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition ${
                  pestana === tab.id
                    ? "border-orange-500 text-orange-600 bg-white"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.nombre}
              </button>
            ))}
          </div>

          <div className="p-5 md:p-8">
            {pestana === "descripcion" && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Descripción completa
                </h3>

                <p className="text-sm md:text-[15px] text-gray-600 leading-7 whitespace-pre-wrap break-words">
                  {producto.descripcion ||
                    "No se ha registrado una descripción para este producto."}
                </p>
              </div>
            )}

            {pestana === "tecnicos" && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-5">
                  Especificaciones Técnicas
                </h3>

                {datosTecnicos.length > 0 ? (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    {datosTecnicos.map(([nombre, valor], index) => (
                      <div
                        key={`${nombre}-${index}`}
                        className={`grid grid-cols-2 text-sm ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <div className="px-4 py-3 font-medium text-gray-600 border-r border-b border-gray-200">
                          {nombre}
                        </div>

                        <div className="px-4 py-3 text-gray-800 border-b border-gray-200 break-words">
                          {String(valor)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Aún no se han registrado datos técnicos para este producto.
                  </p>
                )}
              </div>
            )}

            {pestana === "descargables" && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-5">
                  Manuales y Fichas Técnicas
                </h3>

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
                          className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 text-sm text-orange-600 font-semibold hover:bg-orange-50 transition"
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
                    No hay documentos descargables disponibles por el momento.
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
          <div className="max-w-7xl mx-auto px-5 md:px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center">
              Productos Relacionados
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

      <Footer />
    </>
  );
}

export default DetalleProducto;
