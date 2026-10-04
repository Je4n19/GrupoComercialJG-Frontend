import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { obtenerProductos } from "../Services/productoService";
import { obtenerCategorias } from "../Services/categoriaService";

import Buscador from "../Components/Buscador";
import TarjetaProducto from "../Components/TarjetaProducto";
import Footer from "../Components/Footer";

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

      <section
        className="relative py-32 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/65"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <span className="bg-orange-500 px-5 py-2 rounded-full font-bold">
            Grupo Comercial J&G
          </span>

          <h1 className="text-6xl lg:text-7xl font-black mt-6">
            Catálogo de Productos
          </h1>

          <p className="text-xl text-gray-200 mt-5 max-w-3xl">
            Maquinaria agrícola, forestal e industrial de las mejores marcas,
            respaldada por garantía y soporte técnico especializado.
          </p>
        </div>
      </section>

      {/* ESTADÍSTICAS */}

      <section className="max-w-7xl mx-auto px-6 -mt-14 relative z-20">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-orange-100">
            <h3 className="text-5xl font-black text-orange-500">
              {productos.length}
            </h3>

            <p className="text-gray-600 mt-2">Productos</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-orange-100">
            <h3 className="text-5xl font-black text-orange-500">
              {categorias.length}
            </h3>

            <p className="text-gray-600 mt-2">Categorías</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-orange-100">
            <h3 className="text-5xl font-black text-orange-500">100%</h3>

            <p className="text-gray-600 mt-2">Garantía</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-orange-100">
            <h3 className="text-5xl font-black text-orange-500">Perú</h3>

            <p className="text-gray-600 mt-2">Cobertura Nacional</p>
          </div>
        </div>
      </section>

      {/* FILTROS */}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
          <h2 className="text-4xl font-black mb-8 text-gray-900">
            Buscar Productos
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <Buscador valor={busqueda} onChange={setBusqueda} />

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border border-gray-200 rounded-2xl p-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todas las categorías</option>

              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCategoria("")}
              className={`px-5 py-3 rounded-full font-semibold transition ${
                categoria === ""
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Todas
            </button>

            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoria(cat.nombre)}
                className={`px-5 py-3 rounded-full font-semibold transition ${
                  categoria === cat.nombre
                    ? "bg-orange-500 text-white"
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

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <h2 className="text-4xl font-black text-gray-900">
            Productos Disponibles
          </h2>

          <span className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg">
            {productosFiltrados.length} productos
          </span>
        </div>

        {productosFiltrados.length === 0 ? (
          <div className="bg-white rounded-[40px] shadow-2xl p-16 text-center border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-800">
              No se encontraron productos
            </h3>

            <p className="text-gray-500 mt-4">
              Intenta modificar los filtros o realizar otra búsqueda.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productosFiltrados.map((producto) => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Catalogo;
