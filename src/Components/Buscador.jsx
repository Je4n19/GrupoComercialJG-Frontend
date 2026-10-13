import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { obtenerProductos } from "../Services/productoService";
import { obtenerRepuestos } from "../Services/repuestoService";

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
    .filter(Boolean)
    .join(" ");

  const normalizado = normalizar(texto);
  const compacto = textoCompacto(texto);

  const palabras = consulta.split(/\s+/).filter(Boolean);

  return palabras.every((palabra) => {
    return normalizado.includes(palabra) || compacto.includes(palabra);
  });
};

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

  const cambiarTexto = (nuevoTexto) => {
    if (controlado) {
      onChange?.(nuevoTexto);
    } else {
      setTextoLocal(nuevoTexto);
    }

    setAbierto(true);
    setSeleccionado(-1);
  };

  useEffect(() => {
    let activo = true;

    const cargarInventario = async () => {
      setCargando(true);
      setError("");

      // Cada consulta es independiente: si falla una,
      // todavía podemos mostrar resultados de la otra.
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

  useEffect(() => {
    const cerrarAlHacerClickFuera = (evento) => {
      if (
        contenedorRef.current &&
        !contenedorRef.current.contains(evento.target)
      ) {
        setAbierto(false);
      }
    };

    document.addEventListener("mousedown", cerrarAlHacerClickFuera);

    return () => {
      document.removeEventListener("mousedown", cerrarAlHacerClickFuera);
    };
  }, []);

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

  const seleccionarArticulo = (articulo) => {
    setAbierto(false);
    setSeleccionado(-1);

    const ruta =
      articulo.tipoBusqueda === "repuesto" ? "/repuestos" : "/catalogo";

    const parametros = new URLSearchParams();

    if (articulo.id !== undefined && articulo.id !== null) {
      parametros.set("destacado", String(articulo.id));
    }

    // Incluimos el nombre como búsqueda para que
    // el artículo aparezca entre los resultados.
    parametros.set("buscar", articulo.nombre || "");

    navigate(`${ruta}?${parametros.toString()}`);

    if (controlado) {
      onChange?.(articulo.nombre || "");
    } else {
      setTextoLocal(articulo.nombre || "");
    }
  };

  const enviarBusqueda = (evento) => {
    evento.preventDefault();

    if (seleccionado >= 0 && resultados[seleccionado]) {
      seleccionarArticulo(resultados[seleccionado]);
      return;
    }

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

  return (
    <div ref={contenedorRef} className="relative w-full">
      <form onSubmit={enviarBusqueda} role="search">
        <div
          className={`flex items-center bg-white border border-gray-200 shadow-md focus-within:ring-2 focus-within:ring-orange-200 ${
            compacto ? "h-12 rounded-full" : "h-14 rounded-2xl"
          }`}
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
            className="flex-1 min-w-0 bg-transparent text-gray-800 px-4 outline-none text-sm sm:text-base"
          />

          <button
            type="submit"
            aria-label="Buscar"
            className="h-full w-12 sm:w-14 shrink-0 rounded-r-full bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition"
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

      {abierto && normalizar(texto).length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-[200] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-[420px] overflow-y-auto">
          {cargando ? (
            <p className="px-4 py-5 text-sm text-gray-500">
              Consultando productos y repuestos...
            </p>
          ) : error ? (
            <p className="px-4 py-5 text-sm text-red-600">{error}</p>
          ) : resultados.length === 0 ? (
            <p className="px-4 py-5 text-sm text-gray-500">
              No encontramos coincidencias con "{texto}". Puedes presionar Enter
              para buscar igualmente.
            </p>
          ) : (
            <>
              <div className="px-4 py-3 bg-gray-50 border-b">
                <p className="text-xs font-black text-gray-500 uppercase">
                  Coincidencias en el inventario
                </p>
              </div>

              {resultados.map((articulo, indice) => (
                <button
                  key={`${articulo.tipoBusqueda}-${articulo.id}`}
                  type="button"
                  onClick={() => seleccionarArticulo(articulo)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-100 transition ${
                    seleccionado === indice
                      ? "bg-orange-100"
                      : "hover:bg-orange-50"
                  }`}
                >
                  <div className="w-14 h-14 shrink-0 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                    {articulo.imagen ? (
                      <img
                        src={articulo.imagen}
                        alt={articulo.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">📦</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-900 line-clamp-2">
                      {articulo.nombre}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {articulo.tipoBusqueda === "repuesto"
                        ? "Repuesto"
                        : "Producto"}
                      {articulo.marca ? ` · ${articulo.marca}` : ""}
                    </p>
                  </div>

                  {articulo.precio != null && (
                    <span className="text-sm font-black text-green-700 whitespace-nowrap">
                      S/ {articulo.precio}
                    </span>
                  )}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setAbierto(false);
                  onBuscar?.(texto);
                }}
                className="w-full px-4 py-4 text-sm text-center font-black text-orange-600 hover:bg-orange-50"
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
