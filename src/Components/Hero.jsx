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
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Overlay naranja */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-700/95 via-orange-600/90 to-orange-500/75"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* IZQUIERDA */}

          <div>
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/20 px-5 py-3 rounded-full mb-8">
              <img
                src={logoJ}
                alt="Grupo Comercial J&G"
                className="w-10 h-10"
              />

              <span className="font-bold text-white">Grupo Comercial J&G</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
              Maquinaria y Repuestos para el Sector
              <span className="block text-orange-200">
                Agrícola, Forestal e Industrial
              </span>
            </h1>

            <p className="text-xl text-orange-100 mt-8 max-w-2xl leading-relaxed">
              Distribuimos maquinaria, equipos y repuestos originales de marcas
              líderes para agricultura, forestación e industria, ofreciendo
              calidad, garantía y soporte técnico especializado.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href="/catalogo"
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition"
              >
                Ver Catálogo
              </a>

              <a
                href="https://wa.me/51979501557"
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-green-700 hover:scale-105 transition"
              >
                Cotizar por WhatsApp
              </a>
            </div>

            <div className="flex gap-10 mt-12">
              <div>
                <p className="text-orange-200 uppercase text-sm font-bold">
                  Atención
                </p>

                <h3 className="text-white text-xl font-bold">
                  +51 979 501 557
                </h3>
              </div>

              <div>
                <p className="text-orange-200 uppercase text-sm font-bold">
                  Cobertura
                </p>

                <h3 className="text-white text-xl font-bold">Todo el Perú</h3>
              </div>
            </div>
          </div>

          {/* DERECHA */}

          <div className="hidden lg:flex justify-center">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-10 shadow-2xl">
              <img
                src={logoJ}
                alt="Grupo Comercial J&G"
                className="w-72 mx-auto"
              />

              <div className="text-center mt-8">
                <h2 className="text-3xl font-black text-white">
                  Grupo Comercial J&G
                </h2>

                <p className="text-orange-100 mt-3">
                  Equipos • Repuestos • Servicio Técnico
                </p>

                <div className="w-24 h-1 bg-orange-400 rounded-full mx-auto mt-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
