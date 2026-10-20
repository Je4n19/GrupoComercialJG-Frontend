import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { obtenerProductos } from "../Services/productoService";
import { obtenerCategorias } from "../Services/categoriaService";

import TarjetaProducto from "../Components/TarjetaProducto";
import Footer from "../Components/Footer";
import imagenProductos from "../assets/productos.png";

// Normalización para búsquedas flexibles
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
  if (typeof categoria === "string") return categoria;
  return categoria?.nombre || "";
};

function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();

  const busquedaURL = searchParams.get("buscar") || "";
  const categoriaURL = searchParams.get("categoria") || "";
  const productoDestacado = searchParams.get("destacado");

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // CARGA INICIAL Y ACTUALIZACIÓN DE INVENTARIO
  useEffect(() => {
    let activo = true;
    let consultando = false;

    const actualizarProductos = async (esCargaInicial = false) => {
      if (consultando || (!esCargaInicial && document.hidden)) {
        return;
      }

      consultando = true;

      try {
        const productosData = await obtenerProductos();

        if (!activo) return;

        setProductos(Array.isArray(productosData) ? productosData : []);

        setError("");
      } catch (err) {
        console.error("Error actualizando productos:", err);

        if (activo && esCargaInicial) {
          setError("No se pudieron cargar los productos. Intenta nuevamente.");
        }
      } finally {
        consultando = false;

        if (activo && esCargaInicial) {
          setCargando(false);
        }
      }
    };

    const cargarDatosIniciales = async () => {
      setCargando(true);
      setError("");

      const cargaCategorias = obtenerCategorias()
        .then((datos) => {
          if (activo) {
            setCategorias(Array.isArray(datos) ? datos : []);
          }
        })
        .catch((err) => {
          console.error("Error cargando categorías:", err);
        });

      await Promise.all([actualizarProductos(true), cargaCategorias]);
    };

    const actualizarAlVolver = () => {
      if (!document.hidden) {
        actualizarProductos();
      }
    };

    cargarDatosIniciales();

    const intervalo = window.setInterval(() => {
      actualizarProductos();
    }, 15000);

    document.addEventListener("visibilitychange", actualizarAlVolver);

    return () => {
      activo = false;
      window.clearInterval(intervalo);

      document.removeEventListener("visibilitychange", actualizarAlVolver);
    };
  }, []);

  // BUSCADOR
  const palabras = useMemo(
    () => normalizar(busquedaURL).split(/\s+/).filter(Boolean),
    [busquedaURL],
  );

  // PRODUCTOS VISIBLES
  const productosVisibles = useMemo(() => {
    return productos
      .filter((producto) => {
        const nombreCategoria = obtenerNombreCategoria(producto.categoria);

        const textoProducto = [
          producto.nombre,
          producto.marca,
          producto.modelo,
          nombreCategoria,
          producto.descripcion,
          producto.codigo,
        ]
          .filter(Boolean)
          .join(" ");

        const texto = normalizar(textoProducto);
        const compacto = compactar(textoProducto);

        const coincideBusqueda = palabras.every((palabra) => {
          const token = compactar(palabra);

          return texto.includes(palabra) || compacto.includes(token);
        });

        const coincideCategoria =
          !categoriaURL ||
          normalizar(nombreCategoria) === normalizar(categoriaURL);

        return coincideBusqueda && coincideCategoria;
      })
      .sort((a, b) => {
        if (productoDestacado) {
          if (String(a.id) === productoDestacado) {
            return -1;
          }

          if (String(b.id) === productoDestacado) {
            return 1;
          }
        }

        return String(a.nombre ?? "").localeCompare(
          String(b.nombre ?? ""),
          "es",
        );
      });
  }, [productos, palabras, categoriaURL, productoDestacado]);

  const quitarBusqueda = () => {
    const parametros = new URLSearchParams(searchParams);

    parametros.delete("buscar");
    parametros.delete("destacado");

    setSearchParams(parametros);
  };

  const verTodos = () => setSearchParams({});

  // DESPLAZAMIENTO A RESULTADOS
  useEffect(() => {
    if (cargando || !busquedaURL) return;

    document.getElementById("productos-disponibles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [busquedaURL, productoDestacado, cargando]);

  const whatsappUrl =
    "https://wa.me/51979501557?text=" +
    encodeURIComponent("Hola, deseo consultar por una máquina o equipo.");

  const whatsappAsesoria =
    "https://wa.me/51979501557?text=" +
    encodeURIComponent("Hola, necesito asesoría para elegir una máquina.");

  return (
    <>
      {/* HERO PRINCIPAL */}
      <section
        className="
          relative flex min-h-[320px]
          items-center overflow-hidden
          text-white
          sm:min-h-[520px]
        "
      >
        <img
          src={imagenProductos}
          alt="Maquinaria agrícola, forestal e industrial"
          className="
            absolute inset-0 h-full w-full
            object-cover
          "
        />

        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-[#07170F]/95
            via-[#07170F]/80
            to-[#07170F]/35
          "
        />

        <div
          className="
            relative z-10 mx-auto w-full
            max-w-7xl px-5 py-12
            sm:px-6 sm:py-20
            lg:px-8
          "
        >
          <div className="max-w-3xl">
            <span
              className="
                inline-flex items-center gap-2
                rounded-full border
                border-[#5FE29C]/40
                bg-[#009E49]/20
                px-3 py-2
                text-xs font-black
                text-[#B6F5D0]
                sm:px-4 sm:text-sm
              "
            >
              <span
                className="
                  h-2 w-2 rounded-full
                  bg-[#FF6600]
                "
              />
              Grupo Comercial J&G
            </span>

            <h1
              className="
                mt-5 text-3xl font-black
                leading-tight tracking-tight
                sm:mt-6 sm:text-5xl
                md:text-6xl lg:text-7xl
              "
            >
              Catálogo de
              <span className="block text-[#5FE29C]">Productos</span>
            </h1>

            <p
              className="
                mt-4 max-w-xl text-sm
                leading-relaxed text-gray-200
                sm:mt-6 sm:text-lg
                md:text-xl
              "
            >
              Encuentra maquinaria agrícola, forestal e industrial de marcas
              reconocidas para tus necesidades de trabajo.
            </p>

            <div
              className="
                mt-6 flex flex-col flex-wrap
                gap-3 sm:mt-8 sm:flex-row
                sm:gap-4
              "
            >
              <a
                href="#productos-disponibles"
                className="
                  inline-flex items-center
                  justify-center gap-3
                  rounded-xl bg-[#FF6600]
                  px-6 py-3.5 text-sm
                  font-black text-white
                  transition-all duration-300
                  hover:bg-[#E65C00]
                  sm:px-7 sm:py-4
                "
              >
                Ver productos
                <span aria-hidden="true">→</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center
                  justify-center rounded-xl
                  border border-white/30
                  bg-white/10 px-6 py-3.5
                  text-sm font-black text-white
                  transition-all duration-300
                  hover:bg-white/20
                  sm:px-7 sm:py-4
                "
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section
        className="
          relative z-20 mx-auto
          -mt-5 max-w-7xl px-4
          sm:-mt-10 sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            grid grid-cols-2 gap-2.5
            sm:gap-5 lg:grid-cols-4
          "
        >
          {[
            {
              valor: cargando ? "..." : productos.length,
              titulo: "Productos",
            },
            {
              valor: cargando ? "..." : categorias.length,
              titulo: "Categorías",
            },
            {
              valor: "J&G",
              titulo: "Atención Especializada",
            },
            {
              valor: "Perú",
              titulo: "Cobertura Nacional",
            },
          ].map((item) => (
            <div
              key={item.titulo}
              className="
                relative overflow-hidden
                rounded-2xl border
                border-gray-100 bg-white
                p-3 text-center shadow-md
                sm:rounded-3xl sm:p-6
              "
            >
              <div
                className="
                  absolute inset-x-0 top-0
                  h-1 bg-[#009E49]
                "
              />

              <h3
                className="
                  text-xl font-black text-[#009E49]
                  sm:text-4xl
                "
              >
                {item.valor}
              </h3>

              <p
                className="
                  mt-1 text-[11px]
                  font-semibold leading-snug
                  text-gray-600
                  sm:mt-2 sm:text-sm
                "
              >
                {item.titulo}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTOS DISPONIBLES */}
      <section
        id="productos-disponibles"
        className="
          scroll-mt-40 bg-white
          sm:scroll-mt-28
        "
      >
        <div
          className="
            mx-auto max-w-7xl
            px-4 pb-14 pt-10
            sm:px-6 sm:pb-20 sm:pt-20
            lg:px-8
          "
        >
          {/* TÍTULO DEL CATÁLOGO */}
          <div
            className="
              mb-6 flex flex-col gap-4
              sm:mb-10 sm:flex-row
              sm:items-end sm:justify-between
            "
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span
                  className="
                    h-[3px] w-8
                    rounded-full bg-[#FF6600]
                    sm:w-10
                  "
                />

                <span
                  className="
                    text-xs font-black
                    uppercase tracking-[0.16em]
                    text-[#009E49]
                    sm:text-sm
                  "
                >
                  Nuestro catálogo
                </span>
              </div>

              <h2
                className="
                  mt-3 text-2xl font-black
                  leading-tight text-[#1A1A1A]
                  sm:mt-4 sm:text-4xl
                  lg:text-5xl
                "
              >
                {busquedaURL
                  ? "Resultados de búsqueda"
                  : "Productos disponibles"}
              </h2>

              <p
                className="
                  mt-2 text-sm leading-relaxed
                  text-gray-600
                  sm:mt-3 sm:text-base
                "
              >
                Explora nuestra selección de maquinaria y equipos para el campo
                y la industria.
              </p>

              {/* BÚSQUEDA ACTIVA */}
              {busquedaURL && (
                <div
                  className="
                    mt-4 flex flex-wrap
                    items-center gap-3
                  "
                >
                  <p className="text-sm text-gray-600">
                    Buscando:{" "}
                    <strong className="text-[#009E49]">{busquedaURL}</strong>
                  </p>

                  <button
                    type="button"
                    onClick={quitarBusqueda}
                    className="
                      text-sm font-bold
                      text-[#FF6600]
                      hover:underline
                    "
                  >
                    Quitar búsqueda ×
                  </button>
                </div>
              )}

              {/* CATEGORÍA ACTIVA */}
              {categoriaURL && (
                <div
                  className="
                    mt-3 flex flex-wrap
                    items-center gap-3
                  "
                >
                  <p className="text-sm text-gray-600">
                    Categoría:{" "}
                    <strong className="text-[#009E49]">{categoriaURL}</strong>
                  </p>

                  <button
                    type="button"
                    onClick={verTodos}
                    className="
                      text-sm font-bold
                      text-[#FF6600]
                      hover:underline
                    "
                  >
                    Ver todas
                  </button>
                </div>
              )}
            </div>

            <span
              className="
                self-start whitespace-nowrap
                rounded-full bg-[#E8F7EE]
                px-4 py-2 text-xs
                font-black text-[#00843D]
                sm:self-auto sm:px-5
                sm:py-3 sm:text-sm
              "
            >
              {cargando ? "..." : productosVisibles.length} productos
            </span>
          </div>

          {/* SEPARADOR */}
          <div className="mb-6 flex items-center gap-3 sm:mb-9">
            <div
              className="
                h-1 w-10 rounded-full
                bg-[#009E49] sm:w-14
              "
            />

            <div
              className="
                h-1 w-5 rounded-full
                bg-[#FF6600] sm:w-6
              "
            />

            <div className="h-px flex-1 bg-gray-100" />
          </div>

          {/* ESTADOS */}
          {cargando ? (
            <div
              className="
                flex flex-col items-center
                justify-center py-20
                sm:py-24
              "
            >
              <div
                className="
                  h-12 w-12 animate-spin
                  rounded-full border-4
                  border-[#E8F7EE]
                  border-t-[#009E49]
                "
              />

              <p className="mt-5 font-medium text-gray-500">
                Cargando productos...
              </p>
            </div>
          ) : error ? (
            <div
              role="alert"
              className="
                rounded-2xl border
                border-red-200 bg-red-50
                p-8 text-center text-red-700
              "
            >
              {error}
            </div>
          ) : productosVisibles.length === 0 ? (
            <div
              className="
                rounded-[24px] border
                border-[#DCEFE4]
                bg-[#F7FAF8]
                p-8 text-center
                sm:rounded-[28px] sm:p-16
              "
            >
              <div
                className="
                  mx-auto flex h-20 w-20
                  items-center justify-center
                  rounded-2xl bg-[#E8F7EE]
                  text-4xl text-[#009E49]
                "
              >
                ⌕
              </div>

              <h3
                className="
                  mt-6 text-2xl font-black
                  text-[#1A1A1A]
                  sm:text-3xl
                "
              >
                No encontramos productos
              </h3>

              <p
                className="
                  mx-auto mt-4 max-w-lg
                  text-gray-500
                "
              >
                No hay productos registrados que coincidan con los criterios
                seleccionados.
              </p>

              <button
                type="button"
                onClick={verTodos}
                className="
                  mt-7 rounded-xl
                  bg-[#009E49]
                  px-7 py-3.5 font-black
                  text-white transition-colors
                  hover:bg-[#00843D]
                "
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            /* GRID DE PRODUCTOS */
            <div
              className="
                grid grid-cols-1
                gap-4 sm:grid-cols-2
                sm:gap-6
                lg:grid-cols-3 lg:gap-8
              "
            >
              {productosVisibles.map((producto) => {
                const destacado = productoDestacado === String(producto.id);

                return (
                  <div
                    key={producto.id}
                    id={`producto-${producto.id}`}
                    className={`
                      min-w-0 scroll-mt-40
                      sm:scroll-mt-32
                      ${
                        destacado
                          ? "rounded-3xl ring-4 ring-[#009E49] ring-offset-4"
                          : ""
                      }
                    `}
                  >
                    <TarjetaProducto producto={producto} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ASESORÍA PERSONALIZADA */}
      <section
        className="
          relative overflow-hidden
          bg-[#073D27]
          py-12 text-white
          sm:py-20
        "
      >
        <div
          className="
            pointer-events-none
            absolute -right-32 -top-32
            h-80 w-80 rounded-full
            bg-[#009E49]/30 blur-3xl
          "
        />

        <div
          className="
            relative mx-auto max-w-5xl
            px-5 text-center sm:px-6
          "
        >
          <span
            className="
              text-xs font-black uppercase
              tracking-[0.18em]
              text-[#FFB17A]
              sm:text-sm
            "
          >
            Atención personalizada
          </span>

          <h2
            className="
              mt-4 text-2xl font-black
              leading-tight
              sm:mt-5 sm:text-4xl
              lg:text-5xl
            "
          >
            ¿Necesitas ayuda para
            <span className="block text-[#75E4A4]">elegir tu equipo?</span>
          </h2>

          <p
            className="
              mx-auto mt-4 max-w-2xl
              text-sm leading-relaxed
              text-green-50/80
              sm:mt-6 sm:text-lg
            "
          >
            Te orientamos para encontrar la maquinaria adecuada según el trabajo
            que necesitas realizar.
          </p>

          <a
            href={whatsappAsesoria}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-7 inline-flex items-center
              justify-center gap-3
              rounded-xl bg-[#FF6600]
              px-7 py-3.5 font-black
              text-white shadow-lg
              transition-all duration-300
              hover:bg-[#E65C00]
              sm:mt-9 sm:px-8 sm:py-4
            "
          >
            Solicitar asesoría
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Catalogo;
