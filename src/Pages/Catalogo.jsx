import { useState, useEffect } from "react";

import { obtenerProductos } from "../Services/productoService";
import { obtenerCategorias } from "../Services/categoriaService";

import Buscador from "../Components/Buscador";
import TarjetaProducto from "../Components/TarjetaProducto";
import Footer from "../Components/Footer";

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const productosData = await obtenerProductos();
      const categoriasData = await obtenerCategorias();

      setProductos(productosData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Error cargando catálogo:", error);
    }
  };

  const productosFiltrados = productos.filter((producto) => {
    const coincideTexto =
      producto.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.marca?.toLowerCase().includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "" || producto.categoria === categoria;

    return coincideTexto && coincideCategoria;
  });

  return (
    <>
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Catálogo de Productos</h1>

          <p className="text-xl text-orange-100">
            Maquinaria agrícola, forestal e industrial de las mejores marcas.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h3 className="text-4xl font-bold text-orange-600">
              {productos.length}
            </h3>
            <p>Productos</p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h3 className="text-4xl font-bold text-green-600">
              {categorias.length}
            </h3>
            <p>Categorías</p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h3 className="text-4xl font-bold text-blue-600">100%</h3>
            <p>Garantía</p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h3 className="text-4xl font-bold text-red-600">Perú</h3>
            <p>Cobertura Nacional</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Buscar Productos</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Buscador valor={busqueda} onChange={setBusqueda} />

            <select
              className="border border-gray-300 p-3 rounded-lg"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
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
              className="bg-gray-200 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white"
            >
              Todas
            </button>

            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoria(cat.nombre)}
                className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition"
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Productos Disponibles</h2>

          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">
            {productosFiltrados.length} productos
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productosFiltrados.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Catalogo;
