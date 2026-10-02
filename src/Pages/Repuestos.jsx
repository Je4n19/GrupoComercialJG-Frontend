import { useState, useEffect } from "react";

import { obtenerRepuestos } from "../Services/repuestoService";
import { obtenerCategoriasRepuesto } from "../Services/categoriaRepuestoService";

import Buscador from "../Components/Buscador";
import Footer from "../Components/Footer";

function Repuestos() {
  const [repuestos, setRepuestos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const repuestosData = await obtenerRepuestos();
      const categoriasData = await obtenerCategoriasRepuesto();

      setRepuestos(repuestosData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error(error);
    }
  };

  const repuestosFiltrados = repuestos.filter((repuesto) => {
    const coincideTexto =
      repuesto.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      repuesto.marca?.toLowerCase().includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "" || repuesto.categoria === categoria;

    return coincideTexto && coincideCategoria;
  });

  return (
    <>
      {/* HERO */}

      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            Grupo Comercial J&G
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6">
            Repuestos Originales
          </h1>

          <p className="text-xl text-green-100 mt-6 max-w-3xl mx-auto">
            Carburadores, pistones, filtros, bobinas, bujías y más repuestos
            para maquinaria agrícola y forestal.
          </p>
        </div>
      </section>

      {/* FILTROS */}

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6">Buscar Repuestos</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Buscador valor={busqueda} onChange={setBusqueda} />

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border border-gray-300 p-4 rounded-xl"
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
      </section>

      {/* CONTADOR */}

      <section className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Repuestos Disponibles</h2>

          <span className="bg-orange-100 text-orange-600 px-5 py-2 rounded-full font-semibold">
            {repuestosFiltrados.length} resultados
          </span>
        </div>
      </section>

      {/* REPUESTOS */}

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repuestosFiltrados.map((repuesto) => (
            <div
              key={repuesto.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
            >
              <div className="h-56 bg-gray-100">
                <img
                  src={
                    repuesto.imagen ||
                    "https://via.placeholder.com/400x300?text=Repuesto"
                  }
                  alt={repuesto.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {repuesto.categoria}
                </span>

                <h3 className="text-2xl font-bold mt-4">{repuesto.nombre}</h3>

                <p className="text-gray-500 mt-2">Marca: {repuesto.marca}</p>

                <p className="text-gray-600 mt-2">{repuesto.descripcion}</p>

                <div className="mt-5">
                  <p className="text-3xl font-bold text-green-700">
                    S/. {repuesto.precio}
                  </p>

                  <p className="text-gray-500 mt-2">Stock: {repuesto.stock}</p>
                </div>

                <a
                  href={`https://wa.me/51979501557?text=Hola,%20deseo%20información%20sobre%20${repuesto.nombre}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center mt-6 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                >
                  Consultar Disponibilidad
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="bg-orange-500 text-white py-16">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold">¿No encuentras el repuesto?</h2>

          <p className="mt-4 text-xl">
            Escríbenos por WhatsApp y te ayudaremos a ubicarlo.
          </p>

          <a
            href="https://wa.me/51979501557"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold"
          >
            Solicitar Repuesto
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Repuestos;
