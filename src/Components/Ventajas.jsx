function Ventajas() {
  const ventajas = [
    {
      numero: "01",
      titulo: "Productos de Calidad",
      descripcion:
        "Trabajamos con marcas reconocidas y equipos seleccionados para ofrecer rendimiento y confianza.",
      icono: "✓",
    },
    {
      numero: "02",
      titulo: "Asesoría Especializada",
      descripcion:
        "Te ayudamos a encontrar la maquinaria o equipo ideal para cada tipo de trabajo.",
      icono: "⚙",
    },
    {
      numero: "03",
      titulo: "Cobertura Nacional",
      descripcion:
        "Atendemos pedidos y consultas de clientes en diferentes regiones del Perú.",
      icono: "🚚",
    },
    {
      numero: "04",
      titulo: "Soporte Técnico",
      descripcion:
        "Te brindamos orientación y respaldo para mantener tus equipos en buenas condiciones.",
      icono: "🛠",
    },
  ];

  return (
    <section className="relative bg-gray-950 py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[450px] h-[450px] bg-[#e84d05]/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[450px] h-[450px] bg-[#e84d05]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* =========================
            ENCABEZADO
        ========================== */}

        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
          <span className="inline-flex items-center justify-center gap-3 text-[#e84d05] font-black uppercase tracking-[0.18em] text-xs sm:text-sm">
            <span className="w-8 h-[3px] bg-[#e84d05] rounded-full" />
            ¿Por qué elegirnos?
            <span className="w-8 h-[3px] bg-[#e84d05] rounded-full" />
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-5 leading-tight tracking-tight">
            El respaldo que necesitas
            <span className="block text-[#e84d05] mt-1">
              para seguir trabajando.
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mt-5">
            En Grupo Comercial J&G te ofrecemos más que productos: calidad,
            asesoría y soluciones para que sigas trabajando con confianza.
          </p>
        </div>

        {/* =========================
            TARJETAS
        ========================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {ventajas.map((item) => (
            <div
              key={item.numero}
              className="
                group relative
                bg-white
                rounded-[24px]
                p-6 lg:p-7
                min-h-[280px]
                overflow-hidden
                shadow-xl
                border border-gray-100
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all duration-300
              "
            >
              {/* Número decorativo */}
              <span className="absolute top-4 right-5 text-5xl font-black text-gray-100 select-none group-hover:text-orange-100 transition-colors duration-300">
                {item.numero}
              </span>

              {/* Contenido */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Icono */}
                <div
                  className="
                  w-12 h-12
                  bg-orange-50
                  rounded-xl
                  flex items-center justify-center
                  text-2xl text-[#e84d05]
                  group-hover:bg-[#e84d05]
                  group-hover:text-white
                  transition-all duration-300
                "
                >
                  {item.icono}
                </div>

                {/* Línea naranja */}
                <div className="w-10 h-[3px] bg-[#e84d05] rounded-full mt-5 group-hover:w-16 transition-all duration-300" />

                {/* Título */}
                <h3 className="text-xl lg:text-[21px] font-black text-gray-950 mt-5 leading-snug">
                  {item.titulo}
                </h3>

                {/* Descripción */}
                <p className="text-gray-500 text-sm leading-relaxed mt-3">
                  {item.descripcion}
                </p>

                {/* Detalle inferior */}
                <div className="mt-auto pt-5">
                  <div className="h-px bg-gray-100 mb-4" />

                  <span className="text-[#e84d05] font-extrabold text-[11px] uppercase tracking-wide">
                    Grupo Comercial J&G
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =========================
            FRANJA INFERIOR
        ========================== */}

        <div className="mt-10 md:mt-12 bg-white/5 border border-white/10 rounded-2xl px-6 py-6 md:px-8 md:py-7">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-center md:text-left">
              <p className="text-[#fb7b43] text-xs uppercase tracking-[0.16em] font-bold">
                Atención personalizada
              </p>

              <h3 className="text-white text-xl md:text-2xl font-black mt-2">
                ¿Necesitas ayuda para elegir un equipo?
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Nuestro equipo está listo para orientarte.
              </p>
            </div>

            <a
              href="https://wa.me/51979501557?text=Hola,%20necesito%20asesoría%20para%20elegir%20un%20equipo"
              target="_blank"
              rel="noopener noreferrer"
              className="
                shrink-0
                inline-flex items-center justify-center gap-2
                bg-[#e84d05]
                hover:bg-[#c94104]
                text-white
                px-7 py-3.5
                rounded-xl
                font-black
                shadow-lg
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              Solicitar Asesoría
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ventajas;
