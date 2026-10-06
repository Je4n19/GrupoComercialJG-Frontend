import { Link } from "react-router-dom";

function CategoriasHome() {
  const categorias = [
    {
      nombre: "Motosierras",
      icono: "🪚",
      descripcion: "Corte y trabajo forestal",
      ruta: "/catalogo?categoria=Motosierras",
    },
    {
      nombre: "Desbrozadoras",
      icono: "🌿",
      descripcion: "Limpieza y mantenimiento",
      ruta: "/catalogo?categoria=Desbrozadoras",
    },
    {
      nombre: "Motobombas",
      icono: "💧",
      descripcion: "Bombeo y distribución",
      ruta: "/catalogo?categoria=Motobombas",
    },
    {
      nombre: "Fumigadoras",
      icono: "🌱",
      descripcion: "Aplicación y fumigación",
      ruta: "/catalogo?categoria=Fumigadoras",
    },
    {
      nombre: "Electrobombas",
      icono: "⚡",
      descripcion: "Soluciones de bombeo",
      ruta: "/catalogo?categoria=Electrobombas",
    },
    {
      nombre: "Repuestos",
      icono: "⚙️",
      descripcion: "Repuestos para tus equipos",
      ruta: "/repuestos",
    },
  ];

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Decoración */}

      <div className="absolute -top-40 -right-40 w-[450px] h-[450px] bg-orange-100/60 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#e84d05]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* ENCABEZADO */}

        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-3 text-[#e84d05] font-black uppercase tracking-[0.18em] text-xs sm:text-sm">
            <span className="w-8 sm:w-10 h-[3px] bg-[#e84d05] rounded-full"></span>
            Nuestras Categorías
            <span className="w-8 sm:w-10 h-[3px] bg-[#e84d05] rounded-full"></span>
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 mt-5 leading-tight">
            Encuentra el equipo
            <span className="text-[#e84d05]"> que necesitas</span>
          </h2>

          <p className="text-gray-500 text-base sm:text-lg mt-4 leading-relaxed">
            Explora nuestra selección de maquinaria, equipos y repuestos para
            diferentes tipos de trabajo.
          </p>
        </div>

        {/* CATEGORÍAS */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {categorias.map((categoria, index) => (
            <Link
              key={categoria.nombre}
              to={categoria.ruta}
              className="
                group
                relative
                bg-gray-50
                border
                border-gray-100
                rounded-2xl
                sm:rounded-3xl
                p-4
                sm:p-6
                min-h-[170px]
                sm:min-h-[220px]
                flex
                flex-col
                overflow-hidden
                hover:bg-gray-950
                hover:border-gray-950
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >
              {/* Número decorativo */}

              <span className="absolute -right-1 -top-4 text-[65px] sm:text-[85px] font-black text-gray-100 group-hover:text-white/5 transition select-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Icono */}

              <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition duration-300">
                {categoria.icono}
              </div>

              {/* Información */}

              <div className="relative z-10 mt-auto pt-5">
                <h3 className="font-black text-gray-900 group-hover:text-white text-base sm:text-lg leading-tight transition">
                  {categoria.nombre}
                </h3>

                <p className="hidden sm:block text-sm text-gray-500 group-hover:text-gray-400 mt-2 leading-relaxed transition">
                  {categoria.descripcion}
                </p>

                <div className="flex items-center gap-2 mt-3 sm:mt-4 text-[#e84d05] font-black text-xs sm:text-sm">
                  <span>Ver productos</span>

                  <span className="group-hover:translate-x-1 transition">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ACCESO AL CATÁLOGO */}

        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/catalogo"
            className="inline-flex items-center justify-center gap-3 bg-[#e84d05] hover:bg-[#c94104] text-white px-7 sm:px-9 py-4 rounded-xl font-black shadow-lg transition hover:-translate-y-1"
          >
            Ver Catálogo Completo
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategoriasHome;
