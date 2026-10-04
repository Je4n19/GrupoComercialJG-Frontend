function ContactoRapido() {
  return (
    <section className="bg-orange-600 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="p-12 bg-orange-600 text-white">
              <h2 className="text-5xl font-black">
                ¿Necesitas una Cotización?
              </h2>

              <p className="mt-6 text-xl text-orange-100">
                Nuestro equipo está listo para ayudarte con maquinaria, equipos
                y repuestos para cualquier proyecto.
              </p>

              <div className="mt-10 space-y-4">
                <p className="text-lg">📞 +51 979 501 557</p>

                <p className="text-lg">⚙️ Asesoría Técnica Especializada</p>

                <p className="text-lg">🚚 Atención a Nivel Nacional</p>
              </div>
            </div>

            <div className="p-12 flex flex-col justify-center">
              <h3 className="text-4xl font-black text-gray-900">
                Contacto Directo
              </h3>

              <p className="text-gray-600 mt-4 mb-8">
                Escríbenos ahora mismo por WhatsApp y recibe atención inmediata.
              </p>

              <a
                href="https://wa.me/51979501557"
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-xl font-bold text-lg"
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
