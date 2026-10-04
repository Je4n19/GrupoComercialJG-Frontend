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

      setRepuestos(repuestosData || []);
      setCategorias(categoriasData || []);
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

      <section className="relative bg-gradient-to-r from-gray-950 via-gray-900 to-orange-900 text-white py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="bg-orange-500/20 border border-orange-400/30 px-5 py-2 rounded-full font-semibold">
            Grupo Comercial J&G
          </span>

          <h1 className="text-5xl md:text-7xl font-black mt-8">
            Repuestos
            <span className="block text-orange-400">Originales</span>
          </h1>

          <p className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto">
            Amplio stock de repuestos para maquinaria agrícola, forestal e
            industrial. Calidad garantizada y disponibilidad inmediata.
          </p>
        </div>
      </section>

      {/* ESTADISTICAS */}

      <section className="-mt-12 relative z-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
            <h3 className="text-4xl font-black text-orange-500">
              {repuestos.length}
            </h3>

            <p className="text-gray-500 mt-2">Repuestos</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
            <h3 className="text-4xl font-black text-orange-500">
              {categorias.length}
            </h3>

            <p className="text-gray-500 mt-2">Categorías</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
            <h3 className="text-4xl font-black text-orange-500">100%</h3>

            <p className="text-gray-500 mt-2">Originales</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center">
            <h3 className="text-4xl font-black text-orange-500">Perú</h3>

            <p className="text-gray-500 mt-2">Cobertura</p>
          </div>
        </div>
      </section>

      {/* FILTROS */}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[32px] shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-black mb-8">Buscar Repuestos</h2>

          <div className="grid md:grid-cols-2 gap-5">
            <Buscador valor={busqueda} onChange={setBusqueda} />

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
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

      <section className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-4xl font-black">Repuestos Disponibles</h2>

          <span className="bg-orange-100 text-orange-600 px-6 py-3 rounded-full font-bold">
            {repuestosFiltrados.length} resultados
          </span>
        </div>
      </section>

      {/* GRID */}

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repuestosFiltrados.map((repuesto) => (
            <div
              key={repuesto.id}
              className="group bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-64 overflow-hidden bg-gray-100">
                <img
                  src={
                    repuesto.imagen ||
                    "https://via.placeholder.com/400x300?text=Repuesto"
                  }
                  alt={repuesto.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-7">
                <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold">
                  {repuesto.categoria}
                </span>

                <h3 className="text-2xl font-black mt-5">{repuesto.nombre}</h3>

                <p className="text-gray-500 mt-2">Marca: {repuesto.marca}</p>

                <p className="text-gray-600 mt-4 line-clamp-3">
                  {repuesto.descripcion}
                </p>

                <div className="mt-6">
                  <p className="text-4xl font-black text-green-700">
                    S/. {repuesto.precio}
                  </p>

                  <p className="text-gray-500 mt-2">
                    Stock disponible: {repuesto.stock}
                  </p>
                </div>

                <a
                  href={`https://wa.me/51979501557?text=Hola,%20deseo%20información%20sobre%20${repuesto.nombre}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center mt-7 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold transition"
                >
                  Consultar Disponibilidad
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-24">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-5xl font-black">¿No encuentras el repuesto?</h2>

          <p className="text-xl mt-6 text-orange-100">
            Nuestro equipo puede ayudarte a localizar el repuesto exacto para tu
            maquinaria.
          </p>

          <a
            href="https://wa.me/51979501557"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-10 bg-white text-orange-600 px-10 py-5 rounded-2xl font-black hover:scale-105 transition"
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
