import TarjetaProducto from "./TarjetaProducto";
import { Link } from "react-router-dom";

function GrillaProductos({ productos = [] }) {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-14">
          <div>
            <span className="text-orange-500 font-bold uppercase tracking-widest">
              Catálogo Profesional
            </span>

            <h2 className="text-5xl font-black text-gray-900 mt-3">
              Equipos Destacados
            </h2>

            <p className="text-gray-600 mt-4 text-lg max-w-2xl">
              Descubre maquinaria agrícola, forestal e industrial de las
              principales marcas del mercado.
            </p>
          </div>

          <Link
            to="/catalogo"
            className="mt-6 lg:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition"
          >
            Ver Catálogo Completo
          </Link>
        </div>

        {productos.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-700">
              No hay productos disponibles
            </h3>

            <p className="text-gray-500 mt-3">
              Próximamente agregaremos nuevos productos.
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productos.map((producto) => (
                <TarjetaProducto key={producto.id} producto={producto} />
              ))}
            </div>

            <div className="text-center mt-14">
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-3 bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-xl font-bold transition"
              >
                Ver Todos los Productos
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default GrillaProductos;
