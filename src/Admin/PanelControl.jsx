import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuAdmin from "../Components/MenuAdmin";

import { obtenerProductos } from "../Services/productoService";
import { obtenerRepuestos } from "../Services/repuestoService";
import { obtenerCategorias } from "../Services/categoriaService";

function PanelControl() {
  const [productos, setProductos] = useState([]);
  const [repuestos, setRepuestos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const productosData = await obtenerProductos();
      const repuestosData = await obtenerRepuestos();
      const categoriasData = await obtenerCategorias();

      setProductos(productosData || []);
      setRepuestos(repuestosData || []);
      setCategorias(categoriasData || []);
    } catch (error) {
      console.error("Error cargando dashboard:", error);
    }
  };

  const stockBajo = [...productos, ...repuestos].filter(
    (item) => (item.stock || 0) <= 5,
  ).length;

  const stockTotal = [...productos, ...repuestos].reduce(
    (total, item) => total + (item.stock || 0),
    0,
  );

  const valorInventario = [...productos, ...repuestos].reduce(
    (total, item) => total + (item.precio || 0) * (item.stock || 0),
    0,
  );

  const marcas = [
    ...new Set(
      productos
        .map((p) => p.marca)
        .filter((m) => m !== null && m !== undefined && m !== ""),
    ),
  ];

  const alertasStock = [...productos, ...repuestos]
    .filter((item) => (item.stock || 0) <= 5)
    .slice(0, 5);

  const estadisticas = [
    {
      titulo: "Productos",
      valor: productos.length,
      icono: "📦",
      color: "from-orange-500 to-orange-600",
    },
    {
      titulo: "Repuestos",
      valor: repuestos.length,
      icono: "🔧",
      color: "from-orange-600 to-orange-700",
    },
    {
      titulo: "Categorías",
      valor: categorias.length,
      icono: "📂",
      color: "from-orange-400 to-orange-500",
    },
    {
      titulo: "Stock Bajo",
      valor: stockBajo,
      icono: "⚠️",
      color: "from-red-500 to-red-600",
    },
  ];

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-h-screen bg-orange-50">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white shadow-2xl">
          <div className="px-10 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="uppercase tracking-widest text-orange-100 text-sm">
                Grupo Comercial J&G
              </p>

              <h1 className="text-5xl font-bold mt-2">
                Centro de Administración
              </h1>

              <p className="text-orange-100 mt-3 text-lg">
                Gestión de productos, repuestos e inventario.
              </p>
            </div>

            <div className="mt-6 lg:mt-0 bg-white/10 backdrop-blur-md rounded-3xl px-8 py-5">
              <p className="text-orange-100 text-sm">Inventario Valorizado</p>

              <h2 className="text-4xl font-bold">
                S/. {valorInventario.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* KPIs */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {estadisticas.map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${item.color} rounded-[30px] p-8 text-white shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg">{item.titulo}</p>

                    <h2 className="text-5xl font-bold mt-3">{item.valor}</h2>
                  </div>

                  <span className="text-6xl">{item.icono}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ACCESOS RAPIDOS */}

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">
              Operaciones Principales
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
              <Link
                to="/admin/productos"
                className="bg-orange-500 text-white text-center py-5 rounded-2xl font-semibold hover:bg-orange-600 transition shadow-lg"
              >
                📦 Gestionar Productos
              </Link>

              <Link
                to="/admin/repuestos"
                className="bg-orange-600 text-white text-center py-5 rounded-2xl font-semibold hover:bg-orange-700 transition shadow-lg"
              >
                🔧 Gestionar Repuestos
              </Link>

              <Link
                to="/admin/inventario"
                className="bg-orange-700 text-white text-center py-5 rounded-2xl font-semibold hover:bg-orange-800 transition shadow-lg"
              >
                📊 Gestionar Inventario
              </Link>
            </div>
          </div>

          {/* RESUMEN */}

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Resumen del Sistema</h2>

              <div className="space-y-5">
                <div className="flex justify-between">
                  <span>Total Productos</span>
                  <span className="font-bold text-orange-600">
                    {productos.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Total Repuestos</span>
                  <span className="font-bold text-orange-700">
                    {repuestos.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Total Categorías</span>
                  <span className="font-bold text-orange-500">
                    {categorias.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Stock Bajo</span>
                  <span className="font-bold text-red-600">{stockBajo}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Indicadores Generales</h2>

              <div className="space-y-5">
                <div className="flex justify-between">
                  <span>Stock Total</span>
                  <span className="font-bold">{stockTotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Marcas Registradas</span>
                  <span className="font-bold">{marcas.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Inventario Valorizado</span>
                  <span className="font-bold text-green-600">
                    S/. {valorInventario.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* INVENTARIO */}

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">
              Estado General del Inventario
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                <p className="text-gray-500">Valor Inventario</p>

                <h3 className="text-3xl font-bold mt-2 text-orange-600">
                  S/. {valorInventario.toFixed(2)}
                </h3>
              </div>

              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                <p className="text-gray-500">Stock Total</p>

                <h3 className="text-3xl font-bold mt-2 text-orange-600">
                  {stockTotal}
                </h3>
              </div>

              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-200">
                <p className="text-gray-500">Marcas Registradas</p>

                <h3 className="text-3xl font-bold mt-2 text-orange-600">
                  {marcas.length}
                </h3>
              </div>
            </div>
          </div>

          {/* ALERTAS */}

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Alertas de Inventario</h2>

            <div className="space-y-4">
              {alertasStock.length > 0 ? (
                alertasStock.map((item) => (
                  <div
                    key={item.id}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl"
                  >
                    ⚠ {item.nombre} tiene stock de {item.stock} unidades.
                  </div>
                ))
              ) : (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-xl">
                  ✅ No existen productos con stock crítico.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelControl;
