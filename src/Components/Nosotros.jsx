import nosotrosImg from "../assets/Nosotros/nosotros.jpg";

function Nosotros() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Imagen */}

          <div className="relative">
            <img
              src={nosotrosImg}
              alt="Grupo Comercial J&G"
              className="w-full rounded-3xl shadow-2xl"
            />

            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-3xl font-black text-orange-500">100%</h3>

              <p className="text-gray-600 font-medium">
                Compromiso con nuestros clientes
              </p>
            </div>
          </div>

          {/* Información */}

          <div>
            <span className="text-orange-500 font-bold uppercase tracking-wider">
              Sobre Nosotros
            </span>

            <h2 className="text-5xl font-black text-gray-900 mt-4 mb-8">
              Grupo Comercial J&G
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Somos una empresa dedicada a la comercialización de maquinaria,
              equipos y repuestos para los sectores agrícola, forestal e
              industrial, ofreciendo productos de calidad y soluciones
              confiables para cada necesidad.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Trabajamos con marcas reconocidas a nivel nacional e
              internacional, brindando asesoría especializada, soporte técnico y
              atención personalizada para garantizar el máximo rendimiento de
              cada equipo.
            </p>

            {/* Tarjetas */}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-orange-500">
                <h3 className="text-2xl font-bold text-orange-500 mb-3">
                  Misión
                </h3>

                <p className="text-gray-600">
                  Brindar soluciones eficientes mediante maquinaria, equipos y
                  repuestos de calidad, acompañados de un servicio confiable y
                  asesoría profesional.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-green-600">
                <h3 className="text-2xl font-bold text-green-600 mb-3">
                  Visión
                </h3>

                <p className="text-gray-600">
                  Ser una empresa referente a nivel nacional en la distribución
                  de maquinaria y repuestos, reconocida por su calidad,
                  confianza e innovación.
                </p>
              </div>
            </div>

            {/* Indicadores */}

            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <h3 className="text-4xl font-black text-orange-500">20+</h3>

                <p className="text-gray-600">Equipos</p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black text-orange-500">21+</h3>

                <p className="text-gray-600">Categorías</p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black text-orange-500">6</h3>

                <p className="text-gray-600">Marcas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Nosotros;
