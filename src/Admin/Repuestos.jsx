import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuAdmin from "../Components/MenuAdmin";

import {
  obtenerRepuestos,
  eliminarRepuesto,
} from "../Services/repuestoService";

function Repuestos() {
  const [repuestos, setRepuestos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarRepuestos();
  }, []);

  const cargarRepuestos = async () => {
    try {
      const data = await obtenerRepuestos();
      setRepuestos(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este repuesto?");

    if (!confirmar) return;

    try {
      await eliminarRepuesto(id);
      cargarRepuestos();
    } catch (error) {
      console.error(error);
    }
  };

  const repuestosFiltrados = repuestos.filter((repuesto) =>
    `${repuesto.nombre} ${repuesto.categoria}`
      .toLowerCase()
      .includes(busqueda.toLowerCase()),
  );

  const stockTotal = repuestos.reduce(
    (acc, item) => acc + (item.stock || 0),
    0,
  );

  const valorInventario = repuestos.reduce(
    (acc, item) => acc + (item.precio || 0) * (item.stock || 0),
    0,
  );

  const stockBajo = repuestos.filter((item) => (item.stock || 0) <= 5).length;

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-h-screen bg-orange-50">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white shadow-xl">
          <div className="px-10 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="uppercase tracking-widest text-orange-100 text-sm">
                Grupo Comercial J&G
              </p>

              <h1 className="text-5xl font-bold mt-2">Gestión de Repuestos</h1>

              <p className="mt-3 text-orange-100">
                Administración de repuestos y accesorios.
              </p>
            </div>

            <Link
              to="/admin/repuestos/nuevo"
              className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-orange-100 transition"
            >
              + Nuevo Repuesto
            </Link>
          </div>
        </div>

        <div className="p-8">
          {/* KPIs */}

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <p className="text-gray-500">Repuestos Registrados</p>

              <h2 className="text-5xl font-bold text-orange-600 mt-2">
                {repuestos.length}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <p className="text-gray-500">Stock Total</p>

              <h2 className="text-5xl font-bold text-green-600 mt-2">
                {stockTotal}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <p className="text-gray-500">Valor Inventario</p>

              <h2 className="text-3xl font-bold text-orange-600 mt-2">
                S/. {valorInventario.toFixed(2)}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <p className="text-gray-500">Stock Bajo</p>

              <h2 className="text-5xl font-bold text-red-600 mt-2">
                {stockBajo}
              </h2>
            </div>
          </div>

          {/* BUSCADOR */}

          <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
            <input
              type="text"
              placeholder="Buscar repuesto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4"
            />
          </div>

          {/* TABLA */}

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-orange-600 text-white px-8 py-5">
              <h2 className="text-2xl font-bold">Repuestos Registrados</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-orange-100">
                  <tr>
                    <th className="p-5 text-left">ID</th>
                    <th className="text-left">Nombre</th>
                    <th className="text-left">Categoría</th>
                    <th className="text-left">Precio</th>
                    <th className="text-left">Stock</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {repuestosFiltrados.map((repuesto) => (
                    <tr
                      key={repuesto.id}
                      className="border-b hover:bg-orange-50 transition"
                    >
                      <td className="p-5 font-bold">#{repuesto.id}</td>

                      <td className="font-semibold">{repuesto.nombre}</td>

                      <td>
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {repuesto.categoria}
                        </span>
                      </td>

                      <td className="font-bold text-green-600">
                        S/. {repuesto.precio}
                      </td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full font-semibold ${
                            repuesto.stock <= 5
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {repuesto.stock}
                        </span>
                      </td>

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

                  {repuestosFiltrados.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-12 text-gray-500"
                      >
                        No existen repuestos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ALERTAS */}

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-bold mb-5">
              Repuestos con Stock Bajo
            </h2>

            <div className="space-y-3">
              {repuestos
                .filter((r) => r.stock <= 5)
                .slice(0, 5)
                .map((repuesto) => (
                  <div
                    key={repuesto.id}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl"
                  >
                    ⚠ {repuesto.nombre} tiene solo {repuesto.stock} unidades.
                  </div>
                ))}

              {stockBajo === 0 && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-xl">
                  ✅ No existen repuestos con stock crítico.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Repuestos;
