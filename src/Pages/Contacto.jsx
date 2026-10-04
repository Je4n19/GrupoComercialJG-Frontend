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
      {/* HERO */}

      <section className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="bg-white/20 px-5 py-2 rounded-full font-semibold">
            Grupo Comercial J&G
          </span>

          <h1 className="text-6xl font-black mt-8">Contáctanos</h1>

          <p className="text-xl text-orange-100 mt-6 max-w-3xl mx-auto">
            Estamos listos para ayudarte con maquinaria, repuestos, cotizaciones
            y asesoría técnica especializada.
          </p>
        </div>
      </section>

      {/* TARJETAS */}

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-green-500">
            <div className="text-5xl mb-5">📱</div>

            <h3 className="text-2xl font-bold mb-4">WhatsApp</h3>

            <p className="text-gray-600 mb-4">
              Atención inmediata para consultas y cotizaciones.
            </p>

            <p className="text-2xl font-black text-green-600">
              +51 979 501 557
            </p>

            <a
              href="https://wa.me/51979501557"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              Escribir Ahora
            </a>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-orange-500">
            <div className="text-5xl mb-5">🕒</div>

            <h3 className="text-2xl font-bold mb-4">Horarios</h3>

            <p className="text-gray-600 mb-3">Lunes a Viernes</p>

            <p className="font-bold text-xl">08:00 AM - 06:00 PM</p>

            <hr className="my-5" />

            <p className="text-gray-600 mb-3">Sábados</p>

            <p className="font-bold text-xl">08:00 AM - 01:00 PM</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border-t-4 border-orange-500">
            <div className="text-5xl mb-5">🏢</div>

            <h3 className="text-2xl font-bold mb-4">Grupo Comercial J&G</h3>

            <p className="text-gray-600">
              Especialistas en maquinaria agrícola, forestal e industrial.
            </p>

            <div className="mt-5 space-y-2">
              <p>✅ Productos originales</p>
              <p>✅ Repuestos garantizados</p>
              <p>✅ Soporte técnico</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}

      <section className="bg-orange-50 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-[40px] shadow-2xl p-10 md:p-14">
            <div className="text-center mb-10">
              <h2 className="text-5xl font-black text-gray-900">
                Solicita una Cotización
              </h2>

              <p className="text-gray-600 mt-4">
                Completa el formulario y te responderemos por WhatsApp.
              </p>
            </div>

            <form onSubmit={enviarWhatsApp} className="space-y-6">
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={handleChange}
                placeholder="Nombre Completo"
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-orange-500 outline-none"
                required
              />

              <input
                type="email"
                name="correo"
                value={formulario.correo}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-orange-500 outline-none"
                required
              />

              <input
                type="text"
                name="telefono"
                value={formulario.telefono}
                onChange={handleChange}
                placeholder="Número de Teléfono"
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-orange-500 outline-none"
                required
              />

              <textarea
                rows="6"
                name="mensaje"
                value={formulario.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu consulta..."
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-orange-500 outline-none"
                required
              />

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-xl font-bold text-lg transition"
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
