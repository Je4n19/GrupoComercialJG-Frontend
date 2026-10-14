import { useEffect, useState } from "react";

import MenuAdmin from "../Components/MenuAdmin";

import { obtenerProductos } from "../Services/productoService";
import { obtenerRepuestos } from "../Services/repuestoService";

/* ==========================================
   ESTADOS DEL INVENTARIO
========================================== */

const obtenerEstado = (stock) => {
  if (stock === null || stock === undefined || stock === "") {
    return "Sin datos";
  }

  const cantidad = Number(stock);

  if (!Number.isFinite(cantidad)) return "Sin datos";
  if (cantidad <= 0) return "Sin Stock";
  if (cantidad <= 5) return "Bajo";
  if (cantidad <= 15) return "Medio";

  return "Alto";
};

const obtenerColor = (estado) => {
  switch (estado) {
    case "Alto":
      return "bg-green-100 text-[#007A3D]";
    case "Medio":
      return "bg-yellow-100 text-yellow-800";
    case "Bajo":
      return "bg-orange-100 text-[#D45500]";
    case "Sin Stock":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const obtenerColorTipo = (tipo) =>
  tipo === "Producto"
    ? "bg-green-100 text-[#007A3D]"
    : "bg-orange-100 text-[#D45500]";

const inputClass =
  "block w-full min-w-0 max-w-full border-2 border-gray-200 " +
  "rounded-xl px-4 py-3 text-base bg-white outline-none " +
  "transition focus:border-[#009E49] focus:ring-4 " +
  "focus:ring-green-100";

/* ==========================================
   ETIQUETA DE ESTADO
========================================== */

function EstadoStock({ stock }) {
  const estado = obtenerEstado(stock);

  return (
    <span
      className={`inline-flex max-w-full items-center rounded-full px-3 py-1.5 text-xs font-bold ${obtenerColor(
        estado,
      )}`}
    >
      {estado}
    </span>
  );
}

/* ==========================================
   TARJETA MÓVIL
========================================== */

function TarjetaInventario({ item }) {
  return (
    <article className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-gray-400">ID #{item.id}</p>

          <h3 className="mt-2 text-base sm:text-lg font-black text-[#063D2A] break-words">
            {item.nombre || "Sin nombre"}
          </h3>
        </div>

        <span
          className={`inline-flex shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${obtenerColorTipo(
            item.tipo,
          )}`}
        >
          {item.tipo}
        </span>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold text-gray-500">Categoría</p>

        <p className="mt-1 text-sm font-semibold text-gray-800 break-words">
          {item.categoria || "Sin categoría"}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="min-w-0 rounded-xl bg-[#F4F7F5] p-3">
          <p className="text-xs text-gray-500 font-semibold">Stock</p>

          <p className="mt-2 text-xl sm:text-2xl font-black text-[#063D2A] break-words">
            {item.stock ?? "Sin datos"}
          </p>
        </div>

        <div className="min-w-0 rounded-xl bg-[#F4F7F5] p-3">
          <p className="mb-2 text-xs text-gray-500 font-semibold">Estado</p>

          <EstadoStock stock={item.stock} />
        </div>
      </div>
    </article>
  );
}

/* ==========================================
   COMPONENTE PRINCIPAL
========================================== */

function Inventario() {
  const [inventario, setInventario] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  /* ==========================================
     CARGAR INVENTARIO
  ========================================== */

  const cargarInventario = async () => {
    try {
      setCargando(true);
      setError("");

      const [productos, repuestos] = await Promise.all([
        obtenerProductos(),
        obtenerRepuestos(),
      ]);

      if (!Array.isArray(productos) || !Array.isArray(repuestos)) {
        throw new Error(
          "El servidor devolvió un formato de inventario inválido.",
        );
      }

      const productosFormateados = productos.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        categoria: item.categoria,
        stock: item.stock,
        tipo: "Producto",
      }));

      const repuestosFormateados = repuestos.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        categoria: item.categoria,
        stock: item.stock,
        tipo: "Repuesto",
      }));

      setInventario([...productosFormateados, ...repuestosFormateados]);
    } catch (err) {
      console.error("Error al cargar inventario:", err);

      setInventario([]);
      setError(
        "No se pudo cargar el inventario completo. Verifica la conexión con el servidor.",
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarInventario();
  }, []);

  /* ==========================================
     INDICADORES
  ========================================== */

  const stockAlto = inventario.filter(
    (item) => obtenerEstado(item.stock) === "Alto",
  ).length;

  const stockMedio = inventario.filter(
    (item) => obtenerEstado(item.stock) === "Medio",
  ).length;

  const stockBajo = inventario.filter(
    (item) => obtenerEstado(item.stock) === "Bajo",
  ).length;

  const sinStock = inventario.filter(
    (item) => obtenerEstado(item.stock) === "Sin Stock",
  ).length;

  const sinDatos = inventario.filter(
    (item) => obtenerEstado(item.stock) === "Sin datos",
  ).length;

  const alertas = inventario.filter((item) =>
    ["Bajo", "Sin Stock"].includes(obtenerEstado(item.stock)),
  );

  /* ==========================================
     FILTROS
  ========================================== */

  const inventarioFiltrado = inventario.filter((item) => {
    const texto = busqueda.toLowerCase().trim();

    const coincideBusqueda =
      String(item.nombre ?? "")
        .toLowerCase()
        .includes(texto) ||
      String(item.categoria ?? "")
        .toLowerCase()
        .includes(texto) ||
      String(item.id ?? "")
        .toLowerCase()
        .includes(texto);

    const coincideTipo = filtroTipo === "Todos" || item.tipo === filtroTipo;

    const coincideEstado =
      filtroEstado === "Todos" || obtenerEstado(item.stock) === filtroEstado;

    return coincideBusqueda && coincideTipo && coincideEstado;
  });

  const indicadores = [
    {
      titulo: "Stock Alto",
      cantidad: stockAlto,
      color: "text-[#009E49]",
      fondo: "bg-green-50",
      borde: "border-green-200",
      descripcion: "Más de 15 unidades",
      simbolo: "↑",
    },
    {
      titulo: "Stock Medio",
      cantidad: stockMedio,
      color: "text-yellow-700",
      fondo: "bg-yellow-50",
      borde: "border-yellow-200",
      descripcion: "De 6 a 15 unidades",
      simbolo: "−",
    },
    {
      titulo: "Stock Bajo",
      cantidad: stockBajo,
      color: "text-[#FF6600]",
      fondo: "bg-orange-50",
      borde: "border-orange-200",
      descripcion: "De 1 a 5 unidades",
      simbolo: "!",
    },
    {
      titulo: "Sin Stock",
      cantidad: sinStock,
      color: "text-red-600",
      fondo: "bg-red-50",
      borde: "border-red-200",
      descripcion: "0 unidades",
      simbolo: "×",
    },
  ];

  /* ==========================================
     INTERFAZ RESPONSIVE
  ========================================== */

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full min-w-0 max-w-full bg-[#F4F7F5]">
      {/* MENÚ */}
      <MenuAdmin />

      {/* CONTENIDO */}
      <main className="flex-1 min-w-0 w-full lg:w-auto min-h-screen overflow-x-hidden">
        {/* ENCABEZADO */}
        <header className="bg-gradient-to-r from-[#063D2A] via-[#006B3C] to-[#009E49] text-white shadow-lg">
          <div className="px-4 sm:px-8 lg:px-10 py-7 sm:py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-6">
            <div className="min-w-0">
              <p className="uppercase tracking-[0.2em] text-green-100 text-[10px] sm:text-xs font-bold">
                Grupo Comercial J&G
              </p>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black mt-3 leading-tight break-words">
                Gestión de Inventario
              </h1>

              <p className="text-green-100 mt-3 text-sm sm:text-lg leading-relaxed">
                Control del stock de productos y repuestos.
              </p>

              <div className="w-20 h-1 bg-[#FF6600] rounded-full mt-5" />
            </div>

            <button
              type="button"
              onClick={cargarInventario}
              disabled={cargando}
              className="w-full sm:w-auto shrink-0 bg-[#FF6600] hover:bg-[#E85C00] disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 sm:px-6 py-3.5 rounded-xl font-bold transition shadow-md text-sm sm:text-base"
            >
              {cargando ? "Actualizando..." : "Actualizar Inventario"}
            </button>
          </div>
        </header>

        {/* CUERPO */}
        <div className="w-full min-w-0 p-3 sm:p-6 lg:p-8 xl:p-10">
          {/* ERRORES */}
          {error && (
            <div
              role="alert"
              className="mb-6 sm:mb-7 bg-red-50 border border-red-200 text-red-700 px-4 sm:px-5 py-4 rounded-xl break-words"
            >
              <p className="font-semibold text-sm sm:text-base">{error}</p>

              <button
                type="button"
                onClick={cargarInventario}
                disabled={cargando}
                className="mt-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg font-bold transition"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* INDICADORES DE STOCK */}
          <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
            {indicadores.map((indicador) => (
              <div
                key={indicador.titulo}
                className={`min-w-0 bg-white rounded-2xl border ${indicador.borde} shadow-sm p-3 sm:p-6 lg:p-7`}
              >
                <div className="flex items-start justify-between gap-2 sm:gap-3">
                  <p className="min-w-0 text-xs sm:text-base text-gray-600 font-semibold break-words">
                    {indicador.titulo}
                  </p>

                  <span
                    className={`shrink-0 w-8 h-8 sm:w-11 sm:h-11 rounded-xl ${indicador.fondo} ${indicador.color} flex items-center justify-center text-lg sm:text-xl font-black`}
                  >
                    {indicador.simbolo}
                  </span>
                </div>

                <h2
                  className={`text-3xl sm:text-4xl lg:text-5xl font-black mt-4 sm:mt-5 break-words ${indicador.color}`}
                >
                  {indicador.cantidad}
                </h2>

                <p className="text-[11px] sm:text-xs text-gray-500 mt-2 sm:mt-3 leading-relaxed">
                  {indicador.descripcion}
                </p>
              </div>
            ))}
          </div>

          {/* RESUMEN GENERAL */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 mb-6 sm:mb-8">
            <div className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 lg:p-7">
              <p className="text-gray-500 text-sm font-semibold">
                Total de Registros
              </p>

              <h3 className="text-3xl sm:text-4xl font-black mt-3 text-[#063D2A]">
                {inventario.length}
              </h3>

              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Productos y repuestos registrados
              </p>
            </div>

            <div className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 lg:p-7">
              <p className="text-gray-500 text-sm font-semibold">
                Registros con Riesgo
              </p>

              <h3 className="text-3xl sm:text-4xl font-black mt-3 text-[#FF6600]">
                {stockBajo + sinStock}
              </h3>

              <p className="text-xs text-gray-400 mt-2">Stock bajo o agotado</p>
            </div>

            <div className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 lg:p-7">
              <p className="text-gray-500 text-sm font-semibold">
                Inventario Saludable
              </p>

              <h3 className="text-3xl sm:text-4xl font-black mt-3 text-[#009E49]">
                {stockAlto + stockMedio}
              </h3>

              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Registros con stock suficiente
              </p>
            </div>
          </div>

          {/* ESTADO GENERAL */}
          <section className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#063D2A] text-white px-4 sm:px-8 py-5 sm:py-6">
              <h2 className="text-xl sm:text-2xl font-bold break-words">
                Estado General del Inventario
              </h2>

              <p className="text-green-100 text-sm mt-2 leading-relaxed">
                Consulta los niveles de stock de cada registro.
              </p>
            </div>

            {/* FILTROS */}
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="min-w-0">
                  <label
                    htmlFor="buscar-inventario"
                    className="block text-sm font-bold text-[#063D2A] mb-2"
                  >
                    Buscar
                  </label>

                  <input
                    id="buscar-inventario"
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Nombre, categoría o ID..."
                    className={inputClass}
                  />
                </div>

                <div className="min-w-0">
                  <label
                    htmlFor="tipo-inventario"
                    className="block text-sm font-bold text-[#063D2A] mb-2"
                  >
                    Tipo
                  </label>

                  <select
                    id="tipo-inventario"
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value)}
                    className={inputClass}
                  >
                    <option value="Todos">Todos</option>
                    <option value="Producto">Productos</option>
                    <option value="Repuesto">Repuestos</option>
                  </select>
                </div>

                <div className="min-w-0 sm:col-span-2 lg:col-span-1">
                  <label
                    htmlFor="estado-inventario"
                    className="block text-sm font-bold text-[#063D2A] mb-2"
                  >
                    Estado
                  </label>

                  <select
                    id="estado-inventario"
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className={inputClass}
                  >
                    <option value="Todos">Todos los estados</option>
                    <option value="Alto">Stock Alto</option>
                    <option value="Medio">Stock Medio</option>
                    <option value="Bajo">Stock Bajo</option>
                    <option value="Sin Stock">Sin Stock</option>
                    <option value="Sin datos">Sin datos</option>
                  </select>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Mostrando{" "}
                <strong className="text-[#009E49]">
                  {inventarioFiltrado.length}
                </strong>{" "}
                de {inventario.length} registros.
              </p>
            </div>

            {/* VISTA PARA CELULARES Y TABLETS */}
            <div className="lg:hidden p-3 sm:p-5 bg-[#F8FAF9]">
              {cargando ? (
                <div className="py-14 text-center text-gray-500">
                  Cargando inventario...
                </div>
              ) : error ? (
                <div className="py-14 text-center text-red-600">
                  No se pudo consultar el inventario.
                </div>
              ) : inventarioFiltrado.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {inventarioFiltrado.map((item) => (
                    <TarjetaInventario
                      key={`${item.tipo}-${item.id}`}
                      item={item}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-14 px-4 text-center text-gray-500">
                  {inventario.length === 0
                    ? "No existen productos ni repuestos registrados."
                    : "No se encontraron registros con los filtros seleccionados."}
                </div>
              )}
            </div>

            {/* TABLA PARA COMPUTADORAS */}
            <div className="hidden lg:block w-full min-w-0 overflow-x-auto">
              <table className="w-full min-w-[780px] text-sm">
                <thead className="bg-[#EAF5EE] text-[#063D2A]">
                  <tr>
                    <th className="px-5 py-5 text-left font-bold">ID</th>
                    <th className="px-5 py-5 text-left font-bold">Nombre</th>
                    <th className="px-5 py-5 text-left font-bold">Tipo</th>
                    <th className="px-5 py-5 text-left font-bold">Categoría</th>
                    <th className="px-5 py-5 text-left font-bold">Stock</th>
                    <th className="px-5 py-5 text-left font-bold">Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {cargando ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-14 text-gray-500"
                      >
                        Cargando inventario...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-14 text-red-600"
                      >
                        No se pudo consultar el inventario.
                      </td>
                    </tr>
                  ) : inventarioFiltrado.length > 0 ? (
                    inventarioFiltrado.map((item) => (
                      <tr
                        key={`${item.tipo}-${item.id}`}
                        className="border-b border-gray-100 hover:bg-[#F5FBF7] transition"
                      >
                        <td className="px-5 py-5 font-semibold">#{item.id}</td>

                        <td className="px-5 py-5 font-bold text-[#063D2A] break-words">
                          {item.nombre || "Sin nombre"}
                        </td>

                        <td className="px-5 py-5">
                          <span
                            className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold ${obtenerColorTipo(
                              item.tipo,
                            )}`}
                          >
                            {item.tipo}
                          </span>
                        </td>

                        <td className="px-5 py-5 text-gray-600 break-words">
                          {item.categoria || "Sin categoría"}
                        </td>

                        <td className="px-5 py-5 font-bold text-gray-800">
                          {item.stock ?? "Sin datos"}
                        </td>

                        <td className="px-5 py-5">
                          <EstadoStock stock={item.stock} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-14 text-gray-500"
                      >
                        {inventario.length === 0
                          ? "No existen productos ni repuestos registrados."
                          : "No se encontraron registros con los filtros seleccionados."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* ALERTAS DE INVENTARIO */}
          <section className="min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="shrink-0 w-2 h-9 bg-[#FF6600] rounded-full" />

              <h2 className="text-xl sm:text-2xl font-bold text-[#063D2A] break-words">
                Alertas de Inventario
              </h2>
            </div>

            {cargando ? (
              <p className="text-gray-500 text-sm sm:text-base">
                Revisando niveles de stock...
              </p>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-5 rounded-xl text-red-700 text-sm sm:text-base">
                No se pueden verificar las alertas hasta que se cargue el
                inventario.
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {alertas.length > 0 ? (
                  alertas.map((item) => {
                    const estado = obtenerEstado(item.stock);

                    return (
                      <div
                        key={`${item.tipo}-${item.id}`}
                        className={`min-w-0 border-l-4 p-4 sm:p-5 rounded-xl ${
                          estado === "Sin Stock"
                            ? "bg-red-50 border-red-500"
                            : "bg-orange-50 border-[#FF6600]"
                        }`}
                      >
                        <p className="font-semibold text-gray-800 text-sm sm:text-base break-words">
                          ⚠ {item.nombre || "Sin nombre"} ({item.tipo})
                        </p>

                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                          {estado === "Sin Stock"
                            ? "Este registro no tiene unidades disponibles."
                            : `Stock bajo: ${item.stock} unidades disponibles.`}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-green-50 border-l-4 border-[#009E49] p-4 sm:p-5 rounded-xl text-[#007A3D] text-sm sm:text-base">
                    No existen productos ni repuestos con stock crítico.
                  </div>
                )}

                {sinDatos > 0 && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 sm:p-5 rounded-xl text-yellow-800 text-sm sm:text-base leading-relaxed">
                    Hay {sinDatos} registros sin un valor de stock válido.
                    Revisa sus datos.
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Inventario;
