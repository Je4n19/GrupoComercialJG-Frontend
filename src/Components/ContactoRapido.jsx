function ContactoRapido() {
  return (
    <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6">¿Necesitas Asesoría?</h2>

            <p className="text-xl text-orange-100 mb-6">
              Nuestro equipo está preparado para ayudarte a encontrar la
              maquinaria, repuesto o solución ideal para tu negocio.
            </p>

            <div className="space-y-3">
              <p className="text-lg">📞 +51 979 501 557</p>

              <p className="text-lg">📍 Atención personalizada</p>

              <p className="text-lg">🛠️ Soporte técnico especializado</p>
            </div>
          </div>

          <div className="bg-white text-gray-800 rounded-2xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Contacto Directo</h3>

            <p className="mb-6 text-gray-600">
              Escríbenos por WhatsApp y recibe atención inmediata.
            </p>

            <a
              href="https://wa.me/51979501557"
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactoRapido;
