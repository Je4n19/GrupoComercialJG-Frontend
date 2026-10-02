import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  obtenerCategoriasRepuesto,
  eliminarCategoriaRepuesto,
} from "../Services/categoriaRepuestoService";

function CategoriasRepuesto() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategoriasRepuesto();
      setCategorias(data);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Eliminar categoría?")) {
      try {
        await eliminarCategoriaRepuesto(id);
        cargarCategorias();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-h-screen bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Categorías de Repuestos</h1>

          <Link
            to="/admin/categorias-repuesto/nuevo"
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            + Nueva Categoría
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="text-left">Nombre</th>
                <th className="text-left">Descripción</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.id} className="border-b">
                  <td className="p-4">{categoria.id}</td>

                  <td>{categoria.nombre}</td>

                  <td>{categoria.descripcion}</td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/categorias-repuesto/editar/${categoria.id}`}
                        className="bg-blue-500 text-white px-3 py-2 rounded"
                      >
                        Editar
                      </Link>

                      <button
                        onClick={() => eliminar(categoria.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded"
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
  );
}

export default CategoriasRepuesto;
