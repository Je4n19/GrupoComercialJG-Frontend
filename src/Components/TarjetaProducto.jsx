import { Link } from "react-router-dom";

function TarjetaProducto({ producto }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      <img
        src={
          producto.imagen || "https://via.placeholder.com/400x300?text=Producto"
        }
        alt={producto.nombre}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <span className="text-orange-600 font-semibold">{producto.marca}</span>

        <h3 className="text-xl font-bold mt-2">{producto.nombre}</h3>

        <p className="text-gray-500">{producto.categoria}</p>

        <p className="mt-3 text-gray-700">{producto.descripcion}</p>

        <div className="mt-4">
          <p className="text-2xl font-bold text-green-700">
            S/. {producto.precio}
          </p>

          <p className="text-sm text-gray-500">
            Stock disponible: {producto.stock}
          </p>
        </div>

        <Link
          to={`/producto/${producto.id}`}
          className="block text-center w-full mt-5 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

export default TarjetaProducto;
