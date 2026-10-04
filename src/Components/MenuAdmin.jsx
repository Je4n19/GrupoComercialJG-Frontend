import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logoJ&G.png";

function MenuAdmin() {
  const location = useLocation();

  const cerrarSesion = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  const menus = [
    {
      nombre: "Dashboard",
      ruta: "/admin",
      icono: "📊",
    },
    {
      nombre: "Productos",
      ruta: "/admin/productos",
      icono: "📦",
    },
    {
      nombre: "Repuestos",
      ruta: "/admin/repuestos",
      icono: "🔧",
    },
    {
      nombre: "Categorías Productos",
      ruta: "/admin/categorias",
      icono: "📂",
    },
    {
      nombre: "Categorías Repuestos",
      ruta: "/admin/categorias-repuesto",
      icono: "🏷️",
    },
    {
      nombre: "Inventario",
      ruta: "/admin/inventario",
      icono: "📋",
    },
    {
      nombre: "Configuración",
      ruta: "/admin/configuracion",
      icono: "⚙️",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-white flex flex-col shadow-2xl border-r border-slate-800">
      {/* CABECERA */}

      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-2xl p-2">
            <img
              src={logo}
              alt="Grupo Comercial J&G"
              className="w-14 h-14 object-contain"
            />
          </div>

          <div>
            <h1 className="font-black text-lg text-white">
              Grupo Comercial J&G
            </h1>

            <p className="text-slate-400 text-sm">Panel Administrativo</p>
          </div>
        </div>
      </div>

      {/* MENÚ */}

      <nav className="flex-1 p-4">
        <p className="text-xs uppercase tracking-widest text-slate-500 px-3 mb-4">
          Navegación
        </p>

        <ul className="space-y-2">
          {menus.map((item) => (
            <li key={item.ruta}>
              <Link
                to={item.ruta}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-medium transition-all duration-300 ${
                  location.pathname === item.ruta
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icono}</span>

                <span>{item.nombre}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* TARJETA USUARIO */}

      <div className="p-5 border-t border-slate-800">
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center font-black text-lg">
              A
            </div>

            <div>
              <h3 className="font-bold">Administrador</h3>

              <p className="text-sm text-slate-400">Grupo Comercial J&G</p>
            </div>
          </div>
        </div>

        <button
          onClick={cerrarSesion}
          className="w-full mt-4 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition-all"
        >
          🚪 Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

export default MenuAdmin;
