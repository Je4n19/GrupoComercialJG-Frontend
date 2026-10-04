import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { obtenerProductoPorId } from "../Services/productoService";
import { obtenerProductos } from "../Services/productoService";

import Footer from "../Components/Footer";
import TarjetaProducto from "../Components/TarjetaProducto";

function DetalleProducto() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);

  useEffect(() => {
    cargarProducto();
  }, [id]);

  const cargarProducto = async () => {
    try {
      const productoData = await obtenerProductoPorId(id);

      setProducto(productoData);

      const productosData = await obtenerProductos();

      const relacionadosData = productosData
        .filter(
          (p) =>
            p.categoria === productoData.categoria && p.id !== productoData.id,
        )
        .slice(0, 3);

      setRelacionados(relacionadosData);
    } catch (error) {
      console.error(error);
    }
  };

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Cargando producto...</h1>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-black">{producto.nombre}</h1>

          <p className="text-orange-100 text-lg mt-3">
            {producto.marca} • {producto.categoria}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-5">
        <Link
          to="/catalogo"
          className="font-bold text-orange-500 hover:text-orange-700"
        >
          ← Volver al catálogo
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Imagen */}

          <div>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <img
                src={
                  producto.imagen ||
                  "https://via.placeholder.com/800x600?text=Producto"
                }
                alt={producto.nombre}
                className="w-full h-[550px] object-cover"
              />
            </div>
          </div>

          {/* Información */}

          <div>
            <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">
              {producto.marca}
            </span>

            <h2 className="text-5xl font-black text-gray-900 mt-5">
              {producto.nombre}
            </h2>

            <p className="text-gray-500 text-lg mt-3">{producto.categoria}</p>

            <div className="mt-8">
              <h3 className="text-6xl font-black text-orange-500">
                S/. {producto.precio}
              </h3>

              <p className="text-green-600 font-bold mt-3">
                ● Stock disponible: {producto.stock}
              </p>
            </div>

            <div className="mt-8 bg-white rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-5">
                Descripción del Producto
              </h3>

              <p className="text-gray-600 leading-relaxed text-lg">
                {producto.descripcion}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-8">
              <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl">
                <h3 className="font-bold text-orange-600 mb-2">
                  🚚 Envíos Nacionales
                </h3>

                <p className="text-gray-600">
                  Realizamos envíos a todo el Perú.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">
                <h3 className="font-bold text-green-700 mb-2">✅ Garantía</h3>

                <p className="text-gray-600">
                  Productos originales con respaldo.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 border rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-5">Solicita Información</h3>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/51979501557?text=Hola,%20deseo%20cotizar%20${producto.nombre}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition"
                >
                  Solicitar Cotización
                </a>

                <a
                  href={`https://wa.me/51979501557?text=Hola,%20deseo%20más%20información%20sobre%20${producto.nombre}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold transition"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-center mb-4">
            Productos Relacionados
          </h2>

          <p className="text-center text-gray-600 mb-12">
            Otros equipos que podrían interesarte.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relacionados.map((item) => (
              <TarjetaProducto key={item.id} producto={item} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default DetalleProducto;
