import { Link } from "react-router-dom";

function ProductosDestacados({ productos = [] }) {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold uppercase text-sm">
            Productos Destacados
          </span>

          <h2 className="text-5xl font-black text-gray-900 mt-6">
            Equipos Más Solicitados
          </h2>

          <p className="text-gray-600 text-lg mt-5 max-w-3xl mx-auto">
            Descubre nuestra selección de maquinaria y equipos de alto
            rendimiento para agricultura, forestación e industria.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div className="relative h-72 overflow-hidden bg-gray-100">
                <img
                  src={
                    producto.imagen ||
                    "https://via.placeholder.com/400x300?text=Producto"
                  }
                  alt={producto.nombre}
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-110
                    transition
                    duration-500
                  "
                />

                <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Disponible
                </span>
              </div>

              <div className="p-6">
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {producto.categoria}
                </span>

                <h3 className="text-2xl font-black mt-4 text-gray-900">
                  {producto.nombre}
                </h3>

                <p className="text-gray-500 mt-2">Marca: {producto.marca}</p>

                <p className="text-gray-500">Stock: {producto.stock}</p>

                <div className="mt-5">
                  <p className="text-4xl font-black text-orange-500">
                    S/. {producto.precio}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Link
                    to={`/producto/${producto.id}`}
                    className="
                      text-center
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      py-3
                      rounded-xl
                      font-bold
                    "
                  >
                    Ver Detalle
                  </Link>

                  <a
                    href={`https://wa.me/51979501557?text=Hola,%20quiero%20información%20sobre%20${producto.nombre}`}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      text-center
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      py-3
                      rounded-xl
                      font-bold
                    "
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/catalogo"
            className="
              inline-block
              bg-gray-900
              hover:bg-black
              text-white
              px-10
              py-4
              rounded-xl
              font-bold
              transition
            "
          >
            Ver Todo el Catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductosDestacados;
