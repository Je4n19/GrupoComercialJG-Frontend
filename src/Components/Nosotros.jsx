import logoJ from "../assets/logoJ&G.png";

function Nosotros() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Imagen */}

          <div className="flex justify-center">
            <img
              src={logoJ}
              alt="Grupo Comercial J&G"
              className="w-80 rounded-2xl shadow-2xl"
            />
          </div>

          {/* Texto */}

          <div>
            <span className="text-orange-500 font-bold uppercase">
              Quiénes Somos
            </span>

            <h2 className="text-4xl font-bold text-gray-800 mt-3 mb-6">
              Grupo Comercial J&G
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Somos una empresa especializada en la comercialización de
              maquinaria agrícola, forestal e industrial, ofreciendo productos
              de alta calidad y soluciones confiables para nuestros clientes.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Trabajamos con marcas reconocidas del mercado, brindando asesoría
              especializada, repuestos originales y soporte técnico para
              garantizar el mejor rendimiento de cada equipo.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-orange-50 p-5 rounded-xl">
                <h3 className="font-bold text-orange-600 text-xl">Misión</h3>

                <p className="mt-2 text-gray-600">
                  Ofrecer soluciones eficientes mediante productos y servicios
                  de calidad.
                </p>
              </div>

              <div className="bg-green-50 p-5 rounded-xl">
                <h3 className="font-bold text-green-700 text-xl">Visión</h3>

                <p className="mt-2 text-gray-600">
                  Ser una empresa líder en maquinaria y repuestos a nivel
                  nacional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Nosotros;
