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
      console.error(error);
    }
  };

  const stockBajo = [...productos, ...repuestos].filter(
    (item) => Number(item.stock || 0) <= 5,
  ).length;

  const stockTotal = [...productos, ...repuestos].reduce(
    (total, item) => total + Number(item.stock || 0),
    0,
  );

  const valorInventario = [...productos, ...repuestos].reduce(
    (total, item) => total + Number(item.precio || 0) * Number(item.stock || 0),
    0,
  );

  const marcas = [...new Set(productos.map((p) => p.marca).filter((m) => m))];

  const alertasStock = [...productos, ...repuestos]
    .filter((item) => Number(item.stock || 0) <= 5)
    .slice(0, 5);

  const estadisticas = [
    {
      titulo: "Productos",
      valor: productos.length,
      icono: "📦",
      color: "bg-orange-500",
    },
    {
      titulo: "Repuestos",
      valor: repuestos.length,
      icono: "🔧",
      color: "bg-orange-600",
    },
    {
      titulo: "Categorías",
      valor: categorias.length,
      icono: "📂",
      color: "bg-orange-700",
    },
    {
      titulo: "Stock Bajo",
      valor: stockBajo,
      icono: "⚠️",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <MenuAdmin />

      <div className="flex-1">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white shadow-xl">
          <div className="p-10 flex flex-col lg:flex-row justify-between items-center">
            <div>
              <span className="uppercase tracking-widest text-orange-100 text-sm">
                Grupo Comercial J&G
              </span>

              <h1 className="text-5xl font-bold mt-2">Panel Administrativo</h1>

              <p className="text-orange-100 mt-3">
                Gestión integral de productos, repuestos e inventario.
              </p>
            </div>

            <div className="mt-6 lg:mt-0 bg-white/10 backdrop-blur-md rounded-3xl p-6">
              <p className="text-orange-100">Inventario Valorizado</p>

              <h2 className="text-4xl font-bold">
                S/. {valorInventario.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* TARJETAS KPI */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {estadisticas.map((item, index) => (
              <div
                key={index}
                className={`${item.color} rounded-3xl p-8 text-white shadow-xl hover:scale-105 transition`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg">{item.titulo}</p>

                    <h2 className="text-5xl font-bold mt-2">{item.valor}</h2>
                  </div>

                  <span className="text-6xl">{item.icono}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ACCIONES RAPIDAS */}

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Acciones Rápidas</h2>

            <div className="grid md:grid-cols-4 gap-5">
              <Link
                to="/admin/productos"
                className="bg-orange-500 text-white text-center py-5 rounded-2xl font-semibold hover:bg-orange-600"
              >
                📦 Productos
              </Link>

              <Link
                to="/admin/repuestos"
                className="bg-orange-600 text-white text-center py-5 rounded-2xl font-semibold hover:bg-orange-700"
              >
                🔧 Repuestos
              </Link>

              <Link
                to="/admin/categorias"
                className="bg-orange-700 text-white text-center py-5 rounded-2xl font-semibold hover:bg-orange-800"
              >
                📂 Categorías
              </Link>

              <Link
                to="/admin/inventario"
                className="bg-slate-800 text-white text-center py-5 rounded-2xl font-semibold hover:bg-slate-900"
              >
                📊 Inventario
              </Link>
            </div>
          </div>

          {/* RESUMEN */}

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Resumen General</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Productos</span>
                  <span className="font-bold text-orange-600">
                    {productos.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Total Repuestos</span>
                  <span className="font-bold text-orange-600">
                    {repuestos.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Total Categorías</span>
                  <span className="font-bold text-orange-600">
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
              <h2 className="text-2xl font-bold mb-6">Indicadores</h2>

              <div className="space-y-4">
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

          {/* ALERTAS */}

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Alertas de Inventario</h2>

            {alertasStock.length > 0 ? (
              <div className="space-y-4">
                {alertasStock.map((item) => (
                  <div
                    key={item.id}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl"
                  >
                    ⚠️ <strong>{item.nombre}</strong> tiene stock crítico (
                    {item.stock} unidades)
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-xl">
                ✅ No existen productos con stock crítico.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelControl;
