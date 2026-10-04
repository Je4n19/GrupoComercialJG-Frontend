import logoJ from "../assets/logoJ&G.png";
import heroImg from "../assets/Hero/hero-maquinaria.jpg";

function Hero() {
  return (
    <section
      className="relative min-h-[850px] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay más suave */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* Degradado naranja */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 via-orange-800/40 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          {/* Logo */}
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/20 px-5 py-3 rounded-full mb-8">
            <img src={logoJ} alt="Grupo Comercial J&G" className="w-10 h-10" />

            <span className="font-bold text-white">Grupo Comercial J&G</span>
          </div>

          {/* Título */}
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
            Equipos y Repuestos
            <span className="block text-orange-300">
              para Agricultura e Industria
            </span>
          </h1>

          {/* Descripción */}
          <p className="text-xl text-white/90 mt-8 leading-relaxed max-w-2xl">
            Distribuimos maquinaria agrícola, forestal e industrial, repuestos
            originales y servicio técnico especializado para todo el Perú.
          </p>

          {/* Botones */}
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="/catalogo"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-2xl transition"
            >
              Ver Catálogo
            </a>

            <a
              href="https://wa.me/51979501557"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-orange-600 hover:bg-orange-100 px-8 py-4 rounded-xl font-bold shadow-2xl transition"
            >
              Cotizar por WhatsApp
            </a>
          </div>

          {/* Datos */}
          <div className="flex flex-wrap gap-10 mt-12">
            <div>
              <p className="text-orange-200 uppercase text-sm font-bold">
                Atención
              </p>

              <h3 className="text-white text-xl font-bold">+51 979 501 557</h3>
            </div>

            <div>
              <p className="text-orange-200 uppercase text-sm font-bold">
                Cobertura
              </p>

              <h3 className="text-white text-xl font-bold">Todo el Perú</h3>
            </div>

            <div>
              <p className="text-orange-200 uppercase text-sm font-bold">
                Garantía
              </p>

              <h3 className="text-white text-xl font-bold">
                Productos Originales
              </h3>
            </div>
          </div>

          {/* Tarjeta flotante */}
          <div className="mt-12 bg-white rounded-3xl p-6 shadow-2xl max-w-xl">
            <p className="text-gray-500 font-semibold mb-3">
              Trabajamos con marcas líderes
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">
                STIHL
              </span>

              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">
                HONDA
              </span>

              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">
                HUSQVARNA
              </span>

              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">
                MEBA
              </span>

              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">
                PTK
              </span>

              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">
                TRUPER
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
