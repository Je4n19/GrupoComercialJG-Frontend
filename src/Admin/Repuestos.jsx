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
      setRepuestos(data || []);
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

  const stockTotal = repuestos.reduce(
    (acc, item) => acc + (item.stock || 0),
    0,
  );

  const valorInventario = repuestos.reduce(
    (acc, item) => acc + (item.precio || 0) * (item.stock || 0),
    0,
  );

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-h-screen bg-orange-50">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white">
          <div className="px-10 py-10 flex justify-between items-center">
            <div>
              <p className="uppercase tracking-widest text-orange-100 text-sm">
                Administración
              </p>

              <h1 className="text-5xl font-black mt-2">Gestión de Repuestos</h1>

              <p className="mt-3 text-orange-100">
                Control de repuestos y accesorios.
              </p>
            </div>

            <Link
              to="/admin/repuestos/nuevo"
              className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
            >
              + Nuevo Repuesto
            </Link>
          </div>
        </div>

        <div className="p-8">
          {/* KPIS */}

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <p className="text-gray-500">Repuestos Registrados</p>

              <h2 className="text-5xl font-black text-orange-600 mt-3">
                {repuestos.length}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <p className="text-gray-500">Stock Total</p>

              <h2 className="text-5xl font-black text-orange-600 mt-3">
                {stockTotal}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <p className="text-gray-500">Valor Inventario</p>

              <h2 className="text-4xl font-black text-green-600 mt-3">
                S/. {valorInventario.toFixed(2)}
              </h2>
            </div>
          </div>

          {/* TABLA */}

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-orange-600 text-white px-8 py-5">
              <h2 className="text-2xl font-bold">Repuestos Registrados</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-orange-50">
                  <tr>
                    <th className="p-5 text-left">ID</th>
                    <th className="text-left">Nombre</th>
                    <th className="text-left">Precio</th>
                    <th className="text-left">Stock</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {repuestos.map((repuesto) => (
                    <tr
                      key={repuesto.id}
                      className="border-b hover:bg-orange-50 transition"
                    >
                      <td className="p-5">{repuesto.id}</td>

                      <td className="font-semibold">{repuesto.nombre}</td>

                      <td className="font-bold text-green-600">
                        S/. {repuesto.precio}
                      </td>

                      <td>{repuesto.stock}</td>

                      <td>
                        <div className="flex justify-center gap-3">
                          <Link
                            to={`/admin/repuestos/editar/${repuesto.id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                          >
                            Editar
                          </Link>

                          <button
                            onClick={() => handleEliminar(repuesto.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
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

          <p className="mt-6 text-gray-500">
            Mostrando {repuestos.length} repuestos registrados.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Repuestos;
