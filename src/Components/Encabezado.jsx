import { Link } from "react-router-dom";
import logo from "../assets/logoJ&G.png";

function Encabezado() {
  return (
    <>
      {/* Barra superior */}

      <div className="bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center text-sm">
          <div>📞 +51 979 501 557</div>

          <div>Especialistas en maquinaria agrícola y forestal</div>
        </div>
      </div>

      {/* Header principal */}

      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}

            <Link to="/" className="flex items-center gap-4">
              <img src={logo} alt="Grupo Comercial J&G" className="h-16" />

              <div>
                <h1 className="font-bold text-2xl text-gray-800">
                  Grupo Comercial J&G
                </h1>

                <p className="text-sm text-gray-500">
                  Equipos • Repuestos • Servicio Técnico
                </p>
              </div>
            </Link>

            {/* Menú */}

            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="font-semibold text-gray-700 hover:text-orange-500 transition"
              >
                Inicio
              </Link>

              <Link
                to="/catalogo"
                className="font-semibold text-gray-700 hover:text-orange-500 transition"
              >
                Productos
              </Link>

              <Link
                to="/repuestos"
                className="font-semibold text-gray-700 hover:text-orange-500 transition"
              >
                Repuestos
              </Link>

              <Link
                to="/contacto"
                className="font-semibold text-gray-700 hover:text-orange-500 transition"
              >
                Contacto
              </Link>
            </nav>

            {/* Botones */}

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/51979501557"
                target="_blank"
                rel="noreferrer"
                className="hidden lg:flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                WhatsApp
              </a>

              <a
                href="https://wa.me/51979501557?text=Hola,%20deseo%20una%20cotización"
                target="_blank"
                rel="noreferrer"
                className="bg-orange-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
              >
                Cotizar Ahora
              </a>
              <Link
                to="/login"
                className="bg-slate-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
              >
                🔐 Intranet
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Encabezado;
