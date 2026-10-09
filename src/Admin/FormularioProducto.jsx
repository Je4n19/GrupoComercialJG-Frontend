import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  guardarProducto,
  actualizarProducto,
  obtenerProductoPorId,
} from "../Services/productoService";

import { obtenerCategorias } from "../Services/categoriaService";

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

function FormularioProducto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categorias, setCategorias] = useState([]);
  const [guardando, setGuardando] = useState(false);
  const [cargando, setCargando] = useState(Boolean(id));

  const [producto, setProducto] = useState(productoInicial);

  useEffect(() => {
    let activo = true;

    const cargarDatos = async () => {
      try {
        const dataCategorias = await obtenerCategorias();

        if (activo) {
          setCategorias(Array.isArray(dataCategorias) ? dataCategorias : []);
        }
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }

      if (id) {
        try {
          const data = await obtenerProductoPorId(id);

          if (activo) {
            setProducto({
              ...productoInicial,
              ...data,
              descripcion: data.descripcion || "",
              imagen: data.imagen || "",
              imagen2: data.imagen2 || "",
              modelo: data.modelo || "",
              datosTecnicos: data.datosTecnicos || "",
            });
          }
        } catch (error) {
          console.error("Error cargando producto:", error);

          if (activo) {
            alert("No se pudo cargar el producto.");
          }
        } finally {
          if (activo) setCargando(false);
        }
      }
    };

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (guardando) return;

    if ((producto.descripcion || "").length > LIMITE_DESCRIPCION) {
      alert("La descripción supera los 5,000 caracteres.");
      return;
    }

    if ((producto.datosTecnicos || "").length > LIMITE_DATOS_TECNICOS) {
      alert("Los datos técnicos superan los 10,000 caracteres.");
      return;
    }

    setGuardando(true);

    try {
      const datosEnviar = {
        ...producto,
        nombre: producto.nombre.trim(),
        marca: producto.marca.trim(),
        modelo: producto.modelo.trim(),
        categoria: producto.categoria,
        precio: Number(producto.precio),
        stock: Number(producto.stock),
        descripcion: producto.descripcion,
        imagen: producto.imagen.trim(),
        imagen2: producto.imagen2.trim(),
        datosTecnicos: producto.datosTecnicos,
      };

      if (id) {
        await actualizarProducto(id, datosEnviar);
        alert("Producto actualizado correctamente.");
      } else {
        await guardarProducto(datosEnviar);
        alert("Producto registrado correctamente.");
      }

      navigate("/admin/productos");
    } catch (error) {
      console.error("Error al guardar producto:", error);

      alert(
        "No se pudo guardar el producto. Verifica la conexión con el backend y los campos de la base de datos.",
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

  const inputClass =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none transition bg-white";

  const labelClass = "block mb-2 font-semibold text-sm text-gray-700";

  if (cargando) {
    return (
      <div className="flex">
        <MenuAdmin />

        <div className="flex-1 min-h-screen flex items-center justify-center bg-orange-50">
          <p className="text-gray-600 font-semibold">Cargando producto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-w-0 min-h-screen bg-orange-50">
        {/* ENCABEZADO */}
        <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white shadow-lg">
          <div className="px-6 md:px-10 py-8">
            <p className="uppercase tracking-widest text-orange-100 text-xs">
              Grupo Comercial J&G
            </p>

            <h1 className="text-2xl md:text-3xl font-bold mt-2">
              {id ? "Editar Producto" : "Registrar Producto"}
            </h1>

            <p className="text-orange-100 mt-2 text-sm">
              Gestión de maquinaria y equipos comerciales.
            </p>
          </div>
        </div>

        <div className="p-4 md:p-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-orange-500 text-white px-6 md:px-8 py-4">
              <h2 className="text-lg md:text-xl font-bold">
                Información del Producto
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-5 md:p-8">
              {/* DATOS PRINCIPALES */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Nombre del Producto</label>

                  <input
                    type="text"
                    name="nombre"
                    value={producto.nombre || ""}
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
                    value={producto.marca || ""}
                    onChange={handleChange}
                    placeholder="Ej. STIHL"
                    className={inputClass}
                    required
                  />
                </div>

                {/* MODELO */}
                <div>
                  <label className={labelClass}>Modelo</label>

                  <input
                    type="text"
                    name="modelo"
                    value={producto.modelo || ""}
                    onChange={handleChange}
                    placeholder="Ej. MS 250"
                    className={inputClass}
                  />
                </div>

                {/* CATEGORÍA */}
                <div>
                  <label className={labelClass}>Categoría</label>

                  <select
                    name="categoria"
                    value={producto.categoria || ""}
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

                {/* PRECIO */}
                <div>
                  <label className={labelClass}>Precio (S/)</label>

                  <input
                    type="number"
                    name="precio"
                    value={producto.precio ?? ""}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={inputClass}
                    required
                  />
                </div>

                {/* STOCK */}
                <div>
                  <label className={labelClass}>Stock Disponible</label>

                  <input
                    type="number"
                    name="stock"
                    value={producto.stock ?? ""}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="1"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* FOTOGRAFÍAS */}
              <div className="mt-9 border-t border-gray-200 pt-8">
                <h3 className="text-lg font-bold text-gray-900">
                  Fotografías del Producto
                </h3>

                <p className="text-sm text-gray-500 mt-2 mb-5">
                  Agrega las URLs de dos fotografías del mismo producto. Se
                  mostrarán en una galería con flechas y miniaturas.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* IMAGEN 1 */}
                  <div>
                    <label className={labelClass}>Imagen principal (URL)</label>

                    <input
                      type="url"
                      name="imagen"
                      value={producto.imagen || ""}
                      onChange={handleChange}
                      placeholder="https://ejemplo.com/imagen1.jpg"
                      className={inputClass}
                    />

                    <div className="mt-3 h-56 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center overflow-hidden p-4">
                      {producto.imagen ? (
                        <img
                          src={producto.imagen}
                          alt="Vista previa imagen principal"
                          className="w-full h-full object-contain object-center"
                        />
                      ) : (
                        <div className="text-center text-gray-400">
                          <p className="text-3xl mb-2">📷</p>
                          <p className="text-sm">Primera fotografía</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* IMAGEN 2 */}
                  <div>
                    <label className={labelClass}>Segunda imagen (URL)</label>

                    <input
                      type="url"
                      name="imagen2"
                      value={producto.imagen2 || ""}
                      onChange={handleChange}
                      placeholder="https://ejemplo.com/imagen2.jpg"
                      className={inputClass}
                    />

                    <div className="mt-3 h-56 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center overflow-hidden p-4">
                      {producto.imagen2 ? (
                        <img
                          src={producto.imagen2}
                          alt="Vista previa segunda imagen"
                          className="w-full h-full object-contain object-center"
                        />
                      ) : (
                        <div className="text-center text-gray-400">
                          <p className="text-3xl mb-2">📷</p>
                          <p className="text-sm">Segunda fotografía</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Utiliza enlaces públicos de imágenes. No es necesario que
                  ambas fotografías tengan las mismas dimensiones.
                </p>
              </div>

              {/* DESCRIPCIÓN */}
              <div className="mt-9 border-t border-gray-200 pt-8">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="descripcion-producto"
                    className="font-bold text-gray-800 text-lg"
                  >
                    Descripción del Producto
                  </label>

                  <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full">
                    Hasta 5,000 caracteres
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  Describe las características, beneficios y recomendaciones de
                  uso del producto.
                </p>

                <textarea
                  id="descripcion-producto"
                  name="descripcion"
                  value={producto.descripcion || ""}
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
- `}
                  className="w-full min-h-[260px] border-2 border-gray-200 rounded-2xl p-4 text-sm text-gray-800 leading-7 resize-y focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                />

                <div className="flex flex-wrap justify-between items-center gap-2 mt-2">
                  <p className="text-xs text-gray-500">
                    Puedes utilizar saltos de línea y listas.
                  </p>

                  <span
                    className={`text-sm font-bold ${
                      caracteresDescripcion >= 4500
                        ? "text-orange-600"
                        : "text-gray-500"
                    }`}
                  >
                    {caracteresDescripcion.toLocaleString("es-PE")}
                    {" / "}5,000 caracteres
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all duration-200"
                    style={{
                      width: `${
                        (caracteresDescripcion / LIMITE_DESCRIPCION) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* DATOS TÉCNICOS */}
              <div className="mt-9 border-t border-gray-200 pt-8">
                <h3 className="text-lg font-bold text-gray-900">
                  Datos Técnicos
                </h3>

                <p className="text-sm text-gray-500 mt-2 mb-4">
                  Escribe una característica por línea, separando el nombre y su
                  valor con dos puntos (:). Estos datos aparecerán en una tabla
                  en la página del producto.
                </p>

                <textarea
                  name="datosTecnicos"
                  value={producto.datosTecnicos || ""}
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
                  className="w-full min-h-[220px] border-2 border-gray-200 rounded-2xl p-4 text-sm text-gray-800 leading-7 resize-y focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                />

                <div className="flex justify-between gap-3 mt-2">
                  <p className="text-xs text-gray-500">
                    Ejemplo: Potencia: 3.1 HP
                  </p>

                  <span className="text-xs font-semibold text-gray-500">
                    {caracteresTecnicos.toLocaleString("es-PE")}
                    {" / "}10,000
                  </span>
                </div>

                {/* VISTA PREVIA DE LA TABLA */}
                {especificaciones.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-bold text-gray-800 mb-3">
                      Vista previa de especificaciones
                    </h4>

                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      {especificaciones.map((dato, index) => (
                        <div
                          key={`${dato.nombre}-${index}`}
                          className={`grid grid-cols-2 text-sm ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <div className="px-4 py-3 border-r border-b border-gray-200 font-semibold text-gray-700 break-words">
                            {dato.nombre}
                          </div>

                          <div className="px-4 py-3 border-b border-gray-200 text-gray-600 break-words">
                            {dato.valor}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* VISTA PREVIA GENERAL */}
              <div className="mt-9 bg-orange-50 border border-orange-200 rounded-2xl p-5 md:p-6">
                <h3 className="font-bold text-lg text-orange-600 mb-5">
                  Vista Previa del Producto
                </h3>

                <div className="grid md:grid-cols-2 gap-5 text-sm">
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
                      <strong>Stock:</strong> {producto.stock ?? "0"}
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
                  <div className="mt-5 pt-5 border-t border-orange-200">
                    <h4 className="font-bold text-gray-800 mb-2 text-sm">
                      Descripción:
                    </h4>

                    <p className="text-sm text-gray-700 leading-7 whitespace-pre-wrap break-words">
                      {producto.descripcion}
                    </p>
                  </div>
                )}
              </div>

              {/* BOTONES */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  type="submit"
                  disabled={guardando}
                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-7 py-3 rounded-xl text-sm font-bold transition"
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
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-7 py-3 rounded-xl text-sm font-bold transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioProducto;
