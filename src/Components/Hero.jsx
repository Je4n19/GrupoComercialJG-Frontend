import { Link } from "react-router-dom";

import logoJ from "../assets/logoJ&G.png";
import heroImg from "../assets/inicio.png";

function Hero() {
  return (
    <section className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[780px] flex items-center overflow-hidden bg-gray-950">
      {/* IMAGEN DE FONDO */}

      <img
        src={heroImg}
        alt="Maquinaria agrícola, forestal e industrial"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-[65%_center]
          sm:object-center
          lg:object-[center_right]
        "
      />

      {/* OVERLAY PRINCIPAL */}

      <div
        className="
          absolute
          inset-0
          bg-black/65
          sm:bg-black/55
          lg:bg-gradient-to-r
          lg:from-black/90
          lg:via-black/65
          lg:to-black/10
        "
      ></div>

      {/* DEGRADADO INFERIOR */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10"></div>

      {/* EFECTO NARANJA */}

      <div className="absolute -left-32 bottom-0 w-[450px] h-[450px] bg-[#e84d05]/10 blur-3xl rounded-full"></div>

      {/* CONTENIDO */}

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full py-14 sm:py-16 lg:py-20">
        <div className="max-w-2xl">
          {/* BADGE */}

          <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full">
            <div className="bg-white rounded-lg p-1">
              <img
                src={logoJ}
                alt="Grupo Comercial J&G"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              />
            </div>

            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold text-white">
              Grupo Comercial J&G
            </span>
          </div>

          {/* TÍTULO */}

          <h1
            className="
              text-[38px]
              sm:text-5xl
              lg:text-6xl
              xl:text-7xl
              font-black
              text-white
              leading-[1.02]
              tracking-tight
              mt-6
            "
          >
            Potencia y Rendimiento
            <span className="block text-[#e84d05] mt-2">
              para el Campo e Industria
            </span>
          </h1>

          {/* DESCRIPCIÓN */}

          <p
            className="
              text-base
              sm:text-lg
              text-gray-200
              mt-6
              leading-relaxed
              max-w-xl
            "
          >
            Maquinaria agrícola, forestal e industrial, repuestos y atención
            especializada para diferentes necesidades de trabajo.
          </p>

          {/* BOTONES */}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
            <Link
              to="/catalogo"
              className="
                inline-flex
                items-center
                justify-center
                bg-[#e84d05]
                hover:bg-[#c94104]
                text-white
                px-7
                sm:px-8
                py-4
                rounded-xl
                font-black
                text-sm
                transition-all
                shadow-lg
                hover:-translate-y-1
              "
            >
              Explorar Catálogo
            </Link>

            <a
              href="https://wa.me/51979501557?text=Hola,%20deseo%20realizar%20una%20cotización"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                bg-white/10
                hover:bg-white/20
                text-white
                border
                border-white/30
                backdrop-blur-sm
                px-7
                sm:px-8
                py-4
                rounded-xl
                font-black
                text-sm
                transition-all
                hover:-translate-y-1
              "
            >
              Cotizar por WhatsApp
            </a>
          </div>

          {/* INFORMACIÓN DE CONFIANZA */}

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
              border-white/15
            "
          >
            {/* TELÉFONO */}

            <div className="py-3 sm:py-0 border-b sm:border-b-0 border-white/10">
              <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-orange-400 font-bold">
                Atención
              </span>

              <p className="text-white text-sm sm:text-base font-black mt-1">
                +51 979 501 557
              </p>
            </div>

            {/* COBERTURA */}

            <div className="py-3 sm:py-0 border-b sm:border-b-0 border-white/10">
              <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-orange-400 font-bold">
                Cobertura
              </span>

              <p className="text-white text-sm sm:text-base font-black mt-1">
                Todo el Perú
              </p>
            </div>

            {/* ASESORÍA */}

            <div className="py-3 sm:py-0">
              <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-orange-400 font-bold">
                Servicio
              </span>

              <p className="text-white text-sm sm:text-base font-black mt-1">
                Atención Especializada
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* LÍNEA INFERIOR */}

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#e84d05]"></div>
    </section>
  );
}

export default Hero;
