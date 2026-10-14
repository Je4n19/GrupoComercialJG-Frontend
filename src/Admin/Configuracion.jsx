import { useEffect, useState } from "react";
import MenuAdmin from "../Components/MenuAdmin";

import {
  obtenerConfiguracion,
  guardarConfiguracion,
} from "../Services/configuracionService";

const CONFIGURACION_INICIAL = {
  nombreEmpresa: "Grupo Comercial J&G",
  telefono: "+51 979 501 557",
  correo: "ventas@grupocomercialjyg.com",
  whatsapp: "51979501557",
  direccion: "Perú",
  horario:
    "Lunes a Viernes: 08:00 AM - 06:00 PM | Sábados: 08:00 AM - 01:00 PM",
  facebook: "",
  instagram: "",
};

const campos = [
  {
    nombre: "nombreEmpresa",
    etiqueta: "Nombre de la Empresa",
    tipo: "text",
  },
  {
    nombre: "telefono",
    etiqueta: "Teléfono",
    tipo: "tel",
  },
  {
    nombre: "correo",
    etiqueta: "Correo Electrónico",
    tipo: "email",
  },
  {
    nombre: "whatsapp",
    etiqueta: "WhatsApp",
    tipo: "text",
  },
  {
    nombre: "facebook",
    etiqueta: "Facebook",
    tipo: "url",
    placeholder: "https://facebook.com/...",
  },
  {
    nombre: "instagram",
    etiqueta: "Instagram",
    tipo: "url",
    placeholder: "https://instagram.com/...",
  },
];

const estiloCampo =
  "w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 " +
  "bg-white text-gray-800 outline-none transition-all " +
  "focus:border-[#009E49] focus:ring-4 focus:ring-green-100 " +
  "disabled:bg-gray-100 disabled:cursor-not-allowed";

