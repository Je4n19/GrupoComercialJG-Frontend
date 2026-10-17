import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { obtenerProductos } from "../Services/productoService";
import { obtenerRepuestos } from "../Services/repuestoService";

// ========================================
// CONFIGURACIÓN
// ========================================

const CLAVE_CARRITO = "jg_carrito";
const INTERVALO_ACTUALIZACION = 15000;

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

function obtenerTipo(item) {
  return item.tipo === "repuesto" ? "repuesto" : "producto";
}

function obtenerCantidad(item) {
  return Math.max(1, Math.floor(Number(item.cantidad) || 1));
}

function obtenerStockValido(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  const numero = Number(valor);

  if (!Number.isFinite(numero) || numero < 0) {
    return null;
  }

  return Math.floor(numero);
}

// ========================================
// CONSULTAR INVENTARIO ACTUAL
// ========================================

async function consultarInventario(carritoActual) {
  const necesitaProductos = carritoActual.some(
    (item) => obtenerTipo(item) === "producto",
  );

  const necesitaRepuestos = carritoActual.some(
    (item) => obtenerTipo(item) === "repuesto",
  );

  const [productos, repuestos] = await Promise.all([
    necesitaProductos ? obtenerProductos() : Promise.resolve([]),

    necesitaRepuestos ? obtenerRepuestos() : Promise.resolve([]),
  ]);

  if (
    (necesitaProductos && !Array.isArray(productos)) ||
    (necesitaRepuestos && !Array.isArray(repuestos))
  ) {
    throw new Error("El servidor no devolvió un inventario válido.");
  }

  const inventario = {};

  carritoActual.forEach((item) => {
    const clave = obtenerClave(item);

    const lista = obtenerTipo(item) === "repuesto" ? repuestos : productos;

    const encontrado = lista.find(
      (articulo) => String(articulo.id) === String(item.id),
    );

    inventario[clave] = encontrado
      ? {
          encontrado: true,
          stock: obtenerStockValido(encontrado.stock),
          precio: encontrado.precio,
        }
      : {
          encontrado: false,
          stock: null,
          precio: null,
        };
  });

  return inventario;
}

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

