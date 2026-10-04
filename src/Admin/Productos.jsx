import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuAdmin from "../Components/MenuAdmin";

import {
  obtenerProductos,
  eliminarProducto,
} from "../Services/productoService";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este producto?");

    if (!confirmar) return;

    try {
      await eliminarProducto(id);
      cargarProductos();
    } catch (error) {
      console.error(error);
    }
  };

  const productosFiltrados = productos.filter((producto) =>
    `${producto.nombre} ${producto.marca} ${producto.categoria}`
      .toLowerCase()
      .includes(busqueda.toLowerCase()),
  );

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

      <div className="flex-1 min-h-screen bg-orange-50">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white shadow-xl">
          <div className="px-10 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="uppercase tracking-widest text-orange-100 text-sm">
                Grupo Comercial J&G
              </p>

              <h1 className="text-5xl font-bold mt-2">Gestión de Productos</h1>

              <p className="mt-3 text-orange-100">
                Administración de maquinaria y equipos registrados.
              </p>
            </div>

            <Link
              to="/admin/productos/nuevo"
              className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-orange-100 transition"
            >
              + Nuevo Producto
            </Link>
          </div>
        </div>

        <div className="p-8">
          {/* KPIs */}

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <p className="text-gray-500">Productos Registrados</p>

              <h2 className="text-5xl font-bold text-orange-600 mt-2">
                {productos.length}
              </h2>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <p className="text-gray-500">Stock Total</p>

              <h2 className="text-5xl font-bold text-green-600 mt-2">
                {stockTotal}
              </h2>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <p className="text-gray-500">Valor Inventario</p>

              <h2 className="text-3xl font-bold text-orange-600 mt-2">
                S/. {valorInventario.toFixed(2)}
              </h2>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
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
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4"
            />
          </div>

          {/* TABLA */}

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-orange-600 text-white px-8 py-5">
              <h2 className="text-2xl font-bold">Productos Registrados</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-orange-100">
                  <tr>
                    <th className="p-5 text-left">ID</th>
                    <th className="text-left">Nombre</th>
                    <th className="text-left">Marca</th>
                    <th className="text-left">Categoría</th>
                    <th className="text-left">Precio</th>
                    <th className="text-left">Stock</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {productosFiltrados.map((producto) => (
                    <tr
                      key={producto.id}
                      className="border-b hover:bg-orange-50 transition"
                    >
                      <td className="p-5 font-bold">#{producto.id}</td>

                      <td className="font-semibold">{producto.nombre}</td>

                      <td>{producto.marca}</td>

                      <td>
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {producto.categoria}
                        </span>
                      </td>

                      <td className="font-bold text-green-600">
                        S/. {producto.precio}
                      </td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full font-semibold ${
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
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                          >
                            Editar
                          </Link>

                          <button
                            onClick={() => handleEliminar(producto.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {productosFiltrados.length === 0 && (
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

          {/* ALERTAS */}

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-bold mb-5">
              Productos con Stock Bajo
            </h2>

            <div className="space-y-3">
              {productos
                .filter((p) => p.stock <= 5)
                .slice(0, 5)
                .map((producto) => (
                  <div
                    key={producto.id}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl"
                  >
                    ⚠ {producto.nombre} tiene solo {producto.stock} unidades.
                  </div>
                ))}

              {stockBajo === 0 && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-xl">
                  ✅ No existen productos con stock crítico.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productos;
