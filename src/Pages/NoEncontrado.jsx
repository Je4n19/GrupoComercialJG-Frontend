import { Link } from "react-router-dom";

function NoEncontrado() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-7xl font-bold text-orange-500">404</h1>

      <p className="text-2xl mt-4">Página no encontrada</p>

      <Link
        to="/"
        className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-lg"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}

export default NoEncontrado;
