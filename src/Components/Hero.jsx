import logoJ from "../assets/logoJ&G.png";
import heroImg from "../assets/Hero/hero-maquinaria.jpg";

function Hero() {
  return (
    <>
      {/* Barra Superior */}

      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row justify-between items-center text-sm gap-2">
          <span>📞 +51 979 501 557</span>

          <span>
            Venta de maquinaria, repuestos y asesoría técnica especializada
          </span>
        </div>
      </div>

      {/* Hero */}

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Texto */}

            <div>
              <div className="flex items-center gap-4 mb-8">
                <img
                  src={logoJ}
                  alt="Grupo Comercial J&G"
                  className="w-16 h-16 object-contain"
                />

                <div>
                  <p className="text-orange-500 font-bold uppercase text-sm">
                    Grupo Comercial J&G
                  </p>

                  <p className="text-gray-500 text-sm">
                    Maquinaria Agrícola, Forestal e Industrial
                  </p>
                </div>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Soluciones en
                <span className="text-orange-500"> Maquinaria</span> y
                <span className="text-orange-500"> Repuestos</span>
              </h1>

              <p className="text-gray-600 text-xl mt-8 leading-relaxed">
                Comercializamos equipos, maquinaria y repuestos originales de
                las mejores marcas del mercado para los sectores agrícola,
                forestal e industrial, brindando respaldo técnico y garantía.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href="/catalogo"
                  className="bg-orange-500 hover:bg-orange-600 transition text-white px-8 py-4 rounded-xl font-bold shadow-lg"
                >
                  Ver Catálogo
                </a>

                <a
                  href="https://wa.me/51979501557"
                  target="_blank"
                  rel="noreferrer"
                  className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition"
                >
                  Cotizar por WhatsApp
                </a>
              </div>

              {/* Estadísticas */}

              <div className="grid grid-cols-3 gap-8 mt-16">
                <div>
                  <h3 className="text-4xl font-black text-orange-500">20+</h3>

                  <p className="text-gray-600 font-medium">Equipos</p>
                </div>

                <div>
                  <h3 className="text-4xl font-black text-orange-500">21+</h3>

                  <p className="text-gray-600 font-medium">Categorías</p>
                </div>

                <div>
                  <h3 className="text-4xl font-black text-orange-500">6</h3>

                  <p className="text-gray-600 font-medium">Marcas</p>
                </div>
              </div>
            </div>

            {/* Imagen */}

            <div className="relative">
              <img
                src={heroImg}
                alt="Maquinaria Grupo Comercial J&G"
                className="rounded-3xl shadow-2xl w-full"
              />

              <div className="absolute bottom-6 left-6 bg-white p-5 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800">
                  Asesoría Técnica
                </h3>

                <p className="text-gray-500">
                  Atención personalizada para cada proyecto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
