import { Link } from "react-router-dom";
import logoJ from "../assets/logoJ&G.png";

function NoEncontrado() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-orange-600 flex items-center justify-center px-6">
      <div className="bg-white rounded-[40px] shadow-2xl p-12 max-w-3xl w-full text-center">
        <img
          src={logoJ}
          alt="Grupo Comercial J&G"
          className="w-28 mx-auto mb-8"
        />

        <h1 className="text-8xl font-black text-orange-500">404</h1>

        <h2 className="text-4xl font-black text-gray-900 mt-4">
          Página no encontrada
        </h2>

        <p className="text-gray-600 text-lg mt-6 max-w-xl mx-auto">
          La página que intentas visitar no existe, fue movida o se encuentra
          temporalmente fuera de servicio.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-10">
          <div className="bg-orange-50 rounded-2xl p-5">
            <h3 className="text-orange-500 text-3xl font-black">🏠</h3>
            <p className="mt-2 font-semibold">Inicio</p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-5">
            <h3 className="text-orange-500 text-3xl font-black">📦</h3>
            <p className="mt-2 font-semibold">Catálogo</p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-5">
            <h3 className="text-orange-500 text-3xl font-black">📞</h3>
            <p className="mt-2 font-semibold">Contacto</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition"
          >
            Volver al Inicio
          </Link>

          <Link
            to="/catalogo"
            className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition"
          >
            Ver Catálogo
          </Link>
        </div>

        <p className="mt-10 text-sm text-gray-400">
          Grupo Comercial J&G © 2026
        </p>
      </div>
    </div>
  );
}

export default NoEncontrado;
