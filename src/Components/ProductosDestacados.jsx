import { Link } from "react-router-dom";

function ProductosDestacados({ productos = [] }) {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-bold uppercase tracking-widest">
            Productos Destacados
          </span>

          <h2 className="text-5xl font-black text-gray-900 mt-4">
            Soluciones para cada necesidad
          </h2>

          <p className="text-gray-600 text-lg mt-5 max-w-3xl mx-auto">
            Equipos profesionales para agricultura, forestación, construcción e
            industria.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-72 overflow-hidden bg-gray-100">
                <img
                  src={
                    producto.imagen ||
                    "https://via.placeholder.com/400x300?text=Producto"
                  }
                  alt={producto.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6">
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {producto.categoria}
                </span>

                <h3 className="text-2xl font-bold mt-4">{producto.nombre}</h3>

                <p className="text-gray-500 mt-2">Marca: {producto.marca}</p>

                <p className="text-3xl font-black text-orange-500 mt-5">
                  S/. {producto.precio}
                </p>

                <Link
                  to="/catalogo"
                  className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  Ver Catálogo
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/catalogo"
            className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-xl font-bold transition"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductosDestacados;
