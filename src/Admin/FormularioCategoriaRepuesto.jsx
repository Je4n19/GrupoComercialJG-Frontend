import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  crearCategoriaRepuesto,
  actualizarCategoriaRepuesto,
  obtenerCategoriaRepuestoPorId,
} from "../Services/categoriaRepuestoService";

const CATEGORIA_INICIAL = {
  nombre: "",
  descripcion: "",
};

const inputClass =
  "w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 " +
  "bg-white text-gray-800 outline-none transition " +
  "focus:border-[#009E49] focus:ring-4 focus:ring-green-100 " +
  "disabled:bg-gray-100 disabled:cursor-not-allowed";

function FormularioCategoriaRepuesto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categoria, setCategoria] = useState(CATEGORIA_INICIAL);
  const [cargando, setCargando] = useState(Boolean(id));
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    const cargarCategoria = async () => {
      if (!id) {
        setCategoria(CATEGORIA_INICIAL);
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        setError("");

        const data = await obtenerCategoriaRepuestoPorId(id);

        if (!activo) return;

        setCategoria({
          nombre: data?.nombre ?? "",
          descripcion: data?.descripcion ?? "",
        });
      } catch (err) {
        console.error("Error al cargar categoría de repuesto:", err);

        if (activo) {
          setError(
            "No se pudo cargar la categoría de repuesto. Comprueba la conexión con el servidor.",
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategoria((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (guardando || cargando) return;

    const datosEnviar = {
      nombre: categoria.nombre.trim(),
      descripcion: categoria.descripcion.trim(),
    };

    if (!datosEnviar.nombre) {
      setError("Debes ingresar el nombre de la categoría.");
      return;
    }

    try {
      setGuardando(true);
      setError("");

      if (id) {
        await actualizarCategoriaRepuesto(id, datosEnviar);

        alert("Categoría de repuesto actualizada correctamente.");
      } else {
        await crearCategoriaRepuesto(datosEnviar);

        alert("Categoría de repuesto registrada correctamente.");
      }

      navigate("/admin/categorias-repuesto");
    } catch (err) {
      console.error("Error al guardar categoría de repuesto:", err);

      const estado = err?.status ?? err?.response?.status;

      if (estado === 401) {
        setError("Tu sesión ha expirado. Inicia sesión nuevamente.");
      } else if (estado === 403) {
        setError(
          "Error 403: el servidor rechazó la solicitud. Debemos revisar la sesión y el token CSRF en categoriaRepuestoService.js.",
        );
      } else if (estado === 400) {
        setError("Los datos ingresados no son válidos. Revisa los campos.");
      } else if (estado === 409) {
        setError("Ya existe una categoría de repuesto con esos datos.");
      } else {
        setError(
          err?.message ||
            "No se pudo guardar la categoría de repuesto. Verifica la conexión con el servidor.",
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
              {id
                ? "Editar Categoría de Repuesto"
                : "Nueva Categoría de Repuesto"}
            </h1>

            <p className="text-green-100 mt-3 text-sm sm:text-lg">
              Organización y gestión de categorías para repuestos.
            </p>

            <div className="w-20 h-1 bg-[#FF6600] rounded-full mt-5" />
          </div>
        </header>

        {/* CONTENIDO */}

        <div className="p-5 sm:p-8 lg:p-10">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* TÍTULO DEL FORMULARIO */}

            <div className="bg-[#063D2A] text-white px-6 sm:px-8 py-6">
              <h2 className="text-xl sm:text-2xl font-bold">
                Información de la Categoría
              </h2>

              <p className="text-green-100 mt-2 text-sm">
                Completa los datos necesarios para registrar la categoría.
              </p>
            </div>

            {/* FORMULARIO */}

            {cargando ? (
              <div className="p-10 text-center text-gray-500">
                Cargando información de la categoría...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 sm:p-8">
                <div className="space-y-7">
                  {/* NOMBRE */}

                  <div>
                    <label
                      htmlFor="nombre"
                      className="block font-bold text-[#063D2A] mb-3"
                    >
                      Nombre de la Categoría
                    </label>

                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      value={categoria.nombre}
                      onChange={handleChange}
                      placeholder="Ejemplo: Pistones"
                      disabled={guardando}
                      required
                      className={inputClass}
                    />

                    <p className="text-sm text-gray-500 mt-2">
                      Este nombre permitirá clasificar los repuestos dentro del
                      catálogo.
                    </p>
                  </div>

                  {/* DESCRIPCIÓN */}

                  <div>
                    <label
                      htmlFor="descripcion"
                      className="block font-bold text-[#063D2A] mb-3"
                    >
                      Descripción
                    </label>

                    <textarea
                      id="descripcion"
                      rows={6}
                      name="descripcion"
                      value={categoria.descripcion}
                      onChange={handleChange}
                      placeholder="Describe esta categoría de repuestos..."
                      disabled={guardando}
                      className={`${inputClass} resize-y`}
                    />
                  </div>
                </div>

                {/* VISTA PREVIA */}

                {categoria.nombre.trim() && (
                  <div className="mt-8 bg-[#F0F9F3] border border-green-200 rounded-2xl p-5">
                    <p className="text-xs text-[#009E49] font-black uppercase tracking-wider">
                      Vista Previa
                    </p>

                    <div className="mt-3">
                      <span className="inline-block bg-[#063D2A] text-white px-4 py-2 rounded-full text-sm font-bold">
                        {categoria.nombre}
                      </span>
                    </div>

                    {categoria.descripcion.trim() && (
                      <p className="text-sm text-gray-600 mt-4 whitespace-pre-wrap">
                        {categoria.descripcion}
                      </p>
                    )}
                  </div>
                )}

                {/* MENSAJE DE ERROR */}

                {error && (
                  <div
                    role="alert"
                    className="mt-7 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl font-medium"
                  >
                    {error}
                  </div>
                )}

                {/* BOTONES */}

                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <button
                    type="submit"
                    disabled={guardando}
                    className="bg-[#009E49] hover:bg-[#007A39] disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold shadow-md transition"
                  >
                    {guardando
                      ? "Guardando..."
                      : id
                        ? "Actualizar Categoría"
                        : "Guardar Categoría"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/admin/categorias-repuesto")}
                    disabled={guardando}
                    className="bg-[#FF6600] hover:bg-[#E85C00] disabled:opacity-60 text-white px-8 py-4 rounded-xl font-bold transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* INFORMACIÓN */}

          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-9 bg-[#FF6600] rounded-full" />

                <h3 className="text-xl sm:text-2xl font-bold text-[#063D2A]">
                  Recomendación
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Mantén una estructura clara de categorías para facilitar la
                búsqueda de repuestos y mejorar la organización del inventario
                de Grupo Comercial J&G.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FormularioCategoriaRepuesto;
