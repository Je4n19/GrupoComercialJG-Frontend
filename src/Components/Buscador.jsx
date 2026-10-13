import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { obtenerProductos } from "../Services/productoService";
import { obtenerRepuestos } from "../Services/repuestoService";

// NORMALIZAR TEXTO PARA BÚSQUEDAS
const normalizar = (valor) =>
  String(valor ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/([a-z])(\d)/g, "$1 $2")
    .replace(/(\d)([a-z])/g, "$1 $2")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const textoCompacto = (valor) => normalizar(valor).replace(/\s+/g, "");

// CONVERTIR CAMPOS A TEXTO
const obtenerTexto = (valor) => {
  if (valor == null) return "";

  if (typeof valor === "object") {
    return String(valor.nombre ?? valor.modelo ?? valor.descripcion ?? "");
  }

  return String(valor);
};

// VERIFICAR COINCIDENCIAS
const coincideBusqueda = (articulo, busqueda) => {
  const consulta = normalizar(busqueda);

  if (!consulta) return false;

  const texto = [
    articulo.nombre,
    articulo.modelo,
    articulo.marca,
    articulo.categoria,
    articulo.descripcion,
  ]
    .map(obtenerTexto)
    .filter(Boolean)
    .join(" ");

  const normalizado = normalizar(texto);
  const compacto = textoCompacto(texto);

  const palabras = consulta.split(/\s+/).filter(Boolean);

  return palabras.every(
    (palabra) => normalizado.includes(palabra) || compacto.includes(palabra),
  );
};

