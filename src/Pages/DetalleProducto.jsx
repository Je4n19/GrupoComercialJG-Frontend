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
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold">{producto.nombre}</h1>

          <p className="text-orange-100 text-lg mt-3">
            {producto.marca} • {producto.categoria}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-5">
        <Link
          to="/catalogo"
          className="text-orange-600 font-semibold hover:text-orange-700"
        >
          ← Volver al catálogo
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <img
              src={
                producto.imagen ||
                "https://via.placeholder.com/600x400?text=Producto"
              }
              alt={producto.nombre}
              className="w-full rounded-2xl"
            />
          </div>

          <div>
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">
              {producto.marca}
            </span>

            <h2 className="text-5xl font-bold mt-5">{producto.nombre}</h2>

            <p className="text-gray-500 mt-3">{producto.categoria}</p>

            <p className="mt-6 text-gray-700 text-lg leading-relaxed">
              {producto.descripcion}
            </p>

            <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6">
              <p className="text-gray-500 mb-2">Precio</p>

              <h3 className="text-5xl font-bold text-green-700">
                S/. {producto.precio}
              </h3>

              <p className="mt-3 text-gray-600">
                Stock disponible: {producto.stock}
              </p>
            </div>

            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-5">Información</h3>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-gray-500">Marca</p>
                  <p className="font-semibold">{producto.marca}</p>
                </div>

                <div>
                  <p className="text-gray-500">Nombre</p>
                  <p className="font-semibold">{producto.nombre}</p>
                </div>

                <div>
                  <p className="text-gray-500">Categoría</p>
                  <p className="font-semibold">{producto.categoria}</p>
                </div>

                <div>
                  <p className="text-gray-500">Stock</p>
                  <p className="font-semibold">{producto.stock}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-5">Beneficios</h3>

              <ul className="space-y-3 text-gray-700">
                <li>✅ Garantía de fábrica.</li>
                <li>✅ Repuestos disponibles.</li>
                <li>✅ Asesoría técnica.</li>
                <li>✅ Atención personalizada.</li>
                <li>✅ Envíos a nivel nacional.</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href={`https://wa.me/51979501557?text=Hola,%20deseo%20información%20sobre%20${producto.nombre}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700"
              >
                Consultar por WhatsApp
              </a>

              <a
                href={`https://wa.me/51979501557?text=Hola,%20deseo%20cotizar%20${producto.nombre}`}
                target="_blank"
                rel="noreferrer"
                className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600"
              >
                Solicitar Cotización
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10">
            Productos Relacionados
          </h2>

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
