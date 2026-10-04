function Servicios() {
  const servicios = [
    {
      titulo: "Venta de Maquinaria",
      descripcion:
        "Equipos agrícolas, forestales e industriales de marcas reconocidas.",
    },
    {
      titulo: "Repuestos Originales",
      descripcion:
        "Amplio stock de repuestos y accesorios para diversas marcas.",
    },
    {
      titulo: "Servicio Técnico",
      descripcion: "Mantenimiento y reparación especializada para maquinaria.",
    },
    {
      titulo: "Asesoría Comercial",
      descripcion: "Te ayudamos a elegir el equipo ideal para tu negocio.",
    },
  ];

  return (
    <section className="bg-orange-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-bold uppercase">Servicios</span>

          <h2 className="text-5xl font-black text-gray-900 mt-4">
            Todo lo que Necesitas
          </h2>

          <p className="text-gray-600 mt-6 text-lg max-w-3xl mx-auto">
            Soluciones completas para agricultura, forestación e industria.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center text-2xl font-black mb-6">
                {index + 1}
              </div>

              <h3 className="text-2xl font-bold mb-4">{servicio.titulo}</h3>

              <p className="text-gray-600">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Servicios;
