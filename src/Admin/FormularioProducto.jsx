import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuAdmin from "../Components/MenuAdmin";
import { obtenerProductoPorId } from "../Services/productoService";
import { obtenerCategorias } from "../Services/categoriaService";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/$/, "");

const LIMITE_DESCRIPCION = 5000;
const LIMITE_DATOS_TECNICOS = 10000;

const productoInicial = {
  nombre: "",
  marca: "",
  modelo: "",
  categoria: "",
  precio: "",
  stock: "",
  descripcion: "",
  imagen: "",
  imagen2: "",
  datosTecnicos: "",
};

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#009E49] focus:ring-2 focus:ring-green-100";

const labelClass = "mb-2 block text-sm font-semibold text-[#063D2A]";

function FormularioProducto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [producto, setProducto] = useState(productoInicial);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(Boolean(id));
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarDatos() {
      try {
        const lista = await obtenerCategorias();

        if (activo) {
          setCategorias(Array.isArray(lista) ? lista : []);
        }
      } catch (err) {
        console.error("Error cargando categorías:", err);
      }

      if (!id) return;

      try {
        const data = await obtenerProductoPorId(id);

        if (activo) {
          setProducto({
            ...productoInicial,
            ...data,
            nombre: data.nombre ?? "",
            marca: data.marca ?? "",
            modelo: data.modelo ?? "",
            categoria: data.categoria ?? "",
            precio: data.precio ?? "",
            stock: data.stock ?? "",
            descripcion: data.descripcion ?? "",
            imagen: data.imagen ?? "",
            imagen2: data.imagen2 ?? "",
            datosTecnicos: data.datosTecnicos ?? "",
          });
        }
      } catch (err) {
        console.error("Error cargando producto:", err);

        if (activo) {
          setError("No se pudo cargar el producto.");
        }
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarDatos();

    return () => {
      activo = false;
    };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProducto((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (guardando) return;

    setError("");

    if (producto.descripcion.length > LIMITE_DESCRIPCION) {
      setError("La descripción supera los 5,000 caracteres.");
      return;
    }

    if (producto.datosTecnicos.length > LIMITE_DATOS_TECNICOS) {
      setError("Los datos técnicos superan los 10,000 caracteres.");
      return;
    }

    setGuardando(true);

    try {
      const datosEnviar = {
        ...producto,
        nombre: String(producto.nombre).trim(),
        marca: String(producto.marca).trim(),
        modelo: String(producto.modelo).trim(),
        categoria: producto.categoria,
        precio: Number(producto.precio),
        stock: Number(producto.stock),
        descripcion: producto.descripcion,
        imagen: String(producto.imagen).trim(),
        imagen2: String(producto.imagen2).trim(),
        datosTecnicos: producto.datosTecnicos,
      };

      // Obtener CSRF usando la sesión actual.
      const csrfResponse = await fetch(`${API_URL}/api/auth/csrf`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!csrfResponse.ok) {
        throw new Error(
          `No se pudo obtener CSRF (HTTP ${csrfResponse.status}).`,
        );
      }

      const csrf = await csrfResponse.json();

      if (!csrf.headerName || !csrf.token) {
        throw new Error("El backend no devolvió un token CSRF válido.");
      }

      const url = id
        ? `${API_URL}/api/productos/${encodeURIComponent(id)}`
        : `${API_URL}/api/productos`;

      const respuesta = await fetch(url, {
        method: id ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          [csrf.headerName]: csrf.token,
        },
        body: JSON.stringify(datosEnviar),
      });

      if (!respuesta.ok) {
        if (respuesta.status === 403) {
          throw new Error(
            "Error 403: el servidor rechazó la edición. " +
              "Verifica la sesión, las cookies y el token CSRF.",
          );
        }

        if (respuesta.status === 401) {
          throw new Error("Tu sesión ha expirado. Vuelve a iniciar sesión.");
        }

        throw new Error(
          `No se pudo guardar el producto (HTTP ${respuesta.status}).`,
        );
      }

      alert(
        id
          ? "Producto actualizado correctamente."
          : "Producto registrado correctamente.",
      );

      navigate("/admin/productos");
    } catch (err) {
      console.error("Error guardando producto:", err);

      setError(
        err.message || "No se pudo guardar el producto. Inténtalo nuevamente.",
      );
    } finally {
      setGuardando(false);
    }
  };

  const caracteresDescripcion = (producto.descripcion || "").length;

  const caracteresTecnicos = (producto.datosTecnicos || "").length;

  const especificaciones = (producto.datosTecnicos || "")
    .split("\n")
    .map((linea) => {
      const posicion = linea.indexOf(":");

      if (posicion === -1) return null;

      const nombre = linea.slice(0, posicion).trim();
      const valor = linea.slice(posicion + 1).trim();

      if (!nombre || !valor) return null;

      return { nombre, valor };
    })
    .filter(Boolean);

  if (cargando) {
    return (
      <div className="flex min-h-screen">
        <MenuAdmin />

        <main className="flex min-h-screen flex-1 items-center justify-center bg-[#F1F7F3]">
          <p className="font-semibold text-[#063D2A]">Cargando producto...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <MenuAdmin />

      <main className="min-w-0 flex-1 bg-[#F1F7F3]">
        {/* ENCABEZADO */}
        <header className="bg-gradient-to-r from-[#063D2A] via-[#075E3B] to-[#009E49] px-6 py-8 text-white shadow-lg md:px-10">
          <p className="text-xs font-bold uppercase tracking-widest text-green-100">
            Grupo Comercial J&G
          </p>

          <h1 className="mt-2 text-2xl font-bold md:text-3xl">
            {id ? "Editar Producto" : "Registrar Producto"}
          </h1>

          <p className="mt-2 text-sm text-green-100">
            Gestión de maquinaria y equipos comerciales.
          </p>
        </header>

        <div className="p-4 md:p-8">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="bg-[#063D2A] px-6 py-4 text-white md:px-8">
              <h2 className="text-lg font-bold md:text-xl">
                Información del Producto
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-9 p-5 md:p-8">
              {/* INFORMACIÓN PRINCIPAL */}
              <section>
                <h3 className="mb-5 text-lg font-bold text-[#063D2A]">
                  Datos principales
                </h3>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Nombre del Producto</label>

                    <input
                      type="text"
                      name="nombre"
                      value={producto.nombre}
                      onChange={handleChange}
                      placeholder="Ej. Motosierra STIHL MS 250"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Marca</label>

                    <input
                      type="text"
                      name="marca"
                      value={producto.marca}
                      onChange={handleChange}
                      placeholder="Ej. STIHL"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Modelo</label>

                    <input
                      type="text"
                      name="modelo"
                      value={producto.modelo}
                      onChange={handleChange}
                      placeholder="Ej. MS 250"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Categoría</label>

                    <select
                      name="categoria"
                      value={producto.categoria}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      <option value="">Seleccione una categoría</option>

                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.nombre}>
                          {categoria.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Precio (S/)</label>

                    <input
                      type="number"
                      name="precio"
                      value={producto.precio}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Stock Disponible</label>

                    <input
                      type="number"
                      name="stock"
                      value={producto.stock}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="1"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </section>

              {/* FOTOGRAFÍAS */}
              <section className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-bold text-[#063D2A]">
                  Fotografías del Producto
                </h3>

                <p className="mb-5 mt-2 text-sm text-gray-500">
                  Agrega las URLs de dos fotografías del mismo producto. Se
                  mostrarán en una galería con flechas y miniaturas.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Imagen principal (URL)</label>

                    <input
                      type="url"
                      name="imagen"
                      value={producto.imagen}
                      onChange={handleChange}
                      placeholder="https://ejemplo.com/imagen1.jpg"
                      className={inputClass}
                    />

                    <div className="mt-3 flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      {producto.imagen ? (
                        <img
                          src={producto.imagen}
                          alt="Vista previa imagen principal"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <p className="text-sm text-gray-400">
                          📷 Primera fotografía
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Segunda imagen (URL)</label>

                    <input
                      type="url"
                      name="imagen2"
                      value={producto.imagen2}
                      onChange={handleChange}
                      placeholder="https://ejemplo.com/imagen2.jpg"
                      className={inputClass}
                    />

                    <div className="mt-3 flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-4">
                      {producto.imagen2 ? (
                        <img
                          src={producto.imagen2}
                          alt="Vista previa segunda imagen"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <p className="text-sm text-gray-400">
                          📷 Segunda fotografía
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-500">
                  Utiliza enlaces públicos de imágenes. No es necesario que
                  ambas fotografías tengan las mismas dimensiones.
                </p>
              </section>

              {/* DESCRIPCIÓN */}
              <section className="border-t border-gray-200 pt-8">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-[#063D2A]">
                    Descripción del Producto
                  </h3>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-[#009E49]">
                    Hasta 5,000 caracteres
                  </span>
                </div>

                <p className="mb-4 text-sm text-gray-500">
                  Describe las características, beneficios y recomendaciones de
                  uso del producto.
                </p>

                <textarea
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={handleChange}
                  maxLength={LIMITE_DESCRIPCION}
                  rows={10}
                  placeholder={`Escribe la descripción completa...

Características principales:
-
-

Beneficios:
-
-

Recomendaciones de uso:
-`}
                  className="min-h-[260px] w-full resize-y rounded-2xl border-2 border-gray-200 p-4 text-sm leading-7 text-gray-800 outline-none transition focus:border-[#009E49] focus:ring-2 focus:ring-green-100"
                />

                <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-gray-500">
                  <p>Puedes utilizar saltos de línea y listas.</p>

                  <p className="font-semibold">
                    {caracteresDescripcion.toLocaleString("es-PE")}
                    {" / "}5,000 caracteres
                  </p>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#009E49] transition-all"
                    style={{
                      width: `${
                        (caracteresDescripcion / LIMITE_DESCRIPCION) * 100
                      }%`,
                    }}
                  />
                </div>
              </section>

              {/* DATOS TÉCNICOS */}
              <section className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-bold text-[#063D2A]">
                  Datos Técnicos
                </h3>

                <p className="mb-4 mt-2 text-sm text-gray-500">
                  Escribe una característica por línea, separando el nombre y su
                  valor con dos puntos (:). Estos datos aparecerán en una tabla
                  en la página del producto.
                </p>

                <textarea
                  name="datosTecnicos"
                  value={producto.datosTecnicos}
                  onChange={handleChange}
                  maxLength={LIMITE_DATOS_TECNICOS}
                  rows={9}
                  placeholder={`Marca: STIHL
Modelo: MS 250
Motor: 2 tiempos
Potencia: 3.1 HP
Cilindrada: 45.4 cm³
Peso: 4.6 kg
Longitud de corte: 18 pulgadas
Garantía: 1 año`}
                  className="min-h-[220px] w-full resize-y rounded-2xl border-2 border-gray-200 p-4 text-sm leading-7 text-gray-800 outline-none transition focus:border-[#009E49] focus:ring-2 focus:ring-green-100"
                />

                <div className="mt-2 flex justify-between gap-3 text-xs text-gray-500">
                  <p>Ejemplo: Potencia: 3.1 HP</p>

                  <p className="font-semibold">
                    {caracteresTecnicos.toLocaleString("es-PE")}
                    {" / "}10,000
                  </p>
                </div>

                {especificaciones.length > 0 && (
                  <div className="mt-6">
                    <h4 className="mb-3 text-sm font-bold text-[#063D2A]">
                      Vista previa de especificaciones
                    </h4>

                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      {especificaciones.map((dato, index) => (
                        <div
                          key={`${dato.nombre}-${index}`}
                          className={`grid grid-cols-2 text-sm ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <div className="break-words border-b border-r border-gray-200 px-4 py-3 font-semibold text-[#063D2A]">
                            {dato.nombre}
                          </div>

                          <div className="break-words border-b border-gray-200 px-4 py-3 text-gray-600">
                            {dato.valor}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* VISTA PREVIA GENERAL */}
              <section className="rounded-2xl border border-green-200 bg-[#F1F7F3] p-5 md:p-6">
                <h3 className="mb-5 text-lg font-bold text-[#009E49]">
                  Vista Previa del Producto
                </h3>

                <div className="grid gap-5 text-sm md:grid-cols-2">
                  <div className="space-y-2">
                    <p>
                      <strong>Producto:</strong> {producto.nombre || "-"}
                    </p>

                    <p>
                      <strong>Marca:</strong> {producto.marca || "-"}
                    </p>

                    <p>
                      <strong>Modelo:</strong> {producto.modelo || "-"}
                    </p>

                    <p>
                      <strong>Categoría:</strong> {producto.categoria || "-"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p>
                      <strong>Precio:</strong> S/ {producto.precio || "0"}
                    </p>

                    <p>
                      <strong>Stock:</strong>{" "}
                      {producto.stock === "" ? "0" : producto.stock}
                    </p>

                    <p>
                      <strong>Fotografías:</strong>{" "}
                      {
                        [producto.imagen, producto.imagen2].filter(Boolean)
                          .length
                      }{" "}
                      registradas
                    </p>

                    <p>
                      <strong>Datos técnicos:</strong> {especificaciones.length}{" "}
                      características
                    </p>
                  </div>
                </div>

                {producto.descripcion && (
                  <div className="mt-5 border-t border-green-200 pt-5">
                    <h4 className="mb-2 text-sm font-bold text-[#063D2A]">
                      Descripción:
                    </h4>

                    <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-700">
                      {producto.descripcion}
                    </p>
                  </div>
                )}
              </section>

              {/* MENSAJE DE ERROR */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700"
                >
                  {error}
                </div>
              )}

              {/* BOTONES */}
              <div className="flex flex-wrap gap-4">
                <button
                  type="submit"
                  disabled={guardando}
                  className="rounded-xl bg-[#FF6600] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#E85D00] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {guardando
                    ? "Guardando..."
                    : id
                      ? "Actualizar Producto"
                      : "Guardar Producto"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/admin/productos")}
                  disabled={guardando}
                  className="rounded-xl bg-gray-200 px-7 py-3 text-sm font-bold text-gray-800 transition hover:bg-gray-300 disabled:opacity-60"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FormularioProducto;
