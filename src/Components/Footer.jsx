import logoJ from "../assets/logoJ&G.png";

function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Franja superior naranja */}

      <div className="h-2 bg-orange-500"></div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Empresa */}

          <div>
            <img
              src={logoJ}
              alt="Grupo Comercial J&G"
              className="w-28 bg-white p-2 rounded-xl mb-6"
            />

            <h3 className="text-2xl font-black mb-4">Grupo Comercial J&G</h3>

            <p className="text-gray-400 leading-relaxed">
              Comercialización de maquinaria, equipos y repuestos para los
              sectores agrícola, forestal e industrial.
            </p>

            <div className="flex gap-3 mt-6">
              <div className="w-10 h-10 rounded-full bg-orange-500"></div>
              <div className="w-10 h-10 rounded-full bg-orange-500"></div>
              <div className="w-10 h-10 rounded-full bg-orange-500"></div>
            </div>
          </div>

          {/* Navegación */}

          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-500">
              Navegación
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="/" className="hover:text-orange-500 transition">
                  Inicio
                </a>
              </li>

              <li>
                <a
                  href="/catalogo"
                  className="hover:text-orange-500 transition"
                >
                  Catálogo
                </a>
              </li>

              <li>
                <a
                  href="/repuestos"
                  className="hover:text-orange-500 transition"
                >
                  Repuestos
                </a>
              </li>

              <li>
                <a
                  href="/contacto"
                  className="hover:text-orange-500 transition"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Servicios */}

          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-500">
              Servicios
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>Venta de Maquinaria</li>
              <li>Venta de Repuestos</li>
              <li>Servicio Técnico</li>
              <li>Asesoría Especializada</li>
              <li>Cotizaciones Empresariales</li>
            </ul>
          </div>

          {/* Contacto */}

          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-500">Contacto</h3>

            <div className="space-y-4 text-gray-400">
              <p>📞 +51 979 501 557</p>

              <p>📍 Perú</p>

              <p>🕒 Atención Personalizada</p>

              <p>🚚 Cobertura Nacional</p>
            </div>

            <a
              href="https://wa.me/51979501557"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold transition"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Línea inferior */}

        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Grupo Comercial J&G. Todos los derechos reservados.
            </p>

            <p className="text-gray-500 text-sm">
              Maquinaria • Repuestos • Servicio Técnico
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
