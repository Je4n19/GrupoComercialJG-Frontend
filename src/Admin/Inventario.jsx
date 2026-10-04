import { useEffect, useState } from "react";
import MenuAdmin from "../Components/MenuAdmin";

import { obtenerProductos } from "../Services/productoService";
import { obtenerRepuestos } from "../Services/repuestoService";

function Inventario() {
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    cargarInventario();
  }, []);

  const cargarInventario = async () => {
    try {
      const productos = await obtenerProductos();
      const repuestos = await obtenerRepuestos();

      const productosFormateados = productos.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        categoria: item.categoria,
        stock: item.stock,
        tipo: "Producto",
      }));

      const repuestosFormateados = repuestos.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        categoria: item.categoria,
        stock: item.stock,
        tipo: "Repuesto",
      }));

      setInventario([...productosFormateados, ...repuestosFormateados]);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerEstado = (stock) => {
    if (stock <= 0) return "Sin Stock";
    if (stock <= 5) return "Bajo";
    if (stock <= 15) return "Medio";
    return "Alto";
  };

  const obtenerColor = (estado) => {
    switch (estado) {
      case "Alto":
        return "bg-green-100 text-green-700";

      case "Medio":
        return "bg-yellow-100 text-yellow-700";

      case "Bajo":
        return "bg-orange-100 text-orange-700";

      case "Sin Stock":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const stockAlto = inventario.filter(
    (item) => obtenerEstado(item.stock) === "Alto",
  ).length;

  const stockMedio = inventario.filter(
    (item) => obtenerEstado(item.stock) === "Medio",
  ).length;

  const stockBajo = inventario.filter(
    (item) => obtenerEstado(item.stock) === "Bajo",
  ).length;

  const sinStock = inventario.filter(
    (item) => obtenerEstado(item.stock) === "Sin Stock",
  ).length;

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-h-screen bg-orange-50">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white shadow-2xl">
          <div className="px-10 py-10">
            <p className="uppercase tracking-widest text-orange-100 text-sm">
              Grupo Comercial J&G
            </p>

            <h1 className="text-5xl font-bold mt-2">Gestión de Inventario</h1>

            <p className="text-orange-100 mt-3 text-lg">
              Control total del stock de productos y repuestos.
            </p>
          </div>
        </div>

        <div className="p-8">
          {/* KPI */}

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-3xl p-8 shadow-xl">
              <p>Stock Alto</p>

              <h2 className="text-5xl font-bold mt-3">{stockAlto}</h2>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-3xl p-8 shadow-xl">
              <p>Stock Medio</p>

              <h2 className="text-5xl font-bold mt-3">{stockMedio}</h2>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-3xl p-8 shadow-xl">
              <p>Stock Bajo</p>

              <h2 className="text-5xl font-bold mt-3">{stockBajo}</h2>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-3xl p-8 shadow-xl">
              <p>Sin Stock</p>

              <h2 className="text-5xl font-bold mt-3">{sinStock}</h2>
            </div>
          </div>

          {/* RESUMEN */}

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <p className="text-gray-500">Total de Registros</p>

              <h3 className="text-4xl font-bold mt-2 text-orange-600">
                {inventario.length}
              </h3>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <p className="text-gray-500">Productos con Riesgo</p>

              <h3 className="text-4xl font-bold mt-2 text-red-600">
                {stockBajo + sinStock}
              </h3>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <p className="text-gray-500">Inventario Saludable</p>

              <h3 className="text-4xl font-bold mt-2 text-green-600">
                {stockAlto + stockMedio}
              </h3>
            </div>
          </div>

          {/* TABLA */}

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-orange-500 text-white px-8 py-5">
              <h2 className="text-2xl font-bold">
                Estado General del Inventario
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-orange-100">
                  <tr>
                    <th className="p-4 text-left">ID</th>
                    <th className="text-left">Nombre</th>
                    <th className="text-left">Tipo</th>
                    <th className="text-left">Categoría</th>
                    <th className="text-left">Stock</th>
                    <th className="text-left">Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {inventario.map((item) => (
                    <tr
                      key={`${item.tipo}-${item.id}`}
                      className="border-b hover:bg-orange-50 transition"
                    >
                      <td className="p-4">{item.id}</td>

                      <td className="font-semibold">{item.nombre}</td>

                      <td>{item.tipo}</td>

                      <td>{item.categoria}</td>

                      <td>{item.stock}</td>

                      <td>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${obtenerColor(
                            obtenerEstado(item.stock),
                          )}`}
                        >
                          {obtenerEstado(item.stock)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ALERTAS */}

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Alertas de Inventario</h2>

            <div className="space-y-4">
              {inventario.filter((item) => item.stock <= 5).length > 0 ? (
                inventario
                  .filter((item) => item.stock <= 5)
                  .map((item) => (
                    <div
                      key={`${item.tipo}-${item.id}`}
                      className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl"
                    >
                      ⚠ {item.nombre} tiene stock crítico ({item.stock}{" "}
                      unidades)
                    </div>
                  ))
              ) : (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-xl">
                  ✅ No existen productos ni repuestos con stock crítico.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventario;
