import { Link } from "react-router-dom";

function CategoriasHome() {
  const categorias = [
    {
      nombre: "Motosierras",
      icono: "🪚",
    },
    {
      nombre: "Desbrozadoras",
      icono: "🌿",
    },
    {
      nombre: "Motobombas",
      icono: "💧",
    },
    {
      nombre: "Fumigadoras",
      icono: "🚜",
    },
    {
      nombre: "Electrobombas",
      icono: "⚙️",
    },
    {
      nombre: "Repuestos",
      icono: "🔩",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-bold uppercase">
            Categorías
          </span>

          <h2 className="text-5xl font-black text-gray-900 mt-4">
            Encuentra lo que necesitas
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Equipos y repuestos para agricultura, forestación e industria.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categorias.map((categoria, index) => (
            <Link
              key={index}
              to="/catalogo"
              className="
                bg-white
                border
                border-orange-100
                rounded-3xl
                p-8
                text-center
                shadow-lg
                hover:bg-orange-500
                hover:text-white
                hover:-translate-y-2
                transition-all
              "
            >
              <div className="text-5xl mb-4">{categoria.icono}</div>

              <h3 className="font-bold text-lg">{categoria.nombre}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriasHome;
