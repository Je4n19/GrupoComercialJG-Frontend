function Servicios() {
  const servicios = [
    {
      icono: "🚜",
      titulo: "Venta de Maquinaria",
      descripcion:
        "Comercializamos maquinaria agrícola, forestal e industrial de marcas reconocidas.",
    },
    {
      icono: "⚙️",
      titulo: "Venta de Repuestos",
      descripcion:
        "Disponemos de repuestos originales y accesorios para diferentes equipos y marcas.",
    },
    {
      icono: "🛠️",
      titulo: "Servicio Técnico",
      descripcion:
        "Mantenimiento y reparación especializada para motosierras, fumigadoras y desbrozadoras.",
    },
    {
      icono: "👨‍🔧",
      titulo: "Asesoría Especializada",
      descripcion:
        "Nuestro equipo te ayuda a elegir el equipo adecuado según tu necesidad.",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Nuestros Servicios
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Soluciones integrales para agricultura, forestación e industria.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-2xl
                p-8
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div className="text-5xl mb-5">{servicio.icono}</div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {servicio.titulo}
              </h3>

              <p className="text-gray-600">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Servicios;
