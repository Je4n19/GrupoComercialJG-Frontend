import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import { obtenerProductos } from "../Services/productoService";
import { obtenerRepuestos } from "../Services/repuestoService";
import { obtenerCategorias } from "../Services/categoriaService";

const obtenerStock = (item) => {
  const stock = Number(item?.stock);

  return Number.isFinite(stock) && stock >= 0 ? stock : null;
};

const obtenerPrecio = (item) => {
  const precio = Number(item?.precio);

  return Number.isFinite(precio) && precio >= 0 ? precio : null;
};

const formatoSoles = (valor) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(valor);

function PanelControl() {
  const [productos, setProductos] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError("");

      const [productosData, repuestosData, categoriasData] = await Promise.all([
        obtenerProductos(),
        obtenerRepuestos(),
        obtenerCategorias(),
      ]);

      if (
        !Array.isArray(productosData) ||
        !Array.isArray(repuestosData) ||
        !Array.isArray(categoriasData)
      ) {
        throw new Error("El servidor devolvió datos con un formato inválido.");
      }

      setProductos(productosData);
      setRepuestos(repuestosData);
      setCategorias(categoriasData);
    } catch (err) {
      console.error("Error al cargar el panel administrativo:", err);

      setProductos([]);
      setRepuestos([]);
      setCategorias([]);

      setError(
        "No se pudo cargar la información del panel. Verifica la conexión con el servidor.",
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const inventario = [
    ...productos.map((item) => ({
      ...item,
      tipo: "Producto",
    })),
    ...repuestos.map((item) => ({
      ...item,
      tipo: "Repuesto",
    })),
  ];

  const stockBajo = inventario.filter((item) => {
    const stock = obtenerStock(item);

    return stock !== null && stock <= 5;
  }).length;

  const sinStock = inventario.filter((item) => obtenerStock(item) === 0).length;

  const stockTotal = inventario.reduce((total, item) => {
    const stock = obtenerStock(item);

    return total + (stock ?? 0);
  }, 0);

  const valorInventario = inventario.reduce((total, item) => {
    const stock = obtenerStock(item);
    const precio = obtenerPrecio(item);

    if (stock === null || precio === null) {
      return total;
    }

    return total + precio * stock;
  }, 0);

  const marcas = [
    ...new Set(productos.map((producto) => producto.marca).filter(Boolean)),
  ];

  const alertasStock = inventario
    .filter((item) => {
      const stock = obtenerStock(item);

      return stock !== null && stock <= 5;
    })
    .sort((a, b) => obtenerStock(a) - obtenerStock(b))
    .slice(0, 5);

  const registrosSinDatos = inventario.filter(
    (item) => obtenerStock(item) === null || obtenerPrecio(item) === null,
  ).length;

  const estadisticas = [
    {
      titulo: "Productos",
      valor: productos.length,
      icono: "📦",
      color: "text-[#009E49]",
      fondo: "bg-green-50",
      ruta: "/admin/productos",
    },
    {
      titulo: "Repuestos",
      valor: repuestos.length,
      icono: "🔧",
      color: "text-[#FF6600]",
      fondo: "bg-orange-50",
      ruta: "/admin/repuestos",
    },
    {
      titulo: "Categorías",
      valor: categorias.length,
      icono: "📂",
      color: "text-[#063D2A]",
      fondo: "bg-green-50",
      ruta: "/admin/categorias",
    },
    {
      titulo: "Stock Bajo",
      valor: stockBajo,
      icono: "⚠️",
      color: "text-red-600",
      fondo: "bg-red-50",
      ruta: "/admin/inventario",
    },
  ];

  const accionesRapidas = [
    {
      titulo: "Productos",
      icono: "📦",
      ruta: "/admin/productos",
      color: "bg-[#009E49] hover:bg-[#007A39]",
    },
    {
      titulo: "Repuestos",
      icono: "🔧",
      ruta: "/admin/repuestos",
      color: "bg-[#FF6600] hover:bg-[#E85C00]",
    },
    {
      titulo: "Categorías",
      icono: "📂",
      ruta: "/admin/categorias",
      color: "bg-[#063D2A] hover:bg-[#075238]",
    },
    {
      titulo: "Inventario",
      icono: "📊",
      ruta: "/admin/inventario",
      color: "bg-[#006B3C] hover:bg-[#00552F]",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F7F5]">
      <MenuAdmin />

      <main className="flex-1 min-w-0 min-h-screen">
        {/* ENCABEZADO */}

        <header className="bg-gradient-to-r from-[#063D2A] via-[#006B3C] to-[#009E49] text-white shadow-lg">
          <div className="px-5 sm:px-8 lg:px-10 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
            <div>
              <p className="uppercase tracking-[0.2em] text-green-100 text-xs font-bold">
                Grupo Comercial J&G
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3">
                Panel Administrativo
              </h1>

              <p className="text-green-100 mt-3 text-sm sm:text-lg">
                Gestión integral de productos, repuestos e inventario.
              </p>

              <div className="w-20 h-1 bg-[#FF6600] rounded-full mt-5" />
            </div>

            {/* INVENTARIO VALORIZADO */}

            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-6 min-w-0 lg:min-w-[280px]">
              <p className="text-green-100 font-semibold">
                Inventario Valorizado
              </p>

              <h2 className="text-3xl sm:text-4xl font-black mt-3 break-words">
                {cargando
                  ? "Cargando..."
                  : error
                    ? "No disponible"
                    : formatoSoles(valorInventario)}
              </h2>

              <p className="text-green-100 text-xs mt-3">
                Valor estimado según precio y stock
              </p>
            </div>
          </div>
        </header>

        <div className="p-5 sm:p-8 lg:p-10">
          {/* MENSAJE DE ERROR */}

          {error && (
            <div
              role="alert"
              className="mb-7 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl"
            >
              <p className="font-semibold">{error}</p>

              <button
                type="button"
                onClick={cargarDatos}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-bold transition"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* TARJETAS KPI */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {estadisticas.map((item) => (
              <Link
                key={item.titulo}
                to={item.ruta}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-gray-600 font-semibold">{item.titulo}</p>

                    <h2
                      className={`text-4xl sm:text-5xl font-black mt-4 ${item.color}`}
                    >
                      {cargando || error ? "—" : item.valor}
                    </h2>
                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${item.fondo}`}
                  >
                    {item.icono}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-5">Ver detalles →</p>
              </Link>
            ))}
          </div>

          {/* ACCIONES RÁPIDAS */}

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-9 bg-[#FF6600] rounded-full" />

              <h2 className="text-xl sm:text-2xl font-bold text-[#063D2A]">
                Acciones Rápidas
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {accionesRapidas.map((accion) => (
                <Link
                  key={accion.ruta}
                  to={accion.ruta}
                  className={`${accion.color} text-white text-center py-5 px-4 rounded-xl font-bold transition shadow-sm`}
                >
                  <span className="mr-2">{accion.icono}</span>
                  {accion.titulo}
                </Link>
              ))}
            </div>
          </section>

          {/* RESUMEN GENERAL */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-2 h-9 bg-[#FF6600] rounded-full" />

                <h2 className="text-xl sm:text-2xl font-bold text-[#063D2A]">
                  Resumen General
                </h2>
              </div>

              <div className="space-y-5">
                {[
                  {
                    etiqueta: "Total Productos",
                    valor: productos.length,
                  },
                  {
                    etiqueta: "Total Repuestos",
                    valor: repuestos.length,
                  },
                  {
                    etiqueta: "Total Categorías",
                    valor: categorias.length,
                  },
                  {
                    etiqueta: "Stock Bajo",
                    valor: stockBajo,
                  },
                  {
                    etiqueta: "Sin Stock",
                    valor: sinStock,
                  },
                ].map((dato) => (
                  <div
                    key={dato.etiqueta}
                    className="flex justify-between items-center gap-4 border-b border-gray-100 pb-4 last:border-0"
                  >
                    <span className="text-gray-600">{dato.etiqueta}</span>

                    <span
                      className={`font-black text-lg ${
                        dato.etiqueta === "Stock Bajo" ||
                        dato.etiqueta === "Sin Stock"
                          ? "text-red-600"
                          : "text-[#009E49]"
                      }`}
                    >
                      {cargando || error ? "—" : dato.valor}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* INDICADORES */}

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-2 h-9 bg-[#FF6600] rounded-full" />

                <h2 className="text-xl sm:text-2xl font-bold text-[#063D2A]">
                  Indicadores
                </h2>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-center gap-4 border-b border-gray-100 pb-4">
                  <span className="text-gray-600">Stock Total</span>

                  <span className="font-black text-lg text-[#063D2A]">
                    {cargando || error
                      ? "—"
                      : stockTotal.toLocaleString("es-PE")}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-4 border-b border-gray-100 pb-4">
                  <span className="text-gray-600">Marcas Registradas</span>

                  <span className="font-black text-lg text-[#063D2A]">
                    {cargando || error ? "—" : marcas.length}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-4 border-b border-gray-100 pb-4">
                  <span className="text-gray-600">Inventario Valorizado</span>

                  <span className="font-black text-lg text-[#009E49] text-right">
                    {cargando || error ? "—" : formatoSoles(valorInventario)}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-600">
                    Registros sin datos válidos
                  </span>

                  <span className="font-black text-lg text-[#FF6600]">
                    {cargando || error ? "—" : registrosSinDatos}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* ALERTAS DE INVENTARIO */}

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
              <div className="flex items-center gap-3">
                <div className="w-2 h-9 bg-[#FF6600] rounded-full" />

                <h2 className="text-xl sm:text-2xl font-bold text-[#063D2A]">
                  Alertas de Inventario
                </h2>
              </div>

              <Link
                to="/admin/inventario"
                className="text-[#009E49] hover:text-[#007A39] font-bold text-sm"
              >
                Ver inventario completo →
              </Link>
            </div>

            {cargando ? (
              <p className="text-gray-500">Revisando niveles de stock...</p>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-xl text-red-700">
                No se pudieron consultar las alertas de inventario.
              </div>
            ) : alertasStock.length > 0 ? (
              <div className="space-y-4">
                {alertasStock.map((item) => {
                  const stock = obtenerStock(item);

                  return (
                    <div
                      key={`${item.tipo}-${item.id}`}
                      className={`border-l-4 p-5 rounded-xl ${
                        stock === 0
                          ? "bg-red-50 border-red-500"
                          : "bg-orange-50 border-[#FF6600]"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <p className="font-bold text-gray-800">
                            ⚠️ {item.nombre || "Sin nombre"}
                          </p>

                          <p className="text-sm text-gray-600 mt-2">
                            {item.tipo} ·{" "}
                            {stock === 0
                              ? "Sin unidades disponibles"
                              : `Stock crítico: ${stock} unidades`}
                          </p>
                        </div>

                        <span
                          className={`inline-flex self-start px-3 py-1.5 rounded-full text-xs font-bold ${
                            stock === 0
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-[#D45500]"
                          }`}
                        >
                          {stock === 0 ? "Agotado" : "Stock Bajo"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-green-50 border-l-4 border-[#009E49] p-5 rounded-xl text-[#007A3D]">
                No existen productos ni repuestos con stock crítico.
              </div>
            )}
          </section>

          {/* PIE DEL PANEL */}

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-500">
            <p>Grupo Comercial J&G · Panel Administrativo</p>

            <button
              type="button"
              onClick={cargarDatos}
              disabled={cargando}
              className="self-start sm:self-auto bg-[#063D2A] hover:bg-[#075238] disabled:opacity-60 text-white px-5 py-3 rounded-xl font-bold transition"
            >
              {cargando ? "Actualizando..." : "Actualizar Datos"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PanelControl;
