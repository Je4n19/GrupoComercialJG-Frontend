function IconoVentaja({ tipo }) {
  const iconos = {
    calidad: (
      <>
        <path d="m9 12 2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
    asesoria: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
        <path d="m17 11 2 2 3-3" />
      </>
    ),
    cobertura: (
      <>
        <path d="M3 6h11v11H3z" />
        <path d="M14 10h4l3 4v3h-7" />
        <circle cx="7.5" cy="18" r="2" />
        <circle cx="17.5" cy="18" r="2" />
      </>
    ),
    soporte: (
      <>
        <path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L14 13l-3-3z" />
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
      className="w-7 h-7"
      aria-hidden="true"
    >
      {iconos[tipo]}
    </svg>
  );
}

function Ventajas() {
  const ventajas = [
    {
      numero: "01",
      titulo: "Productos de Calidad",
      descripcion:
        "Trabajamos con marcas reconocidas y equipos seleccionados para ofrecer rendimiento y confianza.",
      icono: "calidad",
    },
    {
      numero: "02",
      titulo: "Asesoría Especializada",
      descripcion:
        "Te ayudamos a encontrar la maquinaria o equipo ideal para cada tipo de trabajo.",
      icono: "asesoria",
    },
    {
      numero: "03",
      titulo: "Cobertura Nacional",
      descripcion:
        "Atendemos pedidos y consultas de clientes en diferentes regiones del Perú.",
      icono: "cobertura",
    },
    {
      numero: "04",
      titulo: "Soporte Técnico",
      descripcion:
        "Te brindamos orientación y respaldo para mantener tus equipos en buenas condiciones.",
      icono: "soporte",
    },
  ];

  const whatsappAsesoria =
    "https://wa.me/51979501557?text=" +
    encodeURIComponent("Hola, necesito asesoría para elegir un equipo.");

  return (
    <section
      id="ventajas"
      className="
        relative
        overflow-hidden
        bg-[#063D25]
        py-16
        md:py-20
        lg:py-24
      "
    >
      {/* DECORACIÓN DE FONDO */}
      <div
        className="
          pointer-events-none
          absolute
          -top-40
          -right-40
          w-[480px]
          h-[480px]
          bg-[#009E49]/25
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-40
          w-[450px]
          h-[450px]
          bg-[#009E49]/15
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-[#063D25]
          via-[#07512F]
          to-[#032C1A]
        "
      />

      {/* CONTENIDO */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* ENCABEZADO */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-14">
          <span
            className="
              inline-flex
              items-center
              justify-center
              gap-3
              text-[#FF8A3D]
              font-black
              uppercase
              tracking-[0.18em]
              text-xs sm:text-sm
            "
          >
            <span className="w-8 h-[3px] bg-[#FF6600] rounded-full" />
            ¿Por qué elegirnos?
            <span className="w-8 h-[3px] bg-[#FF6600] rounded-full" />
          </span>

          <h2
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-black
              text-white
              mt-5
              leading-tight
              tracking-tight
            "
          >
            El respaldo que necesitas
            <span className="block text-[#FF8A3D] mt-2">
              para seguir trabajando.
            </span>
          </h2>

          <p
            className="
              text-green-50/85
              text-sm
              sm:text-base
              lg:text-lg
              leading-relaxed
              max-w-2xl
              mx-auto
              mt-6
            "
          >
            En Grupo Comercial J&G te ofrecemos más que productos: calidad,
            asesoría y soluciones para que sigas trabajando con confianza.
          </p>
        </div>

        {/* TARJETAS DE VENTAJAS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            lg:gap-6
          "
        >
          {ventajas.map((item) => (
            <article
              key={item.numero}
              className="
                group
                relative
                flex
                flex-col
                bg-white
                rounded-[24px]
                p-6
                lg:p-7
                min-h-[300px]
                overflow-hidden
                shadow-xl
                border
                border-white/70
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >
              {/* NÚMERO DECORATIVO */}
              <span
                className="
                  absolute
                  top-4
                  right-5
                  text-5xl
                  font-black
                  text-[#EAF5EE]
                  select-none
                  group-hover:text-[#D7F0E1]
                  transition-colors
                  duration-300
                "
              >
                {item.numero}
              </span>

              {/* ICONO */}
              <div
                className="
                  relative
                  z-10
                  w-14
                  h-14
                  bg-[#E8F7EE]
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-[#009E49]
                  group-hover:bg-[#009E49]
                  group-hover:text-white
                  transition-all
                  duration-300
                "
              >
                <IconoVentaja tipo={item.icono} />
              </div>

              {/* LÍNEA NARANJA */}
              <div
                className="
                  w-10
                  h-[3px]
                  bg-[#FF6600]
                  rounded-full
                  mt-6
                  group-hover:w-16
                  transition-all
                  duration-300
                "
              />

              {/* TÍTULO */}
              <h3
                className="
                  relative
                  z-10
                  text-xl
                  lg:text-[21px]
                  font-black
                  text-[#1A1A1A]
                  mt-5
                  leading-snug
                "
              >
                {item.titulo}
              </h3>

              {/* DESCRIPCIÓN */}
              <p
                className="
                  relative
                  z-10
                  text-gray-600
                  text-sm
                  leading-relaxed
                  mt-3
                  flex-1
                "
              >
                {item.descripcion}
              </p>

              {/* PIE DE TARJETA */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span
                  className="
                    text-[#009E49]
                    font-extrabold
                    text-[11px]
                    uppercase
                    tracking-wide
                  "
                >
                  Grupo Comercial J&G
                </span>
              </div>

              {/* DETALLE INFERIOR */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  h-1
                  bg-[#009E49]
                  scale-x-0
                  group-hover:scale-x-100
                  transition-transform
                  duration-300
                  origin-left
                "
              />
            </article>
          ))}
        </div>

        {/* FRANJA DE ASESORÍA */}
        <div
          className="
            mt-10
            md:mt-12
            bg-white/10
            backdrop-blur-sm
            border
            border-white/15
            rounded-3xl
            px-6
            py-7
            md:px-9
            md:py-9
          "
        >
          <div
            className="
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-6
            "
          >
            {/* TEXTO */}
            <div className="text-center md:text-left">
              <p
                className="
                  text-[#FF9A57]
                  text-xs
                  uppercase
                  tracking-[0.16em]
                  font-extrabold
                "
              >
                Atención personalizada
              </p>

              <h3
                className="
                  text-white
                  text-xl
                  md:text-2xl
                  font-black
                  mt-2
                "
              >
                ¿Necesitas ayuda para elegir un equipo?
              </h3>

              <p className="text-green-50/80 text-sm mt-2">
                Nuestro equipo está listo para orientarte.
              </p>
            </div>

            {/* BOTÓN WHATSAPP */}
            <a
              href={whatsappAsesoria}
              target="_blank"
              rel="noopener noreferrer"
              className="
                shrink-0
                inline-flex
                items-center
                justify-center
                gap-3
                bg-[#FF6600]
                hover:bg-[#E65C00]
                text-white
                px-7
                py-4
                rounded-xl
                font-black
                text-sm
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              Solicitar Asesoría
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ventajas;
