import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { obtenerProductos } from "../Services/productoService";
import { obtenerCategorias } from "../Services/categoriaService";

import TarjetaProducto from "../Components/TarjetaProducto";
import Footer from "../Components/Footer";
import imagenProductos from "../assets/productos.png";

// Normaliza los textos para permitir búsquedas flexibles.
// Ejemplo: MS661, MS 661 y MS-661.
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

  // Parámetros recibidos desde el buscador del encabezado
  const busquedaURL = searchParams.get("buscar") || "";
  const categoriaURL = searchParams.get("categoria") || "";
  const productoDestacado = searchParams.get("destacado");

  // Datos del backend
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Filtros
  const [marca, setMarca] = useState("");
  const [orden, setOrden] = useState("nombre");
  const [soloStock, setSoloStock] = useState(false);

  // Estados de carga
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Cargar productos y categorías desde Render
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

  // Cambiar categoría sin perder el texto de búsqueda
  const cambiarCategoria = (valor) => {
    const parametros = new URLSearchParams(searchParams);

    if (valor) {
      parametros.set("categoria", valor);
    } else {
      parametros.delete("categoria");
    }

    parametros.delete("destacado");
    setSearchParams(parametros);
  };

  // Limpiar todos los filtros
  const limpiarFiltros = () => {
    setSearchParams({});
    setMarca("");
    setOrden("nombre");
    setSoloStock(false);
  };

  // Marcas disponibles obtenidas de los productos reales
  const marcasDisponibles = useMemo(() => {
    return [
      ...new Set(
        productos
          .map((producto) => String(producto.marca ?? "").trim())
          .filter(Boolean),
      ),
    ].sort((a, b) => a.localeCompare(b, "es"));
  }, [productos]);

  // Palabras introducidas en el buscador global
  const palabras = useMemo(() => {
    return normalizar(busquedaURL).split(/\s+/).filter(Boolean);
  }, [busquedaURL]);

  // Filtrado dinámico
  const productosFiltrados = useMemo(() => {
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

        // Busca en nombre, marca, modelo, categoría,
        // descripción y código.
        const coincideTexto = palabras.every((palabra) => {
          const token = compactar(palabra);

          return texto.includes(palabra) || compacto.includes(token);
        });

        const coincideCategoria =
          !categoriaURL ||
          normalizar(nombreCategoria) === normalizar(categoriaURL);

        const coincideMarca =
          !marca || normalizar(producto.marca) === normalizar(marca);

        const coincideStock = !soloStock || Number(producto.stock) > 0;

        return (
          coincideTexto && coincideCategoria && coincideMarca && coincideStock
        );
      })
      .sort((a, b) => {
        // Producto seleccionado desde las sugerencias:
        // aparece primero en el catálogo.
        if (productoDestacado) {
          if (String(a.id) === productoDestacado) {
            return -1;
          }

          if (String(b.id) === productoDestacado) {
            return 1;
          }
        }

        switch (orden) {
          case "precio-menor":
            return Number(a.precio ?? 0) - Number(b.precio ?? 0);

          case "precio-mayor":
            return Number(b.precio ?? 0) - Number(a.precio ?? 0);

          case "stock":
            return Number(b.stock ?? 0) - Number(a.stock ?? 0);

          default:
            return String(a.nombre ?? "").localeCompare(
              String(b.nombre ?? ""),
              "es",
            );
        }
      });
  }, [
    productos,
    palabras,
    categoriaURL,
    marca,
    soloStock,
    orden,
    productoDestacado,
  ]);

  const hayFiltros =
    Boolean(busquedaURL) ||
    Boolean(categoriaURL) ||
    Boolean(marca) ||
    soloStock ||
    orden !== "nombre";

  // Desplazarse automáticamente a los resultados
  // cuando se realiza una búsqueda desde el encabezado.
  useEffect(() => {
    if (cargando || !busquedaURL) return;

    const elemento = document.getElementById("productos-disponibles");

    elemento?.scrollIntoView({
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

      {/* FILTROS SIN BUSCADOR INTERNO */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[32px] shadow-xl p-6 sm:p-8 border border-gray-100">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                Filtrar Productos
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Personaliza los resultados por categoría, marca, precio y
                disponibilidad.
              </p>
            </div>

            <span className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-sm font-bold">
              Filtros de productos
            </span>
          </div>

          {/* BÚSQUEDA ACTIVA DEL ENCABEZADO */}
          {busquedaURL && (
            <div className="mb-6 flex flex-wrap items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl px-5 py-4">
              <span className="text-sm text-gray-600">Resultados para:</span>

              <span className="font-black text-orange-700">
                "{busquedaURL}"
              </span>

              <button
                type="button"
                onClick={() => {
                  const parametros = new URLSearchParams(searchParams);

                  parametros.delete("buscar");
                  parametros.delete("destacado");

                  setSearchParams(parametros);
                }}
                className="ml-auto text-sm font-bold text-orange-600 hover:underline"
              >
                Quitar búsqueda ✕
              </button>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* CATEGORÍA */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Categoría
              </label>

              <select
                value={categoriaURL}
                onChange={(e) => cambiarCategoria(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-4 bg-white text-gray-700 focus:outline-none focus:border-orange-500"
              >
                <option value="">Todas las categorías</option>

                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* MARCA */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Marca
              </label>

              <select
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-4 bg-white text-gray-700 focus:outline-none focus:border-orange-500"
              >
                <option value="">Todas las marcas</option>

                {marcasDisponibles.map((nombreMarca) => (
                  <option key={nombreMarca} value={nombreMarca}>
                    {nombreMarca}
                  </option>
                ))}
              </select>
            </div>

            {/* ORDENAMIENTO */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Ordenar productos
              </label>

              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-4 bg-white text-gray-700 focus:outline-none focus:border-orange-500"
              >
                <option value="nombre">Nombre A - Z</option>

                <option value="precio-menor">Precio: menor a mayor</option>

                <option value="precio-mayor">Precio: mayor a menor</option>

                <option value="stock">Mayor disponibilidad</option>
              </select>
            </div>

            {/* STOCK */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Disponibilidad
              </label>

              <label className="flex items-center gap-3 border-2 border-gray-200 rounded-2xl px-4 py-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={soloStock}
                  onChange={(e) => setSoloStock(e.target.checked)}
                  className="w-5 h-5 accent-orange-500"
                />

                <span className="text-sm text-gray-700 font-semibold">
                  Solo con stock
                </span>
              </label>
            </div>
          </div>

          {/* RESUMEN DE FILTROS */}
          {hayFiltros && (
            <div className="flex flex-wrap justify-between items-center gap-4 mt-7 pt-6 border-t">
              <p className="text-sm text-gray-500">
                Se encontraron{" "}
                <strong className="text-orange-600">
                  {productosFiltrados.length}
                </strong>{" "}
                productos.
              </p>

              <button
                type="button"
                onClick={limpiarFiltros}
                className="bg-gray-100 hover:bg-orange-100 text-gray-700 px-5 py-3 rounded-xl font-bold transition"
              >
                ✕ Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* RESULTADOS DEL CATÁLOGO */}
      <section
        id="productos-disponibles"
        className="max-w-7xl mx-auto px-6 pb-20 scroll-mt-32"
      >
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              {busquedaURL ? "Resultados de búsqueda" : "Productos Disponibles"}
            </h2>

            {busquedaURL && (
              <p className="text-gray-500 mt-2">
                Buscando:{" "}
                <strong className="text-orange-600">{busquedaURL}</strong>
              </p>
            )}
          </div>

          <span className="bg-orange-100 text-orange-600 px-6 py-3 rounded-full font-bold">
            {productosFiltrados.length} productos
          </span>
        </div>

        {/* CARGANDO */}
        {cargando ? (
          <div className="text-center py-16">
            <div className="inline-block w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />

            <p className="text-gray-500 mt-4">Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-2xl p-8 text-center text-red-700">
            {error}
          </div>
        ) : productosFiltrados.length === 0 ? (
          /* SIN RESULTADOS */
          <div className="bg-white rounded-[32px] shadow-xl p-10 sm:p-16 text-center border border-gray-100">
            <div className="text-6xl mb-5">🔎</div>

            <h3 className="text-2xl sm:text-3xl font-black text-gray-800">
              No encontramos productos
            </h3>

            <p className="text-gray-500 mt-4">
              No hay productos registrados que coincidan con tu búsqueda y los
              filtros seleccionados.
            </p>

            <button
              type="button"
              onClick={limpiarFiltros}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-bold"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          /* TARJETAS DE PRODUCTOS */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosFiltrados.map((producto) => {
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
