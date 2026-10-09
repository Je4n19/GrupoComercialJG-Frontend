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

function FormularioProducto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categorias, setCategorias] = useState([]);
  const [guardando, setGuardando] = useState(false);

  const [producto, setProducto] = useState({
    nombre: "",
    marca: "",
    categoria: "",
    precio: "",
    stock: "",
    descripcion: "",
    imagen: "",
  });

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    const cargarProducto = async () => {
      if (id) {
        try {
          const data = await obtenerProductoPorId(id);

          setProducto({
            nombre: "",
            marca: "",
            categoria: "",
            precio: "",
            stock: "",
            descripcion: "",
            imagen: "",
            ...data,
            descripcion: data.descripcion || "",
          });
        } catch (error) {
          console.error("Error cargando producto:", error);
        }
      }
    };

    cargarCategorias();
    cargarProducto();
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

    if ((producto.descripcion || "").length > LIMITE_DESCRIPCION) {
      alert("La descripción supera los 5000 caracteres.");
      return;
    }

    setGuardando(true);

    try {
      if (id) {
        await actualizarProducto(id, producto);
        alert("Producto actualizado correctamente");
      } else {
        await guardarProducto(producto);
        alert("Producto registrado correctamente");
      }

      navigate("/admin/productos");
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert(
        "Error al guardar producto. Verifica que el backend y la base de datos permitan descripciones largas.",
      );
    } finally {
      setGuardando(false);
    }
  };

  const caracteres = (producto.descripcion || "").length;

  const inputClass =
    "w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none transition";

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-w-0 min-h-screen bg-orange-50">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white shadow-2xl">
          <div className="px-6 md:px-10 py-10">
            <p className="uppercase tracking-widest text-orange-100 text-sm">
              Grupo Comercial J&G
            </p>

            <h1 className="text-3xl md:text-5xl font-bold mt-2">
              {id ? "Editar Producto" : "Registrar Producto"}
            </h1>

            <p className="text-orange-100 mt-3 text-base md:text-lg">
              Gestión de maquinaria y equipos comerciales.
            </p>
          </div>
        </div>

        <div className="p-4 md:p-8">
          <div className="bg-white rounded-[30px] shadow-2xl overflow-hidden">
            <div className="bg-orange-500 text-white px-6 md:px-8 py-5">
              <h2 className="text-xl md:text-2xl font-bold">
                Información del Producto
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-5 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* NOMBRE */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Nombre del Producto
                  </label>

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

                {/* MARCA */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Marca
                  </label>

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

                {/* CATEGORÍA */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Categoría
                  </label>

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
                  <label className="block mb-2 font-semibold text-gray-700">
                    Precio (S/)
                  </label>

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
                  <label className="block mb-2 font-semibold text-gray-700">
                    Stock Disponible
                  </label>

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

                {/* IMAGEN */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Imagen URL
                  </label>

                  <input
                    type="text"
                    name="imagen"
                    value={producto.imagen || ""}
                    onChange={handleChange}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
              </div>

              {/* =========================
                  DESCRIPCIÓN AMPLIADA
              ========================== */}
              <div className="mt-8">
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
                  Puedes incluir características, especificaciones técnicas,
                  beneficios, recomendaciones de uso y detalles adicionales.
                </p>

                <textarea
                  id="descripcion-producto"
                  name="descripcion"
                  value={producto.descripcion || ""}
                  onChange={handleChange}
                  maxLength={LIMITE_DESCRIPCION}
                  rows={12}
                  placeholder={`Escribe aquí la descripción completa...

Características principales:
- 
- 

Especificaciones técnicas:
- 
- 

Beneficios:
- 
- 

Recomendaciones de uso:
- `}
                  className="
                    w-full
                    min-h-[300px]
                    border-2 border-gray-200
                    rounded-2xl
                    p-5
                    text-gray-800
                    leading-relaxed
                    resize-y
                    focus:outline-none
                    focus:border-orange-500
                    focus:ring-2
                    focus:ring-orange-100
                    transition
                  "
                />

                <div className="flex flex-wrap justify-between items-center gap-2 mt-2">
                  <p className="text-xs text-gray-500">
                    Puedes utilizar saltos de línea y listas para organizar la
                    información.
                  </p>

                  <span
                    className={`text-sm font-bold ${
                      caracteres >= 4500 ? "text-orange-600" : "text-gray-500"
                    }`}
                  >
                    {caracteres.toLocaleString("es-PE")} / 5,000 caracteres
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all duration-200"
                    style={{
                      width: `${Math.min(
                        (caracteres / LIMITE_DESCRIPCION) * 100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* =========================
                  VISTA PREVIA
              ========================== */}
              <div className="mt-8 bg-orange-50 border border-orange-200 rounded-3xl p-6">
                <h3 className="font-bold text-xl text-orange-600 mb-4">
                  Vista Previa
                </h3>

                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-2">
                    <p>
                      <strong>Producto:</strong> {producto.nombre || "-"}
                    </p>

                    <p>
                      <strong>Marca:</strong> {producto.marca || "-"}
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
                      <strong>Stock:</strong> {producto.stock || "0"}
                    </p>
                  </div>
                </div>

                {producto.descripcion && (
                  <div className="mt-5 pt-5 border-t border-orange-200">
                    <h4 className="font-bold text-gray-800 mb-2">
                      Descripción:
                    </h4>

                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
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
                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-bold transition"
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
                  className="bg-gray-300 hover:bg-gray-400 px-8 py-4 rounded-2xl font-bold transition"
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