function Configuracion() {
  const [configuracion, setConfiguracion] = useState(CONFIGURACION_INICIAL);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarConfiguracion = async () => {
    try {
      setCargando(true);
      setError("");
      setMensaje("");

      const data = await obtenerConfiguracion();

      if (data && typeof data === "object") {
        setConfiguracion({
          ...CONFIGURACION_INICIAL,
          ...data,
        });
      }
    } catch (error) {
      console.error("Error al cargar configuración:", error);

      setError(
        "No se pudo cargar la configuración. Verifica la conexión con el servidor.",
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setConfiguracion((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setMensaje("");
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (guardando || cargando) return;

    if (!configuracion.nombreEmpresa.trim()) {
      setError("Debes ingresar el nombre de la empresa.");
      return;
    }

    try {
      setGuardando(true);
      setError("");
      setMensaje("");

      await guardarConfiguracion(configuracion);

      setMensaje("Configuración guardada correctamente.");
    } catch (error) {
      console.error("Error al guardar configuración:", error);

      const estado = error?.status ?? error?.response?.status;

      if (estado === 401) {
        setError("Tu sesión ha expirado. Inicia sesión nuevamente.");
      } else if (estado === 403) {
        setError(
          "El servidor rechazó la solicitud por seguridad. Debemos revisar el envío de la sesión y el token CSRF.",
        );
      } else {
        setError(
          "No se pudo guardar la configuración. Verifica la conexión con el backend.",
        );
      }
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7F5]">
      <MenuAdmin />

      <main className="flex-1 min-w-0 min-h-screen">
        {/* ENCABEZADO */}

        <header className="bg-gradient-to-r from-[#063D2A] via-[#006B3C] to-[#009E49] text-white shadow-lg">
          <div className="px-5 sm:px-8 lg:px-10 py-10">
            <p className="uppercase tracking-[0.2em] text-green-100 text-xs font-bold">
              Grupo Comercial J&G
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3">
              Configuración General
            </h1>

            <p className="text-green-100 mt-3 text-sm sm:text-lg">
              Personaliza la información principal de la empresa.
            </p>

            <div className="w-20 h-1 bg-[#FF6600] rounded-full mt-5" />
          </div>
        </header>

        <div className="p-5 sm:p-8 lg:p-10">
          {/* INDICADORES */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-gray-500 text-sm font-semibold">Empresa</p>

              <h2 className="text-3xl font-black text-[#009E49] mt-3">J&G</h2>

              <p className="text-xs text-gray-400 mt-2">
                Información corporativa
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-gray-500 text-sm font-semibold">WhatsApp</p>

              <h2 className="text-2xl font-black text-[#009E49] mt-3">
                {configuracion.whatsapp ? "Configurado" : "Sin configurar"}
              </h2>

              <p className="text-xs text-gray-400 mt-2">Canal de atención</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-gray-500 text-sm font-semibold">
                Redes Sociales
              </p>

              <h2 className="text-2xl font-black text-[#FF6600] mt-3">
                Configurables
              </h2>

              <p className="text-xs text-gray-400 mt-2">Facebook e Instagram</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <p className="text-gray-500 text-sm font-semibold">
                Estado de Configuración
              </p>

              <h2
                className={`text-2xl font-black mt-3 ${
                  error ? "text-red-600" : "text-[#009E49]"
                }`}
              >
                {cargando ? "Cargando..." : error ? "Revisar" : "Disponible"}
              </h2>

              <p className="text-xs text-gray-400 mt-2">
                Gestión administrativa
              </p>
            </div>
          </div>

          {/* MENSAJES */}

          {error && (
            <div
              role="alert"
              className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-red-700"
            >
              <p className="font-semibold">{error}</p>
            </div>
          )}

          {mensaje && (
            <div
              role="status"
              className="mb-6 rounded-xl bg-green-50 border border-green-200 px-5 py-4 text-[#007A3D]"
            >
              <p className="font-semibold">✓ {mensaje}</p>
            </div>
          )}

          {/* FORMULARIO */}

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#063D2A] text-white px-6 sm:px-8 py-6">
              <h2 className="text-xl sm:text-2xl font-bold">
                Información Corporativa
              </h2>

              <p className="text-green-100 mt-2 text-sm">
                Datos de la empresa utilizados por el sistema.
              </p>
            </div>

            <form onSubmit={guardar} className="p-5 sm:p-8">
              {cargando ? (
                <div className="py-16 text-center text-gray-500">
                  Cargando información de la empresa...
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {campos.slice(0, 4).map((campo) => (
                      <div key={campo.nombre}>
                        <label
                          htmlFor={campo.nombre}
                          className="block mb-3 font-bold text-[#063D2A]"
                        >
                          {campo.etiqueta}
                        </label>

                        <input
                          id={campo.nombre}
                          type={campo.tipo}
                          name={campo.nombre}
                          value={configuracion[campo.nombre] ?? ""}
                          onChange={handleChange}
                          className={estiloCampo}
                          disabled={guardando}
                          required={campo.nombre === "nombreEmpresa"}
                        />
                      </div>
                    ))}
                  </div>

                  {/* DIRECCIÓN */}

                  <div className="mt-6">
                    <label
                      htmlFor="direccion"
                      className="block mb-3 font-bold text-[#063D2A]"
                    >
                      Dirección
                    </label>

                    <textarea
                      id="direccion"
                      name="direccion"
                      rows={3}
                      value={configuracion.direccion ?? ""}
                      onChange={handleChange}
                      disabled={guardando}
                      className={`${estiloCampo} resize-y`}
                    />
                  </div>

                  {/* HORARIO */}

                  <div className="mt-6">
                    <label
                      htmlFor="horario"
                      className="block mb-3 font-bold text-[#063D2A]"
                    >
                      Horario de Atención
                    </label>

                    <textarea
                      id="horario"
                      name="horario"
                      rows={3}
                      value={configuracion.horario ?? ""}
                      onChange={handleChange}
                      disabled={guardando}
                      className={`${estiloCampo} resize-y`}
                    />
                  </div>

                  {/* REDES SOCIALES */}

                  <div className="mt-8 border-t border-gray-100 pt-7">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-8 bg-[#FF6600] rounded-full" />

                      <h3 className="text-xl font-black text-[#063D2A]">
                        Redes Sociales
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {campos.slice(4).map((campo) => (
                        <div key={campo.nombre}>
                          <label
                            htmlFor={campo.nombre}
                            className="block mb-3 font-bold text-[#063D2A]"
                          >
                            {campo.etiqueta}
                          </label>

                          <input
                            id={campo.nombre}
                            type={campo.tipo}
                            name={campo.nombre}
                            value={configuracion[campo.nombre] ?? ""}
                            onChange={handleChange}
                            placeholder={campo.placeholder}
                            disabled={guardando}
                            className={estiloCampo}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BOTONES */}

                  <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <button
                      type="submit"
                      disabled={guardando}
                      className="bg-[#009E49] hover:bg-[#007A39] disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold shadow-md transition"
                    >
                      {guardando ? "Guardando..." : "Guardar Configuración"}
                    </button>

                    <button
                      type="button"
                      onClick={cargarConfiguracion}
                      disabled={guardando}
                      className="bg-[#FF6600] hover:bg-[#E85C00] disabled:opacity-60 text-white px-8 py-4 rounded-xl font-bold transition"
                    >
                      Recargar Datos
                    </button>
                  </div>
                </>
              )}
            </form>
          </section>

          {/* INFORMACIÓN DEL SISTEMA */}

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mt-8">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-2 h-9 bg-[#FF6600] rounded-full" />

              <h3 className="text-xl sm:text-2xl font-bold text-[#063D2A]">
                Información del Sistema
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Empresa</p>

                <p className="font-bold text-lg text-[#063D2A] mt-2">
                  {configuracion.nombreEmpresa || "Grupo Comercial J&G"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Contacto Principal</p>

                <p className="font-bold text-lg text-[#063D2A] mt-2">
                  {configuracion.telefono || "Sin registrar"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Cobertura</p>

                <p className="font-bold text-lg text-[#063D2A] mt-2">
                  Nivel Nacional
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Configuracion;
