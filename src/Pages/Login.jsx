import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoJ from "../assets/logoJ&G.png";

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const ingresar = () => {
    if (usuario === "admin" && password === "123456") {
      localStorage.setItem("auth", "true");
      navigate("/admin");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-orange-600 flex items-center justify-center px-6">
      <div className="max-w-6xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl grid lg:grid-cols-2">
        {/* LADO IZQUIERDO */}

        <div className="bg-slate-900 text-white p-14 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>

          <img
            src={logoJ}
            alt="Grupo Comercial J&G"
            className="w-28 bg-white rounded-2xl p-2 mb-8 relative z-10"
          />

          <h1 className="text-5xl font-black leading-tight relative z-10">
            Grupo Comercial
            <span className="block text-orange-500">J&G</span>
          </h1>

          <p className="mt-6 text-slate-300 text-lg leading-relaxed relative z-10">
            Plataforma administrativa para la gestión de productos, repuestos,
            inventario y operaciones comerciales.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-10 relative z-10">
            <div className="bg-slate-800 rounded-2xl p-4">
              <h3 className="text-orange-500 text-2xl font-black">✓</h3>
              <p className="text-sm mt-2">Gestión de Productos</p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-4">
              <h3 className="text-orange-500 text-2xl font-black">✓</h3>
              <p className="text-sm mt-2">Gestión de Repuestos</p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-4">
              <h3 className="text-orange-500 text-2xl font-black">✓</h3>
              <p className="text-sm mt-2">Control de Inventario</p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-4">
              <h3 className="text-orange-500 text-2xl font-black">✓</h3>
              <p className="text-sm mt-2">Categorías</p>
            </div>
          </div>
        </div>

        {/* LADO DERECHO */}

        <div className="p-14 flex flex-col justify-center">
          <div className="text-center mb-10">
            <div className="w-24 h-24 bg-orange-500 rounded-3xl flex items-center justify-center text-white text-5xl mx-auto shadow-xl">
              🔐
            </div>

            <h2 className="text-4xl font-black text-gray-900 mt-6">
              Iniciar Sesión
            </h2>

            <p className="text-gray-500 mt-3">
              Acceso al sistema administrativo
            </p>
          </div>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full border-2 border-gray-200 p-4 rounded-2xl focus:outline-none focus:border-orange-500"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 p-4 rounded-2xl focus:outline-none focus:border-orange-500"
            />

            <button
              onClick={ingresar}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg transition"
            >
              Ingresar al Sistema
            </button>
          </div>

          <div className="mt-10 bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center">
            <p className="text-sm text-orange-700">
              Área exclusiva para administradores de Grupo Comercial J&G
            </p>
          </div>

          <div className="mt-8 text-center text-gray-400 text-sm">
            © 2026 Grupo Comercial J&G
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