// FORMATO DE PRECIO
const formatearPrecio = (precio) => {
  const numero = Number(precio);

  if (!Number.isFinite(numero)) {
    return String(precio);
  }

  return numero.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// COMPONENTE BUSCADOR
function Buscador({ valor, onChange, onBuscar, compacto = false }) {
  const navigate = useNavigate();
  const contenedorRef = useRef(null);

  const [textoLocal, setTextoLocal] = useState("");
  const [productos, setProductos] = useState([]);
  const [repuestos, setRepuestos] = useState([]);

  const [cargando, setCargando] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [seleccionado, setSeleccionado] = useState(-1);
  const [error, setError] = useState("");

  const controlado = valor !== undefined;
  const texto = controlado ? valor : textoLocal;

  // ACTUALIZAR TEXTO
  const cambiarTexto = (nuevoTexto) => {
    if (controlado) {
      onChange?.(nuevoTexto);
    } else {
      setTextoLocal(nuevoTexto);
    }

    setAbierto(true);
    setSeleccionado(-1);
  };

  // CARGAR PRODUCTOS Y REPUESTOS DEL BACKEND
  useEffect(() => {
    let activo = true;

    const cargarInventario = async () => {
      setCargando(true);
      setError("");

      const resultados = await Promise.allSettled([
        obtenerProductos(),
        obtenerRepuestos(),
      ]);

      if (!activo) return;

      const productosData =
        resultados[0].status === "fulfilled" ? resultados[0].value : [];

      const repuestosData =
        resultados[1].status === "fulfilled" ? resultados[1].value : [];

      setProductos(Array.isArray(productosData) ? productosData : []);

      setRepuestos(Array.isArray(repuestosData) ? repuestosData : []);

      if (
        resultados[0].status === "rejected" &&
        resultados[1].status === "rejected"
      ) {
        setError("No se pudo consultar el inventario.");
      }

      setCargando(false);
    };

    cargarInventario();

    return () => {
      activo = false;
    };
  }, []);

  // CERRAR SUGERENCIAS AL HACER CLIC FUERA
  useEffect(() => {
    const cerrarAlHacerClickFuera = (evento) => {
      if (
        contenedorRef.current &&
        !contenedorRef.current.contains(evento.target)
      ) {
        setAbierto(false);
        setSeleccionado(-1);
      }
    };

    document.addEventListener("mousedown", cerrarAlHacerClickFuera);

    return () => {
      document.removeEventListener("mousedown", cerrarAlHacerClickFuera);
    };
  }, []);

  // RESULTADOS DINÁMICOS
  const resultados = useMemo(() => {
    if (normalizar(texto).length < 2) return [];

    const articulos = [
      ...productos.map((producto) => ({
        ...producto,
        tipoBusqueda: "producto",
      })),

      ...repuestos.map((repuesto) => ({
        ...repuesto,
        tipoBusqueda: "repuesto",
      })),
    ];

    return articulos
      .filter((articulo) => coincideBusqueda(articulo, texto))
      .sort((a, b) => {
        const consulta = textoCompacto(texto);

        const nombreA = textoCompacto(a.nombre);
        const nombreB = textoCompacto(b.nombre);

        const puntaje = (nombre) => {
          if (nombre === consulta) return 0;
          if (nombre.startsWith(consulta)) return 1;
          if (nombre.includes(consulta)) return 2;
          return 3;
        };

        return puntaje(nombreA) - puntaje(nombreB);
      })
      .slice(0, 8);
  }, [productos, repuestos, texto]);

  // SELECCIONAR UN PRODUCTO O REPUESTO
  const seleccionarArticulo = (articulo) => {
    setAbierto(false);
    setSeleccionado(-1);

    const ruta =
      articulo.tipoBusqueda === "repuesto" ? "/repuestos" : "/catalogo";

    const parametros = new URLSearchParams();

    if (articulo.id !== undefined && articulo.id !== null) {
      parametros.set("destacado", String(articulo.id));
    }

    parametros.set("buscar", articulo.nombre || "");

    if (controlado) {
      onChange?.(articulo.nombre || "");
    } else {
      setTextoLocal(articulo.nombre || "");
    }

    navigate(`${ruta}?${parametros.toString()}`);
  };

  // ENVIAR BÚSQUEDA GENERAL
  const ejecutarBusqueda = () => {
    const consulta = String(texto || "").trim();

    if (!consulta) return;

    setAbierto(false);
    setSeleccionado(-1);

    if (onBuscar) {
      onBuscar(consulta);
    } else {
      const parametros = new URLSearchParams({
        buscar: consulta,
      });

      navigate(`/catalogo?${parametros.toString()}`);
    }
  };

  const enviarBusqueda = (evento) => {
    evento.preventDefault();

    if (seleccionado >= 0 && resultados[seleccionado]) {
      seleccionarArticulo(resultados[seleccionado]);
      return;
    }

    ejecutarBusqueda();
  };

  return (
    <div ref={contenedorRef} className="relative w-full">
      {/* ================================= */}
      {/* CAMPO PRINCIPAL DE BÚSQUEDA */}
      {/* ================================= */}

      <form onSubmit={enviarBusqueda} role="search">
        <div
          className={`
            flex items-center
            bg-white
            border border-gray-200
            shadow-sm
            hover:border-[#009E49]/50
            focus-within:border-[#009E49]
            focus-within:ring-2
            focus-within:ring-[#009E49]/15
            transition-all duration-200
            ${compacto ? "h-12 rounded-full" : "h-14 rounded-2xl"}
          `}
        >
          <input
            type="search"
            value={texto}
            onChange={(evento) => cambiarTexto(evento.target.value)}
            onFocus={() => setAbierto(true)}
            onKeyDown={(evento) => {
              if (evento.key === "ArrowDown" && resultados.length > 0) {
                evento.preventDefault();

                setSeleccionado((actual) =>
                  actual >= resultados.length - 1 ? 0 : actual + 1,
                );
              }

              if (evento.key === "ArrowUp" && resultados.length > 0) {
                evento.preventDefault();

                setSeleccionado((actual) =>
                  actual <= 0 ? resultados.length - 1 : actual - 1,
                );
              }

              if (evento.key === "Escape") {
                setAbierto(false);
                setSeleccionado(-1);
              }
            }}
            placeholder="Buscar productos y repuestos..."
            autoComplete="off"
            aria-label="Buscar productos y repuestos"
            className="
              flex-1 min-w-0
              bg-transparent
              text-[#1A1A1A]
              placeholder:text-gray-400
              px-4
              outline-none
              text-sm sm:text-base
            "
          />

          {/* BOTÓN NARANJA */}
          <button
            type="submit"
            aria-label="Buscar"
            className={`
              h-full
              w-12 sm:w-14
              shrink-0
              bg-[#FF6600]
              hover:bg-[#E65C00]
              active:bg-[#CC5200]
              text-white
              flex items-center justify-center
              transition-colors duration-200
              ${compacto ? "rounded-r-full" : "rounded-r-2xl"}
            `}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />

              <path d="m20 20-4-4" />
            </svg>
          </button>
        </div>
      </form>

      {/* ================================= */}
      {/* SUGERENCIAS DE BÚSQUEDA */}
      {/* ================================= */}

      {abierto && normalizar(texto).length >= 2 && (
        <div
          className="
              absolute
              top-full left-0 right-0
              mt-2
              z-[200]
              bg-white
              rounded-2xl
              shadow-2xl
              border border-gray-200
              overflow-hidden
              max-h-[420px]
              overflow-y-auto
            "
        >
          {/* CARGANDO */}
          {cargando ? (
            <div className="px-4 py-6 flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-gray-200 border-t-[#009E49] animate-spin" />

              <p className="text-sm text-gray-500">
                Consultando productos y repuestos...
              </p>
            </div>
          ) : error ? (
            <p className="px-4 py-5 text-sm text-red-600">{error}</p>
          ) : resultados.length === 0 ? (
            <div className="px-4 py-5">
              <p className="text-sm font-semibold text-[#1A1A1A]">
                No encontramos coincidencias.
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Intenta escribir otro nombre o modelo.
              </p>
            </div>
          ) : (
            <>
              {/* ENCABEZADO DE RESULTADOS */}
              <div className="px-4 py-3 bg-[#F0F9F3] border-b border-green-100">
                <p className="text-xs font-black text-[#009E49] uppercase tracking-wide">
                  Coincidencias en el inventario
                </p>
              </div>

              {/* LISTA DE PRODUCTOS Y REPUESTOS */}
              {resultados.map((articulo, indice) => (
                <button
                  key={`${articulo.tipoBusqueda}-${articulo.id}`}
                  type="button"
                  onClick={() => seleccionarArticulo(articulo)}
                  className={`
                        w-full
                        flex items-center gap-3
                        px-4 py-3
                        text-left
                        border-b border-gray-100
                        transition-colors
                        ${
                          seleccionado === indice
                            ? "bg-[#E8F7EE]"
                            : "hover:bg-[#F0F9F3]"
                        }
                      `}
                >
                  {/* IMAGEN */}
                  <div
                    className="
                          w-14 h-14
                          shrink-0
                          bg-gray-50
                          rounded-xl
                          border border-gray-100
                          overflow-hidden
                          flex items-center justify-center
                        "
                  >
                    {articulo.imagen ? (
                      <img
                        src={articulo.imagen}
                        alt={articulo.nombre}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <span className="text-2xl">📦</span>
                    )}
                  </div>

                  {/* INFORMACIÓN */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#1A1A1A] line-clamp-2">
                      {articulo.nombre}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span
                        className={`
                              inline-block
                              text-[10px]
                              font-bold
                              px-2 py-0.5
                              rounded-full
                              ${
                                articulo.tipoBusqueda === "repuesto"
                                  ? "bg-orange-50 text-[#FF6600]"
                                  : "bg-green-50 text-[#009E49]"
                              }
                            `}
                      >
                        {articulo.tipoBusqueda === "repuesto"
                          ? "Repuesto"
                          : "Producto"}
                      </span>

                      {articulo.marca && (
                        <span className="text-xs text-gray-500 truncate">
                          {obtenerTexto(articulo.marca)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* PRECIO */}
                  {articulo.precio != null && (
                    <span className="text-sm font-black text-[#009E49] whitespace-nowrap">
                      S/ {formatearPrecio(articulo.precio)}
                    </span>
                  )}
                </button>
              ))}

              {/* VER TODOS LOS RESULTADOS */}
              <button
                type="button"
                onClick={ejecutarBusqueda}
                className="
                    w-full
                    px-4 py-4
                    text-sm text-center
                    font-black
                    text-[#FF6600]
                    hover:bg-orange-50
                    transition-colors
                  "
              >
                Ver todos los resultados →
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Buscador;
