function Estadisticas() {
  const datos = [
    {
      numero: "6",
      titulo: "Marcas Reconocidas",
      icono: "🏆",
    },
    {
      numero: "21+",
      titulo: "Categorías Disponibles",
      icono: "📦",
    },
    {
      numero: "Perú",
      titulo: "Cobertura Nacional",
      icono: "🇵🇪",
    },
    {
      numero: "24/7",
      titulo: "Atención y Soporte",
      icono: "📞",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {datos.map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-3xl
                shadow-lg
                border-t-4
                border-orange-500
                p-8
                text-center
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div className="text-5xl mb-4">{item.icono}</div>

              <h3 className="text-4xl font-black text-orange-500">
                {item.numero}
              </h3>

              <p className="mt-3 text-gray-600 font-semibold">{item.titulo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Estadisticas;
