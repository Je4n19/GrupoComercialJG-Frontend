import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-orange-500 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid md:grid-cols-2">
        {/* LADO IZQUIERDO */}

        <div className="bg-green-800 text-white p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">Grupo Comercial J&G</h1>

          <p className="text-green-100 text-lg leading-relaxed">
            Sistema de gestión administrativa para el control de productos,
            repuestos, inventario y operaciones comerciales.
          </p>

          <div className="mt-10 space-y-3">
            <div>✅ Gestión de Productos</div>
            <div>✅ Gestión de Repuestos</div>
            <div>✅ Control de Inventario</div>
            <div>✅ Administración de Categorías</div>
          </div>
        </div>

        {/* LADO DERECHO */}

        <div className="p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-4">
              🔐
            </div>

            <h2 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h2>

            <p className="text-gray-500 mt-2">
              Acceso al sistema administrativo
            </p>
          </div>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            <button
              onClick={ingresar}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition"
            >
              Ingresar al Sistema
            </button>
          </div>

          <div className="mt-8 text-center text-gray-400 text-sm">
            Grupo Comercial J&G © 2026
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
