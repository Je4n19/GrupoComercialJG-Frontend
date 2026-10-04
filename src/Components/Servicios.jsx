function Servicios() {
  const servicios = [
    {
      icono: "🚜",
      titulo: "Venta de Maquinaria",
      descripcion:
        "Equipos agrícolas, forestales e industriales de las mejores marcas del mercado.",
    },
    {
      icono: "⚙️",
      titulo: "Repuestos Originales",
      descripcion:
        "Amplio stock de repuestos y accesorios originales para maximizar la vida útil de sus equipos.",
    },
    {
      icono: "🛠️",
      titulo: "Servicio Técnico",
      descripcion:
        "Diagnóstico, mantenimiento preventivo y reparación especializada.",
    },
    {
      icono: "🤝",
      titulo: "Asesoría Comercial",
      descripcion:
        "Nuestro equipo le ayuda a elegir la maquinaria ideal para cada necesidad.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest">
            Servicios J&G
          </span>

          <h2 className="text-5xl md:text-6xl font-black text-white mt-8">
            Soluciones Integrales
          </h2>

          <p className="text-gray-300 text-xl mt-6 max-w-3xl mx-auto">
            Brindamos productos, repuestos y soporte técnico especializado para
            los sectores agrícola, forestal e industrial.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="
                group
                bg-white/5
                backdrop-blur-sm
                border
                border-white/10
                rounded-[30px]
                p-8
                hover:bg-orange-500
                hover:border-orange-500
                transition-all
                duration-500
                hover:-translate-y-3
              "
            >
              <div
                className="
                  w-20
                  h-20
                  rounded-3xl
                  bg-orange-500
                  text-white
                  flex
                  items-center
                  justify-center
                  text-4xl
                  mb-8
                  group-hover:bg-white
                  group-hover:text-orange-500
                  transition-all
                "
              >
                {servicio.icono}
              </div>

              <h3
                className="
                  text-2xl
                  font-black
                  text-white
                  mb-5
                "
              >
                {servicio.titulo}
              </h3>

              <p
                className="
                  text-gray-300
                  group-hover:text-white
                  leading-relaxed
                "
              >
                {servicio.descripcion}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a
            href="https://wa.me/51979501557"
            target="_blank"
            rel="noreferrer"
            className="
              inline-block
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-10
              py-5
              rounded-2xl
              font-bold
              text-lg
              shadow-2xl
              transition
            "
          >
            Solicitar Asesoría Especializada
          </a>
        </div>
      </div>
    </section>
  );
}

export default Servicios;
