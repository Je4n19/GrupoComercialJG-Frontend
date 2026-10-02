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
      setCategorias(data);
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
      await eliminarCategoria(id);
      cargarCategorias();
    }
  };

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-h-screen bg-gray-100">
        <div className="bg-orange-600 text-white p-6 shadow-lg">
          <h1 className="text-3xl font-bold">Gestión de Categorías</h1>

          <p className="mt-2">Administra las categorías del catálogo</p>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <p className="text-gray-500">Categorías Registradas</p>

              <h2 className="text-4xl font-bold text-orange-600 mt-2">
                {categorias.length}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <p className="text-gray-500">Estado</p>

              <h2 className="text-2xl font-bold text-green-600 mt-2">
                Activas
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <p className="text-gray-500">Gestión</p>

              <h2 className="text-2xl font-bold text-blue-600 mt-2">
                Categorías
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex justify-end">
              <Link
                to="/admin/categorias/nuevo"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
              >
                + Nueva Categoría
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="p-4 text-left">ID</th>
                  <th className="text-left">Nombre</th>
                  <th className="text-left">Descripción</th>
                  <th className="text-left">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{categoria.id}</td>

                    <td className="font-semibold">{categoria.nombre}</td>

                    <td>{categoria.descripcion}</td>

                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/categorias/editar/${categoria.id}`}
                          className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                        >
                          Editar
                        </Link>

                        <button
                          onClick={() => handleEliminar(categoria.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-lg"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categorias;
