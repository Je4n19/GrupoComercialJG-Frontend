import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { obtenerRepuestos } from "../Services/repuestoService";
import { obtenerCategoriasRepuesto } from "../Services/categoriaRepuestoService";

import Footer from "../Components/Footer";
import imagenRepuestos from "../assets/repuesto.png";

// Normalizar textos para búsquedas flexibles
const normalizar = (valor) =>
  String(valor ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/([a-z])(\d)/g, "$1 $2")
    .replace(/(\d)([a-z])/g, "$1 $2")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const compactar = (valor) => normalizar(valor).replace(/\s+/g, "");

const obtenerNombreCategoria = (categoria) => {
  if (typeof categoria === "string") {
    return categoria;
  }

  return categoria?.nombre || "";
};

function Repuestos() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parámetros recibidos desde el buscador global
  const busquedaURL = searchParams.get("buscar") || "";
  const repuestoDestacado = searchParams.get("destacado");

  // Datos del backend
  const [repuestos, setRepuestos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Filtro de categoría
  const [categoria, setCategoria] = useState("");

  // Estados de carga
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Cargar datos desde el backend en Render
  useEffect(() => {
    let activo = true;

    const cargarDatos = async () => {
      setCargando(true);
      setError("");

      try {
        const [repuestosData, categoriasData] = await Promise.all([
          obtenerRepuestos(),
          obtenerCategoriasRepuesto(),
        ]);

        if (!activo) return;

        setRepuestos(Array.isArray(repuestosData) ? repuestosData : []);

        setCategorias(Array.isArray(categoriasData) ? categoriasData : []);
      } catch (err) {
        console.error("Error cargando repuestos:", err);

        if (activo) {
          setError("No se pudieron cargar los repuestos. Intenta nuevamente.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarDatos();

    return () => {
      activo = false;
    };
  }, []);

  // Palabras introducidas desde el encabezado
  const palabras = useMemo(() => {
    return normalizar(busquedaURL).split(/\s+/).filter(Boolean);
  }, [busquedaURL]);

  // Filtrar repuestos dinámicamente
  const repuestosFiltrados = useMemo(() => {
    return repuestos
      .filter((repuesto) => {
        const nombreCategoria = obtenerNombreCategoria(repuesto.categoria);

        const textoRepuesto = [
          repuesto.nombre,
          repuesto.marca,
          repuesto.modelo,
          nombreCategoria,
          repuesto.descripcion,
          repuesto.codigo,
        ]
          .filter(Boolean)
          .join(" ");

        const texto = normalizar(textoRepuesto);
        const compacto = compactar(textoRepuesto);

        // Buscar por nombre, marca, modelo,
        // descripción, categoría o código.
        const coincideTexto = palabras.every((palabra) => {
          const token = compactar(palabra);

          return texto.includes(palabra) || compacto.includes(token);
        });

        const coincideCategoria =
          !categoria || normalizar(nombreCategoria) === normalizar(categoria);

        return coincideTexto && coincideCategoria;
      })
      .sort((a, b) => {
        // El repuesto seleccionado desde el buscador
        // aparecerá primero.
        if (repuestoDestacado) {
          if (String(a.id) === repuestoDestacado) {
            return -1;
          }

          if (String(b.id) === repuestoDestacado) {
            return 1;
          }
        }

        return String(a.nombre ?? "").localeCompare(
          String(b.nombre ?? ""),
          "es",
        );
      });
  }, [repuestos, palabras, categoria, repuestoDestacado]);

  // Limpiar búsqueda y categoría
  const limpiarFiltros = () => {
    setCategoria("");

    const parametros = new URLSearchParams(searchParams);

    parametros.delete("buscar");
    parametros.delete("destacado");

    setSearchParams(parametros);
  };

  // Quitar únicamente la búsqueda
  const quitarBusqueda = () => {
    const parametros = new URLSearchParams(searchParams);

    parametros.delete("buscar");
    parametros.delete("destacado");

    setSearchParams(parametros);
  };

  // Desplazarse a los resultados después de buscar
  useEffect(() => {
    if (!busquedaURL || cargando) return;

    const elemento = document.getElementById("repuestos-disponibles");

    elemento?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [busquedaURL, repuestoDestacado, cargando]);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[520px] flex items-center text-white overflow-hidden">
        <img
          src={imagenRepuestos}
          alt="Repuestos para maquinaria agrícola, forestal e industrial"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />

        <div className="absolute left-0 bottom-0 w-96 h-96 bg-orange-600/10 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center bg-orange-500/20 border border-orange-400/40 text-orange-300 px-5 py-2 rounded-full font-bold text-sm">
              Grupo Comercial J&G
            </span>

            <h1 className="text-5xl md:text-7xl font-black mt-7 leading-tight">
              Repuestos
              <span className="block text-orange-500">Originales</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mt-7 max-w-xl">
              Amplio stock de repuestos para maquinaria agrícola, forestal e
              industrial. Calidad garantizada y disponibilidad inmediata.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#repuestos-disponibles"
                className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-xl font-black transition shadow-lg"
              >
                Ver Repuestos
              </a>

              <a
                href="https://wa.me/51979501557?text=Hola,%20deseo%20consultar%20por%20un%20repuesto"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-7 py-4 rounded-xl font-black transition"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="-mt-10 relative z-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            [repuestos.length, "Repuestos"],
            [categorias.length, "Categorías"],
            ["100%", "Originales"],
            ["Perú", "Cobertura"],
          ].map(([valor, titulo]) => (
            <div
              key={titulo}
              className="bg-white rounded-3xl shadow-xl p-6 text-center border border-gray-100"
            >
              <h3 className="text-4xl font-black text-orange-500">{valor}</h3>

              <p className="text-gray-500 mt-2">{titulo}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FILTROS SIN BUSCADOR DUPLICADO */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-[32px] shadow-xl p-6 sm:p-8 border border-gray-100">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900">
                Filtrar Repuestos
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Selecciona una categoría para encontrar los repuestos
                disponibles.
              </p>
            </div>

            <span className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-sm font-bold">
              Filtros de repuestos
            </span>
          </div>

          {/* BÚSQUEDA ACTIVA DESDE EL ENCABEZADO */}
          {busquedaURL && (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
              <span className="text-gray-600 text-sm">Resultados para:</span>

              <strong className="text-orange-700">"{busquedaURL}"</strong>

              <button
                type="button"
                onClick={quitarBusqueda}
                className="ml-auto text-orange-600 text-sm font-bold hover:underline"
              >
                Quitar búsqueda ✕
              </button>
            </div>
          )}

          {/* FILTRO DE CATEGORÍA */}
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-full sm:max-w-md">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Categoría
              </label>

              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 bg-white text-gray-700 focus:outline-none focus:border-orange-500"
              >
                <option value="">Todas las categorías</option>

                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            {(categoria || busquedaURL) && (
              <button
                type="button"
                onClick={limpiarFiltros}
                className="bg-gray-100 hover:bg-orange-100 text-gray-700 px-6 py-4 rounded-xl font-bold transition"
              >
                ✕ Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section
        id="repuestos-disponibles"
        className="max-w-7xl mx-auto px-6 mb-10 scroll-mt-32"
      >
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              {busquedaURL ? "Resultados de búsqueda" : "Repuestos Disponibles"}
            </h2>

            {busquedaURL && (
              <p className="text-gray-500 mt-2">
                Buscando:{" "}
                <strong className="text-orange-600">{busquedaURL}</strong>
              </p>
            )}
          </div>

          <span className="bg-orange-100 text-orange-600 px-6 py-3 rounded-full font-bold">
            {repuestosFiltrados.length} resultados
          </span>
        </div>
      </section>

      {/* TARJETAS DE REPUESTOS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {cargando ? (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />

            <p className="text-gray-500 mt-4">Cargando repuestos...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 rounded-2xl p-8 text-center">
            {error}
          </div>
        ) : repuestosFiltrados.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
            <div className="text-6xl mb-5">🔧</div>

            <h3 className="text-3xl font-black text-gray-800">
              No encontramos repuestos
            </h3>

            <p className="text-gray-500 mt-3">
              No hay repuestos registrados que coincidan con tu búsqueda y
              categoría.
            </p>

            <button
              type="button"
              onClick={limpiarFiltros}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-bold transition"
            >
              Ver todos los repuestos
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repuestosFiltrados.map((repuesto) => {
              const destacado = repuestoDestacado === String(repuesto.id);

              return (
                <div
                  key={repuesto.id}
                  id={`repuesto-${repuesto.id}`}
                  className={`group bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 ${
                    destacado ? "ring-4 ring-orange-500 ring-offset-4" : ""
                  }`}
                >
                  {/* IMAGEN */}
                  <div className="h-64 overflow-hidden bg-gray-100">
                    <img
                      src={
                        repuesto.imagen ||
                        "https://placehold.co/400x300?text=Repuesto"
                      }
                      alt={repuesto.nombre}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  {/* INFORMACIÓN */}
                  <div className="p-7">
                    <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold">
                      {obtenerNombreCategoria(repuesto.categoria) || "Repuesto"}
                    </span>

                    <h3 className="text-2xl font-black mt-5 text-gray-900">
                      {repuesto.nombre}
                    </h3>

                    {repuesto.marca && (
                      <p className="text-gray-500 mt-2">
                        Marca: {repuesto.marca}
                      </p>
                    )}

                    <p className="text-gray-600 mt-4 line-clamp-3">
                      {repuesto.descripcion}
                    </p>

                    <div className="mt-6">
                      <p className="text-4xl font-black text-green-700">
                        S/. {repuesto.precio}
                      </p>

                      <p className="text-gray-500 mt-2">
                        Stock disponible: {repuesto.stock}
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/51979501557?text=${encodeURIComponent(
                        `Hola, deseo información sobre ${repuesto.nombre}`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center mt-7 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold transition"
                    >
                      Consultar Disponibilidad
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-24">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-black">
            ¿No encuentras el repuesto?
          </h2>

          <p className="text-xl mt-6 text-orange-100">
            Nuestro equipo puede ayudarte a localizar el repuesto exacto para tu
            maquinaria.
          </p>

          <a
            href="https://wa.me/51979501557?text=Hola,%20estoy%20buscando%20un%20repuesto%20para%20mi%20maquinaria"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 bg-white text-orange-600 px-10 py-5 rounded-2xl font-black hover:scale-105 transition"
          >
            Solicitar Repuesto
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Repuestos;
