import { Link } from "react-router-dom";
import logo from "../assets/logoJ&G.png";

function Encabezado() {
  return (
    <>
      {/* Barra superior */}

      <div className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center text-sm">
          <div className="flex gap-6">
            <span>📞 +51 979 501 557</span>
            <span>🚚 Cobertura a nivel nacional</span>
          </div>

          <div className="hidden md:block">
            Maquinaria • Repuestos • Servicio Técnico
          </div>
        </div>
      </div>

      {/* Header */}

      <header className="bg-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}

            <Link to="/" className="flex items-center gap-4">
              <img src={logo} alt="Grupo Comercial J&G" className="h-16" />

              <div>
                <h1 className="font-black text-2xl text-gray-900">
                  Grupo Comercial J&G
                </h1>

                <p className="text-sm text-orange-500 font-semibold">
                  Agricultura • Forestal • Industria
                </p>
              </div>
            </Link>

            {/* Menu */}

            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className="font-bold text-gray-700 hover:text-orange-500 transition"
              >
                Inicio
              </Link>

              <Link
                to="/catalogo"
                className="font-bold text-gray-700 hover:text-orange-500 transition"
              >
                Productos
              </Link>

              <Link
                to="/repuestos"
                className="font-bold text-gray-700 hover:text-orange-500 transition"
              >
                Repuestos
              </Link>

              <Link
                to="/contacto"
                className="font-bold text-gray-700 hover:text-orange-500 transition"
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
                className="hidden xl:flex bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold transition"
              >
                WhatsApp
              </a>

              <a
                href="https://wa.me/51979501557?text=Hola,%20deseo%20una%20cotización"
                target="_blank"
                rel="noreferrer"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg transition"
              >
                Cotizar Ahora
              </a>

              <Link
                to="/login"
                className="bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-xl font-bold transition"
              >
                Intranet
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Encabezado;