function Carrito() {
  const navigate = useNavigate();

  const [carrito, setCarrito] = useState(leerCarrito);
  const [mensaje, setMensaje] = useState("");

  const [inventario, setInventario] = useState({});
  const [verificando, setVerificando] = useState(true);
  const [errorInventario, setErrorInventario] = useState(false);
  const [continuando, setContinuando] = useState(false);

  const carritoRef = useRef(carrito);
  const consultaRef = useRef(false);
  const versionRef = useRef(0);
  const montadoRef = useRef(true);

  carritoRef.current = carrito;

  // ========================================
  // SINCRONIZAR CAMBIOS DEL CARRITO
  // ========================================

  useEffect(() => {
    const actualizar = () => {
      const actualizado = leerCarrito();

      versionRef.current += 1;
      carritoRef.current = actualizado;

      setCarrito(actualizado);
      setInventario({});
      setVerificando(actualizado.length > 0);
      setErrorInventario(false);
    };

    window.addEventListener("storage", actualizar);
    window.addEventListener("jg-carrito-actualizado", actualizar);

    return () => {
      window.removeEventListener("storage", actualizar);
      window.removeEventListener("jg-carrito-actualizado", actualizar);
    };
  }, []);

  // ========================================
  // ACTUALIZAR INVENTARIO DESDE EL SERVIDOR
  // ========================================

  const actualizarInventario = useCallback(async (forzar = false) => {
    if (consultaRef.current) return false;

    if (!forzar && document.hidden) return false;

    const actual = carritoRef.current;

    if (actual.length === 0) {
      if (montadoRef.current) {
        setInventario({});
        setVerificando(false);
        setErrorInventario(false);
      }

      return true;
    }

    consultaRef.current = true;

    const version = versionRef.current;

    if (montadoRef.current) {
      setVerificando(true);
    }

    try {
      const datos = await consultarInventario(actual);

      if (!montadoRef.current || version !== versionRef.current) {
        return false;
      }

      setInventario(datos);
      setErrorInventario(false);

      return true;
    } catch (error) {
      console.error("Error verificando inventario:", error);

      if (montadoRef.current && version === versionRef.current) {
        setErrorInventario(true);
      }

      return false;
    } finally {
      consultaRef.current = false;

      if (montadoRef.current) {
        setVerificando(false);
      }
    }
  }, []);

  useEffect(() => {
    montadoRef.current = true;

    actualizarInventario();

    const intervalo = window.setInterval(() => {
      actualizarInventario();
    }, INTERVALO_ACTUALIZACION);

    const actualizarAlVolver = () => {
      if (!document.hidden) {
        actualizarInventario();
      }
    };

    document.addEventListener("visibilitychange", actualizarAlVolver);

    return () => {
      montadoRef.current = false;
      window.clearInterval(intervalo);

      document.removeEventListener("visibilitychange", actualizarAlVolver);
    };
  }, [actualizarInventario]);

  // ========================================
  // GUARDAR CARRITO
  // ========================================

  const guardarCarrito = (nuevoCarrito) => {
    try {
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(nuevoCarrito));

      versionRef.current += 1;
      carritoRef.current = nuevoCarrito;

      setCarrito(nuevoCarrito);
      setMensaje("");

      // Conservamos los datos ya consultados para mostrar
      // el stock mientras se realiza otra verificación.
      setVerificando(nuevoCarrito.length > 0);

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

      const actual = obtenerCantidad(item);
      const nuevaCantidad = Math.max(1, actual + cambio);

      const datos = inventario[clave];

      const stock = datos ? datos.stock : obtenerStockValido(item.stock);

      if (cambio > 0) {
        if (!datos || !datos.encontrado) {
          setMensaje(
            "Espera a que se verifique el stock antes de aumentar la cantidad.",
          );
          return item;
        }

        if (stock === null || nuevaCantidad > stock) {
          setMensaje("No hay suficientes unidades disponibles.");
          return item;
        }
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
    setInventario({});
    setErrorInventario(false);
  };

  // ========================================
  // ARTÍCULOS CON INVENTARIO ACTUALIZADO
  // ========================================

  const articulos = useMemo(() => {
    return carrito.map((item) => {
      const clave = obtenerClave(item);
      const datos = inventario[clave];

      const cantidad = obtenerCantidad(item);

      const stock = datos ? datos.stock : null;

      const encontrado = datos?.encontrado === true;

      const sinStock = encontrado && stock !== null && stock <= 0;

      const cantidadExcedida = encontrado && stock !== null && cantidad > stock;

      const noDisponible = datos && !encontrado;

      const stockDesconocido = encontrado && stock === null;

      return {
        ...item,
        clave,
        cantidad,
        stockActual: stock,
        encontrado,
        sinStock,
        cantidadExcedida,
        noDisponible,
        stockDesconocido,
        verificado: Boolean(datos),
      };
    });
  }, [carrito, inventario]);

  // ========================================
  // RESUMEN DEL CARRITO
  // ========================================

  const resumen = useMemo(() => {
    let unidades = 0;
    let subtotal = 0;
    let productosSinPrecio = 0;
    let articulosConProblemas = 0;

    articulos.forEach((item) => {
      unidades += item.cantidad;

      const precioValido =
        item.precio !== null &&
        item.precio !== undefined &&
        item.precio !== "" &&
        Number.isFinite(Number(item.precio)) &&
        Number(item.precio) >= 0;

      if (precioValido) {
        subtotal += Number(item.precio) * item.cantidad;
      } else {
        productosSinPrecio++;
      }

      if (
        !item.verificado ||
        item.noDisponible ||
        item.sinStock ||
        item.cantidadExcedida ||
        item.stockDesconocido
      ) {
        articulosConProblemas++;
      }
    });

    return {
      unidades,
      subtotal,
      productosSinPrecio,
      articulosConProblemas,
    };
  }, [articulos]);

  const puedeContinuar =
    carrito.length > 0 &&
    !verificando &&
    !continuando &&
    !errorInventario &&
    resumen.articulosConProblemas === 0;

  // ========================================
  // VERIFICAR ANTES DE CONTINUAR
  // ========================================

  const continuarPedido = async () => {
    if (continuando || carritoRef.current.length === 0) {
      return;
    }

    setContinuando(true);
    setMensaje("");

    try {
      // Comprobación nueva, sin depender de la última
      // actualización automática de 15 segundos.
      const actual = leerCarrito();

      if (actual.length === 0) {
        setMensaje("Tu carrito está vacío.");
        return;
      }

      const datos = await consultarInventario(actual);

      const problemas = actual.filter((item) => {
        const info = datos[obtenerClave(item)];

        return (
          !info ||
          !info.encontrado ||
          info.stock === null ||
          info.stock < obtenerCantidad(item)
        );
      });

      setInventario(datos);
      setErrorInventario(false);

      if (problemas.length > 0) {
        setMensaje(
          "Hay artículos agotados, no disponibles o con cantidades superiores al stock. Revisa tu carrito antes de continuar.",
        );
        return;
      }

      // Evita continuar si el carrito cambió
      // mientras se consultaba el servidor.
      if (JSON.stringify(actual) !== JSON.stringify(leerCarrito())) {
        setMensaje(
          "Tu carrito cambió durante la verificación. Inténtalo nuevamente.",
        );
        return;
      }

      navigate("/checkout");
    } catch (error) {
      console.error("Error verificando pedido:", error);

      setErrorInventario(true);

      setMensaje(
        "No pudimos verificar el inventario. Inténtalo nuevamente antes de continuar.",
      );
    } finally {
      if (montadoRef.current) {
        setContinuando(false);
      }
    }
  };

  // ========================================
  // INTERFAZ DEL CARRITO
  // ========================================

  return (
    <main className="min-h-[75vh] bg-[#F4F7F5] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* ENCABEZADO */}

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

        {/* ESTADO DE INVENTARIO */}

        {carrito.length > 0 && (
          <div className="mb-6">
            {errorInventario ? (
              <div
                role="alert"
                className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-800"
              >
                No se pudo verificar el inventario actual. Comprueba tu conexión
                y vuelve a intentarlo.
                <button
                  type="button"
                  onClick={() => actualizarInventario(true)}
                  className="ml-2 underline"
                >
                  Reintentar
                </button>
              </div>
            ) : verificando ? (
              <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700">
                Consultando disponibilidad actual...
              </div>
            ) : resumen.articulosConProblemas > 0 ? (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700"
              >
                Algunos artículos necesitan atención. Revisa el stock disponible
                y ajusta las cantidades antes de continuar.
              </div>
            ) : (
              <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-800">
                ✓ Inventario verificado. Las cantidades seleccionadas están
                disponibles según la última consulta.
              </div>
            )}
          </div>
        )}

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
            {/* LISTADO DE PRODUCTOS */}

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

              {/* ARTÍCULOS DEL CARRITO */}

              {articulos.map((item) => {
                const clave = item.clave;
                const cantidad = item.cantidad;
                const stock = item.stockActual;

                const precioValido =
                  item.precio !== null &&
                  item.precio !== undefined &&
                  item.precio !== "" &&
                  Number.isFinite(Number(item.precio)) &&
                  Number(item.precio) >= 0;

                const subtotal = precioValido
                  ? Number(item.precio) * cantidad
                  : null;

                const puedeAumentar =
                  !verificando &&
                  !errorInventario &&
                  item.encontrado &&
                  stock !== null &&
                  cantidad < stock;

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
                                disabled={!puedeAumentar}
                                className="h-10 w-10 font-black text-[#063D2A] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="Aumentar cantidad"
                              >
                                +
                              </button>
                            </div>

                            {item.verificado &&
                              item.encontrado &&
                              stock !== null && (
                                <p className="mt-2 text-xs text-gray-500">
                                  Stock actualizado: {stock}
                                </p>
                              )}

                            {item.noDisponible && (
                              <p className="mt-2 text-xs font-bold text-red-600">
                                Artículo no encontrado en el inventario.
                              </p>
                            )}

                            {item.sinStock && (
                              <p className="mt-2 text-xs font-bold text-red-600">
                                Producto agotado.
                              </p>
                            )}

                            {item.cantidadExcedida &&
                              stock !== null &&
                              stock > 0 && (
                                <p className="mt-2 text-xs font-bold text-red-600">
                                  Solicitaste {cantidad} unidades, pero solo
                                  quedan {stock}. Reduce la cantidad.
                                </p>
                              )}

                            {item.stockDesconocido && (
                              <p className="mt-2 text-xs font-bold text-amber-700">
                                Disponibilidad por consultar.
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

              {/* AGREGAR MÁS ARTÍCULOS */}

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

            {/* RESUMEN DEL CARRITO */}

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

              {/* CONTINUAR PEDIDO */}

              <button
                type="button"
                onClick={continuarPedido}
                disabled={!puedeContinuar}
                className={`mt-6 flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-center text-sm font-black text-white shadow-sm transition-all duration-300 ${
                  puedeContinuar
                    ? "bg-[#FF6600] hover:bg-[#E65C00] hover:shadow-lg active:scale-[0.98]"
                    : "cursor-not-allowed bg-gray-400"
                }`}
              >
                <span aria-hidden="true">🛒</span>

                <span>
                  {continuando
                    ? "Verificando pedido..."
                    : verificando
                      ? "Verificando inventario..."
                      : "Continuar con mi pedido"}
                </span>

                <span aria-hidden="true">→</span>
              </button>

              {!puedeContinuar && !verificando && !continuando && (
                <button
                  type="button"
                  onClick={() => actualizarInventario(true)}
                  className="mt-3 w-full rounded-xl border border-[#009E49] px-4 py-3 text-sm font-bold text-[#009E49] transition hover:bg-green-50"
                >
                  Actualizar disponibilidad
                </button>
              )}

              {/* AVISO DE COMPRA */}

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
