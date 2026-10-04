import nosotrosImg from "../assets/Nosotros/nosotros.jpg";

function Nosotros() {
  return (
    <section className="bg-gradient-to-b from-white to-orange-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* IMAGEN */}

          <div className="relative">
            <div className="absolute -top-8 -left-8 w-full h-full bg-orange-500 rounded-[40px] opacity-20"></div>

            <img
              src={nosotrosImg}
              alt="Grupo Comercial J&G"
              className="relative w-full rounded-[40px] shadow-2xl object-cover"
            />

            <div className="absolute bottom-8 left-8 bg-white p-6 rounded-3xl shadow-2xl">
              <h3 className="text-5xl font-black text-orange-500">J&G</h3>

              <p className="text-gray-600 font-semibold mt-2">
                Equipos • Repuestos • Servicio Técnico
              </p>
            </div>
          </div>

          {/* CONTENIDO */}

          <div>
            <span className="bg-orange-100 text-orange-600 px-5 py-2 rounded-full font-bold uppercase">
              Quiénes Somos
            </span>

            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mt-6 leading-tight">
              Más que Maquinaria,
              <span className="block text-orange-500">
                Somos tu Socio Estratégico
              </span>
            </h2>

            <p className="text-lg text-gray-600 mt-8 leading-relaxed">
              Grupo Comercial J&G es una empresa especializada en la
              comercialización de maquinaria, equipos y repuestos para los
              sectores agrícola, forestal e industrial.
            </p>

            <p className="text-lg text-gray-600 mt-6 leading-relaxed">
              Trabajamos con marcas reconocidas del mercado ofreciendo productos
              de calidad, garantía y asesoría especializada para cada necesidad
              de nuestros clientes.
            </p>

            {/* BENEFICIOS */}

            <div className="grid md:grid-cols-2 gap-5 mt-10">
              <div className="bg-white p-6 rounded-3xl shadow-lg">
                <div className="text-3xl mb-3">🚜</div>

                <h3 className="font-bold text-xl mb-2">
                  Equipos Profesionales
                </h3>

                <p className="text-gray-600">
                  Maquinaria de alto rendimiento para trabajos exigentes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-lg">
                <div className="text-3xl mb-3">⚙️</div>

                <h3 className="font-bold text-xl mb-2">Repuestos Originales</h3>

                <p className="text-gray-600">
                  Amplio stock para prolongar la vida útil de tus equipos.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-lg">
                <div className="text-3xl mb-3">🛠️</div>

                <h3 className="font-bold text-xl mb-2">Soporte Técnico</h3>

                <p className="text-gray-600">
                  Asistencia especializada y mantenimiento profesional.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-lg">
                <div className="text-3xl mb-3">🚚</div>

                <h3 className="font-bold text-xl mb-2">Cobertura Nacional</h3>

                <p className="text-gray-600">
                  Atendemos clientes en todo el Perú.
                </p>
              </div>
            </div>

            {/* ESTADÍSTICAS */}

            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <h3 className="text-5xl font-black text-orange-500">12+</h3>

                <p className="text-gray-600 font-semibold">Productos</p>
              </div>

              <div className="text-center">
                <h3 className="text-5xl font-black text-orange-500">8+</h3>

                <p className="text-gray-600 font-semibold">Repuestos</p>
              </div>

              <div className="text-center">
                <h3 className="text-5xl font-black text-orange-500">6+</h3>

                <p className="text-gray-600 font-semibold">Marcas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Nosotros;
