import stihlLogo from "../assets/Marcas/stihl.png";
import hondaLogo from "../assets/Marcas/honda.png";
import mebaLogo from "../assets/Marcas/meba.png";
import truperLogo from "../assets/Marcas/truper.png";

import bellotaLogo from "../assets/Marcas/BELLOTA_NEGRO.png";
import blackDeckerLogo from "../assets/Marcas/BLACK_DECKER.PNG";
import fertonLogo from "../assets/Marcas/FERTON.png";
import jactoLogo from "../assets/Marcas/JACTO.png";
import jopcoLogo from "../assets/Marcas/JOPCO.png";
import leoLogo from "../assets/Marcas/LEO.png";
import oregonLogo from "../assets/Marcas/OREGON.png";
import shindaiwaLogo from "../assets/Marcas/SHINDAIWA.png";
import toyamaLogo from "../assets/Marcas/TOYAMA.png";
import uyustoolsLogo from "../assets/Marcas/UYUSTOOLS.png";
import vistonyLogo from "../assets/Marcas/VISTONY.png";

// ========================================
// LISTA DE MARCAS
// ========================================

const marcas = [
  {
    nombre: "STIHL",
    logo: stihlLogo,
  },
  {
    nombre: "Honda",
    logo: hondaLogo,
  },
  {
    nombre: "Meba",
    logo: mebaLogo,
  },
  {
    nombre: "Truper",
    logo: truperLogo,
  },
  {
    nombre: "Bellota",
    logo: bellotaLogo,
  },
  {
    nombre: "Black & Decker",
    logo: blackDeckerLogo,
  },
  {
    nombre: "Ferton",
    logo: fertonLogo,
  },
  {
    nombre: "Jacto",
    logo: jactoLogo,
  },
  {
    nombre: "Jopco",
    logo: jopcoLogo,
  },
  {
    nombre: "LEO",
    logo: leoLogo,
  },
  {
    nombre: "Oregon",
    logo: oregonLogo,
  },
  {
    nombre: "Shindaiwa",
    logo: shindaiwaLogo,
  },
  {
    nombre: "Toyama",
    logo: toyamaLogo,
  },
  {
    nombre: "Uyustools",
    logo: uyustoolsLogo,
  },
  {
    nombre: "Vistony",
    logo: vistonyLogo,
  },
];

// ========================================
// COMPONENTE MARCAS
// ========================================

function Marcas() {
  return (
    <section
      id="marcas"
      className="
        relative
        bg-white
        py-20
        sm:py-24
        lg:py-28
        overflow-hidden
      "
    >
      {/* DECORACIÓN DE FONDO */}

      <div
        className="
          pointer-events-none
          absolute
          -top-32
          -left-32
          w-[400px]
          h-[400px]
          bg-[#009E49]/5
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-32
          w-[450px]
          h-[450px]
          bg-[#009E49]/5
          rounded-full
          blur-3xl
        "
      />

      {/* CONTENIDO PRINCIPAL */}

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* ENCABEZADO */}

        <div
          className="
            grid
            lg:grid-cols-2
            gap-8
            lg:gap-12
            items-end
            mb-12
            lg:mb-14
          "
        >
          <div>
            <span
              className="
                inline-flex
                items-center
                gap-3
                text-[#009E49]
                font-black
                uppercase
                tracking-[0.18em]
                text-xs
                sm:text-sm
              "
            >
              <span
                className="
                  w-10
                  h-[3px]
                  bg-[#FF6600]
                  rounded-full
                "
              />
              Nuestras Marcas
            </span>

            <h2
              className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                xl:text-6xl
                font-black
                text-[#1A1A1A]
                mt-6
                leading-[1.08]
                tracking-tight
              "
            >
              Marcas reconocidas,
              <span
                className="
                  block
                  text-[#009E49]
                  mt-2
                "
              >
                equipos para cada trabajo.
              </span>
            </h2>
          </div>

          {/* DESCRIPCIÓN */}

          <div className="lg:pb-2">
            <p
              className="
                text-gray-600
                text-base
                sm:text-lg
                leading-relaxed
                max-w-xl
                lg:ml-auto
              "
            >
              Trabajamos con diferentes marcas de maquinaria, herramientas y
              equipos para ofrecer alternativas según las necesidades de cada
              cliente.
            </p>
          </div>
        </div>

        {/* ================================= */}
        {/* TARJETAS DE LAS MARCAS */}
        {/* ================================= */}

        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-5
            gap-4
            sm:gap-5
          "
        >
          {marcas.map((marca) => (
            <div
              key={marca.nombre}
              className="
                group
                relative
                min-h-[175px]
                sm:min-h-[190px]
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-sm
                hover:shadow-xl
                hover:border-[#009E49]/40
                hover:-translate-y-2
                transition-all
                duration-300
                overflow-hidden
              "
            >
              {/* LÍNEA SUPERIOR */}

              <div
                className="
                  absolute
                  top-0
                  left-1/2
                  -translate-x-1/2
                  w-0
                  h-1
                  bg-[#FF6600]
                  rounded-full
                  group-hover:w-16
                  transition-all
                  duration-300
                "
              />

              {/* LOGO Y NOMBRE */}

              <div
                className="
                  h-full
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-5
                  px-4
                  py-7
                "
              >
                {/* LOGO */}

                <div
                  className="
                    w-full
                    h-20
                    flex
                    items-center
                    justify-center
                  "
                >
                  <img
                    src={marca.logo}
                    alt={`Logo de ${marca.nombre}`}
                    loading="lazy"
                    className="
                      max-h-20
                      max-w-full
                      w-auto
                      object-contain
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />
                </div>

                {/* NOMBRE */}

                <span
                  className="
                    text-gray-500
                    text-sm
                    font-bold
                    text-center
                    group-hover:text-[#009E49]
                    transition-colors
                    duration-300
                  "
                >
                  {marca.nombre}
                </span>
              </div>

              {/* BORDE INFERIOR */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  h-1
                  bg-[#009E49]
                  scale-x-0
                  group-hover:scale-x-100
                  transition-transform
                  duration-300
                  origin-center
                "
              />
            </div>
          ))}
        </div>

        {/* ================================= */}
        {/* MENSAJE INFERIOR */}
        {/* ================================= */}

        <div
          className="
            mt-12
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-4
            text-center
          "
        >
          {/* ICONO */}

          <div
            className="
              w-12
              h-12
              shrink-0
              rounded-full
              bg-[#E6F6EC]
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
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
          </div>

          {/* TEXTO */}

          <p
            className="
              text-gray-600
              text-sm
              sm:text-base
              leading-relaxed
            "
          >
            Diferentes marcas y alternativas para{" "}
            <span className="font-black text-[#1A1A1A]">
              agricultura, trabajo forestal e industria.
            </span>
          </p>
        </div>

        {/* ACENTO DECORATIVO */}

        <div
          className="
            w-20
            h-1
            bg-[#FF6600]
            rounded-full
            mx-auto
            mt-10
          "
        />
      </div>
    </section>
  );
}

export default Marcas;
