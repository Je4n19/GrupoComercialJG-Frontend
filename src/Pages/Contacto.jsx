import { useState } from "react";
import Footer from "../Components/Footer";
import imagenContacto from "../assets/contacto.png";

// ========================================
// ICONOS
// ========================================

function IconoContacto({ tipo, className = "w-6 h-6" }) {
  const iconos = {
    telefono: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.8a2 2 0 0 1-.45 2.11L9.03 10.9a16 16 0 0 0 4.07 4.07l1.27-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.68A2 2 0 0 1 22 16.92z" />
    ),
    whatsapp: (
      <>
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3a8.5 8.5 0 0 1 8.5 8.5Z" />
        <path d="M8 11.5h9M8 15h6" />
      </>
    ),
    reloj: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    camion: (
      <>
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 4v3h-7" />
        <circle cx="7.5" cy="18" r="2" />
        <circle cx="17.5" cy="18" r="2" />
      </>
    ),
    flecha: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    ubicacion: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconos[tipo]}
    </svg>
  );
}

// ========================================
// PÁGINA CONTACTO
// ========================================

function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormulario((anterior) => ({
      ...anterior,
      [e.target.name]: e.target.value,
    }));
  };

  const enviarWhatsApp = (e) => {
    e.preventDefault();

    const texto = [
      "📩 NUEVA CONSULTA WEB",
      "",
      `👤 Nombre: ${formulario.nombre}`,
      `📧 Correo: ${formulario.correo}`,
      `📱 Teléfono: ${formulario.telefono}`,
      "",
      "💬 Consulta:",
      formulario.mensaje,
    ].join("\n");

    const url = "https://wa.me/51979501557?text=" + encodeURIComponent(texto);

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const whatsappGeneral =
    "https://wa.me/51979501557?text=" +
    encodeURIComponent("Hola, deseo realizar una consulta.");

  const informacion = [
    {
      icono: "telefono",
      titulo: "Llámanos",
      subtitulo: "Atención directa",
      valor: "+51 979 501 557",
      enlace: "tel:+51979501557",
    },
    {
      icono: "whatsapp",
      titulo: "WhatsApp",
      subtitulo: "Consultas y cotizaciones",
      valor: "Escribir ahora",
      enlace: whatsappGeneral,
    },
    {
      icono: "reloj",
      titulo: "Horarios",
      subtitulo: "Lunes a Viernes",
      valor: "08:00 AM - 06:00 PM",
    },
    {
      icono: "camion",
      titulo: "Cobertura",
      subtitulo: "Envíos y atención",
      valor: "A nivel nacional",
    },
  ];

  const beneficios = [
    "Maquinaria y equipos",
    "Repuestos",
    "Asesoría especializada",
    "Servicio técnico",
  ];

  const inputClass =
    "w-full bg-[#F8FAF9] border-2 border-gray-200 " +
    "rounded-xl px-4 py-3.5 text-[#1A1A1A] " +
    "placeholder:text-gray-400 outline-none " +
    "focus:border-[#009E49] focus:bg-white " +
    "focus:ring-4 focus:ring-[#009E49]/10 " +
    "transition-all duration-200";

  return (
    <>
      {/* ======================================== */}
      {/* HERO PRINCIPAL */}
      {/* ======================================== */}

      <section className="relative min-h-[450px] sm:min-h-[520px] flex items-center overflow-hidden text-white">
        <img
          src={imagenContacto}
          alt="Atención y asesoría de Grupo Comercial J&G"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07170F]/95 via-[#07170F]/75 to-[#07170F]/25" />

        <div className="pointer-events-none absolute -left-32 -bottom-32 w-80 h-80 rounded-full bg-[#009E49]/25 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-[#009E49]/20 border border-[#5FE29C]/40 text-[#B6F5D0] px-4 py-2 rounded-full font-black text-xs sm:text-sm">
              <span className="w-2 h-2 bg-[#FF6600] rounded-full" />
              Grupo Comercial J&G
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mt-6 leading-tight tracking-tight">
              Estamos para
              <span className="block text-[#75E4A4]">ayudarte</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 mt-6 max-w-xl leading-relaxed">
              Escríbenos para cotizaciones, consultas sobre maquinaria,
              repuestos o asesoría especializada. Nuestro equipo está listo para
              atenderte.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8">
              <a
                href="#formulario-contacto"
                className="inline-flex items-center justify-center gap-3 bg-[#FF6600] hover:bg-[#E65C00] text-white px-7 py-4 rounded-xl font-black text-sm shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Solicitar Cotización
                <IconoContacto tipo="flecha" className="w-5 h-5" />
              </a>

              <a
                href={whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white px-7 py-4 rounded-xl font-black text-sm transition-all duration-300"
              >
                <IconoContacto tipo="whatsapp" className="w-5 h-5" />
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* INFORMACIÓN RÁPIDA */}
      {/* ======================================== */}

      <section className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 -mt-8 sm:-mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {informacion.map((item) => (
            <div
              key={item.titulo}
              className="group relative bg-white rounded-[24px] shadow-lg border border-gray-100 p-6 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#009E49] group-hover:bg-[#FF6600] transition-colors duration-300" />

              <div className="w-14 h-14 bg-[#E8F7EE] text-[#009E49] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#009E49] group-hover:text-white transition-colors duration-300">
                <IconoContacto tipo={item.icono} className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-black text-[#1A1A1A]">
                {item.titulo}
              </h3>

              <p className="text-gray-500 text-sm mt-2">{item.subtitulo}</p>

              {item.enlace ? (
                <a
                  href={item.enlace}
                  target={
                    item.enlace.startsWith("https") ? "_blank" : undefined
                  }
                  rel={
                    item.enlace.startsWith("https")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-block font-black text-[#009E49] hover:text-[#FF6600] mt-3 transition-colors"
                >
                  {item.valor}
                </a>
              ) : (
                <p className="font-black text-[#009E49] mt-3">{item.valor}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ======================================== */}
      {/* SECCIÓN DE CONTACTO */}
      {/* ======================================== */}

      <section
        id="formulario-contacto"
        className="bg-[#F7FAF8] py-16 sm:py-20 lg:py-24 scroll-mt-28"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* INFORMACIÓN IZQUIERDA */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="w-10 h-[3px] bg-[#FF6600] rounded-full" />
                <span className="text-[#009E49] font-black uppercase tracking-[0.16em] text-xs sm:text-sm">
                  Atención Personalizada
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] mt-5 leading-tight tracking-tight">
                Hablemos sobre
                <span className="block text-[#009E49]">lo que necesitas</span>
              </h2>

              <p className="text-gray-600 mt-6 text-base lg:text-lg leading-relaxed">
                Cuéntanos qué maquinaria, equipo o repuesto estás buscando.
                Nuestro equipo puede orientarte para encontrar la alternativa
                adecuada para tu trabajo.
              </p>

              {/* TARJETA EMPRESA */}
              <div className="relative bg-[#073D27] text-white rounded-[26px] p-7 sm:p-8 mt-9 shadow-xl overflow-hidden">
                <div className="pointer-events-none absolute -right-20 -bottom-20 w-64 h-64 bg-[#009E49]/20 rounded-full blur-3xl" />

                <div className="relative">
                  <span className="text-[#FFB17A] text-xs font-black uppercase tracking-[0.16em]">
                    Soluciones para tu trabajo
                  </span>

                  <h3 className="text-2xl font-black mt-3">
                    Grupo Comercial J&G
                  </h3>

                  <p className="text-green-50/80 mt-4 leading-relaxed">
                    Soluciones para los sectores agrícola, forestal e
                    industrial.
                  </p>

                  <div className="mt-7 space-y-4">
                    {beneficios.map((beneficio) => (
                      <div key={beneficio} className="flex items-center gap-3">
                        <div className="w-7 h-7 shrink-0 rounded-full bg-[#009E49] text-white flex items-center justify-center">
                          <IconoContacto tipo="check" className="w-4 h-4" />
                        </div>

                        <p className="font-semibold text-sm sm:text-base">
                          {beneficio}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* HORARIO DE ATENCIÓN */}
              <div className="bg-white rounded-[26px] p-7 sm:p-8 mt-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#E8F7EE] text-[#009E49] rounded-xl flex items-center justify-center">
                    <IconoContacto tipo="reloj" />
                  </div>

                  <h3 className="text-xl font-black text-[#1A1A1A]">
                    Horario de atención
                  </h3>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 border-b border-gray-100 pb-4">
                    <span className="text-gray-500">Lunes a Viernes</span>
                    <span className="font-bold text-[#1A1A1A]">
                      08:00 AM - 06:00 PM
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <span className="text-gray-500">Sábados</span>
                    <span className="font-bold text-[#1A1A1A]">
                      08:00 AM - 01:00 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* UBICACIÓN */}
              <div className="bg-white rounded-[26px] p-6 mt-6 border border-gray-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 shrink-0 bg-[#E8F7EE] text-[#009E49] rounded-xl flex items-center justify-center">
                    <IconoContacto tipo="ubicacion" />
                  </div>

                  <div>
                    <h3 className="font-black text-[#1A1A1A]">
                      Nuestra ubicación
                    </h3>
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                      Av. Luis Gonzales 1599A, Chiclayo - Lambayeque - Perú
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================== */}
            {/* FORMULARIO DERECHO */}
            {/* ======================================== */}

            <div className="lg:col-span-3">
              <div className="bg-white rounded-[28px] shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
                <div className="mb-9">
                  <span className="inline-flex items-center gap-2 text-[#009E49] font-black text-xs sm:text-sm uppercase tracking-[0.16em]">
                    <span className="w-8 h-[3px] bg-[#FF6600] rounded-full" />
                    Cotización
                  </span>

                  <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mt-4">
                    Envíanos tu
                    <span className="text-[#009E49]"> consulta</span>
                  </h2>

                  <p className="text-gray-500 mt-4 leading-relaxed">
                    Completa tus datos y prepararemos tu consulta para enviarla
                    directamente por WhatsApp.
                  </p>
                </div>

                <form onSubmit={enviarWhatsApp} className="space-y-6">
                  {/* NOMBRE */}
                  <div>
                    <label
                      htmlFor="contacto-nombre"
                      className="block font-bold text-[#1A1A1A] mb-2 text-sm"
                    >
                      Nombre completo
                    </label>

                    <input
                      id="contacto-nombre"
                      type="text"
                      name="nombre"
                      value={formulario.nombre}
                      onChange={handleChange}
                      placeholder="Ingresa tu nombre"
                      autoComplete="name"
                      className={inputClass}
                      required
                    />
                  </div>

                  {/* CORREO Y TELÉFONO */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contacto-correo"
                        className="block font-bold text-[#1A1A1A] mb-2 text-sm"
                      >
                        Correo electrónico
                      </label>

                      <input
                        id="contacto-correo"
                        type="email"
                        name="correo"
                        value={formulario.correo}
                        onChange={handleChange}
                        placeholder="correo@ejemplo.com"
                        autoComplete="email"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contacto-telefono"
                        className="block font-bold text-[#1A1A1A] mb-2 text-sm"
                      >
                        Teléfono
                      </label>

                      <input
                        id="contacto-telefono"
                        type="tel"
                        name="telefono"
                        value={formulario.telefono}
                        onChange={handleChange}
                        placeholder="+51 999 999 999"
                        autoComplete="tel"
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>

                  {/* MENSAJE */}
                  <div>
                    <label
                      htmlFor="contacto-mensaje"
                      className="block font-bold text-[#1A1A1A] mb-2 text-sm"
                    >
                      ¿En qué podemos ayudarte?
                    </label>

                    <textarea
                      id="contacto-mensaje"
                      rows={6}
                      name="mensaje"
                      value={formulario.mensaje}
                      onChange={handleChange}
                      placeholder="Cuéntanos qué maquinaria, equipo o repuesto estás buscando..."
                      className={`${inputClass} resize-y min-h-[150px]`}
                      required
                    />
                  </div>

                  {/* BOTÓN ENVIAR */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-3 bg-[#009E49] hover:bg-[#00843D] text-white py-4 sm:py-5 px-5 rounded-xl font-black text-base sm:text-lg transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                  >
                    <IconoContacto tipo="whatsapp" className="w-6 h-6" />
                    Enviar Consulta por WhatsApp
                    <IconoContacto tipo="flecha" className="w-5 h-5" />
                  </button>

                  <p className="text-center text-xs sm:text-sm text-gray-500 leading-relaxed">
                    Al enviar el formulario se abrirá WhatsApp con tu consulta
                    preparada. Deberás confirmar el envío desde WhatsApp.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================== */}
      {/* CTA FINAL */}
      {/* ======================================== */}

      <section className="relative bg-[#1A1A1A] text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#009E49]" />

        <div className="pointer-events-none absolute -right-32 -bottom-32 w-80 h-80 rounded-full bg-[#009E49]/10 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 text-center">
          <span className="text-[#FFB17A] font-black uppercase tracking-[0.16em] text-xs sm:text-sm">
            Atención Directa
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-5 leading-tight">
            ¿Prefieres hablar con nosotros
            <span className="block text-[#75E4A4]">directamente?</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Escríbenos por WhatsApp y consulta disponibilidad, precios,
            repuestos o características de nuestros equipos.
          </p>

          <a
            href={whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 mt-9 bg-[#FF6600] hover:bg-[#E65C00] text-white px-8 py-4 rounded-xl font-black shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <IconoContacto tipo="whatsapp" className="w-6 h-6" />
            Hablar por WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contacto;
