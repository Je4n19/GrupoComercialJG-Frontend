import { useMemo, useState } from "react";

const RECOMENDACIONES = [
  "Motosierras STIHL",
  "Motosierra MS 250",
  "Motosierra MS 212",
  "Motosierra MS 172",
  "Motosierra MS 310",
  "Motosierra MS 261",
  "Motosierra MS 361",
  "Motosierra MS 382",
  "Motosierra MS 651",
  "Motosierra MS 661",
  "Repuestos para motosierras",
  "Desbrozadoras STIHL",
  "Desbrozadora FS 230",
  "Desbrozadora FS 235",
  "Desbrozadora FS 250",
  "Desbrozadora FS 460",
  "Motobombas STIHL",
  "Motobomba 2 pulgadas",
  "Motobomba 3 pulgadas",
  "Fumigadoras STIHL",
  "Fumigadora SR 420",
  "Fumigadora SR 450",
  "Espadas para motosierra",
  "Cadenas para motosierra",
  "Aceite para motor",
];

const normalizar = (texto) =>
  String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

function Buscador({
  valor = "",
  onChange = () => {},
  onBuscar,
  categorias = [],
  compacto = false,
}) {
  const [enfocado, setEnfocado] = useState(false);
  const [seleccion, setSeleccion] = useState(-1);

  const sugerencias = useMemo(() => {
    const consulta = normalizar(valor);

    if (consulta.length < 2) return [];

    const opciones = [
      ...categorias.map((c) => c.nombre).filter(Boolean),
      ...RECOMENDACIONES,
    ];

    const palabras = consulta.split(/\s+/).filter(Boolean);

    return [...new Set(opciones)]
      .filter((opcion) => palabras.every((p) => normalizar(opcion).includes(p)))
      .sort((a, b) => {
        const aInicio = normalizar(a).startsWith(consulta) ? 0 : 1;
        const bInicio = normalizar(b).startsWith(consulta) ? 0 : 1;

        return aInicio - bInicio || a.localeCompare(b);
      })
      .slice(0, 7);
  }, [valor, categorias]);

  const elegir = (texto) => {
    onChange(texto);
    setEnfocado(false);
    setSeleccion(-1);
    onBuscar?.(texto);
  };

  const enviar = (evento) => {
    evento.preventDefault();

    elegir(seleccion >= 0 ? sugerencias[seleccion] : valor.trim());
  };

  const manejarTeclas = (evento) => {
    if (evento.key === "ArrowDown" && sugerencias.length) {
      evento.preventDefault();

      setSeleccion((anterior) => (anterior + 1) % sugerencias.length);
    } else if (evento.key === "ArrowUp" && sugerencias.length) {
      evento.preventDefault();

      setSeleccion((anterior) =>
        anterior <= 0 ? sugerencias.length - 1 : anterior - 1,
      );
    } else if (evento.key === "Escape") {
      setEnfocado(false);
      setSeleccion(-1);
    }
  };

  return (
    <div className="relative w-full z-[110]">
      <form onSubmit={enviar} role="search" className="w-full">
        <div
          className={`
            flex items-center bg-white
            border border-gray-200 shadow-sm
            focus-within:ring-2
            focus-within:ring-orange-200
            overflow-hidden
            ${compacto ? "h-12 rounded-full" : "h-14 rounded-2xl"}
          `}
        >
          <input
            type="search"
            aria-label="Buscar productos"
            aria-autocomplete="list"
            autoComplete="off"
            placeholder={
              compacto
                ? "Buscar productos..."
                : "Buscar maquinaria, repuestos o marcas..."
            }
            value={valor}
            onChange={(e) => {
              onChange(e.target.value);
              setSeleccion(-1);
            }}
            onFocus={() => setEnfocado(true)}
            onBlur={() => setEnfocado(false)}
            onKeyDown={manejarTeclas}
            className="
              min-w-0 flex-1
              bg-transparent text-gray-800
              outline-none
              placeholder:text-gray-500
              px-4 text-sm sm:text-base
            "
          />

          <button
            type="submit"
            aria-label="Buscar"
            title="Buscar"
            className="
              h-full w-12 sm:w-14
              shrink-0
              flex items-center justify-center
              bg-amber-500
              hover:bg-amber-600
              text-white transition
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </button>
        </div>
      </form>

      {enfocado && sugerencias.length > 0 && (
        <div
          className="
            absolute left-0 right-0 top-full
            mt-2 bg-white
            border border-gray-200
            shadow-2xl rounded-2xl
            overflow-hidden text-gray-800
            max-h-80 overflow-y-auto
          "
        >
          <p
            className="
              px-4 pt-3 pb-2
              text-xs font-bold uppercase
              tracking-wide text-gray-500
            "
          >
            Búsquedas relacionadas
          </p>

          {sugerencias.map((texto, indice) => (
            <button
              key={`${texto}-${indice}`}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => elegir(texto)}
              className={`
                w-full flex items-center
                gap-3 px-4 py-3
                text-left text-sm transition
                ${
                  indice === seleccion
                    ? "bg-orange-100 text-orange-700"
                    : "hover:bg-orange-50"
                }
              `}
            >
              <span className="text-orange-500">⌕</span>

              <span className="truncate">{texto}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Buscador;
