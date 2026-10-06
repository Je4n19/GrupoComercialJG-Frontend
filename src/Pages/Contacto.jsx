import { useState } from "react";
import Footer from "../Components/Footer";

import imagenContacto from "../assets/contacto.png";

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

      <section className="relative min-h-[520px] flex items-center text-white overflow-hidden">
        {/* Imagen de fondo */}

        <img
          src={imagenContacto}
          alt="Atención y asesoría de Grupo Comercial J&G"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Capa oscura */}

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/10"></div>

        {/* Efecto naranja */}

        <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#e84d05]/20 blur-3xl rounded-full"></div>

        {/* Contenido */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center bg-[#e84d05]/20 border border-orange-400/40 text-orange-300 px-5 py-2 rounded-full font-bold text-sm backdrop-blur-sm">
              Grupo Comercial J&G
            </span>

            <h1 className="text-5xl md:text-7xl font-black mt-7 leading-[0.95]">
              Estamos para
              <span className="block text-[#e84d05] mt-2">ayudarte</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mt-7 max-w-xl leading-relaxed">
              Escríbenos para cotizaciones, consultas sobre maquinaria,
              repuestos o asesoría especializada. Nuestro equipo está listo para
              atenderte.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#formulario-contacto"
                className="bg-[#e84d05] hover:bg-[#c94104] text-white px-7 py-4 rounded-xl font-black transition shadow-lg"
              >
                Solicitar Cotización
              </a>

              <a
                href="https://wa.me/51979501557?text=Hola,%20deseo%20realizar%20una%20consulta"
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white px-7 py-4 rounded-xl font-black transition"
              >
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INFORMACIÓN RÁPIDA */}

      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* TELÉFONO */}

          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl mb-5">
              📞
            </div>

            <h3 className="text-xl font-black text-gray-900">Llámanos</h3>

            <p className="text-gray-500 mt-2">Atención directa</p>

            <p className="font-black text-[#e84d05] mt-3">+51 979 501 557</p>
          </div>

          {/* WHATSAPP */}

          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl mb-5">
              📱
            </div>

            <h3 className="text-xl font-black text-gray-900">WhatsApp</h3>

            <p className="text-gray-500 mt-2">Consultas y cotizaciones</p>

            <a
              href="https://wa.me/51979501557"
              target="_blank"
              rel="noreferrer"
              className="inline-block font-black text-green-600 mt-3 hover:text-green-700"
            >
              Escribir ahora
            </a>
          </div>

          {/* HORARIO */}

          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl mb-5">
              🕒
            </div>

            <h3 className="text-xl font-black text-gray-900">Horarios</h3>

            <p className="text-gray-500 mt-2">Lunes a Viernes</p>

            <p className="font-black text-gray-800 mt-3">08:00 AM - 06:00 PM</p>
          </div>

          {/* COBERTURA */}

          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl mb-5">
              🚚
            </div>

            <h3 className="text-xl font-black text-gray-900">Cobertura</h3>

            <p className="text-gray-500 mt-2">Envíos y atención</p>

            <p className="font-black text-[#e84d05] mt-3">A nivel nacional</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN CONTACTO */}

      <section
        id="formulario-contacto"
        className="bg-gray-50 py-24 scroll-mt-32"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* INFORMACIÓN */}

            <div className="lg:col-span-2">
              <span className="text-[#e84d05] font-black uppercase tracking-wider text-sm">
                Atención personalizada
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
                Hablemos sobre lo que necesitas
              </h2>

              <p className="text-gray-600 mt-6 text-lg leading-relaxed">
                Cuéntanos qué maquinaria, equipo o repuesto estás buscando.
                Nuestro equipo puede orientarte para encontrar la alternativa
                adecuada para tu trabajo.
              </p>

              {/* BLOQUE EMPRESA */}

              <div className="bg-[#e84d05] text-white rounded-[30px] p-8 mt-10 shadow-xl">
                <h3 className="text-2xl font-black">Grupo Comercial J&G</h3>

                <p className="text-orange-100 mt-4 leading-relaxed">
                  Soluciones para los sectores agrícola, forestal e industrial.
                </p>

                <div className="mt-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span>✓</span>
                    <p className="font-semibold">Maquinaria y equipos</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span>✓</span>
                    <p className="font-semibold">Repuestos</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span>✓</span>
                    <p className="font-semibold">Asesoría especializada</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span>✓</span>
                    <p className="font-semibold">Servicio técnico</p>
                  </div>
                </div>
              </div>

              {/* HORARIO EXTRA */}

              <div className="bg-white rounded-[30px] p-8 mt-6 border border-gray-100 shadow-lg">
                <h3 className="text-xl font-black text-gray-900">
                  Horario de atención
                </h3>

                <div className="mt-5 space-y-4">
                  <div className="flex justify-between gap-4 border-b border-gray-100 pb-4">
                    <span className="text-gray-500">Lunes a Viernes</span>

                    <span className="font-bold text-gray-900">
                      08:00 AM - 06:00 PM
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Sábados</span>

                    <span className="font-bold text-gray-900">
                      08:00 AM - 01:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FORMULARIO */}

            <div className="lg:col-span-3">
              <div className="bg-white rounded-[35px] shadow-xl border border-gray-100 p-8 md:p-12">
                <div className="mb-9">
                  <span className="text-[#e84d05] font-black text-sm uppercase tracking-wider">
                    Cotización
                  </span>

                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">
                    Envíanos tu consulta
                  </h2>

                  <p className="text-gray-500 mt-3">
                    Completa tus datos y la consulta se enviará directamente por
                    WhatsApp.
                  </p>
                </div>

                <form onSubmit={enviarWhatsApp} className="space-y-6">
                  {/* NOMBRE */}

                  <div>
                    <label className="block font-bold text-gray-700 mb-2">
                      Nombre completo
                    </label>

                    <input
                      type="text"
                      name="nombre"
                      value={formulario.nombre}
                      onChange={handleChange}
                      placeholder="Ingresa tu nombre"
                      className="w-full border-2 border-gray-200 bg-gray-50 p-4 rounded-xl focus:border-[#e84d05] focus:bg-white outline-none transition"
                      required
                    />
                  </div>

                  {/* CORREO Y TELÉFONO */}

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-bold text-gray-700 mb-2">
                        Correo electrónico
                      </label>

                      <input
                        type="email"
                        name="correo"
                        value={formulario.correo}
                        onChange={handleChange}
                        placeholder="correo@ejemplo.com"
                        className="w-full border-2 border-gray-200 bg-gray-50 p-4 rounded-xl focus:border-[#e84d05] focus:bg-white outline-none transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-2">
                        Teléfono
                      </label>

                      <input
                        type="tel"
                        name="telefono"
                        value={formulario.telefono}
                        onChange={handleChange}
                        placeholder="+51 999 999 999"
                        className="w-full border-2 border-gray-200 bg-gray-50 p-4 rounded-xl focus:border-[#e84d05] focus:bg-white outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  {/* MENSAJE */}

                  <div>
                    <label className="block font-bold text-gray-700 mb-2">
                      ¿En qué podemos ayudarte?
                    </label>

                    <textarea
                      rows="6"
                      name="mensaje"
                      value={formulario.mensaje}
                      onChange={handleChange}
                      placeholder="Cuéntanos qué maquinaria, equipo o repuesto estás buscando..."
                      className="w-full border-2 border-gray-200 bg-gray-50 p-4 rounded-xl focus:border-[#e84d05] focus:bg-white outline-none transition resize-none"
                      required
                    />
                  </div>

                  {/* BOTÓN */}

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-xl font-black text-lg transition shadow-lg hover:-translate-y-0.5"
                  >
                    Enviar Consulta por WhatsApp
                  </button>

                  <p className="text-center text-sm text-gray-400">
                    Al enviar el formulario se abrirá WhatsApp con tu consulta.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}

      <section className="bg-gray-950 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-[#e84d05] font-black uppercase tracking-wider">
            Atención directa
          </span>

          <h2 className="text-4xl md:text-5xl font-black mt-4">
            ¿Prefieres hablar con nosotros directamente?
          </h2>

          <p className="text-gray-400 text-lg mt-5 max-w-2xl mx-auto">
            Escríbenos por WhatsApp y consulta disponibilidad, precios,
            repuestos o características de nuestros equipos.
          </p>

          <a
            href="https://wa.me/51979501557?text=Hola,%20deseo%20realizar%20una%20consulta"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-9 bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl font-black transition hover:scale-105"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contacto;
