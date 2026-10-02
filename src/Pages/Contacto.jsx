import { useState } from "react";
import Footer from "../Components/Footer";

function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const enviarWhatsApp = (e) => {
    e.preventDefault();

    const texto = `
📩 NUEVA CONSULTA WEB

👤 Nombre: ${formulario.nombre}

📧 Correo: ${formulario.correo}

📱 Teléfono: ${formulario.telefono}

💬 Consulta:
${formulario.mensaje}
`;

    const url = `https://wa.me/51979501557?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
  };

  return (
    <>
      {/* Banner */}

      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">Contáctanos</h1>

          <p className="text-xl mt-4 text-orange-100">
            Grupo Comercial J&G - Soluciones en maquinaria, equipos y repuestos.
          </p>
        </div>
      </section>

      {/* Información */}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">
              WhatsApp
            </h3>

            <p className="text-gray-600 mb-4">
              Atención rápida para cotizaciones y consultas.
            </p>

            <p className="font-bold text-xl">+51 979 501 557</p>

            <a
              href="https://wa.me/51979501557"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-5 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Escribir Ahora
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">Horario</h3>

            <p className="mb-3">Lunes - Viernes</p>

            <p className="font-bold">08:00 AM - 06:00 PM</p>

            <hr className="my-4" />

            <p className="mb-3">Sábados</p>

            <p className="font-bold">08:00 AM - 01:00 PM</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">Empresa</h3>

            <p className="mb-3">Grupo Comercial J&G</p>

            <p className="mb-3">
              Venta de maquinaria agrícola, forestal e industrial.
            </p>

            <p className="text-gray-600">
              Repuestos originales y asesoría especializada.
            </p>
          </div>
        </div>
      </section>

      {/* Formulario */}

      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h2 className="text-4xl font-bold text-center mb-8">
              Solicita Información
            </h2>

            <form onSubmit={enviarWhatsApp} className="space-y-5">
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={handleChange}
                placeholder="Nombre Completo"
                className="w-full border p-4 rounded-lg"
                required
              />

              <input
                type="email"
                name="correo"
                value={formulario.correo}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                className="w-full border p-4 rounded-lg"
                required
              />

              <input
                type="text"
                name="telefono"
                value={formulario.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full border p-4 rounded-lg"
                required
              />

              <textarea
                rows="5"
                name="mensaje"
                value={formulario.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu consulta..."
                className="w-full border p-4 rounded-lg"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-4 rounded-lg font-bold hover:bg-orange-600 transition"
              >
                Enviar Consulta por WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contacto;
