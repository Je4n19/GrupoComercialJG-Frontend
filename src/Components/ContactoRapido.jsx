function ContactoRapido() {
  return (
    <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-white rounded-[40px] shadow-2xl overflow-hidden">
          {/* Decoración */}

          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full -translate-y-32 translate-x-32"></div>

          <div className="absolute bottom-0 left-0 w-60 h-60 bg-orange-50 rounded-full translate-y-28 -translate-x-20"></div>

          <div className="relative grid lg:grid-cols-2 gap-10 items-center p-12 lg:p-16">
            {/* IZQUIERDA */}

            <div>
              <span className="bg-orange-100 text-orange-600 px-5 py-2 rounded-full font-bold uppercase">
                Atención Personalizada
              </span>

              <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mt-6 leading-tight">
                ¿Necesitas una
                <span className="block text-orange-500">
                  Cotización Inmediata?
                </span>
              </h2>

              <p className="text-xl text-gray-600 mt-8 leading-relaxed">
                Nuestro equipo especializado está listo para ayudarte a
                encontrar la maquinaria, equipo o repuesto ideal para tu
                proyecto.
              </p>

              <div className="grid md:grid-cols-3 gap-5 mt-10">
                <div className="bg-orange-50 rounded-2xl p-5 text-center">
                  <div className="text-3xl mb-2">📞</div>

                  <h3 className="font-bold text-gray-900">Atención Directa</h3>
                </div>

                <div className="bg-orange-50 rounded-2xl p-5 text-center">
                  <div className="text-3xl mb-2">⚙️</div>

                  <h3 className="font-bold text-gray-900">Soporte Técnico</h3>
                </div>

                <div className="bg-orange-50 rounded-2xl p-5 text-center">
                  <div className="text-3xl mb-2">🚚</div>

                  <h3 className="font-bold text-gray-900">Todo el Perú</h3>
                </div>
              </div>
            </div>

            {/* DERECHA */}

            <div className="bg-gray-900 rounded-[35px] p-10 text-center">
              <div className="text-6xl mb-6">💬</div>

              <h3 className="text-4xl font-black text-white">WhatsApp J&G</h3>

              <p className="text-gray-300 mt-5 text-lg">
                Recibe asesoría personalizada, consulta disponibilidad y
                solicita cotizaciones en minutos.
              </p>

              <div className="mt-8">
                <p className="text-orange-400 text-sm uppercase font-bold">
                  Número de contacto
                </p>

                <h4 className="text-3xl font-black text-white mt-2">
                  +51 979 501 557
                </h4>
              </div>

              <a
                href="https://wa.me/51979501557"
                target="_blank"
                rel="noreferrer"
                className="
                  block
                  mt-10
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  py-5
                  rounded-2xl
                  font-bold
                  text-lg
                  transition
                "
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactoRapido;
