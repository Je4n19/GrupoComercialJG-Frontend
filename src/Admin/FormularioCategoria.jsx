import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  crearCategoria,
  actualizarCategoria,
  obtenerCategoriaPorId,
} from "../Services/categoriaService";

/* ==========================================
   GRUPOS DE PRODUCTOS
========================================== */

const GRUPOS = [
  "AGROINDUSTRIA",
  "COMPRESORAS DE AIRE",
  "ELECTROBOMBAS",
  "GENERADORES",
  "HERRAMIENTAS ELÉCTRICAS",
  "JARDINERÍA",
  "LIMPIEZA INDUSTRIAL",
  "MOTORES",
  "MOTOBOMBAS",
  "SOLDADURA Y CORTE",
  "OFERTAS Y LIQUIDACIONES",
];

const CATEGORIA_INICIAL = {
  grupo: "",
  nombre: "",
  descripcion: "",
};

const inputClass =
  "block w-full min-w-0 max-w-full border-2 border-gray-200 " +
  "rounded-xl px-4 py-3.5 text-base bg-white text-gray-800 " +
  "outline-none transition focus:border-[#009E49] " +
  "focus:ring-4 focus:ring-green-100 " +
  "disabled:bg-gray-100 disabled:cursor-not-allowed";

/* ==========================================
   COMPONENTE PRINCIPAL
========================================== */

