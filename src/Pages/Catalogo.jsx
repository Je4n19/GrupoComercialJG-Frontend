import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { obtenerProductos } from "../Services/productoService";
import { obtenerCategorias } from "../Services/categoriaService";

import TarjetaProducto from "../Components/TarjetaProducto";
import Footer from "../Components/Footer";
import imagenProductos from "../assets/productos.png";

// Normaliza nombres para búsquedas flexibles
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
  if (typeof categoria === "string") {
    return categoria;
  }

  return categoria?.nombre || "";
};

function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Búsqueda recibida desde el encabezado
  const busquedaURL = searchParams.get("buscar") || "";
  const categoriaURL = searchParams.get("categoria") || "";
  const productoDestacado = searchParams.get("destacado");

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Obtener productos y categorías desde Render
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
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarDatos();

    return () => {
      activo = false;
    };
  }, []);

  // Palabras del buscador global
  const palabras = useMemo(() => {
    return normalizar(busquedaURL).split(/\s+/).filter(Boolean);
  }, [busquedaURL]);

  // Mostrar todos los productos normalmente.
  // Solo aplicar búsqueda si viene desde el encabezado.
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

        // Conserva la navegación por categorías
        // desde otras secciones de la web.
        const coincideCategoria =
          !categoriaURL ||
          normalizar(nombreCategoria) === normalizar(categoriaURL);

        return coincideBusqueda && coincideCategoria;
      })
      .sort((a, b) => {
        if (productoDestacado) {
          if (String(a.id) === productoDestacado) {
            return -1;
          }

          if (String(b.id) === productoDestacado) {
            return 1;
          }
        }

        return String(a.nombre ?? "").localeCompare(
          String(b.nombre ?? ""),
          "es",
        );
      });
  }, [productos, palabras, categoriaURL, productoDestacado]);

  // Limpiar la búsqueda global
  const quitarBusqueda = () => {
    const parametros = new URLSearchParams(searchParams);

    parametros.delete("buscar");
    parametros.delete("destacado");

    setSearchParams(parametros);
  };

  const verTodos = () => {
    setSearchParams({});
  };

  // Ir automáticamente a los productos después de buscar
  useEffect(() => {
    if (cargando || !busquedaURL) return;

    document.getElementById("productos-disponibles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [busquedaURL, productoDestacado, cargando]);

  return (
    <>
      {/* HERO PRINCIPAL */}
      <section className="relative min-h-[520px] flex items-center text-white overflow-hidden">
        <img
          src={imagenProductos}
          alt="Maquinaria agrícola, forestal e industrial"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center bg-orange-500/20 border border-orange-400/40 text-orange-300 px-5 py-2 rounded-full font-bold text-sm">
              Grupo Comercial J&G
            </span>

            <h1 className="text-5xl md:text-7xl font-black mt-7 leading-tight">
              Catálogo de
              <span className="block text-orange-500">Productos</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mt-7 max-w-xl">
              Maquinaria agrícola, forestal e industrial para trabajos
              exigentes, con variedad de equipos, garantía y atención
              especializada.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#productos-disponibles"
                className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-xl font-black transition"
              >
                Ver Productos
              </a>

              <a
                href="https://wa.me/51979501557?text=Hola,%20deseo%20consultar%20por%20una%20máquina%20o%20equipo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-7 py-4 rounded-xl font-black transition"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            [productos.length, "Productos"],
            [categorias.length, "Categorías"],
            ["100%", "Garantía"],
            ["Perú", "Cobertura Nacional"],
          ].map(([valor, titulo]) => (
            <div
              key={titulo}
              className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100"
            >
              <h3 className="text-4xl font-black text-orange-500">{valor}</h3>

              <p className="text-gray-500 mt-2">{titulo}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTOS: SIN PANEL DE FILTROS */}
      <section
        id="productos-disponibles"
        className="max-w-7xl mx-auto px-6 pt-20 pb-20 scroll-mt-32"
      >
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              {busquedaURL ? "Resultados de búsqueda" : "Productos Disponibles"}
            </h2>

            {busquedaURL && (
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <p className="text-gray-500">
                  Buscando:{" "}
                  <strong className="text-orange-600">{busquedaURL}</strong>
                </p>

                <button
                  type="button"
                  onClick={quitarBusqueda}
                  className="text-sm font-bold text-orange-600 hover:underline"
                >
                  Quitar búsqueda ✕
                </button>
              </div>
            )}

            {!busquedaURL && categoriaURL && (
              <p className="text-gray-500 mt-3">
                Categoría:{" "}
                <strong className="text-orange-600">{categoriaURL}</strong>
              </p>
            )}
          </div>

          <span className="bg-orange-100 text-orange-600 px-6 py-3 rounded-full font-bold">
            {productosVisibles.length} productos
          </span>
        </div>

        {/* ESTADO DE CARGA */}
        {cargando ? (
          <div className="text-center py-16">
            <div className="inline-block w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />

            <p className="text-gray-500 mt-4">Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-2xl p-8 text-center text-red-700">
            {error}
          </div>
        ) : productosVisibles.length === 0 ? (
          <div className="bg-white rounded-[32px] shadow-xl p-10 sm:p-16 text-center border border-gray-100">
            <div className="text-6xl mb-5">🔎</div>

            <h3 className="text-2xl sm:text-3xl font-black text-gray-800">
              No encontramos productos
            </h3>

            <p className="text-gray-500 mt-4">
              No hay productos registrados que coincidan con la búsqueda
              realizada.
            </p>

            <button
              type="button"
              onClick={verTodos}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-bold transition"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosVisibles.map((producto) => {
              const destacado = productoDestacado === String(producto.id);

              return (
                <div
                  key={producto.id}
                  id={`producto-${producto.id}`}
                  className={
                    destacado
                      ? "rounded-3xl ring-4 ring-orange-500 ring-offset-4 transition-all"
                      : ""
                  }
                >
                  <TarjetaProducto producto={producto} />
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ASESORÍA */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-24">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-black">
            ¿Necesitas ayuda para elegir tu equipo?
          </h2>

          <p className="text-xl mt-6 text-orange-100 max-w-3xl mx-auto">
            Te ayudamos a encontrar la maquinaria adecuada según el trabajo que
            necesitas realizar.
          </p>

          <a
            href="https://wa.me/51979501557?text=Hola,%20necesito%20asesoría%20para%20elegir%20una%20máquina"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 bg-white text-orange-600 px-10 py-5 rounded-2xl font-black hover:scale-105 transition"
          >
            Solicitar Asesoría
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Catalogo;
