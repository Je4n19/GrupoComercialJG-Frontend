function Ventajas() {
  const ventajas = [
    {
      titulo: "Productos Originales",
      descripcion:
        "Trabajamos con marcas reconocidas y productos garantizados.",
      icono: "✅",
    },
    {
      titulo: "Asesoría Especializada",
      descripcion: "Te ayudamos a elegir el equipo ideal para tu trabajo.",
      icono: "👨‍🔧",
    },
    {
      titulo: "Entrega Rápida",
      descripcion: "Atendemos pedidos para clientes de todo el Perú.",
      icono: "🚚",
    },
    {
      titulo: "Soporte Técnico",
      descripcion: "Respaldo y acompañamiento después de la compra.",
      icono: "🛠️",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-bold uppercase">Ventajas</span>

          <h2 className="text-5xl font-black text-gray-900 mt-4">
            ¿Por qué elegir Grupo Comercial J&G?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ventajas.map((item, index) => (
            <div
              key={index}
              className="bg-orange-50 rounded-3xl p-8 text-center hover:shadow-xl transition"
            >
              <div className="text-5xl mb-5">{item.icono}</div>

              <h3 className="font-bold text-xl mb-3">{item.titulo}</h3>

              <p className="text-gray-600">{item.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Ventajas;