function FormularioCategoria() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categoria, setCategoria] = useState(CATEGORIA_INICIAL);

  const [cargando, setCargando] = useState(Boolean(id));
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const esEdicion = Boolean(id);

  /* ==========================================
     CARGAR CATEGORÍA PARA EDICIÓN
  ========================================== */

  useEffect(() => {
    let activo = true;

    const cargarCategoria = async () => {
      if (!id) {
        setCategoria(CATEGORIA_INICIAL);
        setCargando(false);
        setError("");
        setMensaje("");
        return;
      }

      try {
        setCargando(true);
        setError("");
        setMensaje("");

        const data = await obtenerCategoriaPorId(id);

        if (!activo) return;

        setCategoria({
          grupo: data?.grupo ?? "",
          nombre: data?.nombre ?? "",
          descripcion: data?.descripcion ?? "",
        });
      } catch (err) {
        console.error("Error al cargar categoría:", err);

        if (activo) {
          setError(
            "No se pudo cargar la categoría. Comprueba la conexión con el servidor.",
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarCategoria();

    return () => {
      activo = false;
    };
  }, [id]);

  /* ==========================================
     ACTUALIZAR CAMPOS
  ========================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategoria((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setError("");
    setMensaje("");
  };

  /* ==========================================
     GUARDAR O ACTUALIZAR
  ========================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (guardando || cargando) return;

    const datosEnviar = {
      grupo: categoria.grupo.trim(),
      nombre: categoria.nombre.trim(),
      descripcion: categoria.descripcion.trim(),
    };

    if (!datosEnviar.grupo) {
      setError("Debes seleccionar un grupo de productos.");
      return;
    }

    if (!datosEnviar.nombre) {
      setError("Debes ingresar el nombre de la categoría.");
      return;
    }

    try {
      setGuardando(true);
      setError("");
      setMensaje("");

      if (esEdicion) {
        await actualizarCategoria(id, datosEnviar);

        setMensaje("Categoría actualizada correctamente.");
      } else {
        await crearCategoria(datosEnviar);

        setMensaje("Categoría registrada correctamente.");
      }

      navigate("/admin/categorias");
    } catch (err) {
      console.error("Error al guardar categoría:", err);

      const estado = err?.status ?? err?.response?.status;

      if (estado === 401) {
        setError("Tu sesión ha expirado. Inicia sesión nuevamente.");
      } else if (estado === 403) {
        setError(
          "Error 403: el servidor rechazó la solicitud. Debemos revisar el envío de la sesión y el token CSRF en categoriaService.js.",
        );
      } else if (estado === 400) {
        setError("Los datos ingresados no son válidos. Revisa los campos.");
      } else if (estado === 409) {
        setError("Ya existe una categoría con esos datos.");
      } else {
        setError(
          err?.message ||
            "No se pudo guardar la categoría. Verifica la conexión con el servidor.",
        );
      }
    } finally {
      setGuardando(false);
    }
  };

  /* ==========================================
     INTERFAZ RESPONSIVE
  ========================================== */

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full min-w-0 max-w-full bg-[#F4F7F5]">
      {/* MENÚ ADMINISTRATIVO */}

      <MenuAdmin />

      {/* CONTENIDO PRINCIPAL */}

      <main className="flex-1 min-w-0 w-full lg:w-auto min-h-screen overflow-x-hidden">
        {/* ENCABEZADO */}

        <header className="bg-gradient-to-r from-[#063D2A] via-[#006B3C] to-[#009E49] text-white shadow-lg">
          <div className="px-4 sm:px-8 lg:px-10 py-7 sm:py-10">
            <p className="uppercase tracking-[0.2em] text-green-100 text-[10px] sm:text-xs font-bold">
              Grupo Comercial J&G
            </p>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black mt-3 leading-tight break-words">
              {esEdicion ? "Editar Categoría" : "Nueva Categoría"}
            </h1>

            <p className="text-green-100 mt-3 text-sm sm:text-lg leading-relaxed">
              Gestión y organización del catálogo de productos.
            </p>

            <div className="w-20 h-1 bg-[#FF6600] rounded-full mt-5" />
          </div>
        </header>

        {/* CONTENIDO */}

        <div className="w-full min-w-0 p-3 sm:p-6 lg:p-8 xl:p-10">
          {/* CONTENEDOR DEL FORMULARIO */}

          <section className="w-full min-w-0 max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* TÍTULO */}

            <div className="bg-[#063D2A] text-white px-4 sm:px-8 py-5 sm:py-6">
              <h2 className="text-xl sm:text-2xl font-bold break-words">
                Información de la Categoría
              </h2>

              <p className="text-green-100 mt-2 text-sm leading-relaxed">
                Selecciona el grupo y registra la categoría correspondiente.
              </p>
            </div>

            {/* FORMULARIO */}

            {cargando ? (
              <div className="p-6 sm:p-10 text-center text-gray-500">
                Cargando información de la categoría...
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="w-full min-w-0 p-4 sm:p-6 lg:p-8"
              >
                <div className="space-y-6 sm:space-y-7">
                  {/* GRUPO */}

                  <div className="min-w-0">
                    <label
                      htmlFor="grupo"
                      className="block font-bold text-[#063D2A] mb-2 sm:mb-3 text-sm sm:text-base"
                    >
                      Grupo de Productos
                    </label>

                    <select
                      id="grupo"
                      name="grupo"
                      value={categoria.grupo}
                      onChange={handleChange}
                      disabled={guardando}
                      required
                      className={inputClass}
                    >
                      <option value="">Selecciona un grupo</option>

                      {categoria.grupo && !GRUPOS.includes(categoria.grupo) && (
                        <option value={categoria.grupo}>
                          {categoria.grupo}
                        </option>
                      )}

                      {GRUPOS.map((grupo) => (
                        <option key={grupo} value={grupo}>
                          {grupo}
                        </option>
                      ))}
                    </select>

                    <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                      Ejemplo: JARDINERÍA, AGROINDUSTRIA o MOTOBOMBAS.
                    </p>
                  </div>

                  {/* NOMBRE */}

                  <div className="min-w-0">
                    <label
                      htmlFor="nombre"
                      className="block font-bold text-[#063D2A] mb-2 sm:mb-3 text-sm sm:text-base"
                    >
                      Nombre de la Categoría
                    </label>

                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      value={categoria.nombre}
                      onChange={handleChange}
                      placeholder="Ejemplo: Motosierras"
                      disabled={guardando}
                      required
                      className={inputClass}
                    />

                    <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                      Esta categoría será utilizada para clasificar los
                      productos.
                    </p>
                  </div>

                  {/* DESCRIPCIÓN */}

                  <div className="min-w-0">
                    <label
                      htmlFor="descripcion"
                      className="block font-bold text-[#063D2A] mb-2 sm:mb-3 text-sm sm:text-base"
                    >
                      Descripción
                    </label>

                    <textarea
                      id="descripcion"
                      rows={5}
                      name="descripcion"
                      value={categoria.descripcion}
                      onChange={handleChange}
                      placeholder="Describe esta categoría..."
                      disabled={guardando}
                      className={`${inputClass} resize-y`}
                    />
                  </div>
                </div>

                {/* ==========================================
                    VISTA PREVIA
                ========================================== */}

                {categoria.grupo && categoria.nombre && (
                  <div className="mt-7 sm:mt-8 bg-[#F0F9F3] border border-green-200 rounded-2xl p-4 sm:p-5 min-w-0">
                    <p className="text-xs text-[#009E49] font-black uppercase tracking-wider">
                      Organización del Catálogo
                    </p>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 min-w-0">
                      <span className="inline-block max-w-full bg-[#063D2A] text-white px-3 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs font-bold break-words">
                        {categoria.grupo}
                      </span>

                      <span className="text-[#FF6600] font-black text-xl">
                        →
                      </span>

                      <span className="inline-block max-w-full bg-green-100 text-[#007A3D] px-3 sm:px-4 py-2 rounded-xl sm:rounded-full font-bold text-sm sm:text-base break-words">
                        {categoria.nombre}
                      </span>
                    </div>

                    {categoria.descripcion && (
                      <p className="text-sm text-gray-600 mt-4 whitespace-pre-wrap break-words leading-relaxed">
                        {categoria.descripcion}
                      </p>
                    )}
                  </div>
                )}

                {/* ==========================================
                    MENSAJES
                ========================================== */}

                {error && (
                  <div
                    role="alert"
                    className="mt-6 sm:mt-7 bg-red-50 border border-red-200 text-red-700 px-4 sm:px-5 py-4 rounded-xl font-medium text-sm sm:text-base break-words"
                  >
                    {error}
                  </div>
                )}

                {mensaje && (
                  <div
                    role="status"
                    className="mt-6 sm:mt-7 bg-green-50 border border-green-200 text-[#007A3D] px-4 sm:px-5 py-4 rounded-xl font-semibold text-sm sm:text-base"
                  >
                    ✓ {mensaje}
                  </div>
                )}

                {/* ==========================================
                    BOTONES
                ========================================== */}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10">
                  <button
                    type="submit"
                    disabled={guardando}
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-[#009E49] hover:bg-[#007A39] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-4 rounded-xl font-bold shadow-md transition text-sm sm:text-base"
                  >
                    {guardando
                      ? "Guardando..."
                      : esEdicion
                        ? "Actualizar Categoría"
                        : "Guardar Categoría"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/admin/categorias")}
                    disabled={guardando}
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-[#FF6600] hover:bg-[#E85C00] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-4 rounded-xl font-bold transition text-sm sm:text-base"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* ==========================================
              INFORMACIÓN ADICIONAL
          ========================================== */}

          <section className="w-full min-w-0 max-w-4xl mx-auto mt-6 sm:mt-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="shrink-0 w-2 h-9 bg-[#FF6600] rounded-full" />

                <h3 className="text-xl sm:text-2xl font-bold text-[#063D2A]">
                  ¿Cómo funciona?
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Los grupos permiten organizar las categorías del catálogo. Por
                ejemplo, el grupo{" "}
                <strong className="text-[#063D2A]">JARDINERÍA</strong> puede
                contener categorías como <strong>Motosierras</strong>,{" "}
                <strong>Desbrozadoras</strong> y <strong>Cortasetos</strong>.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default FormularioCategoria;
