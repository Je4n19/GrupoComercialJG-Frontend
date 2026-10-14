import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

// IMAGEN PRINCIPAL
import rastrearImg from "../assets/rastrear.png";

// LOGOS DE LAS AGENCIAS
import olvaLogo from "../assets/olva.png";
import shalomLogo from "../assets/shalom.png";
import emtrafesaLogo from "../assets/emtrafesa.png";

// ========================================
// INFORMACIÓN DE LAS AGENCIAS
// ========================================

const agencias = [
  {
    id: "olva",
    nombre: "OLVA Courier",
    descripcion:
      "Consulta el estado de tu envío utilizando tu número de tracking.",
    enlace: "https://tracking.olvaexpress.pe/",
    color: "#E87722",
    logo: olvaLogo,
    dato: "Número de tracking",
  },
  {
    id: "shalom",
    nombre: "Shalom",
    descripcion: "Consulta tu encomienda con el número y código de orden.",
    enlace: "https://www.shalom.com.pe/rastrea",
    color: "#E52532",
    logo: shalomLogo,
    dato: "Número y código de orden",
  },
  {
    id: "emtrafesa",
    nombre: "Emtrafesa",
    descripcion:
      "Consulta la información de tu encomienda en su portal oficial.",
    enlace: "https://www.emtrafesa.pe/Home/Encomiendas",
    color: "#1866B1",
    logo: emtrafesaLogo,
    dato: "Datos del comprobante",
  },
];

// ========================================
// ICONOS
// ========================================

function Icono({ tipo, className = "w-6 h-6" }) {
  const iconos = {
    paquete: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="M3 7v10l9 5 9-5V7" />
        <path d="M12 12v10" />
      </>
    ),

    externo: (
      <>
        <path d="M14 3h7v7" />
        <path d="M10 14 21 3" />
        <path d="M21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7" />
      </>
    ),

    check: <path d="m5 12 4 4L19 6" />,

    flecha: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),

    ayuda: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4" />
        <path d="M12 17h.01" />
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
// COMPONENTE PRINCIPAL
// ========================================

