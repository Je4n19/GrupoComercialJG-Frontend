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

      <div className="flex-1 min-h-screen bg-gray-100">
        <div className="bg-orange-600 text-white p-6 shadow-lg">
          <h1 className="text-3xl font-bold">Gestión de Inventario</h1>

          <p className="mt-2">Control de stock de productos y repuestos</p>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg">
              <p className="text-sm">Stock Alto</p>

              <h2 className="text-4xl font-bold mt-2">{stockAlto}</h2>
            </div>

            <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow-lg">
              <p className="text-sm">Stock Medio</p>

              <h2 className="text-4xl font-bold mt-2">{stockMedio}</h2>
            </div>

            <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-lg">
              <p className="text-sm">Stock Bajo</p>

              <h2 className="text-4xl font-bold mt-2">{stockBajo}</h2>
            </div>

            <div className="bg-red-500 text-white p-6 rounded-2xl shadow-lg">
              <p className="text-sm">Sin Stock</p>

              <h2 className="text-4xl font-bold mt-2">{sinStock}</h2>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Estado del Inventario</h2>
            </div>

            <table className="w-full">
              <thead className="bg-orange-500 text-white">
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
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4">{item.id}</td>

                    <td>{item.nombre}</td>

                    <td>{item.tipo}</td>

                    <td>{item.categoria}</td>

                    <td>{item.stock}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${obtenerColor(
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

          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Alertas de Inventario</h2>

            <div className="space-y-3">
              {inventario
                .filter((item) => item.stock <= 5)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-orange-100 border-l-4 border-orange-500 p-4"
                  >
                    ⚠ {item.nombre} tiene stock crítico ({item.stock} unidades)
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventario;
