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
        "Te orientamos para encontrar la maquinaria o equipo adecuado según el trabajo que necesitas realizar.",
      icono: "⚙",
    },
    {
      numero: "03",
      titulo: "Cobertura Nacional",
      descripcion:
        "Atendemos pedidos y consultas de clientes en diferentes partes del Perú.",
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
    <section className="relative bg-gray-950 py-24 lg:py-28 overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#e84d05]/10 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#e84d05]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* =========================
            ENCABEZADO
        ========================== */}

        <div className="grid lg:grid-cols-2 gap-10 items-end mb-16">
          <div>
            <span className="inline-flex items-center gap-3 text-[#e84d05] font-black uppercase tracking-[0.18em] text-sm">
              <span className="w-10 h-[3px] bg-[#e84d05] rounded-full"></span>
              ¿Por qué elegirnos?
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-6 leading-[1.05]">
              El respaldo que necesitas
              <span className="block text-[#e84d05] mt-2">
                para seguir trabajando.
              </span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl lg:ml-auto">
              En Grupo Comercial J&G buscamos ofrecerte más que un producto:
              queremos acompañarte con atención, orientación y soluciones para
              tus equipos.
            </p>
          </div>
        </div>

        {/* =========================
            TARJETAS
        ========================== */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ventajas.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-[28px] p-7 lg:p-8 min-h-[330px] overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Número decorativo */}
              <span className="absolute -right-2 -top-5 text-[110px] font-black text-gray-100 leading-none select-none group-hover:text-orange-50 transition">
                {item.numero}
              </span>

              {/* Contenido */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Icono */}
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl text-[#e84d05] group-hover:bg-[#e84d05] group-hover:text-white transition-all duration-300">
                  {item.icono}
                </div>

                {/* Línea */}
                <div className="w-12 h-1 bg-[#e84d05] rounded-full mt-7 group-hover:w-20 transition-all duration-300"></div>

                {/* Título */}
                <h3 className="text-2xl font-black text-gray-950 mt-6 leading-tight">
                  {item.titulo}
                </h3>

                {/* Descripción */}
                <p className="text-gray-500 mt-4 leading-relaxed">
                  {item.descripcion}
                </p>

                {/* Detalle inferior */}
                <div className="mt-auto pt-6">
                  <span className="text-[#e84d05] font-black text-sm uppercase tracking-wider">
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

        <div className="mt-14 border-t border-white/10 pt-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm uppercase tracking-[0.2em] font-bold">
                Atención personalizada
              </p>

              <h3 className="text-white text-2xl md:text-3xl font-black mt-2">
                ¿Necesitas ayuda para elegir un equipo?
              </h3>
            </div>

            <a
              href="https://wa.me/51979501557?text=Hola,%20necesito%20asesoría%20para%20elegir%20un%20equipo"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 bg-[#e84d05] hover:bg-[#c94104] text-white px-8 py-4 rounded-xl font-black shadow-lg transition hover:-translate-y-1"
            >
              Solicitar Asesoría
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ventajas;
