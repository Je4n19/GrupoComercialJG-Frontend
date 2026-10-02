import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuAdmin from "../Components/MenuAdmin";
import {
  obtenerProductos,
  eliminarProducto,
} from "../services/productoService";

function Productos() {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data);
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

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-h-screen bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Gestión de Productos
            </h1>

            <p className="text-gray-500 mt-2">
              Administra maquinaria y equipos registrados
            </p>
          </div>

          <Link
            to="/admin/productos/nuevo"
            className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600"
          >
            + Nuevo Producto
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Productos</p>

            <h2 className="text-4xl font-bold mt-2">{productos.length}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Stock Total</p>

            <h2 className="text-4xl font-bold mt-2">
              {productos.reduce((acc, item) => acc + item.stock, 0)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500">Valor Inventario</p>

            <h2 className="text-4xl font-bold mt-2 text-green-600">
              S/.{" "}
              {productos.reduce(
                (acc, item) => acc + item.precio * item.stock,
                0,
              )}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-4">ID</th>
                <th>Producto</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id} className="border-b">
                  <td className="p-4">{producto.id}</td>

                  <td>{producto.nombre}</td>

                  <td>{producto.marca}</td>

                  <td>{producto.categoria}</td>

                  <td>S/. {producto.precio}</td>

                  <td>{producto.stock}</td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/productos/editar/${producto.id}`}
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                      >
                        Editar
                      </Link>

                      <button
                        onClick={() => handleEliminar(producto.id)}
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
  );
}

export default Productos;
