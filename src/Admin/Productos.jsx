import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuAdmin from "../Components/MenuAdmin";
import {
  obtenerProductos,
  eliminarProducto,
} from "../Services/productoService";

function Productos() {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data || []);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Deseas eliminar este producto?")) {
      await eliminarProducto(id);
      cargarProductos();
    }
  };

  const stockTotal = productos.reduce(
    (acc, item) => acc + (item.stock || 0),
    0,
  );

  const valorInventario = productos.reduce(
    (acc, item) => acc + (item.precio || 0) * (item.stock || 0),
    0,
  );

  const stockBajo = productos.filter((item) => (item.stock || 0) <= 5).length;

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-h-screen bg-slate-100">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-600 text-white">
          <div className="px-10 py-10 flex flex-col lg:flex-row justify-between items-center gap-6">
            <div>
              <p className="uppercase tracking-widest text-orange-300 text-sm">
                Administración J&G
              </p>

              <h1 className="text-5xl font-black mt-2">Gestión de Productos</h1>

              <p className="text-slate-300 mt-3">
                Control y administración de maquinaria registrada.
              </p>
            </div>

            <Link
              to="/admin/productos/nuevo"
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl font-bold shadow-xl transition"
            >
              + Nuevo Producto
            </Link>
          </div>
        </div>

        <div className="p-8">
          {/* KPIs */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-3xl shadow-xl p-6 border-l-4 border-orange-500">
              <p className="text-gray-500">Productos</p>

              <h2 className="text-5xl font-black mt-2 text-slate-800">
                {productos.length}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border-l-4 border-green-500">
              <p className="text-gray-500">Stock Total</p>

              <h2 className="text-5xl font-black mt-2 text-green-600">
                {stockTotal}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border-l-4 border-orange-600">
              <p className="text-gray-500">Valor Inventario</p>

              <h2 className="text-4xl font-black mt-2 text-orange-600">
                S/. {valorInventario.toFixed(2)}
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border-l-4 border-red-500">
              <p className="text-gray-500">Stock Bajo</p>

              <h2 className="text-5xl font-black mt-2 text-red-600">
                {stockBajo}
              </h2>
            </div>
          </div>

          {/* TABLA */}

          <div className="bg-white rounded-[30px] shadow-2xl overflow-hidden">
            <div className="bg-slate-900 text-white px-8 py-5">
              <h2 className="text-2xl font-bold">Productos Registrados</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="p-5 text-left">ID</th>
                    <th className="text-left">Producto</th>
                    <th className="text-left">Marca</th>
                    <th className="text-left">Categoría</th>
                    <th className="text-left">Precio</th>
                    <th className="text-left">Stock</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {productos.map((producto) => (
                    <tr
                      key={producto.id}
                      className="border-b hover:bg-orange-50 transition"
                    >
                      <td className="p-5 font-semibold">#{producto.id}</td>

                      <td>
                        <div>
                          <p className="font-bold text-slate-800">
                            {producto.nombre}
                          </p>
                        </div>
                      </td>

                      <td>{producto.marca}</td>

                      <td>
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                          {producto.categoria}
                        </span>
                      </td>

                      <td className="font-bold text-green-600">
                        S/. {producto.precio}
                      </td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            producto.stock <= 5
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {producto.stock}
                        </span>
                      </td>

                      <td>
                        <div className="flex justify-center gap-3">
                          <Link
                            to={`/admin/productos/editar/${producto.id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition"
                          >
                            ✏ Editar
                          </Link>

                          <button
                            onClick={() => handleEliminar(producto.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition"
                          >
                            🗑 Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {productos.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-12 text-gray-500"
                      >
                        No existen productos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productos;
