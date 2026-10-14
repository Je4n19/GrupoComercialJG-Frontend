import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  guardarRepuesto,
  actualizarRepuesto,
  obtenerRepuestoPorId,
} from "../Services/repuestoService";

import { obtenerCategoriasRepuesto } from "../Services/categoriaRepuestoService";

const LIMITE_DESCRIPCION = 5000;

const REPUESTO_INICIAL = {
  nombre: "",
  categoria: "",
  precio: "",
  stock: "",
  descripcion: "",
  imagen: "",
};

const inputClass =
  "w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 " +
  "bg-white text-gray-800 outline-none transition " +
  "focus:border-[#009E49] focus:ring-4 focus:ring-green-100 " +
  "disabled:bg-gray-100 disabled:cursor-not-allowed";

function FormularioRepuesto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categorias, setCategorias] = useState([]);
  const [repuesto, setRepuesto] = useState(REPUESTO_INICIAL);

  const [cargando, setCargando] = useState(Boolean(id));
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [errorCategorias, setErrorCategorias] = useState("");

  useEffect(() => {
    let activo = true;

    const cargarDatos = async () => {
      setError("");
      setErrorCategorias("");
      setCargando(true);

      try {
        const [resultadoCategorias, resultadoRepuesto] =
          await Promise.allSettled([
            obtenerCategoriasRepuesto(),
            id ? obtenerRepuestoPorId(id) : Promise.resolve(null),
          ]);

        if (!activo) return;

        if (resultadoCategorias.status === "fulfilled") {
          const data = resultadoCategorias.value;

          setCategorias(Array.isArray(data) ? data : []);
        } else {
          console.error(
            "Error cargando categorías:",
            resultadoCategorias.reason,
          );

          setErrorCategorias(
            "No se pudieron cargar las categorías de repuestos.",
          );
        }

        if (id) {
          if (resultadoRepuesto.status === "fulfilled") {
            const data = resultadoRepuesto.value;

            if (!data) {
              setError("No se encontró el repuesto solicitado.");
            } else {
              setRepuesto({
                ...REPUESTO_INICIAL,
                ...data,
                descripcion: data.descripcion ?? "",
              });
            }
          } else {
            console.error("Error cargando repuesto:", resultadoRepuesto.reason);

            setError(
              "No se pudo cargar el repuesto. Verifica la conexión con el servidor.",
            );
          }
        } else {
          setRepuesto(REPUESTO_INICIAL);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarDatos();

    return () => {
      activo = false;
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRepuesto((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (guardando || cargando) return;

    if (id && error) {
      return;
    }

    const descripcion = repuesto.descripcion ?? "";

    if (descripcion.length > LIMITE_DESCRIPCION) {
      setError("La descripción supera los 5,000 caracteres.");
      return;
    }

    if (!repuesto.nombre?.trim()) {
      setError("Debes ingresar el nombre del repuesto.");
      return;
    }

    if (!repuesto.categoria) {
      setError("Debes seleccionar una categoría.");
      return;
    }

    const precio = Number(repuesto.precio);
    const stock = Number(repuesto.stock);

    if (repuesto.precio === "" || !Number.isFinite(precio) || precio < 0) {
      setError("Ingresa un precio válido.");
      return;
    }

    if (repuesto.stock === "" || !Number.isInteger(stock) || stock < 0) {
      setError("Ingresa un stock válido.");
      return;
    }

    const datosEnviar = {
      ...repuesto,
      nombre: repuesto.nombre.trim(),
      categoria: repuesto.categoria,
      precio,
      stock,
      descripcion,
      imagen: repuesto.imagen ?? "",
    };

    try {
      setGuardando(true);
      setError("");

      if (id) {
        await actualizarRepuesto(id, datosEnviar);

        alert("Repuesto actualizado correctamente.");
      } else {
        await guardarRepuesto(datosEnviar);

        alert("Repuesto registrado correctamente.");
      }

      navigate("/admin/repuestos");
    } catch (err) {
      console.error("Error al guardar repuesto:", err);

      const estado = err?.status ?? err?.response?.status;

      if (estado === 401) {
        setError("Tu sesión ha expirado. Inicia sesión nuevamente.");
      } else if (estado === 403) {
        setError(
          "Error 403: el servidor rechazó la solicitud. Debemos revisar el envío de la sesión y el token CSRF en repuestoService.js.",
        );
      } else if (estado === 400) {
        setError(
          "El servidor rechazó los datos. Revisa el precio, stock y descripción.",
        );
      } else if (estado === 409) {
        setError("Existe un conflicto con los datos del repuesto.");
      } else {
        setError(
          err?.message ||
            "No se pudo guardar el repuesto. Verifica la conexión con el backend.",
        );
      }
    } finally {
      setGuardando(false);
    }
  };

  const caracteres = (repuesto.descripcion ?? "").length;

  const porcentajeDescripcion = Math.min(
    (caracteres / LIMITE_DESCRIPCION) * 100,
    100,
  );

  const categoriaSeleccionadaExiste = categorias.some(
    (categoria) => categoria.nombre === repuesto.categoria,
  );

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
              {id ? "Editar Repuesto" : "Registrar Repuesto"}
            </h1>

            <p className="text-green-100 mt-3 text-sm sm:text-lg">
              Gestión de repuestos, precios e inventario.
            </p>

            <div className="w-20 h-1 bg-[#FF6600] rounded-full mt-5" />
          </div>
        </header>

        <div className="p-5 sm:p-8 lg:p-10">
          {/* FORMULARIO */}

          <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#063D2A] text-white px-6 sm:px-8 py-6">
              <h2 className="text-xl sm:text-2xl font-bold">
                Información del Repuesto
              </h2>

              <p className="text-green-100 mt-2 text-sm">
                Completa los datos para registrar o actualizar el repuesto.
              </p>
            </div>

            {cargando ? (
              <div className="p-12 text-center text-gray-500">
                Cargando información del repuesto...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 sm:p-8">
                {/* ERRORES */}

                {error && (
                  <div
                    role="alert"
                    className="mb-7 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl font-medium"
                  >
                    {error}
                  </div>
                )}

                {errorCategorias && (
                  <div
                    role="alert"
                    className="mb-7 bg-orange-50 border border-orange-200 text-orange-800 px-5 py-4 rounded-xl font-medium"
                  >
                    {errorCategorias}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* NOMBRE */}

                  <div>
                    <label
                      htmlFor="nombre"
                      className="block font-bold text-[#063D2A] mb-3"
                    >
                      Nombre del Repuesto
                    </label>

                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      value={repuesto.nombre ?? ""}
                      onChange={handleChange}
                      placeholder="Ej. Pistón STIHL MS 250"
                      required
                      disabled={guardando}
                      className={inputClass}
                    />
                  </div>

                  {/* CATEGORÍA */}

                  <div>
                    <label
                      htmlFor="categoria"
                      className="block font-bold text-[#063D2A] mb-3"
                    >
                      Categoría
                    </label>

                    <select
                      id="categoria"
                      name="categoria"
                      value={repuesto.categoria ?? ""}
                      onChange={handleChange}
                      required
                      disabled={guardando}
                      className={inputClass}
                    >
                      <option value="">Seleccione una categoría</option>

                      {repuesto.categoria && !categoriaSeleccionadaExiste && (
                        <option value={repuesto.categoria}>
                          {repuesto.categoria}
                        </option>
                      )}

                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.nombre}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>

                    <p className="text-sm text-gray-500 mt-2">
                      Selecciona la categoría correspondiente al repuesto.
                    </p>
                  </div>

                  {/* PRECIO */}

                  <div>
                    <label
                      htmlFor="precio"
                      className="block font-bold text-[#063D2A] mb-3"
                    >
                      Precio (S/)
                    </label>

                    <input
                      id="precio"
                      type="number"
                      name="precio"
                      value={repuesto.precio ?? ""}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                      disabled={guardando}
                      className={inputClass}
                    />
                  </div>

                  {/* STOCK */}

                  <div>
                    <label
                      htmlFor="stock"
                      className="block font-bold text-[#063D2A] mb-3"
                    >
                      Stock
                    </label>

                    <input
                      id="stock"
                      type="number"
                      name="stock"
                      value={repuesto.stock ?? ""}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="1"
                      required
                      disabled={guardando}
                      className={inputClass}
                    />
                  </div>

                  {/* IMAGEN */}

                  <div className="md:col-span-2">
                    <label
                      htmlFor="imagen"
                      className="block font-bold text-[#063D2A] mb-3"
                    >
                      URL de Imagen
                    </label>

                    <input
                      id="imagen"
                      type="text"
                      name="imagen"
                      value={repuesto.imagen ?? ""}
                      onChange={handleChange}
                      placeholder="https://..."
                      disabled={guardando}
                      className={inputClass}
                    />

                    {repuesto.imagen && (
                      <div className="mt-5 bg-[#F4F7F5] border border-gray-100 rounded-xl p-4">
                        <p className="text-sm font-semibold text-[#063D2A] mb-3">
                          Vista previa de la imagen
                        </p>

                        <img
                          src={repuesto.imagen}
                          alt={repuesto.nombre || "Imagen del repuesto"}
                          className="w-full max-w-xs h-48 object-contain bg-white rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* DESCRIPCIÓN */}

                  <div className="md:col-span-2">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <label
                        htmlFor="descripcion-repuesto"
                        className="block font-bold text-[#063D2A] text-lg"
                      >
                        Descripción del Repuesto
                      </label>

                      <span className="text-xs font-bold text-[#FF6600] bg-orange-50 px-3 py-2 rounded-full">
                        Hasta 5,000 caracteres
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                      Agrega información sobre compatibilidad, materiales,
                      características técnicas, instalación y recomendaciones.
                    </p>

                    <textarea
                      id="descripcion-repuesto"
                      name="descripcion"
                      value={repuesto.descripcion ?? ""}
                      onChange={handleChange}
                      maxLength={LIMITE_DESCRIPCION}
                      rows={12}
                      disabled={guardando}
                      placeholder={`Escribe aquí la descripción completa...

Características del repuesto:
-
-

Modelos compatibles:
-
-

Especificaciones técnicas:
-
-

Recomendaciones:
-`}
                      className={`${inputClass} min-h-[300px] resize-y leading-relaxed`}
                    />

                    <div className="flex flex-wrap justify-between items-center gap-2 mt-3">
                      <p className="text-xs text-gray-500">
                        Puedes escribir párrafos, listas y especificaciones en
                        diferentes líneas.
                      </p>

                      <span
                        className={`text-sm font-bold ${
                          caracteres >= 4500
                            ? "text-[#FF6600]"
                            : "text-gray-500"
                        }`}
                      >
                        {caracteres.toLocaleString("es-PE")} / 5,000 caracteres
                      </span>
                    </div>

                    <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-200 ${
                          caracteres >= 4500 ? "bg-[#FF6600]" : "bg-[#009E49]"
                        }`}
                        style={{
                          width: `${porcentajeDescripcion}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* VISTA PREVIA */}

                <div className="mt-9 bg-[#F0F9F3] border border-green-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-2 h-8 bg-[#FF6600] rounded-full" />

                    <h3 className="font-bold text-xl text-[#063D2A]">
                      Vista Previa
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-3">
                      <p>
                        <strong className="text-[#063D2A]">Repuesto:</strong>{" "}
                        {repuesto.nombre || "-"}
                      </p>

                      <p>
                        <strong className="text-[#063D2A]">Categoría:</strong>{" "}
                        {repuesto.categoria || "-"}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p>
                        <strong className="text-[#063D2A]">Precio:</strong> S/{" "}
                        {repuesto.precio === "" ? "0" : repuesto.precio}
                      </p>

                      <p>
                        <strong className="text-[#063D2A]">Stock:</strong>{" "}
                        {repuesto.stock === "" ? "0" : repuesto.stock}
                      </p>
                    </div>
                  </div>

                  {repuesto.descripcion && (
                    <div className="mt-5 pt-5 border-t border-green-200">
                      <h4 className="font-bold text-[#063D2A] mb-2">
                        Descripción:
                      </h4>

                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                        {repuesto.descripcion}
                      </p>
                    </div>
                  )}
                </div>

                {/* BOTONES */}

                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <button
                    type="submit"
                    disabled={guardando || Boolean(id && error)}
                    className="bg-[#009E49] hover:bg-[#007A39] disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold shadow-md transition"
                  >
                    {guardando
                      ? "Guardando..."
                      : id
                        ? "Actualizar Repuesto"
                        : "Guardar Repuesto"}
                  </button>

                  <Link
                    to="/admin/repuestos"
                    className="inline-flex items-center justify-center bg-[#FF6600] hover:bg-[#E85C00] text-white px-8 py-4 rounded-xl font-bold transition"
                  >
                    Cancelar
                  </Link>
                </div>
              </form>
            )}
          </div>

          {/* CONSEJO DE GESTIÓN */}

          <div className="max-w-5xl mx-auto mt-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-9 bg-[#FF6600] rounded-full" />

                <h3 className="text-xl sm:text-2xl font-bold text-[#063D2A]">
                  Consejo de Gestión
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Mantén actualizado el stock de repuestos para evitar quiebres de
                inventario y mejorar la atención a los clientes de Grupo
                Comercial J&G.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FormularioRepuesto;
