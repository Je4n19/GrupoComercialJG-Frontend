import TarjetaProducto from "./TarjetaProducto";
import { Link } from "react-router-dom";

function GrillaProductos({ productos = [] }) {
  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* DECORACIÓN DE FONDO */}
      <div
        className="
          pointer-events-none
          absolute
          -top-40
          -right-40
          w-[400px]
          h-[400px]
          rounded-full
          bg-[#009E49]/5
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-40
          w-[400px]
          h-[400px]
          rounded-full
          bg-[#FF6600]/5
          blur-3xl
        "
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* ENCABEZADO */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-7
            lg:gap-10
            mb-10
            sm:mb-12
          "
        >
          <div className="max-w-3xl">
            {/* ETIQUETA */}
            <div className="flex items-center gap-3">
              <span className="w-10 h-[3px] bg-[#FF6600] rounded-full" />

              <span
                className="
                  text-[#009E49]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-xs
                  sm:text-sm
                "
              >
                Catálogo Profesional
              </span>
            </div>

            {/* TÍTULO */}
            <h2
              className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-black
                text-[#1A1A1A]
                mt-5
                leading-tight
                tracking-tight
              "
            >
              Equipos
              <span className="text-[#009E49]"> Destacados</span>
            </h2>

            {/* DESCRIPCIÓN */}
            <p
              className="
                text-gray-600
                text-sm
                sm:text-base
                lg:text-lg
                mt-4
                leading-relaxed
                max-w-2xl
              "
            >
              Descubre maquinaria agrícola, forestal e industrial de marcas
              reconocidas, con opciones para cada necesidad de trabajo.
            </p>
          </div>

          {/* BOTÓN SUPERIOR */}
          <Link
            to="/catalogo"
            className="
              inline-flex
              items-center
              justify-center
              gap-3
              self-start
              lg:self-auto
              shrink-0
              bg-[#FF6600]
              hover:bg-[#E65C00]
              text-white
              px-7
              py-3.5
              rounded-xl
              font-black
              text-sm
              shadow-md
              shadow-orange-500/15
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >
            Ver Catálogo Completo
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* LÍNEA DECORATIVA */}
        <div className="flex items-center gap-3 mb-9">
          <div className="w-14 h-1 bg-[#009E49] rounded-full" />
          <div className="w-6 h-1 bg-[#FF6600] rounded-full" />
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* CONTENIDO */}
        {productos.length === 0 ? (
          /* ESTADO SIN PRODUCTOS */
          <div
            className="
              bg-[#F7FAF8]
              border
              border-[#DCEFE4]
              rounded-[28px]
              px-6
              py-16
              sm:py-20
              text-center
            "
          >
            <div
              className="
                w-20
                h-20
                mx-auto
                bg-[#E8F7EE]
                rounded-2xl
                flex
                items-center
                justify-center
                text-[#009E49]
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10"
                aria-hidden="true"
              >
                <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z" />
                <path d="m3 7.5 9 4.5 9-4.5" />
                <path d="M12 12v9" />
              </svg>
            </div>

            <h3 className="text-2xl font-black text-[#1A1A1A] mt-6">
              No hay productos disponibles
            </h3>

            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              Próximamente agregaremos nuevos equipos a nuestro catálogo.
            </p>

            <Link
              to="/catalogo"
              className="
                inline-flex
                items-center
                justify-center
                mt-7
                px-6
                py-3
                bg-[#009E49]
                hover:bg-[#00843D]
                text-white
                rounded-xl
                font-bold
                transition-colors
              "
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <>
            {/* GRILLA DE PRODUCTOS */}
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
                lg:gap-8
              "
            >
              {productos.map((producto) => (
                <div
                  key={producto.id}
                  className="
                    min-w-0
                    transition-transform
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  <TarjetaProducto producto={producto} />
                </div>
              ))}
            </div>

            {/* BOTÓN INFERIOR */}
            <div className="flex flex-col items-center mt-12 sm:mt-14">
              <p className="text-gray-500 text-sm text-center mb-5">
                Explora más equipos y encuentra el ideal para tu trabajo.
              </p>

              <Link
                to="/catalogo"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  bg-[#009E49]
                  hover:bg-[#00843D]
                  text-white
                  px-9
                  py-4
                  rounded-xl
                  font-black
                  text-sm
                  shadow-md
                  shadow-green-600/15
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                Ver Todos los Productos
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default GrillaProductos;
