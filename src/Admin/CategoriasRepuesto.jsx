import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  obtenerCategoriasRepuesto,
  eliminarCategoriaRepuesto,
} from "../Services/categoriaRepuestoService";

function CategoriasRepuesto() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [error, setError] = useState("");

  const cargarCategorias = async () => {
    try {
      setCargando(true);
      setError("");

      const data = await obtenerCategoriasRepuesto();

      setCategorias(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar categorías de repuestos:", error);

      setError("No se pudieron cargar las categorías de repuestos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const eliminar = async (id) => {
    if (eliminandoId !== null) return;

    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar esta categoría de repuesto?",
    );

    if (!confirmar) return;

    try {
      setEliminandoId(id);
      setError("");

      await eliminarCategoriaRepuesto(id);

      await cargarCategorias();

      alert("Categoría de repuesto eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar categoría de repuesto:", error);

      const estado = error?.status || error?.response?.status;

      if (estado === 401) {
        alert("Tu sesión ha expirado. Inicia sesión nuevamente.");
      } else if (estado === 403) {
        alert(
          "No se pudo eliminar la categoría. El servidor rechazó la solicitud por seguridad. Revisa la sesión y el token CSRF.",
        );
      } else {
        alert(
          "No se pudo eliminar la categoría de repuesto. Verifica la conexión con el servidor.",
        );
      }
    } finally {
      setEliminandoId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7F5]">
      <MenuAdmin />

      <main className="flex-1 min-w-0 min-h-screen">
        {/* ENCABEZADO */}

        <div className="bg-gradient-to-r from-[#063D2A] via-[#006B3C] to-[#009E49] text-white shadow-lg">
          <div className="px-5 sm:px-8 lg:px-10 py-9 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="uppercase tracking-[0.2em] text-green-100 text-xs font-bold">
                Grupo Comercial J&G
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3">
                Categorías de Repuestos
              </h1>

              <p className="text-green-100 mt-3 text-sm sm:text-base">
                Administración de categorías para repuestos y accesorios.
              </p>

              <div className="w-20 h-1 bg-[#FF6600] rounded-full mt-5" />
            </div>

            <Link
              to="/admin/categorias-repuesto/nuevo"
              className="inline-flex items-center justify-center gap-2 bg-[#FF6600] hover:bg-[#E85C00] text-white px-7 py-4 rounded-xl font-bold shadow-lg transition-all hover:-translate-y-0.5"
            >
              <span className="text-xl">+</span>
              Nueva Categoría
            </Link>
          </div>
        </div>

        <div className="p-5 sm:p-8 lg:p-10">
          {/* MENSAJE DE ERROR */}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="font-medium">{error}</p>

              <button
                type="button"
                onClick={cargarCategorias}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* INDICADORES */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* CATEGORÍAS REGISTRADAS */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm font-semibold">
                  Categorías Registradas
                </p>

                <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-green-100 text-[#009E49] text-xl font-bold">
                  C
                </span>
              </div>

              <h2 className="text-5xl font-black text-[#009E49] mt-5">
                {categorias.length}
              </h2>

              <p className="text-gray-400 text-xs mt-2">
                Categorías de repuestos
              </p>
            </div>

            {/* ESTADO */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm font-semibold">
                  Estado del Sistema
                </p>

                <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-green-100 text-[#009E49] font-bold">
                  ✓
                </span>
              </div>

              <h2 className="text-2xl font-black text-[#009E49] mt-6">
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

            {/* GESTIÓN */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-sm font-semibold">
                  Área de Gestión
                </p>

                <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-orange-100 text-[#FF6600] text-xl font-bold">
                  R
                </span>
              </div>

              <h2 className="text-3xl font-black text-[#FF6600] mt-6">
                Repuestos
              </h2>

              <p className="text-gray-400 text-xs mt-3">
                Organización de repuestos y accesorios
              </p>
            </div>
          </div>

          {/* TABLA */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#063D2A] text-white px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Listado de Categorías de Repuestos
                </h2>

                <p className="text-green-100 text-sm mt-1">
                  Consulta, edita y administra las categorías
                </p>
              </div>

              <span className="self-start sm:self-auto bg-white/15 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                {categorias.length} registros
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-sm">
                <thead className="bg-[#EAF5EE] text-[#063D2A]">
                  <tr>
                    <th className="px-6 py-5 text-left font-bold">ID</th>

                    <th className="px-6 py-5 text-left font-bold">Nombre</th>

                    <th className="px-6 py-5 text-left font-bold">
                      Descripción
                    </th>

                    <th className="px-6 py-5 text-center font-bold">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cargando ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-16 text-gray-500"
                      >
                        Cargando categorías de repuestos...
                      </td>
                    </tr>
                  ) : categorias.length > 0 ? (
                    categorias.map((categoria) => (
                      <tr
                        key={categoria.id}
                        className="border-b border-gray-100 hover:bg-[#F5FBF7] transition-colors"
                      >
                        <td className="px-6 py-5 font-bold text-gray-700">
                          #{categoria.id}
                        </td>

                        <td className="px-6 py-5">
                          <span className="inline-block bg-green-100 text-[#007A3D] px-4 py-2 rounded-full font-bold">
                            {categoria.nombre}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-gray-600 max-w-sm">
                          {categoria.descripcion || "Sin descripción"}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-center items-center gap-3">
                            <Link
                              to={`/admin/categorias-repuesto/editar/${categoria.id}`}
                              className="bg-[#009E49] hover:bg-[#007A39] text-white px-5 py-2.5 rounded-xl font-bold transition"
                            >
                              Editar
                            </Link>

                            <button
                              type="button"
                              onClick={() => eliminar(categoria.id)}
                              disabled={eliminandoId !== null}
                              className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 px-5 py-2.5 rounded-xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {eliminandoId === categoria.id
                                ? "Eliminando..."
                                : "Eliminar"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-16 text-gray-500"
                      >
                        No existen categorías de repuestos registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RESUMEN */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sm:p-8 mt-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-9 bg-[#FF6600] rounded-full" />

              <h2 className="text-xl sm:text-2xl font-bold text-[#063D2A]">
                Información General
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Actualmente existen{" "}
              <span className="font-black text-[#009E49]">
                {categorias.length}
              </span>{" "}
              categorías de repuestos registradas dentro del sistema
              administrativo de Grupo Comercial J&G.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CategoriasRepuesto;
