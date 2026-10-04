import logoJ from "../assets/logoJ&G.png";
import heroImg from "../assets/Hero/hero-maquinaria.jpg";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* TEXTO */}

          <div>
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <img
                src={logoJ}
                alt="Grupo Comercial J&G"
                className="w-10 h-10"
              />

              <span className="font-bold text-white">Grupo Comercial J&G</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
              Maquinaria y Repuestos para el Sector Agrícola, Forestal e
              Industrial
            </h1>

            <p className="text-xl text-orange-100 mt-8 leading-relaxed max-w-2xl">
              Comercializamos maquinaria, equipos y repuestos originales de las
              mejores marcas del mercado, brindando calidad, garantía y respaldo
              técnico para cada proyecto.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href="/catalogo"
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition"
              >
                Ver Catálogo
              </a>

              <a
                href="https://wa.me/51979501557"
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition"
              >
                Cotizar por WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-14">
              <div>
                <h3 className="text-5xl font-black text-white">12+</h3>
                <p className="text-orange-100">Productos</p>
              </div>

              <div>
                <h3 className="text-5xl font-black text-white">8+</h3>
                <p className="text-orange-100">Repuestos</p>
              </div>

              <div>
                <h3 className="text-5xl font-black text-white">100%</h3>
                <p className="text-orange-100">Garantía</p>
              </div>
            </div>
          </div>

          {/* IMAGEN */}

          <div className="relative">
            <div className="absolute -top-6 -left-6 w-full h-full bg-white/20 rounded-[40px]"></div>

            <img
              src={heroImg}
              alt="Grupo Comercial J&G"
              className="relative rounded-[40px] shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
