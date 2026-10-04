import nosotrosImg from "../assets/Nosotros/nosotros.jpg";

function Nosotros() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* IMAGEN */}

          <div className="relative">
            <div className="absolute -top-6 -left-6 w-full h-full bg-orange-200 rounded-[40px]"></div>

            <img
              src={nosotrosImg}
              alt="Grupo Comercial J&G"
              className="relative w-full rounded-[40px] shadow-2xl"
            />

            <div className="absolute bottom-8 left-8 bg-white px-8 py-5 rounded-2xl shadow-xl">
              <h3 className="text-4xl font-black text-orange-500">J&G</h3>

              <p className="text-gray-600 font-medium">
                Calidad y respaldo técnico
              </p>
            </div>
          </div>

          {/* CONTENIDO */}

          <div>
            <span className="text-orange-500 font-bold uppercase tracking-widest">
              Sobre Nosotros
            </span>

            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mt-4 leading-tight">
              Más que Maquinaria,
              <span className="text-orange-500"> Soluciones</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mt-8">
              En Grupo Comercial J&G nos especializamos en la comercialización
              de maquinaria, equipos y repuestos para los sectores agrícola,
              forestal e industrial, ofreciendo productos confiables y soporte
              técnico especializado.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed mt-6">
              Trabajamos con marcas reconocidas y brindamos atención
              personalizada para ayudar a nuestros clientes a encontrar la mejor
              solución para cada proyecto.
            </p>

            {/* MISION Y VISION */}

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-2xl">
                <h3 className="text-xl font-black text-orange-600 mb-3">
                  Misión
                </h3>

                <p className="text-gray-600">
                  Ofrecer maquinaria, equipos y repuestos de calidad,
                  acompañados de asesoría profesional y servicio confiable.
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-2xl">
                <h3 className="text-xl font-black text-orange-600 mb-3">
                  Visión
                </h3>

                <p className="text-gray-600">
                  Consolidarnos como una empresa referente en el sector,
                  reconocida por calidad, innovación y confianza.
                </p>
              </div>
            </div>

            {/* INDICADORES */}

            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <h3 className="text-5xl font-black text-orange-500">12+</h3>

                <p className="text-gray-600 font-medium">Productos</p>
              </div>

              <div className="text-center">
                <h3 className="text-5xl font-black text-orange-500">8+</h3>

                <p className="text-gray-600 font-medium">Repuestos</p>
              </div>

              <div className="text-center">
                <h3 className="text-5xl font-black text-orange-500">6</h3>

                <p className="text-gray-600 font-medium">Marcas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Nosotros;
