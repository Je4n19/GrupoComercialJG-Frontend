import { Link } from "react-router-dom";

function TarjetaProducto({ producto }) {
  const precio = Number(producto.precio);

  const precioFormateado =
    producto.precio !== null &&
    producto.precio !== undefined &&
    producto.precio !== "" &&
    Number.isFinite(precio)
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
    Number.isFinite(stock);

  const disponible = stockValido && stock > 0;

  const imagenFallback =
    "https://placehold.co/600x450/f3f4f6/6b7280?text=Producto";

  return (
    <article
      className="
        group
        bg-white
        rounded-[24px]
        overflow-hidden
        border
        border-gray-100
        shadow-sm
        hover:shadow-xl
        hover:border-[#009E49]/25
        hover:-translate-y-1.5
        transition-all
        duration-300
        flex
        flex-col
        h-full
      "
    >
      {/* ======================================== */}
      {/* IMAGEN DEL PRODUCTO */}
      {/* ======================================== */}

      <div
        className="
          relative
          bg-[#F8FAF9]
          overflow-hidden
          h-60
          sm:h-64
          lg:h-72
          flex
          items-center
          justify-center
          p-5
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
            w-full
            h-full
            object-contain
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* CATEGORÍA */}
        {producto.categoria && (
          <div className="absolute top-4 left-4 right-4">
            <span
              className="
                inline-flex
                items-center
                max-w-full
                bg-[#009E49]
                text-white
                px-3.5
                py-2
                rounded-full
                text-xs
                font-black
                shadow-md
              "
            >
              <span className="truncate">{producto.categoria}</span>
            </span>
          </div>
        )}

        {/* ESTADO DE STOCK */}
        {stockValido && (
          <div className="absolute bottom-4 right-4">
            <span
              className={`
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                text-xs
                font-bold
                shadow-sm
                ${
                  disponible
                    ? "bg-white text-[#009E49]"
                    : "bg-white text-red-600"
                }
              `}
            >
              <span
                className={`
                  w-2
                  h-2
                  rounded-full
                  ${disponible ? "bg-[#009E49]" : "bg-red-500"}
                `}
              />

              {disponible ? "Disponible" : "Agotado"}
            </span>
          </div>
        )}
      </div>

      {/* LÍNEA DECORATIVA */}
      <div className="h-1 bg-[#009E49] group-hover:bg-[#FF6600] transition-colors duration-300" />

      {/* ======================================== */}
      {/* INFORMACIÓN DEL PRODUCTO */}
      {/* ======================================== */}

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* MARCA */}
        <div className="flex items-center gap-2">
          <span className="w-6 h-[3px] bg-[#FF6600] rounded-full" />

          <span
            className="
              text-[#009E49]
              font-black
              uppercase
              tracking-[0.12em]
              text-xs
            "
          >
            {producto.marca || "Grupo Comercial J&G"}
          </span>
        </div>

        {/* NOMBRE */}
        <h3
          className="
            text-xl
            sm:text-[22px]
            font-black
            text-[#1A1A1A]
            mt-4
            leading-snug
            line-clamp-2
            min-h-[54px]
            group-hover:text-[#009E49]
            transition-colors
            duration-300
          "
        >
          {producto.nombre}
        </h3>

        {/* DESCRIPCIÓN */}
        <p
          className="
            text-gray-500
            text-sm
            leading-relaxed
            mt-3
            line-clamp-2
            min-h-[42px]
          "
        >
          {producto.descripcion || "Conoce más detalles sobre este producto."}
        </p>

        {/* SEPARADOR */}
        <div className="h-px bg-gray-100 my-5" />

        {/* PRECIO Y STOCK */}
        <div className="flex items-end justify-between gap-3">
          {/* PRECIO */}
          <div className="min-w-0">
            <p className="text-xs text-gray-500 font-medium">Precio</p>

            <p
              className="
                text-2xl
                sm:text-[28px]
                font-black
                text-[#FF6600]
                mt-1
                tracking-tight
                break-words
              "
            >
              {precioFormateado ? `S/ ${precioFormateado}` : "Consultar"}
            </p>
          </div>

          {/* STOCK */}
          <div className="text-right shrink-0">
            <p className="text-xs text-gray-500 font-medium">Stock</p>

            <p
              className={`
                text-sm
                font-black
                mt-1
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

        {/* ESPACIO FLEXIBLE */}
        <div className="flex-1" />

        {/* ======================================== */}
        {/* BOTÓN VER DETALLES */}
        {/* ======================================== */}

        <Link
          to={`/producto/${producto.id}`}
          className="
            mt-6
            w-full
            inline-flex
            items-center
            justify-center
            gap-3
            bg-[#009E49]
            hover:bg-[#00843D]
            text-white
            py-3.5
            px-5
            rounded-xl
            font-black
            text-sm
            shadow-sm
            hover:shadow-lg
            transition-all
            duration-300
          "
        >
          Ver Detalles
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="
              w-5
              h-5
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default TarjetaProducto;
