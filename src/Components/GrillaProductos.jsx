import TarjetaProducto from "./TarjetaProducto";

function GrillaProductos({ productos = [] }) {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Productos Destacados
          </h2>

          <p className="text-gray-600 mt-4">
            Equipos profesionales para agricultura, forestación e industria.
          </p>
        </div>

        {productos.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No hay productos disponibles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((producto) => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default GrillaProductos;
