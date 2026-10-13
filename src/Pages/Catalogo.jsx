import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { obtenerProductos } from "../Services/productoService";
import { obtenerCategorias } from "../Services/categoriaService";

import TarjetaProducto from "../Components/TarjetaProducto";
import Footer from "../Components/Footer";
import imagenProductos from "../assets/productos.png";

// Normalización para búsquedas flexibles
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

function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();

  const busquedaURL = searchParams.get("buscar") || "";
  const categoriaURL = searchParams.get("categoria") || "";
  const productoDestacado = searchParams.get("destacado");

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Cargar información desde el backend
  useEffect(() => {
    let activo = true;

    const cargarDatos = async () => {
      setCargando(true);
      setError("");

      try {
        const [productosData, categoriasData] = await Promise.all([
          obtenerProductos(),
          obtenerCategorias(),
        ]);

        if (!activo) return;

        setProductos(Array.isArray(productosData) ? productosData : []);

        setCategorias(Array.isArray(categoriasData) ? categoriasData : []);
      } catch (err) {
        console.error("Error cargando catálogo:", err);

        if (activo) {
          setError("No se pudieron cargar los productos. Intenta nuevamente.");
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

  const palabras = useMemo(
    () => normalizar(busquedaURL).split(/\s+/).filter(Boolean),
    [busquedaURL],
  );

  // Búsqueda y filtro de categorías
  const productosVisibles = useMemo(() => {
    return productos
      .filter((producto) => {
        const nombreCategoria = obtenerNombreCategoria(producto.categoria);

        const textoProducto = [
          producto.nombre,
          producto.marca,
          producto.modelo,
          nombreCategoria,
          producto.descripcion,
          producto.codigo,
        ]
          .filter(Boolean)
          .join(" ");

        const texto = normalizar(textoProducto);
        const compacto = compactar(textoProducto);

        const coincideBusqueda = palabras.every((palabra) => {
          const token = compactar(palabra);
          return texto.includes(palabra) || compacto.includes(token);
        });

        const coincideCategoria =
          !categoriaURL ||
          normalizar(nombreCategoria) === normalizar(categoriaURL);

        return coincideBusqueda && coincideCategoria;
      })
      .sort((a, b) => {
        if (productoDestacado) {
          if (String(a.id) === productoDestacado) return -1;
          if (String(b.id) === productoDestacado) return 1;
        }

        return String(a.nombre ?? "").localeCompare(
          String(b.nombre ?? ""),
          "es",
        );
      });
  }, [productos, palabras, categoriaURL, productoDestacado]);

  const quitarBusqueda = () => {
    const parametros = new URLSearchParams(searchParams);
    parametros.delete("buscar");
    parametros.delete("destacado");
    setSearchParams(parametros);
  };

  const verTodos = () => setSearchParams({});

  useEffect(() => {
    if (cargando || !busquedaURL) return;

    document.getElementById("productos-disponibles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [busquedaURL, productoDestacado, cargando]);

  const whatsappUrl =
    "https://wa.me/51979501557?text=" +
    encodeURIComponent("Hola, deseo consultar por una máquina o equipo.");

  const whatsappAsesoria =
    "https://wa.me/51979501557?text=" +
    encodeURIComponent("Hola, necesito asesoría para elegir una máquina.");

  return (
    <>
      {/* ======================================== */}
      {/* HERO PRINCIPAL */}
      {/* ======================================== */}
      <section className="relative min-h-[440px] sm:min-h-[520px] flex items-center overflow-hidden text-white">
        <img
          src={imagenProductos}
          alt="Maquinaria agrícola, forestal e industrial"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07170F]/95 via-[#07170F]/80 to-[#07170F]/35" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#009E49]/20 border border-[#5FE29C]/40 text-[#B6F5D0] px-4 py-2 rounded-full font-black text-xs sm:text-sm">
              <span className="w-2 h-2 bg-[#FF6600] rounded-full" />
              Grupo Comercial J&G
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mt-6 leading-tight tracking-tight">
              Catálogo de
              <span className="block text-[#5FE29C]">Productos</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 mt-6 max-w-xl leading-relaxed">
              Encuentra maquinaria agrícola, forestal e industrial de marcas
              reconocidas para tus necesidades de trabajo.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8">
              <a
                href="#productos-disponibles"
                className="inline-flex items-center justify-center gap-3 bg-[#FF6600] hover:bg-[#E65C00] text-white px-7 py-4 rounded-xl font-black text-sm transition-all duration-300 hover:-translate-y-1"
              >
                Ver Productos
                <span aria-hidden="true">→</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 text-white px-7 py-4 rounded-xl font-black text-sm transition-all duration-300"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* ESTADÍSTICAS */}
      {/* ======================================== */}
      <section className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 -mt-8 sm:-mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {[
            {
              valor: cargando ? "..." : productos.length,
              titulo: "Productos",
            },
            {
              valor: cargando ? "..." : categorias.length,
              titulo: "Categorías",
            },
            {
              valor: "J&G",
              titulo: "Atención Especializada",
            },
            {
              valor: "Perú",
              titulo: "Cobertura Nacional",
            },
          ].map((item) => (
            <div
              key={item.titulo}
              className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 text-center border border-gray-100 overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-[#009E49]" />

              <h3 className="text-2xl sm:text-4xl font-black text-[#009E49]">
                {item.valor}
              </h3>

              <p className="text-gray-600 text-xs sm:text-sm font-semibold mt-2">
                {item.titulo}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================== */}
      {/* PRODUCTOS DISPONIBLES */}
      {/* ======================================== */}
      <section id="productos-disponibles" className="bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-5 mb-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="w-10 h-[3px] bg-[#FF6600] rounded-full" />
                <span className="text-[#009E49] font-black uppercase tracking-[0.16em] text-xs sm:text-sm">
                  Nuestro Catálogo
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] mt-4 leading-tight">
                {busquedaURL
                  ? "Resultados de Búsqueda"
                  : "Productos Disponibles"}
              </h2>

              <p className="text-gray-600 mt-3 leading-relaxed">
                Explora nuestra selección de maquinaria y equipos para el campo
                y la industria.
              </p>

              {busquedaURL && (
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <p className="text-sm text-gray-600">
                    Buscando:{" "}
                    <strong className="text-[#009E49]">{busquedaURL}</strong>
                  </p>

                  <button
                    type="button"
                    onClick={quitarBusqueda}
                    className="text-sm font-bold text-[#FF6600] hover:underline"
                  >
                    Quitar búsqueda ×
                  </button>
                </div>
              )}

              {categoriaURL && (
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <p className="text-sm text-gray-600">
                    Categoría:{" "}
                    <strong className="text-[#009E49]">{categoriaURL}</strong>
                  </p>

                  <button
                    type="button"
                    onClick={verTodos}
                    className="text-sm font-bold text-[#FF6600] hover:underline"
                  >
                    Ver todas
                  </button>
                </div>
              )}
            </div>

            <span className="self-start sm:self-auto bg-[#E8F7EE] text-[#00843D] px-5 py-3 rounded-full font-black text-sm whitespace-nowrap">
              {cargando ? "..." : productosVisibles.length} productos
            </span>
          </div>

          {/* SEPARADOR */}
          <div className="flex items-center gap-3 mb-9">
            <div className="w-14 h-1 bg-[#009E49] rounded-full" />
            <div className="w-6 h-1 bg-[#FF6600] rounded-full" />
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* ESTADOS */}
          {cargando ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-12 h-12 border-4 border-[#E8F7EE] border-t-[#009E49] rounded-full animate-spin" />
              <p className="text-gray-500 mt-5 font-medium">
                Cargando productos...
              </p>
            </div>
          ) : error ? (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center text-red-700"
            >
              {error}
            </div>
          ) : productosVisibles.length === 0 ? (
            <div className="bg-[#F7FAF8] rounded-[28px] border border-[#DCEFE4] p-10 sm:p-16 text-center">
              <div className="w-20 h-20 mx-auto bg-[#E8F7EE] rounded-2xl flex items-center justify-center text-[#009E49] text-4xl">
                ⌕
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mt-6">
                No encontramos productos
              </h3>

              <p className="text-gray-500 mt-4 max-w-lg mx-auto">
                No hay productos registrados que coincidan con los criterios
                seleccionados.
              </p>

              <button
                type="button"
                onClick={verTodos}
                className="mt-7 bg-[#009E49] hover:bg-[#00843D] text-white px-7 py-3.5 rounded-xl font-black transition-colors"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {productosVisibles.map((producto) => {
                const destacado = productoDestacado === String(producto.id);

                return (
                  <div
                    key={producto.id}
                    id={`producto-${producto.id}`}
                    className={`min-w-0 scroll-mt-32 ${
                      destacado
                        ? "rounded-3xl ring-4 ring-[#009E49] ring-offset-4"
                        : ""
                    }`}
                  >
                    <TarjetaProducto producto={producto} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ======================================== */}
      {/* ASESORÍA PERSONALIZADA */}
      {/* ======================================== */}
      <section className="relative bg-[#073D27] text-white py-16 sm:py-20 overflow-hidden">
        <div className="pointer-events-none absolute -right-32 -top-32 w-80 h-80 rounded-full bg-[#009E49]/30 blur-3xl" />

        <div className="relative max-w-5xl mx-auto text-center px-5 sm:px-6">
          <span className="text-[#FFB17A] text-xs sm:text-sm font-black uppercase tracking-[0.18em]">
            Atención Personalizada
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-5 leading-tight">
            ¿Necesitas ayuda para
            <span className="block text-[#75E4A4]">elegir tu equipo?</span>
          </h2>

          <p className="text-base sm:text-lg text-green-50/80 mt-6 max-w-2xl mx-auto leading-relaxed">
            Te orientamos para encontrar la maquinaria adecuada según el trabajo
            que necesitas realizar.
          </p>

          <a
            href={whatsappAsesoria}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 mt-9 bg-[#FF6600] hover:bg-[#E65C00] text-white px-8 py-4 rounded-xl font-black shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            Solicitar Asesoría
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Catalogo;
