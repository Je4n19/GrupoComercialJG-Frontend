import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  obtenerCategorias,
  eliminarCategoria,
} from "../Services/categoriaService";

function Categorias() {
  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data || []);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar esta categoría?");

    if (confirmar) {
      try {
        await eliminarCategoria(id);
        cargarCategorias();
      } catch (error) {
        console.error(error);
        alert("No se pudo eliminar la categoría.");
      }
    }
  };

  const gruposRegistrados = new Set(
    categorias.map((categoria) => categoria.grupo).filter(Boolean),
  ).size;

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-h-screen bg-orange-50">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white shadow-2xl">
          <div className="px-10 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="uppercase tracking-widest text-orange-100 text-sm">
                Grupo Comercial J&G
              </p>

              <h1 className="text-5xl font-bold mt-2">Gestión de Categorías</h1>

              <p className="text-orange-100 mt-3 text-lg">
                Organización de grupos y categorías del catálogo.
              </p>
            </div>

            <Link
              to="/admin/categorias/nuevo"
              className="mt-6 lg:mt-0 bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
            >
              + Nueva Categoría
            </Link>
          </div>
        </div>

        <div className="p-8">
          {/* KPIs */}

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <p className="text-gray-500">Categorías Registradas</p>

              <h2 className="text-5xl font-black text-orange-600 mt-3">
                {categorias.length}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <p className="text-gray-500">Grupos Registrados</p>

              <h2 className="text-5xl font-black text-orange-600 mt-3">
                {gruposRegistrados}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <p className="text-gray-500">Estado del Sistema</p>

              <h2 className="text-3xl font-black text-green-600 mt-3">
                Activo
              </h2>
            </div>
          </div>

          {/* TABLA */}

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-orange-500 text-white px-8 py-5">
              <h2 className="text-2xl font-bold">Listado de Categorías</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-orange-100">
                  <tr>
                    <th className="p-5 text-left font-bold">ID</th>

                    <th className="text-left font-bold">Grupo</th>

                    <th className="text-left font-bold">Categoría</th>

                    <th className="text-left font-bold">Descripción</th>

                    <th className="text-center font-bold">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {categorias.length > 0 ? (
                    categorias.map((categoria) => (
                      <tr
                        key={categoria.id}
                        className="border-b hover:bg-orange-50 transition"
                      >
                        <td className="p-5 font-semibold">#{categoria.id}</td>

                        <td className="pr-5">
                          {categoria.grupo ? (
                            <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold">
                              {categoria.grupo}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">
                              Sin grupo
                            </span>
                          )}
                        </td>

                        <td className="pr-5">
                          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">
                            {categoria.nombre}
                          </span>
                        </td>

                        <td className="text-gray-600 pr-5">
                          {categoria.descripcion || "Sin descripción"}
                        </td>

                        <td className="p-5">
                          <div className="flex justify-center gap-3">
                            <Link
                              to={`/admin/categorias/editar/${categoria.id}`}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition"
                            >
                              Editar
                            </Link>

                            <button
                              onClick={() => handleEliminar(categoria.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-12 text-gray-500"
                      >
                        No existen categorías registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RESUMEN */}

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-bold mb-4">
              Organización del Catálogo
            </h2>

            <p className="text-gray-600">
              Actualmente existen{" "}
              <span className="font-bold text-orange-600">
                {categorias.length}
              </span>{" "}
              categorías distribuidas en{" "}
              <span className="font-bold text-orange-600">
                {gruposRegistrados}
              </span>{" "}
              grupos de productos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categorias;
