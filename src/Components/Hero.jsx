import logoJ from "../assets/logoJ&G.png";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Texto */}

          <div>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={logoJ}
                alt="Grupo Comercial J&G"
                className="w-20 h-20 rounded-lg bg-white p-1"
              />

              <div>
                <h2 className="text-2xl font-bold">Grupo Comercial J&G</h2>

                <p className="text-orange-100">
                  Maquinaria Agrícola y Forestal
                </p>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Equipos Profesionales para el Campo y la Industria
            </h1>

            <p className="text-xl text-orange-50 mb-8">
              Distribuimos motosierras, desbrozadoras, motobombas,
              electrobombas, fumigadoras y repuestos originales para los
              sectores agrícola, forestal e industrial.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/catalogo"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Ver Catálogo
              </a>

              <a
                href="https://wa.me/51979501557"
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 px-8 py-4 rounded-lg font-bold hover:bg-green-700 transition"
              >
                WhatsApp
              </a>
            </div>

            <div className="mt-8">
              <p className="font-semibold">📞 +51 979 501 557</p>

              <p>Atención personalizada y asesoría técnica.</p>
            </div>
          </div>

          {/* Lado derecho */}

          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-2xl">
              <img
                src={logoJ}
                alt="Grupo Comercial J&G"
                className="w-72 mx-auto"
              />

              <h3 className="text-center text-2xl font-bold mt-6">
                Soluciones para Agricultura y Forestación
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
