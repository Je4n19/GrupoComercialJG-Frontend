import { useEffect, useState } from "react";
import MenuAdmin from "../Components/MenuAdmin";

import { obtenerProductos } from "../Services/productoService";
import { obtenerRepuestos } from "../Services/repuestoService";

const obtenerEstado = (stock) => {
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

function Inventario() {
  const [inventario, setInventario] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

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
    },
    {
      titulo: "Stock Medio",
      cantidad: stockMedio,
      color: "text-yellow-700",
      fondo: "bg-yellow-50",
      borde: "border-yellow-200",
      descripcion: "De 6 a 15 unidades",
    },
    {
      titulo: "Stock Bajo",
      cantidad: stockBajo,
      color: "text-[#FF6600]",
      fondo: "bg-orange-50",
      borde: "border-orange-200",
      descripcion: "De 1 a 5 unidades",
    },
    {
      titulo: "Sin Stock",
      cantidad: sinStock,
      color: "text-red-600",
      fondo: "bg-red-50",
      borde: "border-red-200",
      descripcion: "0 unidades",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F7F5]">
      <MenuAdmin />

      <main className="flex-1 min-w-0 min-h-screen">
        {/* ENCABEZADO */}

        <header className="bg-gradient-to-r from-[#063D2A] via-[#006B3C] to-[#009E49] text-white shadow-lg">
          <div className="px-5 sm:px-8 lg:px-10 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="uppercase tracking-[0.2em] text-green-100 text-xs font-bold">
                Grupo Comercial J&G
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3">
                Gestión de Inventario
              </h1>

              <p className="text-green-100 mt-3 text-sm sm:text-lg">
                Control del stock de productos y repuestos.
              </p>

              <div className="w-20 h-1 bg-[#FF6600] rounded-full mt-5" />
            </div>

            <button
              type="button"
              onClick={cargarInventario}
              disabled={cargando}
              className="bg-[#FF6600] hover:bg-[#E85C00] disabled:opacity-60 text-white px-6 py-3.5 rounded-xl font-bold transition shadow-md"
            >
              {cargando ? "Actualizando..." : "Actualizar Inventario"}
            </button>
          </div>
        </header>

        <div className="p-5 sm:p-8 lg:p-10">
          {/* ERRORES */}

          {error && (
            <div
              role="alert"
              className="mb-7 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl"
            >
              <p className="font-semibold">{error}</p>

              <button
                type="button"
                onClick={cargarInventario}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* INDICADORES DE STOCK */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            {indicadores.map((indicador) => (
              <div
                key={indicador.titulo}
                className={`bg-white rounded-2xl border ${indicador.borde} shadow-sm p-7`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-gray-600 font-semibold">
                    {indicador.titulo}
                  </p>

                  <span
                    className={`w-11 h-11 rounded-xl ${indicador.fondo} ${indicador.color} flex items-center justify-center text-xl font-black`}
                  >
                    {indicador.titulo === "Stock Alto"
                      ? "↑"
                      : indicador.titulo === "Stock Medio"
                        ? "−"
                        : indicador.titulo === "Stock Bajo"
                          ? "!"
                          : "×"}
                  </span>
                </div>

                <h2 className={`text-5xl font-black mt-5 ${indicador.color}`}>
                  {indicador.cantidad}
                </h2>

                <p className="text-xs text-gray-500 mt-3">
                  {indicador.descripcion}
                </p>
              </div>
            ))}
          </div>

          {/* RESUMEN GENERAL */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <p className="text-gray-500 font-semibold">Total de Registros</p>

              <h3 className="text-4xl font-black mt-3 text-[#063D2A]">
                {inventario.length}
              </h3>

              <p className="text-xs text-gray-400 mt-2">
                Productos y repuestos registrados
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <p className="text-gray-500 font-semibold">
                Registros con Riesgo
              </p>

              <h3 className="text-4xl font-black mt-3 text-[#FF6600]">
                {stockBajo + sinStock}
              </h3>

              <p className="text-xs text-gray-400 mt-2">Stock bajo o agotado</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <p className="text-gray-500 font-semibold">
                Inventario Saludable
              </p>

              <h3 className="text-4xl font-black mt-3 text-[#009E49]">
                {stockAlto + stockMedio}
              </h3>

              <p className="text-xs text-gray-400 mt-2">
                Registros con stock suficiente
              </p>
            </div>
          </div>

          {/* TABLA */}

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#063D2A] text-white px-6 sm:px-8 py-6">
              <h2 className="text-xl sm:text-2xl font-bold">
                Estado General del Inventario
              </h2>

              <p className="text-green-100 text-sm mt-2">
                Consulta los niveles de stock de cada registro.
              </p>
            </div>

            {/* FILTROS */}

            <div className="p-5 sm:p-6 border-b border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
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
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#009E49] focus:ring-4 focus:ring-green-100 transition"
                  />
                </div>

                <div>
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
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-[#009E49] focus:ring-4 focus:ring-green-100 transition"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Producto">Productos</option>
                    <option value="Repuesto">Repuestos</option>
                  </select>
                </div>

                <div>
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
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-[#009E49] focus:ring-4 focus:ring-green-100 transition"
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

            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-sm">
                <thead className="bg-[#EAF5EE] text-[#063D2A]">
                  <tr>
                    <th className="px-6 py-5 text-left font-bold">ID</th>
                    <th className="px-6 py-5 text-left font-bold">Nombre</th>
                    <th className="px-6 py-5 text-left font-bold">Tipo</th>
                    <th className="px-6 py-5 text-left font-bold">Categoría</th>
                    <th className="px-6 py-5 text-left font-bold">Stock</th>
                    <th className="px-6 py-5 text-left font-bold">Estado</th>
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
                    inventarioFiltrado.map((item) => {
                      const estado = obtenerEstado(item.stock);

                      return (
                        <tr
                          key={`${item.tipo}-${item.id}`}
                          className="border-b border-gray-100 hover:bg-[#F5FBF7] transition"
                        >
                          <td className="px-6 py-5 font-semibold">
                            #{item.id}
                          </td>

                          <td className="px-6 py-5 font-bold text-[#063D2A]">
                            {item.nombre || "Sin nombre"}
                          </td>

                          <td className="px-6 py-5">
                            <span
                              className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold ${
                                item.tipo === "Producto"
                                  ? "bg-green-100 text-[#007A3D]"
                                  : "bg-orange-100 text-[#D45500]"
                              }`}
                            >
                              {item.tipo}
                            </span>
                          </td>

                          <td className="px-6 py-5 text-gray-600">
                            {item.categoria || "Sin categoría"}
                          </td>

                          <td className="px-6 py-5 font-bold text-gray-800">
                            {item.stock ?? "Sin datos"}
                          </td>

                          <td className="px-6 py-5">
                            <span
                              className={`inline-block px-4 py-2 rounded-full text-xs font-bold ${obtenerColor(
                                estado,
                              )}`}
                            >
                              {estado}
                            </span>
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

          {/* ALERTAS */}

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-9 bg-[#FF6600] rounded-full" />

              <h2 className="text-xl sm:text-2xl font-bold text-[#063D2A]">
                Alertas de Inventario
              </h2>
            </div>

            {cargando ? (
              <p className="text-gray-500">Revisando niveles de stock...</p>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-xl text-red-700">
                No se pueden verificar las alertas hasta que se cargue el
                inventario.
              </div>
            ) : (
              <div className="space-y-4">
                {alertas.length > 0 ? (
                  alertas.map((item) => {
                    const estado = obtenerEstado(item.stock);

                    return (
                      <div
                        key={`${item.tipo}-${item.id}`}
                        className={`border-l-4 p-5 rounded-xl ${
                          estado === "Sin Stock"
                            ? "bg-red-50 border-red-500"
                            : "bg-orange-50 border-[#FF6600]"
                        }`}
                      >
                        <p className="font-semibold text-gray-800">
                          ⚠ {item.nombre} ({item.tipo})
                        </p>

                        <p className="text-sm text-gray-600 mt-2">
                          {estado === "Sin Stock"
                            ? "Este registro no tiene unidades disponibles."
                            : `Stock bajo: ${item.stock} unidades disponibles.`}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-green-50 border-l-4 border-[#009E49] p-5 rounded-xl text-[#007A3D]">
                    No existen productos ni repuestos con stock crítico.
                  </div>
                )}

                {sinDatos > 0 && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-xl text-yellow-800">
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
