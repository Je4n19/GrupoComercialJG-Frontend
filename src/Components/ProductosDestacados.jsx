import { Link } from "react-router-dom";

// COLORES PRINCIPALES
const VERDE = "#009E49";
const NARANJA = "#FF6600";

// MOSTRAR NOMBRE DE CATEGORÍA O MARCA
const obtenerNombre = (valor) => {
  if (valor == null) return "";

  if (typeof valor === "object") {
    return valor.nombre || "";
  }

  return String(valor);
};

// FORMATO DE PRECIO EN SOLES
const formatearPrecio = (precio) => {
  const numero = Number(precio);

  if (!Number.isFinite(numero)) {
    return "Consultar";
  }

  return `S/ ${numero.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

function ProductosDestacados({ productos = [] }) {
  const listaProductos = Array.isArray(productos) ? productos : [];

  return (
    <section
      id="productos-destacados"
      className="relative bg-gradient-to-b from-[#F0F9F3] via-white to-white py-20 sm:py-24 overflow-hidden"
    >
      {/* DECORACIÓN DE FONDO */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#009E49]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 bg-[#E6F6EC] text-[#008A40] border border-[#009E49]/15 px-5 py-2 rounded-full font-extrabold uppercase tracking-wider text-xs sm:text-sm">
            <span className="w-2 h-2 rounded-full bg-[#009E49]" />
            Productos Destacados
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] mt-6 tracking-tight">
            Equipos Más <span className="text-[#009E49]">Solicitados</span>
          </h2>

          <div className="w-20 h-1 bg-[#FF6600] rounded-full mx-auto mt-5" />

          <p className="text-gray-600 text-base sm:text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestra selección de maquinaria y equipos de alto
            rendimiento para agricultura, forestación e industria.
          </p>
        </div>

        {/* LISTADO DE PRODUCTOS */}
        {listaProductos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {listaProductos.map((producto) => {
              const categoria = obtenerNombre(producto.categoria);

              const marca = obtenerNombre(producto.marca);

              const stock = Number(producto.stock);
              const tieneStock =
                producto.stock != null && Number.isFinite(stock);

              const disponible = !tieneStock || stock > 0;

              const mensajeWhatsApp = encodeURIComponent(
                `Hola, deseo información sobre ${producto.nombre || "este producto"}.`,
              );

              return (
                <article
                  key={producto.id}
                  className="group flex flex-col bg-white rounded-[26px] overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:border-[#009E49]/30 hover:-translate-y-2 transition-all duration-300"
                >
                  {/* IMAGEN DEL PRODUCTO */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-[#F7F9F7]">
                    {producto.imagen ? (
                      <img
                        src={producto.imagen}
                        alt={producto.nombre || "Producto"}
                        loading="lazy"
                        className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                        <svg
                          className="w-14 h-14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="m21 15-5-5L5 21" />
                        </svg>

                        <span className="text-sm">Imagen no disponible</span>
                      </div>
                    )}

                    {/* ESTADO DE DISPONIBILIDAD */}
                    <span
                      className={`absolute top-4 left-4 px-4 py-2 rounded-full text-xs font-black shadow-sm ${
                        disponible
                          ? "bg-[#009E49] text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      {disponible ? "Disponible" : "Sin stock"}
                    </span>

                    {/* DETALLE DECORATIVO */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{
                        backgroundColor: VERDE,
                      }}
                    />
                  </div>

                  {/* INFORMACIÓN */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    {/* CATEGORÍA */}
                    {categoria && (
                      <span className="self-start bg-[#E6F6EC] text-[#008A40] px-3 py-1.5 rounded-full text-xs font-bold">
                        {categoria}
                      </span>
                    )}

                    {/* NOMBRE */}
                    <h3 className="text-xl sm:text-2xl font-black mt-4 text-[#1A1A1A] leading-snug">
                      {producto.nombre}
                    </h3>

                    {/* MARCA Y STOCK */}
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      {marca && (
                        <p className="flex items-center justify-between gap-3">
                          <span>Marca</span>

                          <span className="font-bold text-[#1A1A1A] text-right">
                            {marca}
                          </span>
                        </p>
                      )}

                      {producto.stock != null && (
                        <p className="flex items-center justify-between gap-3">
                          <span>Stock disponible</span>

                          <span
                            className={`font-bold ${
                              disponible ? "text-[#009E49]" : "text-red-600"
                            }`}
                          >
                            {producto.stock} unidades
                          </span>
                        </p>
                      )}
                    </div>

                    {/* PRECIO */}
                    <div className="mt-auto pt-6">
                      <div className="border-t border-gray-100 pt-5">
                        <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                          Precio
                        </p>

                        <p
                          className="text-3xl sm:text-4xl font-black mt-1"
                          style={{
                            color: NARANJA,
                          }}
                        >
                          {formatearPrecio(producto.precio)}
                        </p>
                      </div>

                      {/* BOTONES */}
                      <div className="grid grid-cols-2 gap-3 mt-6">
                        <Link
                          to={`/producto/${producto.id}`}
                          className="flex items-center justify-center text-center bg-[#FF6600] hover:bg-[#E65C00] text-white px-3 py-3.5 rounded-xl font-extrabold text-sm transition-colors shadow-sm"
                        >
                          Ver Detalle
                        </Link>

                        <a
                          href={`https://wa.me/51979501557?text=${mensajeWhatsApp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-center bg-[#009E49] hover:bg-[#00843D] text-white px-3 py-3.5 rounded-xl font-extrabold text-sm transition-colors shadow-sm"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center bg-white border border-gray-100 rounded-3xl p-12 shadow-sm">
            <h3 className="text-xl font-black text-[#1A1A1A]">
              Próximamente más productos
            </h3>

            <p className="text-gray-500 mt-3">
              Estamos preparando nuestra selección de equipos destacados.
            </p>
          </div>
        )}

        {/* BOTÓN VER TODO */}
        <div className="text-center mt-14">
          <Link
            to="/catalogo"
            className="inline-flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-[#009E49] text-white px-9 sm:px-10 py-4 rounded-xl font-black text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 shadow-lg"
          >
            Ver Todo el Catálogo
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductosDestacados;
