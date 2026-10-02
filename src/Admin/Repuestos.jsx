import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuAdmin from "../Components/MenuAdmin";

import {
  obtenerRepuestos,
  eliminarRepuesto,
} from "../Services/repuestoService";

function Repuestos() {
  const [repuestos, setRepuestos] = useState([]);

  const cargarRepuestos = async () => {
    try {
      const data = await obtenerRepuestos();
      setRepuestos(data);
    } catch (error) {
      console.error("Error al cargar repuestos:", error);
    }
  };

  useEffect(() => {
    cargarRepuestos();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Deseas eliminar este repuesto?")) {
      await eliminarRepuesto(id);
      cargarRepuestos();
    }
  };

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-h-screen bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Gestión de Repuestos
            </h1>

            <p className="text-gray-500 mt-2">
              Administra los repuestos registrados
            </p>
          </div>

          <Link
            to="/admin/repuestos/nuevo"
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
          >
            + Nuevo Repuesto
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Repuestos</p>

            <h2 className="text-4xl font-bold mt-2">{repuestos.length}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Stock Total</p>

            <h2 className="text-4xl font-bold mt-2">
              {repuestos.reduce((acc, item) => acc + item.stock, 0)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Valor Inventario</p>

            <h2 className="text-4xl font-bold mt-2 text-green-600">
              S/.{" "}
              {repuestos.reduce(
                (acc, item) => acc + item.precio * item.stock,
                0,
              )}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-4">ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {repuestos.map((repuesto) => (
                <tr key={repuesto.id} className="border-b">
                  <td className="p-4">{repuesto.id}</td>

                  <td>{repuesto.nombre}</td>

                  <td>S/. {repuesto.precio}</td>

                  <td>{repuesto.stock}</td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/repuestos/editar/${repuesto.id}`}
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                      >
                        Editar
                      </Link>

                      <button
                        onClick={() => handleEliminar(repuesto.id)}
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

        <div className="mt-6 text-gray-500">
          Mostrando {repuestos.length} repuestos registrados.
        </div>
      </div>
    </div>
  );
}

export default Repuestos;
