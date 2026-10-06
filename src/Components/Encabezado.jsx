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
            <span className="hidden sm:inline">
              🚚 Cobertura a nivel nacional
            </span>
          </div>

          <div className="hidden md:block">
            Maquinaria • Repuestos • Servicio Técnico
          </div>
        </div>
      </div>

      {/* Header principal */}

      <header className="bg-[#964723] shadow-xl sticky top-0 z-50 border-b border-[#7d381b]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-24">
            {/* Logo y empresa */}

            <Link to="/" className="flex items-center gap-4 group">
              <div className="bg-white rounded-xl p-2 shadow-md group-hover:scale-105 transition">
                <img
                  src={logo}
                  alt="Grupo Comercial J&G"
                  className="h-14 w-auto"
                />
              </div>

              <div className="hidden sm:block">
                <h1 className="font-black text-2xl text-white">
                  Grupo Comercial J&G
                </h1>

                <p className="text-sm text-orange-200 font-semibold">
                  Agricultura • Forestal • Industria
                </p>
              </div>
            </Link>

            {/* Menú */}

            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className="font-bold text-white hover:text-orange-200 transition"
              >
                Inicio
              </Link>

              <Link
                to="/catalogo"
                className="font-bold text-white hover:text-orange-200 transition"
              >
                Productos
              </Link>

              <Link
                to="/repuestos"
                className="font-bold text-white hover:text-orange-200 transition"
              >
                Repuestos
              </Link>

              <Link
                to="/contacto"
                className="font-bold text-white hover:text-orange-200 transition"
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
                className="hidden xl:flex bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold shadow-md transition"
              >
                WhatsApp
              </a>

              <a
                href="https://wa.me/51979501557?text=Hola,%20deseo%20una%20cotización"
                target="_blank"
                rel="noreferrer"
                className="bg-orange-500 hover:bg-orange-400 text-white px-5 py-3 rounded-xl font-bold shadow-lg transition hover:-translate-y-0.5"
              >
                Cotizar Ahora
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Encabezado;
