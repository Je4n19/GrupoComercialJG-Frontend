function IconoServicio({ tipo }) {
  const iconos = {
    maquinaria: (
      <>
        <circle cx="7" cy="17" r="3" />
        <circle cx="18" cy="17" r="2" />
        <path d="M4 14V9h8l3 5h4l2 3" />
        <path d="M9 9V5h5v4" />
        <path d="M3 17h1M10 17h6" />
      </>
    ),
    repuestos: (
      <>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        <path d="m5.6 5.6 2.1 2.1m8.6 8.6 2.1 2.1" />
        <path d="m18.4 5.6-2.1 2.1m-8.6 8.6-2.1 2.1" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    soporte: (
      <>
        <path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18a2.1 2.1 0 0 0 3 3l5.3-5.3a5 5 0 0 0 6.4-6.4L14 13l-3-3 3.7-3.7Z" />
      </>
    ),
    asesoria: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
        <path d="m17 11 2 2 3-3" />
      </>
    ),
    flecha: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3a8.5 8.5 0 0 1 8.5 8.5Z" />
        <path d="M8 11.5h9M8 15h6" />
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
      className="w-8 h-8"
      aria-hidden="true"
    >
      {iconos[tipo]}
    </svg>
  );
}

function Servicios() {
  const servicios = [
    {
      numero: "01",
      icono: "maquinaria",
      titulo: "Venta de Maquinaria",
      descripcion:
        "Equipos agrícolas, forestales e industriales de marcas reconocidas para diferentes necesidades de trabajo.",
    },
    {
      numero: "02",
      icono: "repuestos",
      titulo: "Repuestos y Accesorios",
      descripcion:
        "Variedad de repuestos y accesorios para mantener tus equipos operativos y prolongar su vida útil.",
    },
    {
      numero: "03",
      icono: "soporte",
      titulo: "Servicio Técnico",
      descripcion:
        "Diagnóstico, mantenimiento preventivo y reparación especializada para tus equipos.",
    },
    {
      numero: "04",
      icono: "asesoria",
      titulo: "Asesoría Comercial",
      descripcion:
        "Te orientamos para elegir la maquinaria, herramienta o repuesto adecuado para cada necesidad.",
    },
  ];

  const whatsappUrl =
    "https://wa.me/51979501557?text=" +
    encodeURIComponent(
      "Hola, deseo solicitar asesoría especializada sobre sus productos y servicios.",
    );

  return (
    <section
      className="
        relative
        bg-[#073D27]
        py-16
        sm:py-20
        lg:py-24
        overflow-hidden
      "
    >
      {/* DECORACIONES */}
      <div
        className="
          pointer-events-none
          absolute
          -top-40
          -right-40
          w-[500px]
          h-[500px]
          bg-[#009E49]/20
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-48
          -left-40
          w-[500px]
          h-[500px]
          bg-[#FF6600]/10
          rounded-full
          blur-3xl
        "
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* ======================================== */}
        {/* ENCABEZADO */}
        {/* ======================================== */}

        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <span
            className="
              inline-flex
              items-center
              justify-center
              gap-3
              text-[#FFB17A]
              font-black
              uppercase
              tracking-[0.18em]
              text-xs
              sm:text-sm
            "
          >
            <span className="w-8 h-[3px] bg-[#FF6600] rounded-full" />
            Servicios J&G
            <span className="w-8 h-[3px] bg-[#FF6600] rounded-full" />
          </span>

          <h2
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              xl:text-6xl
              font-black
              text-white
              mt-6
              leading-tight
              tracking-tight
            "
          >
            Soluciones
            <span className="block text-[#75E4A4] mt-1">Integrales</span>
          </h2>

          <p
            className="
              text-green-50/80
              text-sm
              sm:text-base
              lg:text-lg
              mt-5
              leading-relaxed
            "
          >
            Brindamos productos, repuestos y soporte técnico especializado para
            los sectores agrícola, forestal e industrial.
          </p>
        </div>

        {/* ======================================== */}
        {/* TARJETAS DE SERVICIOS */}
        {/* ======================================== */}

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
          {servicios.map((servicio) => (
            <div
              key={servicio.numero}
              className="
                group
                relative
                bg-white
                rounded-[26px]
                p-6
                lg:p-7
                min-h-[300px]
                flex
                flex-col
                overflow-hidden
                border
                border-white/20
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              {/* LÍNEA SUPERIOR */}
              <div
                className="
                  absolute
                  top-0
                  left-0
                  right-0
                  h-1
                  bg-[#009E49]
                  group-hover:bg-[#FF6600]
                  transition-colors
                  duration-300
                "
              />

              {/* NÚMERO DECORATIVO */}
              <span
                className="
                  absolute
                  top-5
                  right-6
                  text-5xl
                  font-black
                  text-gray-100
                  group-hover:text-orange-100
                  transition-colors
                  duration-300
                  select-none
                "
              >
                {servicio.numero}
              </span>

              {/* ICONO */}
              <div
                className="
                  relative
                  z-10
                  w-16
                  h-16
                  rounded-2xl
                  bg-[#E8F7EE]
                  text-[#009E49]
                  flex
                  items-center
                  justify-center
                  group-hover:bg-[#009E49]
                  group-hover:text-white
                  transition-all
                  duration-300
                "
              >
                <IconoServicio tipo={servicio.icono} />
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
                  text-xl
                  lg:text-[22px]
                  font-black
                  text-[#1A1A1A]
                  mt-5
                  leading-snug
                "
              >
                {servicio.titulo}
              </h3>

              {/* DESCRIPCIÓN */}
              <p
                className="
                  text-gray-600
                  text-sm
                  leading-relaxed
                  mt-3
                "
              >
                {servicio.descripcion}
              </p>

              {/* PIE DE TARJETA */}
              <div className="mt-auto pt-6">
                <div className="h-px bg-gray-100 mb-4" />

                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-[#009E49]
                    text-xs
                    font-black
                    uppercase
                    tracking-wide
                  "
                >
                  Grupo Comercial J&G
                  <IconoServicio tipo="flecha" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ======================================== */}
        {/* LLAMADO A LA ACCIÓN */}
        {/* ======================================== */}

        <div
          className="
            mt-12
            lg:mt-16
            bg-white/10
            backdrop-blur-sm
            border
            border-white/15
            rounded-[26px]
            px-6
            py-7
            sm:px-8
            sm:py-8
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
          "
        >
          <div>
            <span
              className="
                text-[#FFB17A]
                font-black
                text-xs
                uppercase
                tracking-[0.16em]
              "
            >
              Atención personalizada
            </span>

            <h3
              className="
                text-white
                text-xl
                sm:text-2xl
                font-black
                mt-2
              "
            >
              ¿Necesitas ayuda para elegir un equipo?
            </h3>

            <p
              className="
                text-green-50/75
                text-sm
                mt-2
                leading-relaxed
              "
            >
              Escríbenos y recibe orientación sobre nuestros productos y
              servicios.
            </p>
          </div>

          <a
            href={whatsappUrl}
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
            <IconoServicio tipo="whatsapp" />
            Solicitar Asesoría
          </a>
        </div>
      </div>
    </section>
  );
}

export default Servicios;
