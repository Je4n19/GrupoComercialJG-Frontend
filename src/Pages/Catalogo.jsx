import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { obtenerProductos } from "../Services/productoService";
import { obtenerCategorias } from "../Services/categoriaService";

import Buscador from "../Components/Buscador";
import TarjetaProducto from "../Components/TarjetaProducto";
import Footer from "../Components/Footer";

import imagenProductos from "../assets/productos.png";

function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoriaURL = searchParams.get("categoria") || "";

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState(categoriaURL);
  const [marca, setMarca] = useState("");
  const [orden, setOrden] = useState("nombre");
  const [soloStock, setSoloStock] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [productosData, categoriasData] = await Promise.all([
          obtenerProductos(),
          obtenerCategorias(),
        ]);

        setProductos(Array.isArray(productosData) ? productosData : []);
        setCategorias(Array.isArray(categoriasData) ? categoriasData : []);
      } catch (error) {
        console.error("Error cargando catálogo:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  useEffect(() => {
    setCategoria(categoriaURL);
  }, [categoriaURL]);

  // Actualiza el filtro y la URL para mantener
  // la navegación por categorías funcionando.
  const cambiarCategoria = (nuevaCategoria) => {
    setCategoria(nuevaCategoria);

    const nuevosParametros = new URLSearchParams(searchParams);

    if (nuevaCategoria) {
      nuevosParametros.set("categoria", nuevaCategoria);
    } else {
      nuevosParametros.delete("categoria");
    }

    setSearchParams(nuevosParametros);
  };

  const limpiarFiltros = () => {
    setBusqueda("");
    setMarca("");
    setOrden("nombre");
    setSoloStock(false);
    cambiarCategoria("");
  };

  // Obtener marcas únicas directamente de los productos.
  const marcasDisponibles = [
    ...new Set(
      productos.map((producto) => producto.marca?.trim()).filter(Boolean),
    ),
  ].sort((a, b) => a.localeCompare(b, "es"));

  // Normalizar texto para búsquedas más flexibles.
  const normalizar = (valor) =>
    String(valor ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  // Aplicar filtros.
  const productosFiltrados = productos
    .filter((producto) => {
      const textoBuscado = normalizar(busqueda);

      const coincideTexto =
        normalizar(producto.nombre).includes(textoBuscado) ||
        normalizar(producto.marca).includes(textoBuscado) ||
        normalizar(producto.modelo).includes(textoBuscado);

      const coincideCategoria =
        !categoria || normalizar(producto.categoria) === normalizar(categoria);

      const coincideMarca =
        !marca || normalizar(producto.marca) === normalizar(marca);

      const coincideStock = !soloStock || Number(producto.stock) > 0;

      return (
        coincideTexto && coincideCategoria && coincideMarca && coincideStock
      );
    })
    .sort((a, b) => {
      switch (orden) {
        case "precio-menor":
          return Number(a.precio ?? 0) - Number(b.precio ?? 0);

        case "precio-mayor":
          return Number(b.precio ?? 0) - Number(a.precio ?? 0);

        case "stock":
          return Number(b.stock ?? 0) - Number(a.stock ?? 0);

        case "nombre":
        default:
          return String(a.nombre ?? "").localeCompare(
            String(b.nombre ?? ""),
            "es",
          );
      }
    });

  const hayFiltrosActivos =
    busqueda !== "" ||
    categoria !== "" ||
    marca !== "" ||
    soloStock ||
    orden !== "nombre";

  return (
    <>
      {/* HERO */}

      <section className="relative min-h-[520px] flex items-center text-white overflow-hidden">
        <img
          src={imagenProductos}
          alt="Maquinaria agrícola, forestal e industrial"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />

        <div className="absolute left-0 bottom-0 w-96 h-96 bg-orange-600/10 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center bg-orange-500/20 border border-orange-400/40 text-orange-300 px-5 py-2 rounded-full font-bold text-sm backdrop-blur-sm">
              Grupo Comercial J&G
            </span>

            <h1 className="text-5xl md:text-7xl font-black mt-7 leading-[0.95]">
              Catálogo de
              <span className="block text-orange-500 mt-2">Productos</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mt-7 max-w-xl leading-relaxed">
              Maquinaria agrícola, forestal e industrial para trabajos
              exigentes, con variedad de equipos, garantía y atención
              especializada.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#productos-disponibles"
                className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-xl font-black transition shadow-lg"
              >
                Ver Productos
              </a>

              <a
                href="https://wa.me/51979501557?text=Hola,%20deseo%20consultar%20por%20una%20máquina%20o%20equipo"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white px-7 py-4 rounded-xl font-black transition"
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
          <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100">
            <h3 className="text-4xl font-black text-orange-500">
              {productos.length}
            </h3>
            <p className="text-gray-500 mt-2">Productos</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100">
            <h3 className="text-4xl font-black text-orange-500">
              {categorias.length}
            </h3>
            <p className="text-gray-500 mt-2">Categorías</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100">
            <h3 className="text-4xl font-black text-orange-500">100%</h3>
            <p className="text-gray-500 mt-2">Garantía</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100">
            <h3 className="text-4xl font-black text-orange-500">Perú</h3>
            <p className="text-gray-500 mt-2">Cobertura Nacional</p>
          </div>
        </div>
      </section>

      {/* FILTROS AVANZADOS */}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[32px] shadow-xl p-6 sm:p-8 border border-gray-100">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                Buscar Productos
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Encuentra fácilmente el equipo que necesitas.
              </p>
            </div>

            <span className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-sm font-bold">
              Filtros de búsqueda
            </span>
          </div>

          {/* BÚSQUEDA PRINCIPAL */}

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Buscar por nombre, marca o modelo
              </label>

              <Buscador valor={busqueda} onChange={setBusqueda} />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Categoría
              </label>

              <select
                value={categoria}
                onChange={(e) => cambiarCategoria(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 bg-white text-gray-700 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
              >
                <option value="">Todas las categorías</option>

                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* FILTROS SECUNDARIOS */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Marca
              </label>

              <select
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 bg-white text-gray-700 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
              >
                <option value="">Todas las marcas</option>

                {marcasDisponibles.map((nombreMarca) => (
                  <option key={nombreMarca} value={nombreMarca}>
                    {nombreMarca}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Ordenar productos
              </label>

              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 bg-white text-gray-700 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition"
              >
                <option value="nombre">Nombre A - Z</option>
                <option value="precio-menor">Precio: menor a mayor</option>
                <option value="precio-mayor">Precio: mayor a menor</option>
                <option value="stock">Mayor disponibilidad</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Disponibilidad
              </label>

              <label className="flex items-center gap-3 border-2 border-gray-200 rounded-2xl px-5 py-4 cursor-pointer hover:border-orange-300 transition">
                <input
                  type="checkbox"
                  checked={soloStock}
                  onChange={(e) => setSoloStock(e.target.checked)}
                  className="w-5 h-5 accent-orange-500"
                />

                <span className="text-gray-700 font-semibold">
                  Solo productos con stock
                </span>
              </label>
            </div>
          </div>

          {/* LIMPIAR FILTROS */}

          {hayFiltrosActivos && (
            <div className="flex flex-wrap items-center justify-between gap-4 mt-7 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Se encontraron{" "}
                <span className="font-black text-orange-600">
                  {productosFiltrados.length}
                </span>{" "}
                productos con los filtros seleccionados.
              </p>

              <button
                type="button"
                onClick={limpiarFiltros}
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-600 px-5 py-3 rounded-xl font-bold transition"
              >
                ✕ Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PRODUCTOS */}

      <section
        id="productos-disponibles"
        className="max-w-7xl mx-auto px-6 pb-20 scroll-mt-32"
      >
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Productos Disponibles
          </h2>

          <span className="bg-orange-100 text-orange-600 px-6 py-3 rounded-full font-bold">
            {productosFiltrados.length} productos
          </span>
        </div>

        {cargando ? (
          <div className="text-center py-16">
            <div className="inline-block w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
            <p className="text-gray-500 mt-4">Cargando productos...</p>
          </div>
        ) : productosFiltrados.length === 0 ? (
          <div className="bg-white rounded-[32px] shadow-xl p-10 sm:p-16 text-center border border-gray-100">
            <div className="text-6xl mb-5">🔎</div>

            <h3 className="text-2xl sm:text-3xl font-black text-gray-800">
              No encontramos productos
            </h3>

            <p className="text-gray-500 mt-4">
              Prueba utilizando otro nombre, marca o categoría.
            </p>

            <button
              type="button"
              onClick={limpiarFiltros}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-bold transition"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosFiltrados.map((producto) => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}

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
            rel="noreferrer"
            className="inline-block mt-10 bg-white text-orange-600 px-10 py-5 rounded-2xl font-black hover:scale-105 transition"
          >
            Solicitar Asesoría
          </a>
        </div>
      </section>

      {/* FOOTER */}

      <Footer />
    </>
  );
}

export default Catalogo;
