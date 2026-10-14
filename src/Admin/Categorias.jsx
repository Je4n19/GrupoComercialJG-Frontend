import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  obtenerCategorias,
  eliminarCategoria,
} from "../Services/categoriaService";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [error, setError] = useState("");

  // CARGAR CATEGORÍAS
  const cargarCategorias = async () => {
    try {
      setCargando(true);
      setError("");

      const data = await obtenerCategorias();

      setCategorias(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
      setError("No se pudieron cargar las categorías.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // ELIMINAR CATEGORÍA
  const handleEliminar = async (id) => {
    if (eliminandoId !== null) return;

    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar esta categoría?",
    );

    if (!confirmar) return;

    try {
      setEliminandoId(id);
      setError("");

      await eliminarCategoria(id);
      await cargarCategorias();

      window.alert("Categoría eliminada correctamente.");
    } catch (err) {
      console.error("Error al eliminar categoría:", err);

      const estado = err?.status || err?.response?.status;

      if (estado === 401) {
        window.alert("Tu sesión ha expirado. Inicia sesión nuevamente.");
      } else if (estado === 403) {
        window.alert(
          "No se pudo eliminar la categoría. Verifica la sesión y el token CSRF.",
        );
      } else {
        window.alert(
          "No se pudo eliminar la categoría. Comprueba la conexión con el servidor.",
        );
      }
    } finally {
      setEliminandoId(null);
    }
  };

  const gruposRegistrados = new Set(
    categorias.map((categoria) => categoria.grupo).filter(Boolean),
  ).size;

  // BOTONES REUTILIZABLES
  const AccionesCategoria = ({ categoria, movil = false }) => (
    <div
      className={`flex items-center gap-2 sm:gap-3 ${
        movil ? "w-full" : "justify-center"
      }`}
    >
      <Link
        to={`/admin/categorias/editar/${categoria.id}`}
        className={`inline-flex items-center justify-center bg-[#009E49] hover:bg-[#007A39] text-white px-4 py-3 rounded-xl font-bold transition text-sm ${
          movil ? "flex-1" : ""
        }`}
      >
        Editar
      </Link>

      <button
        type="button"
        onClick={() => handleEliminar(categoria.id)}
        disabled={eliminandoId !== null}
        className={`inline-flex items-center justify-center bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 px-4 py-3 rounded-xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed text-sm ${
          movil ? "flex-1" : ""
        }`}
      >
        {eliminandoId === categoria.id ? "Eliminando..." : "Eliminar"}
      </button>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full min-w-0 max-w-full bg-[#F4F7F5]">
      <MenuAdmin />

      <main className="flex-1 min-w-0 w-full lg:w-auto min-h-screen overflow-x-hidden">
        {/* ENCABEZADO */}
        <header className="bg-gradient-to-r from-[#063D2A] via-[#006B3C] to-[#009E49] text-white shadow-lg">
          <div className="px-4 sm:px-8 lg:px-10 py-7 sm:py-9 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 sm:gap-6">
            <div className="min-w-0">
              <p className="uppercase tracking-[0.2em] text-green-100 text-[10px] sm:text-xs font-bold">
                Grupo Comercial J&G
              </p>

              <h1 className="text-2xl sm:text-4xl xl:text-5xl font-black mt-3 leading-tight break-words">
                Gestión de Categorías
              </h1>

              <p className="text-green-100 mt-3 text-sm sm:text-base leading-relaxed">
                Organiza los grupos y categorías de tu catálogo.
              </p>

              <div className="w-20 h-1 bg-[#FF6600] rounded-full mt-5" />
            </div>

            <Link
              to="/admin/categorias/nuevo"
              className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center gap-2 bg-[#FF6600] hover:bg-[#E85C00] text-white px-6 py-3.5 sm:py-4 rounded-xl font-bold shadow-lg transition-all hover:-translate-y-0.5"
            >
              <span className="text-xl leading-none">+</span>
              Nueva Categoría
            </Link>
          </div>
        </header>

        {/* CONTENIDO */}
        <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8 xl:p-10">
          {/* ERROR */}
          {error && (
            <div
              role="alert"
              className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 sm:px-5 py-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <p className="font-medium text-sm sm:text-base">{error}</p>

              <button
                type="button"
                onClick={cargarCategorias}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* INDICADORES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
            <div className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-gray-500 text-sm font-semibold">
                  Categorías Registradas
                </p>

                <span className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-green-100 text-[#009E49] text-xl font-bold">
                  C
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-[#009E49] mt-5">
                {cargando || error ? "—" : categorias.length}
              </h2>

              <p className="text-gray-400 text-xs mt-2">
                Categorías del catálogo
              </p>
            </div>

            <div className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-gray-500 text-sm font-semibold">
                  Grupos Registrados
                </p>

                <span className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-orange-100 text-[#FF6600] text-xl font-bold">
                  G
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-[#FF6600] mt-5">
                {cargando || error ? "—" : gruposRegistrados}
              </h2>

              <p className="text-gray-400 text-xs mt-2">Grupos organizados</p>
            </div>

            <div className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7 sm:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-gray-500 text-sm font-semibold">
                  Estado del Sistema
                </p>

                <span className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-green-100 text-[#009E49] font-bold">
                  ✓
                </span>
              </div>

              <h2
                className={`text-xl sm:text-2xl font-black mt-6 break-words ${
                  error ? "text-red-600" : "text-[#009E49]"
                }`}
              >
                {cargando
                  ? "Cargando..."
                  : error
                    ? "Error de conexión"
                    : "Operativo"}
              </h2>

              <p className="text-gray-400 text-xs mt-3">
                Estado de la consulta de categorías
              </p>
            </div>
          </div>

          {/* LISTADO DE CATEGORÍAS */}
          <section className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#063D2A] text-white px-4 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold">
                  Listado de Categorías
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Administra las categorías registradas
                </p>
              </div>

              <span className="self-start sm:self-auto shrink-0 bg-white/15 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                {cargando || error
                  ? "— registros"
                  : `${categorias.length} registros`}
              </span>
            </div>

            {/* VISTA MÓVIL: TARJETAS */}
            <div className="lg:hidden p-3 sm:p-5 space-y-4">
              {cargando ? (
                <div className="py-14 text-center text-gray-500">
                  Cargando categorías...
                </div>
              ) : categorias.length === 0 ? (
                <div className="py-14 text-center text-gray-500">
                  {error
                    ? "No se pudieron consultar las categorías."
                    : "No existen categorías registradas."}
                </div>
              ) : (
                categorias.map((categoria) => (
                  <article
                    key={categoria.id}
                    className="min-w-0 bg-[#FAFCFB] border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <span className="inline-flex bg-[#EAF5EE] text-[#063D2A] px-3 py-1.5 rounded-lg text-xs font-bold">
                        ID #{categoria.id}
                      </span>

                      {categoria.grupo ? (
                        <span className="inline-flex max-w-full bg-[#063D2A] text-white px-3 py-1.5 rounded-full text-xs font-bold break-words">
                          {categoria.grupo}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">Sin grupo</span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-[#063D2A] mt-4 break-words">
                      {categoria.nombre || "Sin nombre"}
                    </h3>

                    <div className="mt-4">
                      <p className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">
                        Descripción
                      </p>

                      <p className="text-sm text-gray-600 leading-relaxed break-words">
                        {categoria.descripcion || "Sin descripción"}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 mt-5 pt-4">
                      <AccionesCategoria categoria={categoria} movil />
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* VISTA COMPUTADORA: TABLA */}
            <div className="hidden lg:block w-full overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="bg-[#EAF5EE] text-[#063D2A]">
                  <tr>
                    <th className="px-5 py-5 text-left font-bold">ID</th>

                    <th className="px-5 py-5 text-left font-bold">Grupo</th>

                    <th className="px-5 py-5 text-left font-bold">Categoría</th>

                    <th className="px-5 py-5 text-left font-bold">
                      Descripción
                    </th>

                    <th className="px-5 py-5 text-center font-bold">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cargando ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-16 text-gray-500"
                      >
                        Cargando categorías...
                      </td>
                    </tr>
                  ) : categorias.length > 0 ? (
                    categorias.map((categoria) => (
                      <tr
                        key={categoria.id}
                        className="border-b border-gray-100 hover:bg-[#F5FBF7] transition-colors"
                      >
                        <td className="px-5 py-5 font-bold text-gray-700">
                          #{categoria.id}
                        </td>

                        <td className="px-5 py-5">
                          {categoria.grupo ? (
                            <span className="inline-block bg-[#063D2A] text-white px-3 py-2 rounded-full text-xs font-bold break-words">
                              {categoria.grupo}
                            </span>
                          ) : (
                            <span className="text-gray-400">Sin grupo</span>
                          )}
                        </td>

                        <td className="px-5 py-5">
                          <span className="inline-block bg-green-100 text-[#007A3D] px-3 py-2 rounded-full font-bold break-words">
                            {categoria.nombre}
                          </span>
                        </td>

                        <td className="px-5 py-5 text-gray-600 max-w-xs break-words">
                          {categoria.descripcion || "Sin descripción"}
                        </td>

                        <td className="px-5 py-5">
                          <AccionesCategoria categoria={categoria} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-16 text-gray-500"
                      >
                        {error
                          ? "No se pudieron consultar las categorías."
                          : "No existen categorías registradas."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* RESUMEN */}
          <section className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8 mt-6 sm:mt-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="shrink-0 w-2 h-9 bg-[#FF6600] rounded-full" />

              <h2 className="text-xl sm:text-2xl font-bold text-[#063D2A]">
                Organización del Catálogo
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Actualmente existen{" "}
              <span className="font-black text-[#009E49]">
                {cargando || error ? "—" : categorias.length}
              </span>{" "}
              categorías distribuidas en{" "}
              <span className="font-black text-[#FF6600]">
                {cargando || error ? "—" : gruposRegistrados}
              </span>{" "}
              grupos de productos.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Categorias;
