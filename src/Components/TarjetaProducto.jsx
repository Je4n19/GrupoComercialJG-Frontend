import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const CLAVE_CARRITO = "jg_carrito";

function TarjetaProducto({ producto }) {
  const [agregado, setAgregado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const temporizador = useRef(null);

  const precio = Number(producto.precio);

  const precioFormateado =
    producto.precio !== null &&
    producto.precio !== undefined &&
    producto.precio !== "" &&
    Number.isFinite(precio) &&
    precio >= 0
      ? precio.toLocaleString("es-PE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : null;

  const stock = Number(producto.stock);

  const stockValido =
    producto.stock !== null &&
    producto.stock !== undefined &&
    producto.stock !== "" &&
    Number.isSafeInteger(stock) &&
    stock >= 0;

  const disponible = stockValido && stock > 0;

  const imagenFallback =
    "https://placehold.co/600x450/f3f4f6/6b7280?text=Producto";

  const nombreCategoria =
    typeof producto.categoria === "string"
      ? producto.categoria
      : producto.categoria?.nombre || "";

  useEffect(() => {
    return () => {
      if (temporizador.current) {
        clearTimeout(temporizador.current);
      }
    };
  }, []);

  const mostrarMensaje = (texto, fueAgregado = false) => {
    setMensaje(texto);
    setAgregado(fueAgregado);

    if (temporizador.current) {
      clearTimeout(temporizador.current);
    }

    temporizador.current = setTimeout(() => {
      setMensaje("");
      setAgregado(false);
    }, 2500);
  };

  const agregarAlCarrito = () => {
    if (!producto?.id) {
      mostrarMensaje("No se pudo identificar el producto.");
      return;
    }

    if (!disponible) {
      mostrarMensaje(
        stockValido
          ? "Este producto está agotado."
          : "Consulta la disponibilidad de este producto.",
      );
      return;
    }

    try {
      const guardado = localStorage.getItem(CLAVE_CARRITO);
      const datos = guardado ? JSON.parse(guardado) : [];
      const carrito = Array.isArray(datos) ? datos : [];

      const identificador = `producto-${producto.id}`;

      const indice = carrito.findIndex(
        (item) =>
          String(item.carritoId) === identificador ||
          (item.tipo === "producto" && String(item.id) === String(producto.id)),
      );

      const carritoActualizado = [...carrito];

      if (indice >= 0) {
        const existente = carritoActualizado[indice];

        const cantidadActual = Math.max(0, Number(existente.cantidad) || 0);

        if (cantidadActual >= stock) {
          mostrarMensaje("Ya agregaste todas las unidades disponibles.");
          return;
        }

        carritoActualizado[indice] = {
          ...existente,
          cantidad: cantidadActual + 1,
          stock,
          precio: precioFormateado !== null ? precio : null,
        };
      } else {
        carritoActualizado.push({
          carritoId: identificador,
          id: producto.id,
          tipo: "producto",
          nombre: producto.nombre,
          marca: producto.marca || "",
          categoria: producto.categoria || "",
          descripcion: producto.descripcion || "",
          imagen: producto.imagen || imagenFallback,
          precio: precioFormateado !== null ? precio : null,
          stock,
          cantidad: 1,
        });
      }

      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carritoActualizado));

      window.dispatchEvent(new Event("jg-carrito-actualizado"));

      mostrarMensaje("¡Agregado al carrito!", true);
    } catch (error) {
      console.error("Error agregando producto al carrito:", error);

      mostrarMensaje("No se pudo agregar el producto. Intenta nuevamente.");
    }
  };

  return (
    <article
      className="
        group flex h-full flex-col overflow-hidden
        rounded-[22px] border border-gray-100 bg-white
        shadow-sm transition-all duration-300
        hover:border-[#009E49]/25 hover:shadow-xl
        sm:rounded-[24px] sm:hover:-translate-y-1
      "
    >
      {/* IMAGEN DEL PRODUCTO */}
      <div
        className="
          relative flex h-44 items-center justify-center
          overflow-hidden bg-[#F8FAF9] p-3
          sm:h-64 sm:p-5 lg:h-72
        "
      >
        <img
          src={producto.imagen || imagenFallback}
          alt={producto.nombre || "Producto"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = imagenFallback;
          }}
          className="
            h-full w-full object-contain
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        {/* CATEGORÍA */}
        {nombreCategoria && (
          <div className="absolute left-3 right-3 top-3 sm:left-4 sm:top-4">
            <span
              className="
                inline-flex max-w-full items-center
                rounded-full bg-[#009E49] px-3 py-1.5
                text-[10px] font-black text-white
                shadow-sm sm:px-3.5 sm:py-2 sm:text-xs
              "
            >
              <span className="truncate">{nombreCategoria}</span>
            </span>
          </div>
        )}

        {/* DISPONIBILIDAD */}
        {stockValido && (
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
            <span
              className={`
                inline-flex items-center gap-1.5 rounded-full
                bg-white px-2.5 py-1.5 text-[11px]
                font-bold shadow-sm sm:gap-2
                sm:px-3 sm:text-xs
                ${disponible ? "text-[#009E49]" : "text-red-600"}
              `}
            >
              <span
                className={`
                  h-2 w-2 rounded-full
                  ${disponible ? "bg-[#009E49]" : "bg-red-500"}
                `}
              />

              {disponible ? "Disponible" : "Agotado"}
            </span>
          </div>
        )}
      </div>

      {/* LÍNEA DECORATIVA */}
      <div
        className="
          h-1 bg-[#009E49] transition-colors
          duration-300 group-hover:bg-[#FF6600]
        "
      />

      {/* INFORMACIÓN */}
      <div
        className="
          flex flex-1 flex-col p-4
          sm:p-6
        "
      >
        {/* MARCA */}
        <div className="flex items-center gap-2">
          <span className="h-[3px] w-5 rounded-full bg-[#FF6600] sm:w-6" />

          <span
            className="
              text-[11px] font-black uppercase
              tracking-[0.12em] text-[#009E49]
              sm:text-xs
            "
          >
            {producto.marca || "Grupo Comercial J&G"}
          </span>
        </div>

        {/* NOMBRE */}
        <h3
          className="
            mt-2 line-clamp-2 min-h-[48px]
            text-lg font-black leading-snug
            text-[#1A1A1A] transition-colors
            group-hover:text-[#009E49]
            sm:mt-4 sm:min-h-[54px]
            sm:text-[22px]
          "
          title={producto.nombre}
        >
          {producto.nombre}
        </h3>

        {/* DESCRIPCIÓN */}
        <p
          className="
            mt-2 line-clamp-2 min-h-[36px]
            text-xs leading-relaxed text-gray-500
            sm:mt-3 sm:min-h-[42px] sm:text-sm
          "
        >
          {producto.descripcion || "Conoce más detalles sobre este producto."}
        </p>

        {/* SEPARADOR */}
        <div className="my-3 h-px bg-gray-100 sm:my-5" />

        {/* PRECIO Y STOCK */}
        <div className="flex items-end justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500">Precio</p>

            <p
              className="
                mt-1 break-words text-[25px]
                font-black tracking-tight text-[#FF6600]
                sm:text-[28px]
              "
            >
              {precioFormateado !== null
                ? `S/ ${precioFormateado}`
                : "Consultar"}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-xs font-medium text-gray-500">Stock</p>

            <p
              className={`
                mt-1 text-xs font-black sm:text-sm
                ${
                  !stockValido
                    ? "text-gray-500"
                    : disponible
                      ? "text-[#009E49]"
                      : "text-red-600"
                }
              `}
            >
              {stockValido ? `${stock} unidades` : "Consultar"}
            </p>
          </div>
        </div>

        <div className="flex-1" />

        {/* BOTONES */}
        <div className="mt-4 space-y-2.5 sm:mt-6 sm:space-y-3">
          <button
            type="button"
            onClick={agregarAlCarrito}
            disabled={!disponible}
            className={`
              inline-flex min-h-[46px] w-full
              items-center justify-center gap-2
              rounded-xl px-3 py-3
              text-sm font-black shadow-sm
              transition-all duration-300
              sm:min-h-[50px] sm:gap-3
              sm:px-5 sm:py-3.5
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#009E49]
              ${
                !disponible
                  ? "cursor-not-allowed bg-gray-200 text-gray-500"
                  : agregado
                    ? "bg-[#063D2A] text-white"
                    : "bg-[#FF6600] text-white hover:bg-[#E65C00] hover:shadow-lg"
              }
            `}
          >
            {agregado ? (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>
                ¡Agregado!
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.5 13h12.7l2-9H6" />
                </svg>

                {disponible
                  ? "Agregar al carrito"
                  : stockValido
                    ? "Producto agotado"
                    : "Disponibilidad por consultar"}
              </>
            )}
          </button>

          {/* MENSAJE */}
          {mensaje && (
            <p
              role="status"
              aria-live="polite"
              className={`
                text-center text-xs font-bold
                ${agregado ? "text-[#009E49]" : "text-red-600"}
              `}
            >
              {mensaje}
            </p>
          )}

          {/* VER DETALLES */}
          <Link
            to={`/producto/${producto.id}`}
            className="
              inline-flex min-h-[46px] w-full
              items-center justify-center gap-2
              rounded-xl bg-[#009E49]
              px-3 py-3 text-sm font-black
              text-white shadow-sm
              transition-all duration-300
              hover:bg-[#00843D] hover:shadow-lg
              sm:min-h-[50px] sm:gap-3
              sm:px-5 sm:py-3.5
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#009E49]
            "
          >
            Ver detalles
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="
                h-5 w-5 transition-transform
                duration-300 group-hover:translate-x-1
              "
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default TarjetaProducto;
