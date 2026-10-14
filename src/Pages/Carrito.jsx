import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const CLAVE_CARRITO = "jg_carrito";
const WHATSAPP = "51979501557";

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
  // ENVIAR COTIZACIÓN A WHATSAPP
  // ========================================

  const enviarWhatsApp = () => {
    if (carrito.length === 0) {
      setMensaje("Agrega productos antes de cotizar.");
      return;
    }

    const lineas = [
      "Hola, Grupo Comercial J&G.",
      "",
      "Quisiera solicitar una cotización de los siguientes artículos:",
      "",
    ];

    carrito.forEach((item, indice) => {
      const cantidad = Math.max(1, Math.floor(Number(item.cantidad) || 1));

      const precioValido =
        item.precio !== null &&
        item.precio !== undefined &&
        item.precio !== "" &&
        Number.isFinite(Number(item.precio)) &&
        Number(item.precio) >= 0;

      lineas.push(`${indice + 1}. ${item.nombre || "Artículo"}`);

      if (item.marca) {
        lineas.push(`   Marca: ${item.marca}`);
      }

      lineas.push(`   Cantidad: ${cantidad}`);

      if (precioValido) {
        lineas.push(`   Precio referencial: ${formatearPrecio(item.precio)}`);
      } else {
        lineas.push("   Precio: Consultar");
      }

      lineas.push("");
    });

    lineas.push(
      `Total estimado de artículos con precio: ${formatearPrecio(
        resumen.subtotal,
      )}`,
    );

    if (resumen.productosSinPrecio > 0) {
      lineas.push("Hay artículos pendientes de cotización.");
    }

    lineas.push("");
    lineas.push(
      "¿Podrían confirmarme los precios, la disponibilidad y el total final?",
    );
    lineas.push("Muchas gracias.");

    const mensajeWhatsApp = lineas.join("\n");

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
      mensajeWhatsApp,
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-[75vh] bg-[#F4F7F5] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* ENCABEZADO */}

        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.15em] text-[#009E49]">
            Grupo Comercial J&G
          </p>

          <h1 className="mt-3 text-3xl font-black text-[#063D2A] sm:text-4xl">
            Mi carrito de cotización
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            Revisa los productos y repuestos seleccionados antes de solicitar tu
            cotización por WhatsApp.
          </p>
        </div>

        {/* CARRITO VACÍO */}

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

                          {/* PRECIO */}

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

              {/* CONTINUAR COMPRANDO */}

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
                RESUMEN DE COTIZACIÓN
            ======================================== */}

            <aside className="min-w-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
              <h2 className="text-xl font-black text-[#063D2A]">
                Resumen de cotización
              </h2>

              <div className="mt-5 space-y-4">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">Artículos diferentes</span>

                  <span className="font-bold text-[#063D2A]">
                    {carrito.length}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">Unidades seleccionadas</span>

                  <span className="font-bold text-[#063D2A]">
                    {resumen.unidades}
                  </span>
                </div>

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

              {/* WHATSAPP */}

              <button
                type="button"
                onClick={enviarWhatsApp}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#009E49] px-5 py-4 text-center text-sm font-black text-white shadow-sm transition hover:bg-[#00843D] hover:shadow-lg"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.49 0 .14 5.35.13 11.93a11.86 11.86 0 0 0 1.59 5.94L0 24l6.29-1.65a11.93 11.93 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.35 11.93-11.93a11.86 11.86 0 0 0-3.48-8.41ZM12.07 21.8a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.73.98.99-3.64-.23-.38a9.9 9.9 0 0 1-1.52-5.24c0-5.47 4.45-9.92 9.92-9.92a9.85 9.85 0 0 1 7.01 2.91 9.85 9.85 0 0 1 2.9 7.01c0 5.47-4.45 9.92-9.93 9.92Zm5.44-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                </svg>
                Solicitar cotización por WhatsApp
              </button>

              <p className="mt-4 text-center text-xs leading-relaxed text-gray-500">
                Los precios y la disponibilidad serán confirmados por Grupo
                Comercial J&G. Esta solicitud no constituye una compra.
              </p>

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
