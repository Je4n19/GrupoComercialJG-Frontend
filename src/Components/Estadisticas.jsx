function Estadisticas() {
  const datos = [
    {
      numero: "12+",
      titulo: "Productos",
    },
    {
      numero: "8+",
      titulo: "Repuestos",
    },
    {
      numero: "21+",
      titulo: "Categorías",
    },
    {
      numero: "100%",
      titulo: "Garantía",
    },
  ];

  return (
    <section className="bg-orange-500 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {datos.map((item, index) => (
            <div key={index} className="text-center text-white">
              <h3 className="text-5xl font-black">{item.numero}</h3>

              <p className="mt-3 text-orange-100 font-medium">{item.titulo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Estadisticas;
