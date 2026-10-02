import { Link } from "react-router-dom";
import logo from "../assets/logoJ&G.png";

function MenuAdmin() {
  const cerrarSesion = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col shadow-2xl">
      {/* Logo */}

      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="J&G"
            className="w-14 h-14 object-contain bg-white rounded-xl p-1"
          />

          <div>
            <h1 className="font-bold text-lg">Grupo Comercial J&G</h1>

            <p className="text-slate-400 text-sm">Sistema de Gestión</p>
          </div>
        </div>
      </div>

      {/* Navegación */}

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin"
              className="block p-3 rounded-xl hover:bg-orange-500 transition"
            >
              📊 Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/admin/productos"
              className="block p-3 rounded-xl hover:bg-orange-500 transition"
            >
              📦 Productos
            </Link>
          </li>

          <li>
            <Link
              to="/admin/repuestos"
              className="block p-3 rounded-xl hover:bg-orange-500 transition"
            >
              🔧 Repuestos
            </Link>
          </li>

          <li>
            <Link
              to="/admin/categorias"
              className="block p-3 rounded-xl hover:bg-orange-500 transition"
            >
              📂 Categorías Productos
            </Link>
          </li>

          <li>
            <Link
              to="/admin/categorias-repuesto"
              className="block p-3 rounded-xl hover:bg-orange-500 transition"
            >
              🏷️ Categorías Repuestos
            </Link>
          </li>

          <li>
            <Link
              to="/admin/inventario"
              className="block p-3 rounded-xl hover:bg-orange-500 transition"
            >
              📋 Inventario
            </Link>
          </li>

          <li>
            <Link
              to="/admin/configuracion"
              className="block p-3 rounded-xl hover:bg-orange-500 transition"
            >
              ⚙️ Configuración
            </Link>
          </li>
        </ul>
      </nav>

      {/* Usuario */}

      <div className="border-t border-slate-700 p-5">
        <div className="bg-slate-800 rounded-xl p-4 mb-4">
          <p className="font-semibold">Administrador</p>

          <p className="text-sm text-slate-400">Grupo Comercial J&G</p>
        </div>

        <button
          onClick={cerrarSesion}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
        >
          🚪 Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

export default MenuAdmin;
