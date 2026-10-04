import logoJ from "../assets/logoJ&G.png";
import heroImg from "../assets/Hero/hero-maquinaria.jpg";

function Hero() {
  return (
    <section
      className="relative min-h-[750px] lg:min-h-[820px] flex items-center overflow-hidden bg-gray-900"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      {/* Overlay oscuro profesional estilo marcas de maquinaria */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>

      {/* Degradado sutil de la marca */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16">
        <div className="max-w-2xl">
          {/* Badge corporativo */}
          <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full mb-6">
            <img
              src={logoJ}
              alt="Grupo Comercial J&G"
              className="w-7 h-7 object-contain"
            />
            <span className="text-xs uppercase tracking-widest font-extrabold text-white">
              Grupo Comercial J&G
            </span>
          </div>

          {/* Título principal con jerarquía limpia */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            Potencia y Rendimiento <br />
            <span className="text-orange-500">para el Campo e Industria</span>
          </h1>

          {/* Descripción */}
          <p className="text-base sm:text-lg text-gray-200 mt-6 leading-relaxed max-w-xl font-normal">
            Distribuimos maquinaria agrícola, forestal e industrial, repuestos
            originales y brindamos servicio técnico especializado en todo el
            Perú.
          </p>

          {/* Botones de Acción directos */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="/catalogo"
              className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-500/20 active:scale-95"
            >
              Explorar Catálogo
            </a>

            <a
              href="https://wa.me/51979501557"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all active:scale-95"
            >
              Cotizar por WhatsApp
            </a>
          </div>

          {/* Franja ligera de métricas / confianza (Estilo STIHL) */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/15">
            <div>
              <span className="block text-xs uppercase tracking-wider text-orange-400 font-bold mb-1">
                Atención
              </span>
              <p className="text-white text-base sm:text-lg font-extrabold">
                +51 979 501 557
              </p>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-wider text-orange-400 font-bold mb-1">
                Cobertura
              </span>
              <p className="text-white text-base sm:text-lg font-extrabold">
                Todo el Perú
              </p>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-wider text-orange-400 font-bold mb-1">
                Garantía
              </span>
              <p className="text-white text-base sm:text-lg font-extrabold">
                100% Originales
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
