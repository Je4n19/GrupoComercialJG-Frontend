function IconoEstadistica({ tipo }) {
  const iconos = {
    trofeo: (
      <>
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10v6a5 5 0 0 1-10 0V4Z" />
        <path d="M7 6H4v2a4 4 0 0 0 4 4" />
        <path d="M17 6h3v2a4 4 0 0 1-4 4" />
      </>
    ),
    categorias: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    cobertura: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a15 15 0 0 1 0 18" />
        <path d="M12 3a15 15 0 0 0 0 18" />
      </>
    ),
    telefono: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.8a2 2 0 0 1-.45 2.11L9.03 10.9a16 16 0 0 0 4.07 4.07l1.27-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.68A2 2 0 0 1 22 16.92z" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8 sm:w-9 sm:h-9"
      aria-hidden="true"
    >
      {iconos[tipo]}
    </svg>
  );
}

function Estadisticas() {
  const datos = [
    {
      numero: "6",
      titulo: "Marcas Reconocidas",
      descripcion: "Variedad de marcas para tus necesidades.",
      icono: "trofeo",
    },
    {
      numero: "21+",
      titulo: "Categorías Disponibles",
      descripcion: "Maquinaria, herramientas y repuestos.",
      icono: "categorias",
    },
    {
      numero: "Perú",
      titulo: "Cobertura Nacional",
      descripcion: "Atendemos consultas y pedidos a nivel nacional.",
      icono: "cobertura",
    },
    {
      numero: "24/7",
      titulo: "Consultas por WhatsApp",
      descripcion: "Envíanos tu mensaje cuando lo necesites.",
      icono: "telefono",
    },
  ];

  return (
    <section
      className="
        relative
        bg-[#F7FAF8]
        py-16
        sm:py-20
        lg:py-24
        overflow-hidden
      "
    >
      {/* DECORACIONES DE FONDO */}
      <div
        className="
          pointer-events-none
          absolute
          -top-36
          -left-36
          w-80
          h-80
          rounded-full
          bg-[#009E49]/5
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-32
          w-96
          h-96
          rounded-full
          bg-[#FF6600]/5
          blur-3xl
        "
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
          <span
            className="
              inline-flex
              items-center
              gap-2
              text-[#009E49]
              text-xs
              sm:text-sm
              font-black
              uppercase
              tracking-[0.16em]
            "
          >
            <span className="w-7 h-[3px] bg-[#FF6600] rounded-full" />
            Grupo Comercial J&G
            <span className="w-7 h-[3px] bg-[#FF6600] rounded-full" />
          </span>

          <h2
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-black
              text-[#1A1A1A]
              mt-5
              leading-tight
              tracking-tight
            "
          >
            Soluciones para
            <span className="text-[#009E49]"> cada trabajo</span>
          </h2>

          <p
            className="
              text-gray-600
              text-sm
              sm:text-base
              lg:text-lg
              mt-4
              leading-relaxed
            "
          >
            Conoce lo que ofrecemos para los sectores agrícola, forestal e
            industrial.
          </p>
        </div>

        {/* TARJETAS */}
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
          {datos.map((item) => (
            <div
              key={item.titulo}
              className="
                group
                relative
                bg-white
                rounded-[24px]
                border
                border-gray-100
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
                overflow-hidden
                p-6
                sm:p-7
                text-center
                flex
                flex-col
                items-center
              "
            >
              {/* LÍNEA SUPERIOR VERDE */}
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

              {/* ICONO */}
              <div
                className="
                  w-16
                  h-16
                  sm:w-[72px]
                  sm:h-[72px]
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
                <IconoEstadistica tipo={item.icono} />
              </div>

              {/* NÚMERO */}
              <h3
                className="
                  text-4xl
                  sm:text-5xl
                  font-black
                  text-[#009E49]
                  mt-6
                  tracking-tight
                "
              >
                {item.numero}
              </h3>

              {/* LÍNEA NARANJA */}
              <div
                className="
                  w-10
                  h-[3px]
                  bg-[#FF6600]
                  rounded-full
                  mt-4
                  group-hover:w-16
                  transition-all
                  duration-300
                "
              />

              {/* TÍTULO */}
              <h4
                className="
                  text-[#1A1A1A]
                  text-base
                  sm:text-lg
                  font-black
                  mt-5
                "
              >
                {item.titulo}
              </h4>

              {/* DESCRIPCIÓN */}
              <p
                className="
                  text-gray-500
                  text-sm
                  leading-relaxed
                  mt-3
                "
              >
                {item.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Estadisticas;
