import { Link } from "react-router-dom";
import logoJ from "../assets/logoJ&G.png";

function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Franja superior naranja */}
      <div className="h-2 bg-orange-500"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* =========================
              EMPRESA
          ========================== */}
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

            {/* REDES SOCIALES DEBAJO DE LA DESCRIPCIÓN */}
            <div className="mt-8">
              <h4 className="text-white font-bold text-sm mb-4">
                Síguenos en nuestras redes
              </h4>

              <div className="flex items-center gap-3">
                {/* FACEBOOK */}
                <a
                  href="https://www.facebook.com/p/Grupo-Comercial-JG-61572533279515/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de Grupo Comercial J&G"
                  title="Facebook"
                  className="
                    group
                    w-12 h-12
                    rounded-full
                    bg-gray-800
                    border border-gray-700
                    flex items-center justify-center
                    text-white
                    hover:bg-[#1877F2]
                    hover:border-[#1877F2]
                    hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.099 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.974h-1.513c-1.491 0-1.956.931-1.956 1.887v2.26h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.099 24 12.073z" />
                  </svg>
                </a>

                {/* INSTAGRAM */}
                <a
                  href="https://www.instagram.com/grupocomercialjg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de Grupo Comercial J&G"
                  title="Instagram"
                  className="
                    group
                    w-12 h-12
                    rounded-full
                    bg-gray-800
                    border border-gray-700
                    flex items-center justify-center
                    text-white
                    hover:bg-pink-600
                    hover:border-pink-600
                    hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zm8.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* =========================
              NAVEGACIÓN
          ========================== */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-500">
              Navegación
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <Link to="/" className="hover:text-orange-500 transition">
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  to="/catalogo"
                  className="hover:text-orange-500 transition"
                >
                  Catálogo
                </Link>
              </li>

              <li>
                <Link
                  to="/repuestos"
                  className="hover:text-orange-500 transition"
                >
                  Repuestos
                </Link>
              </li>

              <li>
                <Link
                  to="/contacto"
                  className="hover:text-orange-500 transition"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* =========================
              SERVICIOS
          ========================== */}
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

          {/* =========================
              CONTACTO
          ========================== */}
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
              rel="noopener noreferrer"
              className="
                inline-block
                mt-6
                bg-green-600
                hover:bg-green-700
                px-6 py-3
                rounded-xl
                font-bold
                transition
              "
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* =========================
            FRANJA INFERIOR
        ========================== */}
        <div className="border-t border-gray-800 mt-14 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2026 Grupo Comercial J&G. Todos los derechos reservados.
            </p>

            {/* Acceso administrativo */}
            <Link
              to="/login"
              className="text-gray-500 hover:text-orange-500 text-sm transition"
            >
              Acceso administrativo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
