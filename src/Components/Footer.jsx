import logoJ from "../assets/logoJ&G.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Empresa */}

          <div>
            <img
              src={logoJ}
              alt="Grupo Comercial J&G"
              className="w-24 mb-4 bg-white rounded-lg p-2"
            />

            <h3 className="text-2xl font-bold mb-4">Grupo Comercial J&G</h3>

            <p className="text-gray-400">
              Especialistas en maquinaria agrícola, forestal e industrial.
            </p>
          </div>

          {/* Enlaces */}

          <div>
            <h3 className="text-xl font-bold mb-4">Navegación</h3>

            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/">Inicio</a>
              </li>

              <li>
                <a href="/catalogo">Catálogo</a>
              </li>

              <li>
                <a href="/repuestos">Repuestos</a>
              </li>

              <li>
                <a href="/contacto">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Servicios */}

          <div>
            <h3 className="text-xl font-bold mb-4">Servicios</h3>

            <ul className="space-y-2 text-gray-400">
              <li>Venta de Maquinaria</li>
              <li>Venta de Repuestos</li>
              <li>Servicio Técnico</li>
              <li>Asesoría Especializada</li>
            </ul>
          </div>

          {/* Contacto */}

          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>

            <ul className="space-y-3 text-gray-400">
              <li>📞 +51 979 501 557</li>

              <li>✉️ ventas@grupocomercialjyg.com</li>

              <li>📍 Perú</li>
            </ul>

            <a
              href="https://wa.me/51979501557"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-5 bg-green-600 px-5 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
          © 2026 Grupo Comercial J&G - Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
