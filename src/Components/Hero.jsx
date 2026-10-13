import { Link } from "react-router-dom";

import logoJ from "../assets/logoJ&G.png";
import heroImg from "../assets/inicio.png";

function Hero() {
  return (
    <section
      className="
        relative
        min-h-[620px]
        sm:min-h-[680px]
        lg:min-h-[780px]
        flex
        items-center
        overflow-hidden
        bg-[#1A1A1A]
      "
    >
      {/* ================================= */}
      {/* IMAGEN PRINCIPAL */}
      {/* ================================= */}

      <img
        src={heroImg}
        alt="Maquinaria agrícola, forestal e industrial"
        className="
          absolute inset-0
          w-full h-full
          object-cover
          object-[65%_center]
          sm:object-center
          lg:object-[center_right]
        "
      />

      {/* OVERLAY OSCURO */}
      <div
        className="
          absolute inset-0
          bg-black/55
          sm:bg-black/45
          lg:bg-gradient-to-r
          lg:from-[#081B10]/95
          lg:via-[#10291A]/70
          lg:to-black/15
        "
      />

      {/* DEGRADADO INFERIOR */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black/75
          via-transparent
          to-black/10
        "
      />

      {/* EFECTO VERDE DECORATIVO */}
      <div
        className="
          absolute
          -left-32
          bottom-0
          w-[450px]
          h-[450px]
          bg-[#009E49]/15
          blur-3xl
          rounded-full
          pointer-events-none
        "
      />

      {/* ================================= */}
      {/* CONTENIDO PRINCIPAL */}
      {/* ================================= */}

      <div
        className="
          relative z-10
          max-w-7xl
          mx-auto
          px-5 sm:px-6
          w-full
          py-14 sm:py-16 lg:py-20
        "
      >
        <div className="max-w-2xl">
          {/* IDENTIDAD DE EMPRESA */}
          <div
            className="
              inline-flex
              items-center
              gap-3
              bg-white/10
              backdrop-blur-md
              border border-white/20
              px-4 py-2
              rounded-full
              shadow-lg
            "
          >
            <div className="bg-white rounded-lg p-1">
              <img
                src={logoJ}
                alt="Grupo Comercial J&G"
                className="
                  w-6 h-6
                  sm:w-7 sm:h-7
                  object-contain
                "
              />
            </div>

            <span
              className="
                text-[10px]
                sm:text-xs
                uppercase
                tracking-widest
                font-extrabold
                text-white
              "
            >
              Grupo Comercial J&G
            </span>

            <span className="w-2 h-2 bg-[#009E49] rounded-full" />
          </div>

          {/* ================================= */}
          {/* TÍTULO PRINCIPAL */}
          {/* ================================= */}

          <h1
            className="
              text-[38px]
              sm:text-5xl
              lg:text-6xl
              xl:text-7xl
              font-black
              text-white
              leading-[1.04]
              tracking-tight
              mt-7
            "
          >
            Potencia y
            <br />
            Rendimiento
            <span
              className="
                block
                text-[#FF6600]
                mt-3
              "
            >
              para el Campo e Industria
            </span>
          </h1>

          {/* DESCRIPCIÓN */}
          <p
            className="
              text-base
              sm:text-lg
              text-gray-100
              mt-7
              leading-relaxed
              max-w-xl
            "
          >
            Maquinaria agrícola, forestal e industrial, repuestos y atención
            especializada para diferentes necesidades de trabajo.
          </p>

          {/* ================================= */}
          {/* BOTONES DE ACCIÓN */}
          {/* ================================= */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-3 sm:gap-4
              mt-9
            "
          >
            {/* CATÁLOGO */}
            <Link
              to="/catalogo"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                bg-[#FF6600]
                hover:bg-[#E65C00]
                text-white
                px-7 sm:px-8
                py-4
                rounded-xl
                font-black
                text-sm
                transition-all
                duration-300
                shadow-lg
                hover:-translate-y-1
                hover:shadow-orange-600/30
              "
            >
              Explorar Catálogo
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/51979501557?text=Hola,%20deseo%20realizar%20una%20cotización"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                bg-white/10
                hover:bg-[#009E49]
                text-white
                border border-white/30
                hover:border-[#009E49]
                backdrop-blur-sm
                px-7 sm:px-8
                py-4
                rounded-xl
                font-black
                text-sm
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              Cotizar por WhatsApp
            </a>
          </div>

          {/* ================================= */}
          {/* INFORMACIÓN DE CONFIANZA */}
          {/* ================================= */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-0
              sm:gap-5
              mt-9
              sm:mt-12
              pt-6
              sm:pt-8
              border-t
              border-white/20
            "
          >
            {/* ATENCIÓN */}
            <div
              className="
                py-3 sm:py-0
                border-b sm:border-b-0
                border-white/10
              "
            >
              <span
                className="
                  block
                  text-[10px] sm:text-xs
                  uppercase
                  tracking-wider
                  text-[#73E2A4]
                  font-extrabold
                "
              >
                Atención
              </span>

              <p
                className="
                  text-white
                  text-sm sm:text-base
                  font-black
                  mt-1
                "
              >
                +51 979 501 557
              </p>
            </div>

            {/* COBERTURA */}
            <div
              className="
                py-3 sm:py-0
                border-b sm:border-b-0
                border-white/10
              "
            >
              <span
                className="
                  block
                  text-[10px] sm:text-xs
                  uppercase
                  tracking-wider
                  text-[#73E2A4]
                  font-extrabold
                "
              >
                Cobertura
              </span>

              <p
                className="
                  text-white
                  text-sm sm:text-base
                  font-black
                  mt-1
                "
              >
                Todo el Perú
              </p>
            </div>

            {/* SERVICIO */}
            <div className="py-3 sm:py-0">
              <span
                className="
                  block
                  text-[10px] sm:text-xs
                  uppercase
                  tracking-wider
                  text-[#73E2A4]
                  font-extrabold
                "
              >
                Servicio
              </span>

              <p
                className="
                  text-white
                  text-sm sm:text-base
                  font-black
                  mt-1
                "
              >
                Atención Especializada
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LÍNEA INFERIOR VERDE */}
      <div
        className="
          absolute
          bottom-0 left-0 right-0
          h-1
          bg-[#009E49]
        "
      />
    </section>
  );
}

export default Hero;
