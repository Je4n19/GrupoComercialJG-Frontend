import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { obtenerProductos } from "../Services/productoService";
import { obtenerCategorias } from "../Services/categoriaService";

import Buscador from "../Components/Buscador";
import TarjetaProducto from "../Components/TarjetaProducto";
import Footer from "../Components/Footer";

import imagenProductos from "../assets/productos.png";

function Catalogo() {
  const [searchParams] = useSearchParams();

  const categoriaURL = searchParams.get("categoria") || "";

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState(categoriaURL);

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    setCategoria(categoriaURL);
  }, [categoriaURL]);

  const cargarDatos = async () => {
    try {
      const productosData = await obtenerProductos();
      const categoriasData = await obtenerCategorias();

      setProductos(productosData || []);
      setCategorias(categoriasData || []);
    } catch (error) {
      console.error("Error cargando catálogo:", error);
    }
  };

  const productosFiltrados = productos.filter((producto) => {
    const coincideTexto =
      producto.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.marca?.toLowerCase().includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "" ||
      producto.categoria?.toLowerCase() === categoria.toLowerCase();

    return coincideTexto && coincideCategoria;
  });

  return (
    <>
      {/* HERO */}

      <section className="relative min-h-[520px] flex items-center text-white overflow-hidden">
        {/* Imagen de fondo */}
        <img
          src={imagenProductos}
          alt="Maquinaria agrícola, forestal e industrial"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Capa oscura */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10"></div>

        {/* Efecto naranja */}
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-orange-600/10 blur-3xl rounded-full"></div>

        {/* Contenido */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-2xl">
            {/* Etiqueta */}

            <span className="inline-flex items-center bg-orange-500/20 border border-orange-400/40 text-orange-300 px-5 py-2 rounded-full font-bold text-sm backdrop-blur-sm">
              Grupo Comercial J&G
            </span>

            {/* Título */}

            <h1 className="text-5xl md:text-7xl font-black mt-7 leading-[0.95]">
              Catálogo de
              <span className="block text-orange-500 mt-2">Productos</span>
            </h1>

            {/* Descripción */}

            <p className="text-lg md:text-xl text-gray-200 mt-7 max-w-xl leading-relaxed">
              Maquinaria agrícola, forestal e industrial para trabajos
              exigentes, con variedad de equipos, garantía y atención
              especializada.
            </p>

            {/* Botones */}

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
          {/* Productos */}

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100">
            <h3 className="text-4xl font-black text-orange-500">
              {productos.length}
            </h3>

            <p className="text-gray-500 mt-2">Productos</p>
          </div>

          {/* Categorías */}

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100">
            <h3 className="text-4xl font-black text-orange-500">
              {categorias.length}
            </h3>

            <p className="text-gray-500 mt-2">Categorías</p>
          </div>

          {/* Garantía */}

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100">
            <h3 className="text-4xl font-black text-orange-500">100%</h3>

            <p className="text-gray-500 mt-2">Garantía</p>
          </div>

          {/* Cobertura */}

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100">
            <h3 className="text-4xl font-black text-orange-500">Perú</h3>

            <p className="text-gray-500 mt-2">Cobertura Nacional</p>
          </div>
        </div>
      </section>

      {/* FILTROS */}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[32px] shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-black mb-8 text-gray-900">
            Buscar Productos
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <Buscador valor={busqueda} onChange={setBusqueda} />

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border border-gray-300 rounded-2xl px-5 py-4 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todas las categorías</option>

              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* BOTONES DE CATEGORÍAS */}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCategoria("")}
              className={`px-5 py-3 rounded-full font-semibold transition ${
                categoria === ""
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
              }`}
            >
              Todas
            </button>

            {categorias.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setCategoria(cat.nombre)}
                className={`px-5 py-3 rounded-full font-semibold transition ${
                  categoria === cat.nombre
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white"
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}

      <section
        id="productos-disponibles"
        className="max-w-7xl mx-auto px-6 pb-20 scroll-mt-32"
      >
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <h2 className="text-4xl font-black text-gray-900">
            Productos Disponibles
          </h2>

          <span className="bg-orange-100 text-orange-600 px-6 py-3 rounded-full font-bold">
            {productosFiltrados.length} productos
          </span>
        </div>

        {/* SIN RESULTADOS */}

        {productosFiltrados.length === 0 ? (
          <div className="bg-white rounded-[32px] shadow-xl p-16 text-center border border-gray-100">
            <div className="text-6xl mb-5">🔎</div>

            <h3 className="text-3xl font-black text-gray-800">
              No encontramos productos
            </h3>

            <p className="text-gray-500 mt-4">
              Prueba utilizando otro nombre, marca o categoría.
            </p>

            <button
              type="button"
              onClick={() => {
                setBusqueda("");
                setCategoria("");
              }}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-bold transition"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          /* GRID */

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
