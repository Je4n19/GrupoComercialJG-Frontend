import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  obtenerProductos,
  eliminarProducto,
} from "../Services/productoService";

const formatoSoles = (valor) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(Number(valor) || 0);

const obtenerStock = (producto) => {
  if (
    producto.stock === null ||
    producto.stock === undefined ||
    producto.stock === ""
  ) {
    return null;
  }

  const stock = Number(producto.stock);

  return Number.isFinite(stock) && stock >= 0 ? stock : null;
};

function Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [cargando, setCargando] = useState(true);
  const [eliminandoId, setEliminandoId] = useState(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError("");

      const data = await obtenerProductos();

      if (!Array.isArray(data)) {
        throw new Error(
          "El servidor devolvió un formato de productos inválido.",
        );
      }

      setProductos(data);
    } catch (err) {
      console.error("Error al cargar productos:", err);

      setProductos([]);
      setError(
        "No se pudieron cargar los productos. Verifica la conexión con el servidor.",
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = async (id, nombre) => {
    if (eliminandoId !== null) return;

    const confirmar = window.confirm(
      `¿Deseas eliminar el producto "${nombre}"?\n\nEsta acción no se puede deshacer.`,
    );

    if (!confirmar) return;

    try {
      setEliminandoId(id);
      setError("");
      setMensaje("");

      await eliminarProducto(id);

      setProductos((anteriores) =>
        anteriores.filter((producto) => producto.id !== id),
      );

      setMensaje("Producto eliminado correctamente.");
    } catch (err) {
      console.error("Error al eliminar producto:", err);

      const estado = err?.status ?? err?.response?.status;

      if (estado === 401) {
        setError("Tu sesión ha expirado. Inicia sesión nuevamente.");
      } else if (estado === 403) {
        setError(
          "Error 403: el servidor rechazó la eliminación. Debemos revisar la sesión y el token CSRF en productoService.js.",
        );
      } else if (estado === 409) {
        setError(
          "No se puede eliminar este producto porque tiene registros relacionados.",
        );
      } else {
        setError(
          err?.message ||
            "No se pudo eliminar el producto. Verifica la conexión con el servidor.",
        );
      }
    } finally {
      setEliminandoId(null);
    }
  };

  const productosFiltrados = productos.filter((producto) => {
    const texto = [
      producto.nombre,
      producto.marca,
      producto.categoria,
      producto.id,
    ]
      .map((valor) => String(valor ?? ""))
      .join(" ")
      .toLowerCase();

    return texto.includes(busqueda.toLowerCase().trim());
  });

  const stockTotal = productos.reduce(
    (total, producto) => total + (obtenerStock(producto) ?? 0),
    0,
  );

  const valorInventario = productos.reduce((total, producto) => {
    const stock = obtenerStock(producto);
    const precio = Number(producto.precio);

    if (stock === null || !Number.isFinite(precio) || precio < 0) {
      return total;
    }

    return total + precio * stock;
  }, 0);

  const stockBajo = productos.filter((producto) => {
    const stock = obtenerStock(producto);

    return stock !== null && stock <= 5;
  }).length;

  const alertasStock = productos
    .filter((producto) => {
      const stock = obtenerStock(producto);

      return stock !== null && stock <= 5;
    })
    .sort((a, b) => obtenerStock(a) - obtenerStock(b))
    .slice(0, 5);

  const estadisticas = [
    {
      titulo: "Productos Registrados",
      valor: productos.length,
      color: "text-[#063D2A]",
      fondo: "bg-green-50",
      icono: "📦",
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

  return (
    <div className="flex min-h-screen bg-[#F4F7F5]">
      <MenuAdmin />

      <main className="flex-1 min-w-0 min-h-screen">
        {/* ENCABEZADO */}

        <header className="bg-gradient-to-r from-[#063D2A] via-[#006B3C] to-[#009E49] text-white shadow-lg">
          <div className="px-5 sm:px-8 lg:px-10 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="uppercase tracking-[0.2em] text-green-100 text-xs font-bold">
                Grupo Comercial J&G
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3">
                Gestión de Productos
              </h1>

              <p className="text-green-100 mt-3 text-sm sm:text-lg">
                Administración de maquinaria y equipos registrados.
              </p>

              <div className="w-20 h-1 bg-[#FF6600] rounded-full mt-5" />
            </div>

            <Link
              to="/admin/productos/nuevo"
              className="inline-flex items-center justify-center bg-[#FF6600] hover:bg-[#E85C00] text-white px-7 py-4 rounded-xl font-bold shadow-md transition"
            >
              + Nuevo Producto
            </Link>
          </div>
        </header>

        <div className="p-5 sm:p-8 lg:p-10">
          {/* MENSAJES */}

          {error && (
            <div
              role="alert"
              className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl"
            >
              <p className="font-semibold">{error}</p>

              <button
                type="button"
                onClick={cargarProductos}
                className="mt-3 text-sm font-bold underline"
              >
                Volver a cargar productos
              </button>
            </div>
          )}

          {mensaje && (
            <div
              role="status"
              className="mb-6 bg-green-50 border border-green-200 text-[#007A3D] px-5 py-4 rounded-xl font-semibold"
            >
              ✓ {mensaje}
            </div>
          )}

          {/* INDICADORES */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            {estadisticas.map((item) => (
              <div
                key={item.titulo}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-gray-500 font-semibold">{item.titulo}</p>

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${item.fondo}`}
                  >
                    {item.icono}
                  </div>
                </div>

                <h2
                  className={`text-3xl sm:text-4xl font-black mt-5 break-words ${item.color}`}
                >
                  {cargando || (error && productos.length === 0)
                    ? "—"
                    : item.valor}
                </h2>
              </div>
            ))}
          </div>

          {/* BUSCADOR */}

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
            <label
              htmlFor="buscar-productos"
              className="block text-sm font-bold text-[#063D2A] mb-3"
            >
              Buscar Productos
            </label>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                id="buscar-productos"
                type="text"
                placeholder="Buscar por nombre, marca, categoría o ID..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="flex-1 min-w-0 border-2 border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#009E49] focus:ring-4 focus:ring-green-100 transition"
              />

              <button
                type="button"
                onClick={cargarProductos}
                disabled={cargando}
                className="bg-[#063D2A] hover:bg-[#075238] disabled:opacity-60 text-white px-6 py-3.5 rounded-xl font-bold transition"
              >
                {cargando ? "Actualizando..." : "Actualizar"}
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Mostrando{" "}
              <strong className="text-[#009E49]">
                {productosFiltrados.length}
              </strong>{" "}
              de {productos.length} productos.
            </p>
          </section>

          {/* TABLA DE PRODUCTOS */}

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#063D2A] text-white px-6 sm:px-8 py-6">
              <h2 className="text-xl sm:text-2xl font-bold">
                Productos Registrados
              </h2>

              <p className="text-green-100 text-sm mt-2">
                Consulta y administra los productos del catálogo.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-sm">
                <thead className="bg-[#EAF5EE] text-[#063D2A]">
                  <tr>
                    <th className="px-5 py-5 text-left font-bold">ID</th>

                    <th className="px-5 py-5 text-left font-bold">Nombre</th>

                    <th className="px-5 py-5 text-left font-bold">Marca</th>

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
                        colSpan={7}
                        className="text-center py-14 text-gray-500"
                      >
                        Cargando productos...
                      </td>
                    </tr>
                  ) : error && productos.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-14 text-red-600"
                      >
                        No se pudieron consultar los productos.
                      </td>
                    </tr>
                  ) : productosFiltrados.length > 0 ? (
                    productosFiltrados.map((producto) => {
                      const stock = obtenerStock(producto);

                      return (
                        <tr
                          key={producto.id}
                          className="border-b border-gray-100 hover:bg-[#F5FBF7] transition"
                        >
                          <td className="px-5 py-5 font-bold">
                            #{producto.id}
                          </td>

                          <td className="px-5 py-5 font-bold text-[#063D2A]">
                            {producto.nombre || "Sin nombre"}
                          </td>

                          <td className="px-5 py-5 text-gray-600">
                            {producto.marca || "Sin marca"}
                          </td>

                          <td className="px-5 py-5">
                            <span className="inline-block bg-green-100 text-[#007A3D] px-3 py-1.5 rounded-full text-xs font-bold">
                              {producto.categoria || "Sin categoría"}
                            </span>
                          </td>

                          <td className="px-5 py-5 font-bold text-[#009E49]">
                            {formatoSoles(producto.precio)}
                          </td>

                          <td className="px-5 py-5">
                            <span
                              className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold ${
                                stock === null
                                  ? "bg-gray-100 text-gray-600"
                                  : stock <= 5
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-[#007A3D]"
                              }`}
                            >
                              {stock === null ? "Sin datos" : stock}
                            </span>
                          </td>

                          <td className="px-5 py-5">
                            <div className="flex items-center justify-center gap-2">
                              <Link
                                to={`/admin/productos/editar/${producto.id}`}
                                className="bg-[#009E49] hover:bg-[#007A39] text-white px-4 py-2.5 rounded-lg font-bold transition"
                              >
                                Editar
                              </Link>

                              <button
                                type="button"
                                onClick={() =>
                                  handleEliminar(producto.id, producto.nombre)
                                }
                                disabled={eliminandoId !== null}
                                className="bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-lg font-bold transition"
                              >
                                {eliminandoId === producto.id
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
                        colSpan={7}
                        className="text-center py-14 text-gray-500"
                      >
                        {productos.length === 0
                          ? "No existen productos registrados."
                          : "No se encontraron productos con esa búsqueda."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* ALERTAS DE STOCK */}

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-9 bg-[#FF6600] rounded-full" />

              <h2 className="text-xl sm:text-2xl font-bold text-[#063D2A]">
                Productos con Stock Bajo
              </h2>
            </div>

            {cargando ? (
              <p className="text-gray-500">Revisando stock de productos...</p>
            ) : error && productos.length === 0 ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-xl text-red-700">
                No se pudieron consultar las alertas de stock.
              </div>
            ) : alertasStock.length > 0 ? (
              <div className="space-y-4">
                {alertasStock.map((producto) => {
                  const stock = obtenerStock(producto);

                  return (
                    <div
                      key={producto.id}
                      className={`border-l-4 p-5 rounded-xl ${
                        stock === 0
                          ? "bg-red-50 border-red-500"
                          : "bg-orange-50 border-[#FF6600]"
                      }`}
                    >
                      <p className="font-bold text-gray-800">
                        ⚠️ {producto.nombre}
                      </p>

                      <p className="text-sm text-gray-600 mt-2">
                        {stock === 0
                          ? "Producto agotado: no quedan unidades disponibles."
                          : `Stock bajo: solo ${stock} unidades disponibles.`}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-green-50 border-l-4 border-[#009E49] p-5 rounded-xl text-[#007A3D]">
                No existen productos con stock crítico.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Productos;