function RastrearPedido() {
  return (
    <>
      <main className="min-h-screen bg-[#F7FAF8]">
        {/* ========================================
            ENCABEZADO CON IMAGEN AMPLIADA
        ======================================== */}

        <section className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] flex items-center justify-center overflow-hidden bg-[#073D27] text-white">
          {/* IMAGEN DE FONDO */}
          <img
            src={rastrearImg}
            alt="Transporte y seguimiento de encomiendas"
            className="absolute inset-0 w-full h-full object-cover object-[center_45%] lg:object-center"
          />

          {/* OSCURECIMIENTO SUAVE */}
          <div className="absolute inset-0 bg-black/25" />

          {/* CONTENIDO */}
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-16 text-center">
            {/* ETIQUETA */}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white text-xs sm:text-sm font-bold">
              <Icono tipo="paquete" className="w-4 h-4" />
              Seguimiento de encomiendas
            </span>

            {/* TÍTULO */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-6 leading-tight text-white drop-shadow-lg">
              Rastrea tu <span className="text-[#FF6600]">pedido</span>
            </h1>

            {/* DESCRIPCIÓN */}
            <p className="mt-5 text-white text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
              Consulta el estado de tu encomienda de forma rápida y sencilla.
              Selecciona la agencia de transporte utilizada para tu envío.
            </p>
          </div>
        </section>

        {/* ========================================
            AGENCIAS DE TRANSPORTE
        ======================================== */}

        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <span className="text-[#009E49] uppercase tracking-[0.16em] text-xs sm:text-sm font-black">
              Empresas de transporte
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mt-3">
              Selecciona tu agencia
            </h2>

            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Elige la empresa que transporta tu pedido para acceder
              directamente a su sistema de seguimiento.
            </p>
          </div>

          {/* TARJETAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {agencias.map((agencia) => (
              <article
                key={agencia.id}
                className="group flex flex-col bg-white border border-gray-100 rounded-[26px] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* COLOR DE LA AGENCIA */}
                <div
                  className="h-2"
                  style={{ backgroundColor: agencia.color }}
                />

                <div className="flex flex-col items-center text-center p-7 sm:p-8 flex-1">
                  {/* LOGO */}
                  <div className="w-full h-36 sm:h-40 flex items-center justify-center bg-white rounded-2xl border border-gray-100 p-5 overflow-hidden">
                    <img
                      src={agencia.logo}
                      alt={`Logo de ${agencia.nombre}`}
                      className="w-full h-full object-contain max-w-[230px] group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* NOMBRE */}
                  <h3 className="text-2xl font-black text-[#1A1A1A] mt-7">
                    {agencia.nombre}
                  </h3>

                  {/* DESCRIPCIÓN */}
                  <p className="text-gray-500 text-sm leading-relaxed mt-4">
                    {agencia.descripcion}
                  </p>

                  {/* DATOS NECESARIOS */}
                  <div className="flex items-start gap-2 bg-[#E8F7EE] text-[#087A3C] text-sm rounded-xl p-3 mt-6 w-full text-left">
                    <Icono tipo="check" className="w-5 h-5 shrink-0" />
                    <span>
                      Necesitas: <strong>{agencia.dato}</strong>
                    </span>
                  </div>

                  {/* BOTÓN DE SEGUIMIENTO */}
                  <a
                    href={agencia.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-5 w-full"
                    aria-label={`Rastrear pedido en ${agencia.nombre}`}
                  >
                    <span className="flex items-center justify-center gap-3 w-full bg-[#FF6600] hover:bg-[#E65C00] text-white py-4 px-5 rounded-xl font-black text-sm transition-colors">
                      Rastrear ahora
                      <Icono tipo="externo" className="w-5 h-5" />
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========================================
            INSTRUCCIONES
        ======================================== */}

        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-5 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A]">
                ¿Cómo rastrear tu pedido?
              </h2>
              <p className="text-gray-500 mt-3">
                Sigue estos tres sencillos pasos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  numero: "01",
                  titulo: "Selecciona la agencia",
                  descripcion:
                    "Identifica qué empresa está transportando tu encomienda.",
                },
                {
                  numero: "02",
                  titulo: "Ingresa tus datos",
                  descripcion:
                    "Utiliza el número de guía, tracking u otros datos que solicite la agencia.",
                },
                {
                  numero: "03",
                  titulo: "Consulta tu envío",
                  descripcion:
                    "Revisa la información disponible sobre el estado de tu encomienda.",
                },
              ].map((paso) => (
                <div
                  key={paso.numero}
                  className="bg-[#F7FAF8] border border-[#E1EEE5] rounded-2xl p-6"
                >
                  <span className="text-4xl font-black text-[#009E49]">
                    {paso.numero}
                  </span>

                  <h3 className="text-lg font-black text-[#1A1A1A] mt-4">
                    {paso.titulo}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mt-3">
                    {paso.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================
            AYUDA POR WHATSAPP
        ======================================== */}

        <section className="bg-[#073D27] py-16 text-white">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl bg-white/10 text-[#A7F3C5]">
              <Icono tipo="ayuda" className="w-8 h-8" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black mt-6">
              ¿Necesitas ayuda con tu envío?
            </h2>

            <p className="text-gray-200 mt-4 leading-relaxed">
              Si tienes dudas sobre la agencia utilizada para tu encomienda,
              comunícate con Grupo Comercial J&G.
            </p>

            <a
              href="https://wa.me/51979501557?text=Hola%2C%20necesito%20ayuda%20para%20rastrear%20mi%20pedido."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-8 bg-[#FF6600] hover:bg-[#E65C00] text-white font-black px-8 py-4 rounded-xl transition-colors"
            >
              Consultar por WhatsApp
              <Icono tipo="externo" className="w-5 h-5" />
            </a>

            <div className="mt-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[#A7F3C5] hover:text-white font-semibold text-sm transition-colors"
              >
                <Icono tipo="flecha" className="w-4 h-4" />
                Volver al inicio
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default RastrearPedido;
