import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoJ from "../assets/logoJ&G.png";

// URL DEL BACKEND SPRING BOOT
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// ========================================
// ICONOS
// ========================================

function IconoLogin({ tipo, className = "w-5 h-5" }) {
  const iconos = {
    usuario: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
      </>
    ),
    candado: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    ojo: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    ojoCerrado: (
      <>
        <path d="M3 3l18 18" />
        <path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a15.5 15.5 0 0 1-3.1 3.8" />
        <path d="M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7a10 10 0 0 0 4.1-.9" />
      </>
    ),
    flecha: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    volver: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    escudo: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    alerta: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 7v6M12 17h.01" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconos[tipo]}
    </svg>
  );
}

// ========================================
// COMPONENTE LOGIN
// ========================================

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const funciones = [
    "Gestión de Productos",
    "Gestión de Repuestos",
    "Control de Inventario",
    "Administración de Categorías",
  ];

  // ========================================
  // INICIAR SESIÓN CON SPRING BOOT
  // ========================================

  const ingresar = async (e) => {
    e.preventDefault();
    setError("");

    if (!usuario.trim() || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setCargando(true);

    try {
      // PASO 1: OBTENER TOKEN CSRF
      const respuestaCsrf = await fetch(`${API_URL}/api/auth/csrf`, {
        method: "GET",
        credentials: "include",
      });

      if (!respuestaCsrf.ok) {
        throw new Error("No se pudo obtener la protección de seguridad.");
      }

      const csrf = await respuestaCsrf.json();

      if (!csrf.token || !csrf.headerName) {
        throw new Error(
          "El servidor no devolvió un token de seguridad válido.",
        );
      }

      // PASO 2: ENVIAR CREDENCIALES AL BACKEND
      const respuestaLogin = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          [csrf.headerName]: csrf.token,
        },
        body: JSON.stringify({
          username: usuario.trim(),
          password: password,
        }),
      });

      if (!respuestaLogin.ok) {
        if (respuestaLogin.status === 401) {
          setError("Usuario o contraseña incorrectos.");
        } else if (respuestaLogin.status === 403) {
          setError(
            "No se pudo validar la sesión de seguridad. Revisa la configuración de cookies y CSRF.",
          );
        } else {
          setError("No se pudo iniciar sesión. Inténtalo nuevamente.");
        }
        return;
      }

      // PASO 3: COMPROBAR RESPUESTA
      const datos = await respuestaLogin.json();

      if (datos.rol !== "ADMIN") {
        setError("Tu cuenta no tiene permisos de administrador.");
        return;
      }

      // NO GUARDAMOS CONTRASEÑAS NI AUTH EN LOCALSTORAGE
      setPassword("");

      // PASO 4: REDIRIGIR AL PANEL
      navigate("/admin", { replace: true });
    } catch (err) {
      console.error("Error de autenticación:", err);

      setError(
        "No se pudo conectar con el servidor. Comprueba que Spring Boot esté encendido.",
      );
    } finally {
      setCargando(false);
    }
  };

  // ========================================
  // DISEÑO DEL LOGIN
  // ========================================

  return (
    <main className="relative min-h-screen bg-[#F1F6F3] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 overflow-hidden">
      {/* DECORACIONES DE FONDO */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[450px] h-[450px] bg-[#009E49]/10 rounded-full blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-[#FF6600]/10 rounded-full blur-3xl" />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 max-w-6xl w-full bg-white rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden shadow-2xl border border-gray-100 grid lg:grid-cols-2">
        {/* ========================================
            LADO IZQUIERDO
        ======================================== */}

        <section className="relative bg-[#073D27] text-white p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-[#009E49]/25 rounded-full blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 w-80 h-80 bg-[#FF6600]/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* LOGO */}
            <div className="flex items-center justify-between gap-4">
              <div className="bg-white rounded-2xl p-3 shadow-lg">
                <img
                  src={logoJ}
                  alt="Logo Grupo Comercial J&G"
                  className="w-20 sm:w-24 h-auto object-contain"
                />
              </div>

              <span className="inline-flex items-center gap-2 border border-[#75E4A4]/30 bg-white/10 px-3 py-2 rounded-full text-[#B6F5D0] text-xs font-black">
                <span className="w-2 h-2 rounded-full bg-[#FF6600]" />
                Panel Admin
              </span>
            </div>

            {/* TÍTULO */}
            <div className="mt-9 lg:mt-12">
              <span className="text-[#FFB17A] text-xs sm:text-sm font-black uppercase tracking-[0.18em]">
                Sistema Administrativo
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black leading-tight tracking-tight mt-4">
                Grupo
                <span className="block">Comercial</span>
                <span className="block text-[#75E4A4]">J&G</span>
              </h1>

              <div className="w-14 h-1 bg-[#FF6600] rounded-full mt-6" />

              <p className="mt-6 text-green-50/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
                Plataforma administrativa para gestionar productos, repuestos,
                inventario y operaciones comerciales desde un solo lugar.
              </p>
            </div>

            {/* FUNCIONES */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-9 lg:mt-12">
              {funciones.map((funcion) => (
                <div
                  key={funcion}
                  className="group bg-white/10 border border-white/10 rounded-2xl p-4 sm:p-5 hover:bg-white/15 hover:border-[#75E4A4]/30 transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-[#009E49] text-white rounded-xl flex items-center justify-center mb-3">
                    <IconoLogin tipo="check" className="w-5 h-5" />
                  </div>

                  <p className="text-xs sm:text-sm font-bold leading-relaxed text-white">
                    {funcion}
                  </p>
                </div>
              ))}
            </div>

            {/* PIE */}
            <div className="hidden lg:flex items-center gap-3 mt-10 pt-7 border-t border-white/15">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#75E4A4]">
                <IconoLogin tipo="escudo" />
              </div>

              <div>
                <p className="text-sm font-black">Acceso administrativo</p>

                <p className="text-xs text-green-50/60 mt-1">
                  Exclusivo para personal autorizado
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            LADO DERECHO - FORMULARIO
        ======================================== */}

        <section className="p-7 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            {/* VOLVER AL INICIO */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#009E49] transition-colors"
            >
              <IconoLogin tipo="volver" className="w-4 h-4" />
              Volver a la tienda
            </Link>

            {/* CABECERA */}
            <div className="mt-9 lg:mt-12">
              <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] bg-[#E8F7EE] text-[#009E49] rounded-2xl flex items-center justify-center shadow-sm">
                <IconoLogin tipo="candado" className="w-9 h-9" />
              </div>

              <span className="inline-block text-[#009E49] text-xs font-black uppercase tracking-[0.16em] mt-7">
                Bienvenido de nuevo
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mt-3 tracking-tight">
                Iniciar Sesión
              </h2>

              <p className="text-gray-500 mt-4 leading-relaxed text-sm sm:text-base">
                Ingresa tus credenciales para acceder al panel administrativo de
                Grupo Comercial J&G.
              </p>
            </div>

            {/* ========================================
                FORMULARIO
            ======================================== */}

            <form onSubmit={ingresar} className="mt-9 space-y-6">
              {/* USUARIO */}
              <div>
                <label
                  htmlFor="login-usuario"
                  className="block text-sm font-black text-[#1A1A1A] mb-3"
                >
                  Nombre de usuario
                </label>

                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none">
                    <IconoLogin tipo="usuario" />
                  </span>

                  <input
                    id="login-usuario"
                    type="text"
                    placeholder="Ingresa tu usuario"
                    autoComplete="username"
                    value={usuario}
                    onChange={(e) => {
                      setUsuario(e.target.value);
                      if (error) setError("");
                    }}
                    disabled={cargando}
                    className="w-full bg-[#F8FAF9] border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-[#009E49] focus:bg-white focus:ring-4 focus:ring-[#009E49]/10 transition-all duration-200 disabled:opacity-60"
                    required
                  />
                </div>
              </div>

              {/* CONTRASEÑA */}
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-black text-[#1A1A1A] mb-3"
                >
                  Contraseña
                </label>

                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none">
                    <IconoLogin tipo="candado" />
                  </span>

                  <input
                    id="login-password"
                    type={mostrarPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    disabled={cargando}
                    className="w-full bg-[#F8FAF9] border-2 border-gray-200 rounded-xl pl-12 pr-12 py-4 text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-[#009E49] focus:bg-white focus:ring-4 focus:ring-[#009E49]/10 transition-all duration-200 disabled:opacity-60"
                    required
                  />

                  {/* MOSTRAR / OCULTAR */}
                  <button
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    aria-label={
                      mostrarPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                    className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-[#009E49] transition-colors"
                  >
                    <IconoLogin tipo={mostrarPassword ? "ojoCerrado" : "ojo"} />
                  </button>
                </div>
              </div>

              {/* MENSAJE DE ERROR */}
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700"
                >
                  <IconoLogin
                    tipo="alerta"
                    className="w-5 h-5 shrink-0 mt-0.5"
                  />

                  <p className="text-sm font-semibold leading-relaxed">
                    {error}
                  </p>
                </div>
              )}

              {/* BOTÓN INGRESAR */}
              <button
                type="submit"
                disabled={cargando}
                className="w-full inline-flex items-center justify-center gap-3 bg-[#009E49] hover:bg-[#00843D] text-white py-4 sm:py-5 px-5 rounded-xl font-black text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {cargando
                  ? "Verificando credenciales..."
                  : "Ingresar al Sistema"}

                {!cargando && <IconoLogin tipo="flecha" className="w-5 h-5" />}
              </button>
            </form>

            {/* AVISO ADMINISTRATIVO */}
            <div className="flex items-start gap-3 mt-8 bg-[#E8F7EE] border border-[#D4EBDD] rounded-2xl p-4">
              <div className="w-9 h-9 shrink-0 bg-[#009E49] text-white rounded-xl flex items-center justify-center">
                <IconoLogin tipo="escudo" className="w-5 h-5" />
              </div>

              <div>
                <p className="font-black text-[#073D27] text-sm">
                  Área Administrativa
                </p>

                <p className="text-[#397453] text-xs sm:text-sm mt-1 leading-relaxed">
                  Acceso exclusivo para administradores de Grupo Comercial J&G.
                </p>
              </div>
            </div>

            {/* COPYRIGHT */}
            <p className="text-center text-gray-400 text-xs sm:text-sm mt-9">
              © {new Date().getFullYear()} Grupo Comercial J&G. Todos los
              derechos reservados.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
