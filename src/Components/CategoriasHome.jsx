import { Link } from "react-router-dom";

function CategoriasHome() {
  const categorias = [
    {
      nombre: "Motosierras",
      icono: "🪚",
      ruta: "/catalogo?categoria=Motosierras",
    },
    {
      nombre: "Desbrozadoras",
      icono: "🌿",
      ruta: "/catalogo?categoria=Desbrozadoras",
    },
    {
      nombre: "Motobombas",
      icono: "💧",
      ruta: "/catalogo?categoria=Motobombas",
    },
    {
      nombre: "Fumigadoras",
      icono: "🌱",
      ruta: "/catalogo?categoria=Fumigadoras",
    },
    {
      nombre: "Electrobombas",
      icono: "⚡",
      ruta: "/catalogo?categoria=Electrobombas",
    },
    {
      nombre: "Repuestos",
      icono: "⚙️",
      ruta: "/repuestos",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-orange-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold uppercase text-sm">
            Categorías
          </span>

          <h2 className="text-5xl font-black text-gray-900 mt-6">
            Encuentra lo que necesitas
          </h2>

          <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
            Explora nuestras categorías de maquinaria, equipos y repuestos para
            agricultura, forestación e industria.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categorias.map((categoria) => (
            <Link
              key={categoria.nombre}
              to={categoria.ruta}
              className="
                group
                bg-white
                rounded-3xl
                shadow-lg
                p-8
                text-center
                hover:bg-orange-500
                hover:-translate-y-3
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >
              <div className="text-5xl mb-5 group-hover:scale-125 transition duration-300">
                {categoria.icono}
              </div>

              <h3 className="font-bold text-gray-800 group-hover:text-white text-lg">
                {categoria.nombre}
              </h3>

              <p className="text-sm text-gray-500 mt-2 group-hover:text-orange-100">
                Ver productos
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriasHome;
