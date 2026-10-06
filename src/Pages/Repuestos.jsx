import { useState, useEffect } from "react";

import { obtenerRepuestos } from "../Services/repuestoService";
import { obtenerCategoriasRepuesto } from "../Services/categoriaRepuestoService";

import Buscador from "../Components/Buscador";
import Footer from "../Components/Footer";

import imagenRepuestos from "../assets/repuesto.png";

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

      <section className="relative min-h-[520px] flex items-center text-white overflow-hidden">
        {/* Imagen de fondo */}
        <img
          src={imagenRepuestos}
          alt="Repuestos para maquinaria agrícola, forestal e industrial"
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
              Repuestos
              <span className="block text-orange-500 mt-2">Originales</span>
            </h1>

            {/* Descripción */}

            <p className="text-lg md:text-xl text-gray-200 mt-7 max-w-xl leading-relaxed">
              Amplio stock de repuestos para maquinaria agrícola, forestal e
              industrial. Calidad garantizada y disponibilidad inmediata.
            </p>

            {/* Botones */}

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#repuestos-disponibles"
                className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-xl font-black transition shadow-lg"
              >
                Ver Repuestos
              </a>

              <a
                href="https://wa.me/51979501557?text=Hola,%20deseo%20consultar%20por%20un%20repuesto"
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

      <section className="-mt-10 relative z-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Repuestos */}

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100">
            <h3 className="text-4xl font-black text-orange-500">
              {repuestos.length}
            </h3>

            <p className="text-gray-500 mt-2">Repuestos</p>
          </div>

          {/* Categorías */}

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100">
            <h3 className="text-4xl font-black text-orange-500">
              {categorias.length}
            </h3>

            <p className="text-gray-500 mt-2">Categorías</p>
          </div>

          {/* Originales */}

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100">
            <h3 className="text-4xl font-black text-orange-500">100%</h3>

            <p className="text-gray-500 mt-2">Originales</p>
          </div>

          {/* Cobertura */}

          <div className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100">
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

      <section
        id="repuestos-disponibles"
        className="max-w-7xl mx-auto px-6 mb-10 scroll-mt-32"
      >
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-4xl font-black">Repuestos Disponibles</h2>

          <span className="bg-orange-100 text-orange-600 px-6 py-3 rounded-full font-bold">
            {repuestosFiltrados.length} resultados
          </span>
        </div>
      </section>

      {/* GRID DE REPUESTOS */}

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repuestosFiltrados.map((repuesto) => (
            <div
              key={repuesto.id}
              className="group bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              {/* Imagen */}

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

              {/* Información */}

              <div className="p-7">
                <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold">
                  {repuesto.categoria}
                </span>

                <h3 className="text-2xl font-black mt-5">{repuesto.nombre}</h3>

                <p className="text-gray-500 mt-2">Marca: {repuesto.marca}</p>

                <p className="text-gray-600 mt-4 line-clamp-3">
                  {repuesto.descripcion}
                </p>

                {/* Precio y stock */}

                <div className="mt-6">
                  <p className="text-4xl font-black text-green-700">
                    S/. {repuesto.precio}
                  </p>

                  <p className="text-gray-500 mt-2">
                    Stock disponible: {repuesto.stock}
                  </p>
                </div>

                {/* WhatsApp */}

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

        {/* Sin resultados */}

        {repuestosFiltrados.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-5">🔧</div>

            <h3 className="text-3xl font-black text-gray-800">
              No encontramos repuestos
            </h3>

            <p className="text-gray-500 mt-3">
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
        )}
      </section>

      {/* CTA */}

      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-24">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-black">
            ¿No encuentras el repuesto?
          </h2>

          <p className="text-xl mt-6 text-orange-100">
            Nuestro equipo puede ayudarte a localizar el repuesto exacto para tu
            maquinaria.
          </p>

          <a
            href="https://wa.me/51979501557?text=Hola,%20estoy%20buscando%20un%20repuesto%20para%20mi%20maquinaria"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-10 bg-white text-orange-600 px-10 py-5 rounded-2xl font-black hover:scale-105 transition"
          >
            Solicitar Repuesto
          </a>
        </div>
      </section>

      {/* FOOTER */}

      <Footer />
    </>
  );
}

export default Repuestos;
