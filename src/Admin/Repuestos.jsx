import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  obtenerRepuestos,
  eliminarRepuesto,
} from "../Services/repuestoService";

/* ==========================================
   FUNCIONES AUXILIARES
========================================== */

const formatoSoles = (valor) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(Number(valor) || 0);

const obtenerStock = (repuesto) => {
  if (
    repuesto.stock === null ||
    repuesto.stock === undefined ||
    repuesto.stock === ""
  ) {
    return null;
  }

  const stock = Number(repuesto.stock);

  return Number.isFinite(stock) && stock >= 0 ? stock : null;
};

const obtenerColorStock = (stock) => {
  if (stock === null) {
    return "bg-gray-100 text-gray-600";
  }

  if (stock <= 5) {
    return "bg-red-100 text-red-700";
  }

  return "bg-green-100 text-[#007A3D]";
};

/* ==========================================
   TARJETA DE REPUESTO PARA MÓVILES
========================================== */

function TarjetaRepuesto({ repuesto, eliminandoId, handleEliminar }) {
  const stock = obtenerStock(repuesto);

  return (
    <article className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
      {/* NOMBRE E ID */}
      <div className="min-w-0">
        <p className="text-xs font-bold text-gray-400">ID #{repuesto.id}</p>

        <h3 className="mt-2 text-base sm:text-lg font-black text-[#063D2A] break-words leading-snug">
          {repuesto.nombre || "Sin nombre"}
        </h3>
      </div>

      {/* CATEGORÍA */}
      <div className="mt-4 min-w-0">
        <p className="text-xs font-semibold text-gray-500">Categoría</p>

        <span className="mt-2 inline-block max-w-full rounded-xl bg-green-100 px-3 py-1.5 text-xs font-bold text-[#007A3D] break-words">
          {repuesto.categoria || "Sin categoría"}
        </span>
      </div>

      {/* PRECIO Y STOCK */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="min-w-0 rounded-xl bg-[#F4F7F5] p-3">
          <p className="text-xs font-semibold text-gray-500">Precio</p>

          <p className="mt-2 text-base sm:text-lg font-black text-[#009E49] break-words">
            {formatoSoles(repuesto.precio)}
          </p>
        </div>

        <div className="min-w-0 rounded-xl bg-[#F4F7F5] p-3">
          <p className="mb-2 text-xs font-semibold text-gray-500">Stock</p>

          <span
            className={`inline-flex max-w-full rounded-full px-3 py-1.5 text-xs font-bold ${obtenerColorStock(
              stock,
            )}`}
          >
            {stock === null ? "Sin datos" : stock}
          </span>
        </div>
      </div>

      {/* ACCIONES */}
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
        <Link
          to={`/admin/repuestos/editar/${repuesto.id}`}
          className="inline-flex min-w-0 items-center justify-center rounded-xl bg-[#009E49] px-3 py-3 text-sm font-bold text-white transition hover:bg-[#007A39]"
        >
          Editar
        </Link>

        <button
          type="button"
          onClick={() => handleEliminar(repuesto.id, repuesto.nombre)}
          disabled={eliminandoId !== null}
          className="inline-flex min-w-0 items-center justify-center rounded-xl bg-red-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {eliminandoId === repuesto.id ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </article>
  );
}

/* ==========================================
   COMPONENTE PRINCIPAL
========================================== */

function Repuestos() {
  const [repuestos, setRepuestos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [cargando, setCargando] = useState(true);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  /* ==========================================
     CARGAR REPUESTOS
  ========================================== */

  const cargarRepuestos = async () => {
    try {
      setCargando(true);
      setError("");

      const data = await obtenerRepuestos();

      if (!Array.isArray(data)) {
        throw new Error(
          "El servidor devolvió un formato de repuestos inválido.",
        );
      }

      setRepuestos(data);
    } catch (err) {
      console.error("Error al cargar repuestos:", err);

      setRepuestos([]);
      setError(
        "No se pudieron cargar los repuestos. Verifica la conexión con el servidor.",
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarRepuestos();
  }, []);

  /* ==========================================
     ELIMINAR REPUESTO
  ========================================== */

  const handleEliminar = async (id, nombre) => {
    if (eliminandoId !== null) return;

    const confirmar = window.confirm(
      `¿Deseas eliminar el repuesto "${nombre}"?\n\nEsta acción no se puede deshacer.`,
    );

    if (!confirmar) return;

    try {
      setEliminandoId(id);
      setError("");
      setMensaje("");

      await eliminarRepuesto(id);

      setRepuestos((anteriores) =>
        anteriores.filter((repuesto) => repuesto.id !== id),
      );

      setMensaje("Repuesto eliminado correctamente.");
    } catch (err) {
      console.error("Error al eliminar repuesto:", err);

      const estado = err?.status ?? err?.response?.status;

      if (estado === 401) {
        setError("Tu sesión ha expirado. Inicia sesión nuevamente.");
      } else if (estado === 403) {
        setError(
          "Error 403: el servidor rechazó la eliminación. Revisa la sesión y el token CSRF en repuestoService.js.",
        );
      } else if (estado === 409) {
        setError(
          "No se puede eliminar este repuesto porque tiene registros relacionados.",
        );
      } else {
        setError(
          err?.message ||
            "No se pudo eliminar el repuesto. Verifica la conexión con el servidor.",
        );
      }
    } finally {
      setEliminandoId(null);
    }
  };

  /* ==========================================
     FILTROS
  ========================================== */

  const repuestosFiltrados = repuestos.filter((repuesto) => {
    const texto = [repuesto.nombre, repuesto.categoria, repuesto.id]
      .map((valor) => String(valor ?? ""))
      .join(" ")
      .toLowerCase();

    return texto.includes(busqueda.toLowerCase().trim());
  });

  /* ==========================================
     INDICADORES
  ========================================== */

  const stockTotal = repuestos.reduce(
    (total, repuesto) => total + (obtenerStock(repuesto) ?? 0),
    0,
  );

  const valorInventario = repuestos.reduce((total, repuesto) => {
    const stock = obtenerStock(repuesto);
    const precio = Number(repuesto.precio);

    if (stock === null || !Number.isFinite(precio) || precio < 0) {
      return total;
    }

    return total + precio * stock;
  }, 0);

  const stockBajo = repuestos.filter((repuesto) => {
    const stock = obtenerStock(repuesto);
    return stock !== null && stock <= 5;
  }).length;

  const alertasStock = repuestos
    .filter((repuesto) => {
      const stock = obtenerStock(repuesto);
      return stock !== null && stock <= 5;
    })
    .sort((a, b) => obtenerStock(a) - obtenerStock(b))
    .slice(0, 5);

  const estadisticas = [
    {
      titulo: "Repuestos Registrados",
      valor: repuestos.length,
      color: "text-[#063D2A]",
      fondo: "bg-green-50",
      icono: "🔧",
    },
    {
      titulo: "Stock Total",
      valor: stockTotal.toLocaleString("es-PE"),
      color: "text-[#009E49]",
      fondo: "bg-green-50",
      icono: "📊",
    },
    {
      titulo: "Valor Inventario",
      valor: formatoSoles(valorInventario),
      color: "text-[#FF6600]",
      fondo: "bg-orange-50",
      icono: "💰",
    },
    {
      titulo: "Stock Bajo",
      valor: stockBajo,
      color: "text-red-600",
      fondo: "bg-red-50",
      icono: "⚠️",
    },
  ];

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
          <div className="px-4 sm:px-8 lg:px-10 py-7 sm:py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-6">
            <div className="min-w-0">
              <p className="uppercase tracking-[0.2em] text-green-100 text-[10px] sm:text-xs font-bold">
                Grupo Comercial J&G
              </p>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black mt-3 leading-tight break-words">
                Gestión de Repuestos
              </h1>

              <p className="text-green-100 mt-3 text-sm sm:text-lg leading-relaxed">
                Administración de repuestos y accesorios.
              </p>

              <div className="w-20 h-1 bg-[#FF6600] rounded-full mt-5" />
            </div>

            <Link
              to="/admin/repuestos/nuevo"
              className="inline-flex w-full lg:w-auto shrink-0 items-center justify-center bg-[#FF6600] hover:bg-[#E85C00] text-white px-6 sm:px-7 py-4 rounded-xl font-bold shadow-md transition text-sm sm:text-base"
            >
              + Nuevo Repuesto
            </Link>
          </div>
        </header>

        {/* CUERPO */}
        <div className="w-full min-w-0 p-3 sm:p-6 lg:p-8 xl:p-10">
          {/* MENSAJES */}
          {error && (
            <div
              role="alert"
              className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 sm:px-5 py-4 rounded-xl break-words"
            >
              <p className="font-semibold text-sm sm:text-base">{error}</p>

              <button
                type="button"
                onClick={cargarRepuestos}
                disabled={cargando}
                className="mt-3 text-sm font-bold underline disabled:opacity-60"
              >
                Volver a cargar repuestos
              </button>
            </div>
          )}

          {mensaje && (
            <div
              role="status"
              className="mb-6 bg-green-50 border border-green-200 text-[#007A3D] px-4 sm:px-5 py-4 rounded-xl font-semibold text-sm sm:text-base"
            >
              ✓ {mensaje}
            </div>
          )}

          {/* INDICADORES */}
          <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
            {estadisticas.map((item) => (
              <div
                key={item.titulo}
                className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-6"
              >
                <div className="flex items-start justify-between gap-2 sm:gap-3">
                  <p className="min-w-0 text-xs sm:text-base text-gray-500 font-semibold break-words">
                    {item.titulo}
                  </p>

                  <div
                    className={`shrink-0 w-8 h-8 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-2xl ${item.fondo}`}
                  >
                    {item.icono}
                  </div>
                </div>

                <h2
                  className={`text-xl sm:text-3xl lg:text-4xl font-black mt-4 sm:mt-5 break-all sm:break-words ${item.color}`}
                >
                  {cargando || (error && repuestos.length === 0)
                    ? "—"
                    : item.valor}
                </h2>
              </div>
            ))}
          </div>

          {/* BUSCADOR */}
          <section className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
            <label
              htmlFor="buscar-repuestos"
              className="block text-sm font-bold text-[#063D2A] mb-3"
            >
              Buscar Repuestos
            </label>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                id="buscar-repuestos"
                type="text"
                placeholder="Buscar por nombre, categoría o ID..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="flex-1 min-w-0 w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 text-base outline-none focus:border-[#009E49] focus:ring-4 focus:ring-green-100 transition"
              />

              <button
                type="button"
                onClick={cargarRepuestos}
                disabled={cargando}
                className="w-full sm:w-auto bg-[#063D2A] hover:bg-[#075238] disabled:opacity-60 text-white px-6 py-3.5 rounded-xl font-bold transition"
              >
                {cargando ? "Actualizando..." : "Actualizar"}
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Mostrando{" "}
              <strong className="text-[#009E49]">
                {repuestosFiltrados.length}
              </strong>{" "}
              de {repuestos.length} repuestos.
            </p>
          </section>

          {/* LISTADO DE REPUESTOS */}
          <section className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#063D2A] text-white px-4 sm:px-8 py-5 sm:py-6">
              <h2 className="text-xl sm:text-2xl font-bold break-words">
                Repuestos Registrados
              </h2>

              <p className="text-green-100 text-sm mt-2 leading-relaxed">
                Consulta y administra los repuestos del catálogo.
              </p>
            </div>

            {/* VISTA PARA CELULARES Y TABLETS */}
            <div className="lg:hidden bg-[#F8FAF9] p-3 sm:p-5">
              {cargando ? (
                <div className="py-14 text-center text-gray-500">
                  Cargando repuestos...
                </div>
              ) : error && repuestos.length === 0 ? (
                <div className="py-14 text-center text-red-600">
                  No se pudieron consultar los repuestos.
                </div>
              ) : repuestosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {repuestosFiltrados.map((repuesto) => (
                    <TarjetaRepuesto
                      key={repuesto.id}
                      repuesto={repuesto}
                      eliminandoId={eliminandoId}
                      handleEliminar={handleEliminar}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-14 px-4 text-center text-gray-500">
                  {repuestos.length === 0
                    ? "No existen repuestos registrados."
                    : "No se encontraron repuestos con esa búsqueda."}
                </div>
              )}
            </div>

            {/* TABLA PARA COMPUTADORAS */}
            <div className="hidden lg:block w-full min-w-0 overflow-x-auto">
              <table className="w-full min-w-[850px] text-sm">
                <thead className="bg-[#EAF5EE] text-[#063D2A]">
                  <tr>
                    <th className="px-5 py-5 text-left font-bold">ID</th>
                    <th className="px-5 py-5 text-left font-bold">Nombre</th>
                    <th className="px-5 py-5 text-left font-bold">Categoría</th>
                    <th className="px-5 py-5 text-left font-bold">Precio</th>
                    <th className="px-5 py-5 text-left font-bold">Stock</th>
                    <th className="px-5 py-5 text-center font-bold">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cargando ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-14 text-gray-500"
                      >
                        Cargando repuestos...
                      </td>
                    </tr>
                  ) : error && repuestos.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-14 text-red-600"
                      >
                        No se pudieron consultar los repuestos.
                      </td>
                    </tr>
                  ) : repuestosFiltrados.length > 0 ? (
                    repuestosFiltrados.map((repuesto) => {
                      const stock = obtenerStock(repuesto);

                      return (
                        <tr
                          key={repuesto.id}
                          className="border-b border-gray-100 hover:bg-[#F5FBF7] transition"
                        >
                          <td className="px-5 py-5 font-bold">
                            #{repuesto.id}
                          </td>

                          <td className="px-5 py-5 font-bold text-[#063D2A] break-words">
                            {repuesto.nombre || "Sin nombre"}
                          </td>

                          <td className="px-5 py-5">
                            <span className="inline-block max-w-[200px] bg-green-100 text-[#007A3D] px-3 py-1.5 rounded-xl text-xs font-bold break-words">
                              {repuesto.categoria || "Sin categoría"}
                            </span>
                          </td>

                          <td className="px-5 py-5 font-bold text-[#009E49] whitespace-nowrap">
                            {formatoSoles(repuesto.precio)}
                          </td>

                          <td className="px-5 py-5">
                            <span
                              className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold ${obtenerColorStock(
                                stock,
                              )}`}
                            >
                              {stock === null ? "Sin datos" : stock}
                            </span>
                          </td>

                          <td className="px-5 py-5">
                            <div className="flex items-center justify-center gap-2">
                              <Link
                                to={`/admin/repuestos/editar/${repuesto.id}`}
                                className="bg-[#009E49] hover:bg-[#007A39] text-white px-4 py-2.5 rounded-lg font-bold transition"
                              >
                                Editar
                              </Link>

                              <button
                                type="button"
                                onClick={() =>
                                  handleEliminar(repuesto.id, repuesto.nombre)
                                }
                                disabled={eliminandoId !== null}
                                className="bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-lg font-bold transition"
                              >
                                {eliminandoId === repuesto.id
                                  ? "Eliminando..."
                                  : "Eliminar"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-14 text-gray-500"
                      >
                        {repuestos.length === 0
                          ? "No existen repuestos registrados."
                          : "No se encontraron repuestos con esa búsqueda."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* ALERTAS DE STOCK */}
          <section className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="shrink-0 w-2 h-9 bg-[#FF6600] rounded-full" />

              <h2 className="text-xl sm:text-2xl font-bold text-[#063D2A] break-words">
                Repuestos con Stock Bajo
              </h2>
            </div>

            {cargando ? (
              <p className="text-gray-500 text-sm sm:text-base">
                Revisando stock de repuestos...
              </p>
            ) : error && repuestos.length === 0 ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-5 rounded-xl text-red-700 text-sm sm:text-base">
                No se pudieron consultar las alertas de stock.
              </div>
            ) : alertasStock.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {alertasStock.map((repuesto) => {
                  const stock = obtenerStock(repuesto);

                  return (
                    <div
                      key={repuesto.id}
                      className={`min-w-0 border-l-4 p-4 sm:p-5 rounded-xl ${
                        stock === 0
                          ? "bg-red-50 border-red-500"
                          : "bg-orange-50 border-[#FF6600]"
                      }`}
                    >
                      <p className="font-bold text-gray-800 text-sm sm:text-base break-words">
                        ⚠️ {repuesto.nombre}
                      </p>

                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        {stock === 0
                          ? "Repuesto agotado: no quedan unidades disponibles."
                          : `Stock bajo: solo ${stock} unidades disponibles.`}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-green-50 border-l-4 border-[#009E49] p-4 sm:p-5 rounded-xl text-[#007A3D] text-sm sm:text-base">
                No existen repuestos con stock crítico.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Repuestos;
