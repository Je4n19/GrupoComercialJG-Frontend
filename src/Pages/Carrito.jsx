import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// ========================================
// CONFIGURACIÓN
// ========================================

const CLAVE_CARRITO = "jg_carrito";

const imagenFallback =
  "https://placehold.co/600x450/f3f4f6/6b7280?text=Producto";

// ========================================
// LEER CARRITO GUARDADO
// ========================================

function leerCarrito() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    const datos = guardado ? JSON.parse(guardado) : [];

    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error("Error leyendo carrito:", error);
    return [];
  }
}

// ========================================
// FORMATEAR PRECIO
// ========================================

function formatearPrecio(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return "Consultar";
  }

  const numero = Number(valor);

  if (!Number.isFinite(numero) || numero < 0) {
    return "Consultar";
  }

  return `S/ ${numero.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// ========================================
// IDENTIFICAR ARTÍCULO
// ========================================

function obtenerClave(item) {
  return String(item.carritoId || `${item.tipo || "producto"}-${item.id}`);
}

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

function Carrito() {
  const [carrito, setCarrito] = useState(leerCarrito);
  const [mensaje, setMensaje] = useState("");

  // ========================================
  // SINCRONIZAR CAMBIOS DEL CARRITO
  // ========================================

  useEffect(() => {
    const actualizar = () => {
      setCarrito(leerCarrito());
    };

    window.addEventListener("storage", actualizar);
    window.addEventListener("jg-carrito-actualizado", actualizar);

    return () => {
      window.removeEventListener("storage", actualizar);
      window.removeEventListener("jg-carrito-actualizado", actualizar);
    };
  }, []);

  // ========================================
  // GUARDAR CARRITO
  // ========================================

  const guardarCarrito = (nuevoCarrito) => {
    try {
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(nuevoCarrito));

      setCarrito(nuevoCarrito);
      setMensaje("");

      window.dispatchEvent(new Event("jg-carrito-actualizado"));
    } catch (error) {
      console.error("Error guardando carrito:", error);
      setMensaje("No se pudieron guardar los cambios del carrito.");
    }
  };

  // ========================================
  // CAMBIAR CANTIDAD
  // ========================================

  const cambiarCantidad = (clave, cambio) => {
    const nuevoCarrito = carrito.map((item) => {
      if (obtenerClave(item) !== clave) {
        return item;
      }

      const actual = Math.max(1, Math.floor(Number(item.cantidad) || 1));

      const nuevaCantidad = Math.max(1, actual + cambio);

      const stock =
        item.stock !== null &&
        item.stock !== undefined &&
        item.stock !== "" &&
        Number.isFinite(Number(item.stock))
          ? Number(item.stock)
          : null;

      if (stock !== null && nuevaCantidad > stock) {
        return item;
      }

      return {
        ...item,
        cantidad: nuevaCantidad,
      };
    });

    guardarCarrito(nuevoCarrito);
  };

  // ========================================
  // ELIMINAR PRODUCTO
  // ========================================

  const eliminarProducto = (clave) => {
    const nuevoCarrito = carrito.filter((item) => obtenerClave(item) !== clave);

    guardarCarrito(nuevoCarrito);
  };

  // ========================================
  // VACIAR CARRITO
  // ========================================

  const vaciarCarrito = () => {
    if (!window.confirm("¿Seguro que deseas vaciar todo el carrito?")) {
      return;
    }

    guardarCarrito([]);
  };

  // ========================================
  // RESUMEN DEL CARRITO
  // ========================================

  const resumen = useMemo(() => {
    let unidades = 0;
    let subtotal = 0;
    let productosSinPrecio = 0;

    carrito.forEach((item) => {
      const cantidad = Math.max(1, Math.floor(Number(item.cantidad) || 1));

      unidades += cantidad;

      const precioValido =
        item.precio !== null &&
        item.precio !== undefined &&
        item.precio !== "" &&
        Number.isFinite(Number(item.precio)) &&
        Number(item.precio) >= 0;

      if (precioValido) {
        subtotal += Number(item.precio) * cantidad;
      } else {
        productosSinPrecio++;
      }
    });

    return {
      unidades,
      subtotal,
      productosSinPrecio,
    };
  }, [carrito]);

  // ========================================
  // INTERFAZ DEL CARRITO
  // ========================================

  return (
    <main className="min-h-[75vh] bg-[#F4F7F5] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* ========================================
            ENCABEZADO
        ======================================== */}

        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.15em] text-[#009E49]">
            Grupo Comercial J&G
          </p>

          <h1 className="mt-3 text-3xl font-black text-[#063D2A] sm:text-4xl">
            Mi carrito de compras
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            Revisa los productos y repuestos seleccionados, modifica las
            cantidades y continúa con tu pedido de manera rápida y sencilla
            desde nuestra web.
          </p>
        </div>

        {/* ========================================
            CARRITO VACÍO
        ======================================== */}

        {carrito.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
            <div className="rounded-xl border border-dashed border-gray-300 bg-[#F8FAF9] p-8 text-center sm:p-12">
              <div className="text-5xl">🛒</div>

              <h2 className="mt-4 text-xl font-black text-[#063D2A]">
                Tu carrito está vacío
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Explora nuestro catálogo para encontrar los productos que
                necesitas.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/catalogo"
                  className="rounded-xl bg-[#FF6600] px-6 py-3 text-center font-bold text-white transition hover:bg-[#E65C00]"
                >
                  Ver productos
                </Link>

                <Link
                  to="/repuestos"
                  className="rounded-xl bg-[#063D2A] px-6 py-3 text-center font-bold text-white transition hover:bg-[#075238]"
                >
                  Ver repuestos
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
            {/* ========================================
                LISTADO DE PRODUCTOS
            ======================================== */}

            <section className="min-w-0 space-y-4 lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-black text-[#063D2A]">
                  Artículos seleccionados
                </h2>

                <button
                  type="button"
                  onClick={vaciarCarrito}
                  className="text-sm font-bold text-red-600 transition hover:text-red-800"
                >
                  Vaciar carrito
                </button>
              </div>

              {/* ========================================
                  ARTÍCULOS DEL CARRITO
              ======================================== */}

              {carrito.map((item) => {
                const clave = obtenerClave(item);

                const cantidad = Math.max(
                  1,
                  Math.floor(Number(item.cantidad) || 1),
                );

                const stockValido =
                  item.stock !== null &&
                  item.stock !== undefined &&
                  item.stock !== "" &&
                  Number.isFinite(Number(item.stock));

                const stock = stockValido ? Number(item.stock) : null;

                const precioValido =
                  item.precio !== null &&
                  item.precio !== undefined &&
                  item.precio !== "" &&
                  Number.isFinite(Number(item.precio)) &&
                  Number(item.precio) >= 0;

                const subtotal = precioValido
                  ? Number(item.precio) * cantidad
                  : null;

                return (
                  <article
                    key={clave}
                    className="min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row">
                      {/* IMAGEN */}

                      <div className="flex h-44 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F8FAF9] p-3 sm:h-36 sm:w-36">
                        <img
                          src={item.imagen || imagenFallback}
                          alt={item.nombre || "Artículo"}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = imagenFallback;
                          }}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      {/* INFORMACIÓN */}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0">
                            <span className="text-xs font-black uppercase text-[#009E49]">
                              {item.tipo === "repuesto"
                                ? "Repuesto"
                                : "Producto"}
                            </span>

                            <h3 className="mt-1 break-words text-lg font-black text-[#063D2A]">
                              {item.nombre || "Artículo"}
                            </h3>

                            {item.marca && (
                              <p className="mt-1 text-sm text-gray-500">
                                Marca: {item.marca}
                              </p>
                            )}
                          </div>

                          {/* ELIMINAR */}

                          <button
                            type="button"
                            onClick={() => eliminarProducto(clave)}
                            className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
                          >
                            Eliminar
                          </button>
                        </div>

                        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                          {/* CANTIDAD */}

                          <div>
                            <p className="mb-2 text-xs font-semibold text-gray-500">
                              Cantidad
                            </p>

                            <div className="inline-flex items-center overflow-hidden rounded-xl border border-gray-200">
                              <button
                                type="button"
                                onClick={() => cambiarCantidad(clave, -1)}
                                disabled={cantidad <= 1}
                                className="h-10 w-10 font-black text-[#063D2A] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="Disminuir cantidad"
                              >
                                −
                              </button>

                              <span className="flex h-10 min-w-10 items-center justify-center border-x border-gray-200 px-3 font-black text-[#063D2A]">
                                {cantidad}
                              </span>

                              <button
                                type="button"
                                onClick={() => cambiarCantidad(clave, 1)}
                                disabled={stock !== null && cantidad >= stock}
                                className="h-10 w-10 font-black text-[#063D2A] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="Aumentar cantidad"
                              >
                                +
                              </button>
                            </div>

                            {stockValido && (
                              <p className="mt-2 text-xs text-gray-500">
                                Stock registrado: {stock}
                              </p>
                            )}
                          </div>

                          {/* PRECIOS */}

                          <div className="text-left sm:text-right">
                            <p className="text-xs text-gray-500">
                              Precio unitario
                            </p>

                            <p className="mt-1 text-sm font-bold text-gray-700">
                              {formatearPrecio(item.precio)}
                            </p>

                            <p className="mt-2 text-xs text-gray-500">
                              Subtotal
                            </p>

                            <p className="mt-1 text-xl font-black text-[#FF6600]">
                              {formatearPrecio(subtotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}

              {/* ========================================
                  AGREGAR MÁS ARTÍCULOS
              ======================================== */}

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/catalogo"
                  className="rounded-xl border border-[#009E49] px-5 py-3 text-center text-sm font-bold text-[#009E49] transition hover:bg-green-50"
                >
                  + Agregar más productos
                </Link>

                <Link
                  to="/repuestos"
                  className="rounded-xl border border-gray-300 px-5 py-3 text-center text-sm font-bold text-gray-700 transition hover:bg-gray-100"
                >
                  + Agregar repuestos
                </Link>
              </div>
            </section>

            {/* ========================================
                RESUMEN DEL CARRITO
            ======================================== */}

            <aside className="min-w-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
              <h2 className="text-xl font-black text-[#063D2A]">
                Resumen del carrito
              </h2>

              <div className="mt-5 space-y-4">
                {/* ARTÍCULOS DIFERENTES */}

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">Artículos diferentes</span>

                  <span className="font-bold text-[#063D2A]">
                    {carrito.length}
                  </span>
                </div>

                {/* UNIDADES */}

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">Unidades seleccionadas</span>

                  <span className="font-bold text-[#063D2A]">
                    {resumen.unidades}
                  </span>
                </div>

                {/* TOTAL */}

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total estimado
                  </p>

                  <p className="mt-2 break-words text-3xl font-black text-[#FF6600]">
                    {formatearPrecio(resumen.subtotal)}
                  </p>

                  {resumen.productosSinPrecio > 0 && (
                    <p className="mt-2 text-xs text-amber-700">
                      Hay {resumen.productosSinPrecio} artículo(s) sin precio
                      registrado. No están incluidos en este total.
                    </p>
                  )}
                </div>
              </div>

              {/* ========================================
                  ÚNICO BOTÓN: CONTINUAR PEDIDO
              ======================================== */}

              <Link
                to="/checkout"
                className="
                  mt-6
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-[#FF6600]
                  px-5
                  py-4
                  text-center
                  text-sm
                  font-black
                  text-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:bg-[#E65C00]
                  hover:shadow-lg
                  active:scale-[0.98]
                "
              >
                <span aria-hidden="true">🛒</span>

                <span>Continuar con mi pedido</span>

                <span aria-hidden="true">→</span>
              </Link>

              {/* ========================================
                  AVISO DE COMPRA
              ======================================== */}

              <p className="mt-4 text-center text-xs leading-relaxed text-gray-500">
                Los precios y la disponibilidad serán confirmados por Grupo
                Comercial J&G. Registrar un pedido no implica realizar un pago
                ni reservar los productos.
              </p>

              {/* MENSAJE DE ERROR */}

              {mensaje && (
                <p
                  role="alert"
                  className="mt-3 text-center text-sm font-semibold text-red-600"
                >
                  {mensaje}
                </p>
              )}
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Carrito;
