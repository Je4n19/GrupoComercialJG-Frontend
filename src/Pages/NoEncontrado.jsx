import { Link } from "react-router-dom";
import logoJ from "../assets/logoJ&G.png";

// ========================================
// ICONOS
// ========================================

function Icono404({ tipo, className = "w-6 h-6" }) {
  const iconos = {
    inicio: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v12h14V9" />
        <path d="M9 21v-7h6v7" />
      </>
    ),
    catalogo: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    contacto: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.8a2 2 0 0 1-.45 2.11L9.03 10.9a16 16 0 0 0 4.07 4.07l1.27-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.68A2 2 0 0 1 22 16.92z" />
      </>
    ),
    flecha: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    atras: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    buscar: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconos[tipo]}
    </svg>
  );
}

// ========================================
// PÁGINA NO ENCONTRADA
// ========================================

function NoEncontrado() {
  const accesos = [
    {
      titulo: "Inicio",
      descripcion: "Volver a la página principal",
      icono: "inicio",
      ruta: "/",
    },
    {
      titulo: "Catálogo",
      descripcion: "Explorar nuestros productos",
      icono: "catalogo",
      ruta: "/catalogo",
    },
    {
      titulo: "Contacto",
      descripcion: "Comunícate con nosotros",
      icono: "contacto",
      ruta: "/contacto",
    },
  ];

  return (
    <main
      className="
        relative
        min-h-screen
        bg-[#F1F6F3]
        flex
        items-center
        justify-center
        px-4
        sm:px-6
        py-10
        sm:py-16
        overflow-hidden
      "
    >
      {/* ======================================== */}
      {/* DECORACIONES DE FONDO */}
      {/* ======================================== */}

      <div className="pointer-events-none absolute -top-40 -left-40 w-[450px] h-[450px] bg-[#009E49]/10 rounded-full blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-[#FF6600]/10 rounded-full blur-3xl" />

      {/* ======================================== */}
      {/* CONTENEDOR PRINCIPAL */}
      {/* ======================================== */}

      <div
        className="
          relative
          z-10
          max-w-4xl
          w-full
          bg-white
          rounded-[24px]
          sm:rounded-[32px]
          lg:rounded-[36px]
          shadow-2xl
          border
          border-gray-100
          overflow-hidden
        "
      >
        {/* LÍNEA SUPERIOR */}
        <div className="h-1.5 bg-gradient-to-r from-[#009E49] via-[#009E49] to-[#FF6600]" />

        <div className="px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 text-center">
          {/* LOGO */}
          <Link
            to="/"
            aria-label="Volver al inicio de Grupo Comercial J&G"
            className="inline-flex items-center justify-center bg-[#F7FAF8] border border-[#DCEFE4] rounded-2xl p-4 hover:border-[#009E49] transition-colors"
          >
            <img
              src={logoJ}
              alt="Grupo Comercial J&G"
              className="w-20 sm:w-24 h-auto object-contain"
            />
          </Link>

          {/* ETIQUETA */}
          <div className="mt-9">
            <span className="inline-flex items-center gap-2 bg-[#E8F7EE] text-[#009E49] px-4 py-2 rounded-full font-black text-xs uppercase tracking-[0.14em]">
              <span className="w-2 h-2 bg-[#FF6600] rounded-full" />
              Página no disponible
            </span>
          </div>

          {/* ======================================== */}
          {/* ERROR 404 */}
          {/* ======================================== */}

          <div className="relative mt-5">
            <h1
              className="
                text-[100px]
                sm:text-[150px]
                lg:text-[190px]
                font-black
                text-[#009E49]
                leading-none
                tracking-[-0.08em]
                select-none
              "
            >
              404
            </h1>

            <div className="w-16 h-1 bg-[#FF6600] rounded-full mx-auto mt-3" />
          </div>

          {/* MENSAJE */}
          <h2
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-black
              text-[#1A1A1A]
              mt-7
              leading-tight
            "
          >
            ¡Ups! Página no encontrada
          </h2>

          <p
            className="
              text-gray-500
              text-sm
              sm:text-base
              lg:text-lg
              mt-5
              max-w-xl
              mx-auto
              leading-relaxed
            "
          >
            La página que intentas visitar no existe o ha cambiado de dirección.
            Puedes regresar al inicio o explorar nuestros productos y servicios.
          </p>

          {/* ======================================== */}
          {/* ACCESOS RÁPIDOS */}
          {/* ======================================== */}

          <div className="mt-10 sm:mt-12">
            <p className="text-xs sm:text-sm font-black text-[#009E49] uppercase tracking-[0.16em]">
              ¿A dónde deseas ir?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {accesos.map((acceso) => (
                <Link
                  key={acceso.ruta}
                  to={acceso.ruta}
                  className="
                    group
                    relative
                    bg-[#F7FAF8]
                    border
                    border-[#DCEFE4]
                    rounded-2xl
                    p-5
                    sm:p-6
                    flex
                    flex-col
                    items-center
                    text-center
                    hover:bg-[#E8F7EE]
                    hover:border-[#009E49]/40
                    hover:-translate-y-1
                    hover:shadow-lg
                    transition-all
                    duration-300
                  "
                >
                  <div
                    className="
                      w-14
                      h-14
                      bg-white
                      text-[#009E49]
                      rounded-2xl
                      shadow-sm
                      flex
                      items-center
                      justify-center
                      group-hover:bg-[#009E49]
                      group-hover:text-white
                      transition-colors
                      duration-300
                    "
                  >
                    <Icono404 tipo={acceso.icono} className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-black text-[#1A1A1A] mt-4">
                    {acceso.titulo}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                    {acceso.descripcion}
                  </p>

                  <span className="inline-flex items-center gap-2 text-[#009E49] font-black text-xs mt-4">
                    Visitar
                    <Icono404
                      tipo="flecha"
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ======================================== */}
          {/* BOTONES PRINCIPALES */}
          {/* ======================================== */}

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              to="/"
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                bg-[#009E49]
                hover:bg-[#00843D]
                text-white
                px-8
                py-4
                rounded-xl
                font-black
                text-sm
                sm:text-base
                shadow-lg
                hover:shadow-xl
                hover:-translate-y-0.5
                transition-all
                duration-300
              "
            >
              <Icono404 tipo="atras" className="w-5 h-5" />
              Volver al Inicio
            </Link>

            <Link
              to="/catalogo"
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                bg-[#FF6600]
                hover:bg-[#E65C00]
                text-white
                px-8
                py-4
                rounded-xl
                font-black
                text-sm
                sm:text-base
                shadow-lg
                hover:shadow-xl
                hover:-translate-y-0.5
                transition-all
                duration-300
              "
            >
              Ver Catálogo
              <Icono404 tipo="flecha" className="w-5 h-5" />
            </Link>
          </div>

          {/* ======================================== */}
          {/* PIE DE PÁGINA */}
          {/* ======================================== */}

          <div className="mt-12 pt-7 border-t border-gray-100">
            <p className="text-gray-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} Grupo Comercial J&G. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NoEncontrado;
