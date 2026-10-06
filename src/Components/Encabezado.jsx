import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoJ&G.png";

function Encabezado() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <>
      {/* Barra superior */}

      <div className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex justify-between items-center text-xs sm:text-sm">
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

      <header className="bg-[#c94e14] shadow-xl sticky top-0 z-50 border-b border-[#c94104]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* HEADER */}

          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* Logo y empresa */}

            <Link
              to="/"
              onClick={cerrarMenu}
              className="flex items-center gap-3 sm:gap-4 group"
            >
              <div className="bg-white rounded-xl p-1.5 sm:p-2 shadow-md group-hover:scale-105 transition">
                <img
                  src={logo}
                  alt="Grupo Comercial J&G"
                  className="h-11 sm:h-14 w-auto"
                />
              </div>

              <div className="hidden sm:block">
                <h1 className="font-black text-xl lg:text-2xl text-white">
                  Grupo Comercial J&G
                </h1>

                <p className="text-xs lg:text-sm text-orange-200 font-semibold">
                  Agricultura • Forestal • Industria
                </p>
              </div>
            </Link>

            {/* Menú escritorio */}

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

            {/* Botones escritorio */}

            <div className="hidden lg:flex items-center gap-3">
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

            {/* Botón hamburguesa móvil */}

            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-[5px] bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition"
              aria-label="Abrir menú"
              aria-expanded={menuAbierto}
            >
              <span
                className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${
                  menuAbierto ? "translate-y-[7px] rotate-45" : ""
                }`}
              ></span>

              <span
                className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${
                  menuAbierto ? "opacity-0" : ""
                }`}
              ></span>

              <span
                className={`block w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${
                  menuAbierto ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              ></span>
            </button>
          </div>

          {/* =========================
              MENÚ MÓVIL
          ========================== */}

          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              menuAbierto
                ? "max-h-[600px] opacity-100 pb-5"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Navegación */}

              <nav className="flex flex-col p-3">
                <Link
                  to="/"
                  onClick={cerrarMenu}
                  className="flex items-center justify-between px-5 py-4 rounded-xl font-bold text-gray-800 hover:bg-orange-50 hover:text-[#c94e14] transition"
                >
                  <span>Inicio</span>
                  <span className="text-gray-300">›</span>
                </Link>

                <Link
                  to="/catalogo"
                  onClick={cerrarMenu}
                  className="flex items-center justify-between px-5 py-4 rounded-xl font-bold text-gray-800 hover:bg-orange-50 hover:text-[#c94e14] transition"
                >
                  <span>Productos</span>
                  <span className="text-gray-300">›</span>
                </Link>

                <Link
                  to="/repuestos"
                  onClick={cerrarMenu}
                  className="flex items-center justify-between px-5 py-4 rounded-xl font-bold text-gray-800 hover:bg-orange-50 hover:text-[#c94e14] transition"
                >
                  <span>Repuestos</span>
                  <span className="text-gray-300">›</span>
                </Link>

                <Link
                  to="/contacto"
                  onClick={cerrarMenu}
                  className="flex items-center justify-between px-5 py-4 rounded-xl font-bold text-gray-800 hover:bg-orange-50 hover:text-[#c94e14] transition"
                >
                  <span>Contacto</span>
                  <span className="text-gray-300">›</span>
                </Link>
              </nav>

              {/* Separador */}

              <div className="h-px bg-gray-100 mx-5"></div>

              {/* Acciones */}

              <div className="p-4 grid sm:grid-cols-2 gap-3">
                <a
                  href="https://wa.me/51979501557"
                  target="_blank"
                  rel="noreferrer"
                  onClick={cerrarMenu}
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 py-4 rounded-xl font-black transition"
                >
                  WhatsApp
                </a>

                <a
                  href="https://wa.me/51979501557?text=Hola,%20deseo%20una%20cotización"
                  target="_blank"
                  rel="noreferrer"
                  onClick={cerrarMenu}
                  className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-4 rounded-xl font-black transition"
                >
                  Cotizar Ahora
                </a>
              </div>

              {/* Información */}

              <div className="bg-gray-50 px-5 py-4 text-center">
                <p className="text-xs text-gray-500">
                  Maquinaria • Repuestos • Servicio Técnico
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Encabezado;
