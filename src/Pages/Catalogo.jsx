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
      <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <span className="bg-white/20 px-4 py-2 rounded-full font-semibold">
            Catálogo J&G
          </span>

          <h1 className="text-5xl font-black mt-5 mb-4">
            Catálogo de Productos
          </h1>

          <p className="text-xl text-orange-100">
            Maquinaria agrícola, forestal e industrial de las mejores marcas.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white shadow-xl rounded-3xl p-6 text-center">
            <h3 className="text-4xl font-black text-orange-500">
              {productos.length}
            </h3>
            <p className="text-gray-600">Productos</p>
          </div>

          <div className="bg-white shadow-xl rounded-3xl p-6 text-center">
            <h3 className="text-4xl font-black text-orange-500">
              {categorias.length}
            </h3>
            <p className="text-gray-600">Categorías</p>
          </div>

          <div className="bg-white shadow-xl rounded-3xl p-6 text-center">
            <h3 className="text-4xl font-black text-orange-500">100%</h3>
            <p className="text-gray-600">Garantía</p>
          </div>

          <div className="bg-white shadow-xl rounded-3xl p-6 text-center">
            <h3 className="text-4xl font-black text-orange-500">Perú</h3>
            <p className="text-gray-600">Cobertura</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-black mb-6">Buscar Productos</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Buscador valor={busqueda} onChange={setBusqueda} />

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border border-gray-300 rounded-xl p-3"
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
              className="bg-gray-200 px-4 py-2 rounded-full font-semibold"
            >
              Todas
            </button>

            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoria(cat.nombre)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  categoria === cat.nombre
                    ? "bg-orange-500 text-white"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black">Productos Disponibles</h2>

          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">
            {productosFiltrados.length} productos
          </span>
        </div>

        {productosFiltrados.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-700">
              No se encontraron productos
            </h3>

            <p className="text-gray-500 mt-3">
              Intenta cambiar la categoría o búsqueda.
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
