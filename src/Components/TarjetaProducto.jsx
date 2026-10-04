import { Link } from "react-router-dom";

function TarjetaProducto({ producto }) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={
            producto.imagen ||
            "https://via.placeholder.com/400x300?text=Producto"
          }
          alt={producto.nombre}
          className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
        />

        <div className="absolute top-4 left-4">
          <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            {producto.categoria}
          </span>
        </div>
      </div>

      <div className="p-6">
        <span className="text-orange-500 font-bold uppercase tracking-wide text-sm">
          {producto.marca}
        </span>

        <h3 className="text-2xl font-black text-gray-900 mt-3 min-h-[64px]">
          {producto.nombre}
        </h3>

        <p className="text-gray-500 mt-3 line-clamp-2">
          {producto.descripcion}
        </p>

        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-sm text-gray-500">Precio</p>

            <p className="text-3xl font-black text-orange-500">
              S/. {producto.precio}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Stock</p>

            <p className="font-bold text-green-600">{producto.stock}</p>
          </div>
        </div>

        <Link
          to={`/producto/${producto.id}`}
          className="block text-center mt-6 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

export default TarjetaProducto;
