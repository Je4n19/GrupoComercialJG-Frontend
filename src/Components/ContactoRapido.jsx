const TELEFONO = "979501557";

const WHATSAPP_URL =
  `https://wa.me/51${TELEFONO}?text=` +
  encodeURIComponent(
    "Hola, soy cliente de Grupo Comercial J&G. Deseo solicitar una cotización de maquinaria, equipos o repuestos.",
  );

function IconoContacto({ tipo, className = "w-7 h-7" }) {
  const iconos = {
    telefono: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.8a2 2 0 0 1-.45 2.11L9.03 10.9a16 16 0 0 0 4.07 4.07l1.27-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.68A2 2 0 0 1 22 16.92z" />
    ),

    soporte: (
      <>
        <path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L14 13l-3-3z" />
      </>
    ),

    camion: (
      <>
        <path d="M3 6h11v11H3z" />
        <path d="M14 10h4l3 4v3h-7" />
        <circle cx="7.5" cy="18" r="2" />
        <circle cx="17.5" cy="18" r="2" />
      </>
    ),

    mensaje: (
      <>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <path d="M8 11h8" />
        <path d="M8 14h5" />
      </>
    ),

    flecha: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),

    check: <path d="m5 12 4 4L19 6" />,
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

function ContactoRapido() {
  const beneficios = [
    {
      titulo: "Atención Directa",
      icono: "telefono",
    },
    {
      titulo: "Soporte Técnico",
      icono: "soporte",
    },
    {
      titulo: "Todo el Perú",
      icono: "camion",
    },
  ];

  return (
    <section
      id="contacto-rapido"
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-[#008C40]
        via-[#009E49]
        to-[#006D35]
        py-16
        sm:py-20
        lg:py-24
      "
    >
      {/* DECORACIONES DE FONDO */}
      <div
        className="
          pointer-events-none
          absolute
          -top-36
          -right-32
          w-[420px]
          h-[420px]
          bg-white/10
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-32
          w-[450px]
          h-[450px]
          bg-[#FF6600]/10
          rounded-full
          blur-3xl
        "
      />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div
          className="
            relative
            bg-white
            rounded-[28px]
            sm:rounded-[36px]
            shadow-2xl
            overflow-hidden
            border border-white/40
          "
        >
          {/* DECORACIÓN INTERNA */}
          <div
            className="
              pointer-events-none
              absolute
              -top-32
              -left-28
              w-72
              h-72
              bg-[#009E49]/5
              rounded-full
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              left-1/3
              w-64
              h-64
              bg-[#FF6600]/5
              rounded-full
            "
          />

          {/* DISTRIBUCIÓN EN DOS COLUMNAS */}
          <div
            className="
              relative
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-8
              lg:gap-12
              items-center
              p-6
              sm:p-10
              lg:p-14
            "
          >
            {/* ================================= */}
            {/* COLUMNA IZQUIERDA */}
            {/* ================================= */}

            <div>
              {/* ETIQUETA */}
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-[#E8F7EE]
                  text-[#008A40]
                  border border-[#009E49]/10
                  px-4
                  py-2
                  rounded-full
                  font-extrabold
                  uppercase
                  tracking-wider
                  text-xs
                  sm:text-sm
                "
              >
                <span className="w-2 h-2 rounded-full bg-[#009E49]" />
                Atención Personalizada
              </span>

              {/* TÍTULO */}
              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  xl:text-[54px]
                  font-black
                  text-[#1A1A1A]
                  mt-6
                  leading-[1.1]
                  tracking-tight
                "
              >
                ¿Necesitas una
                <span className="block text-[#009E49] mt-2">
                  Cotización Inmediata?
                </span>
              </h2>

              {/* DESCRIPCIÓN */}
              <p
                className="
                  text-gray-600
                  text-base
                  sm:text-lg
                  mt-6
                  leading-relaxed
                  max-w-xl
                "
              >
                Nuestro equipo especializado está listo para ayudarte a
                encontrar la maquinaria, equipo o repuesto ideal para tu
                proyecto.
              </p>

              {/* BENEFICIOS */}
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-3
                  gap-3
                  mt-8
                  lg:mt-10
                "
              >
                {beneficios.map((beneficio) => (
                  <div
                    key={beneficio.titulo}
                    className="
                      group
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-center
                      gap-3
                      bg-[#F0F9F3]
                      hover:bg-[#E2F4E9]
                      border
                      border-[#009E49]/10
                      rounded-2xl
                      p-4
                      min-h-[125px]
                      transition-all
                      duration-300
                    "
                  >
                    <div
                      className="
                        w-12
                        h-12
                        rounded-xl
                        bg-white
                        flex
                        items-center
                        justify-center
                        text-[#009E49]
                        shadow-sm
                        group-hover:scale-110
                        transition-transform
                      "
                    >
                      <IconoContacto tipo={beneficio.icono} />
                    </div>

                    <h3
                      className="
                        font-extrabold
                        text-[#1A1A1A]
                        text-xs
                        sm:text-sm
                        leading-snug
                      "
                    >
                      {beneficio.titulo}
                    </h3>
                  </div>
                ))}
              </div>

              {/* MENSAJE INFERIOR */}
              <div className="flex items-start gap-3 mt-7">
                <div className="w-6 h-6 shrink-0 text-[#009E49]">
                  <IconoContacto tipo="check" className="w-6 h-6" />
                </div>

                <p className="text-sm text-gray-500 leading-relaxed">
                  Cuéntanos qué equipo necesitas y te ayudaremos a encontrar una
                  alternativa adecuada.
                </p>
              </div>
            </div>

            {/* ================================= */}
            {/* COLUMNA DERECHA: WHATSAPP */}
            {/* ================================= */}

            <div
              className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-[#073D25]
                via-[#07512F]
                to-[#032B1A]
                rounded-[26px]
                sm:rounded-[32px]
                p-7
                sm:p-10
                lg:p-12
                text-center
                shadow-xl
              "
            >
              {/* DECORACIÓN */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -top-20
                  -right-20
                  w-56
                  h-56
                  rounded-full
                  bg-[#009E49]/25
                  blur-3xl
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-20
                  -left-20
                  w-48
                  h-48
                  rounded-full
                  bg-[#FF6600]/10
                  blur-3xl
                "
              />

              <div className="relative z-10">
                {/* ICONO */}
                <div
                  className="
                    w-20
                    h-20
                    mx-auto
                    bg-[#009E49]
                    rounded-3xl
                    flex
                    items-center
                    justify-center
                    text-white
                    shadow-lg
                  "
                >
                  <IconoContacto tipo="mensaje" className="w-10 h-10" />
                </div>

                {/* TÍTULO */}
                <h3
                  className="
                    text-3xl
                    sm:text-4xl
                    font-black
                    text-white
                    mt-7
                  "
                >
                  WhatsApp J&G
                </h3>

                {/* DESCRIPCIÓN */}
                <p
                  className="
                    text-green-50/80
                    mt-5
                    text-base
                    sm:text-lg
                    leading-relaxed
                  "
                >
                  Recibe asesoría personalizada, consulta disponibilidad y
                  solicita cotizaciones de forma directa.
                </p>

                {/* NÚMERO */}
                <div className="mt-9">
                  <p
                    className="
                      text-[#FF9A57]
                      text-xs
                      sm:text-sm
                      uppercase
                      tracking-wider
                      font-extrabold
                    "
                  >
                    Número de contacto
                  </p>

                  <a
                    href={`tel:+51${TELEFONO}`}
                    className="
                      block
                      text-2xl
                      sm:text-3xl
                      font-black
                      text-white
                      mt-3
                      hover:text-[#FF9A57]
                      transition-colors
                    "
                  >
                    +51 979 501 557
                  </a>
                </div>

                {/* BOTÓN PRINCIPAL */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-3
                    w-full
                    mt-10
                    bg-[#FF6600]
                    hover:bg-[#E65C00]
                    text-white
                    px-5
                    py-4
                    sm:py-5
                    rounded-2xl
                    font-black
                    text-base
                    sm:text-lg
                    transition-all
                    duration-300
                    shadow-lg
                    hover:-translate-y-1
                  "
                >
                  <IconoContacto tipo="mensaje" className="w-6 h-6" />
                  Contactar por WhatsApp
                  <IconoContacto tipo="flecha" className="w-5 h-5" />
                </a>

                {/* TEXTO DE APOYO */}
                <p className="text-green-100/70 text-xs mt-5">
                  Atención personalizada para tus consultas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactoRapido;
