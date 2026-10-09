import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  guardarRepuesto,
  actualizarRepuesto,
  obtenerRepuestoPorId,
} from "../Services/repuestoService";

import { obtenerCategoriasRepuesto } from "../Services/categoriaRepuestoService";

const LIMITE_DESCRIPCION = 5000;

function FormularioRepuesto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categorias, setCategorias] = useState([]);
  const [guardando, setGuardando] = useState(false);

  const [repuesto, setRepuesto] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    descripcion: "",
    imagen: "",
  });

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await obtenerCategoriasRepuesto();
        setCategorias(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    const cargarRepuesto = async () => {
      if (id) {
        try {
          const data = await obtenerRepuestoPorId(id);

          setRepuesto({
            nombre: "",
            categoria: "",
            precio: "",
            stock: "",
            descripcion: "",
            imagen: "",
            ...data,
            descripcion: data.descripcion || "",
          });
        } catch (error) {
          console.error("Error cargando repuesto:", error);
        }
      }
    };

    cargarCategorias();
    cargarRepuesto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRepuesto((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((repuesto.descripcion || "").length > LIMITE_DESCRIPCION) {
      alert("La descripción supera los 5000 caracteres.");
      return;
    }

    setGuardando(true);

    try {
      if (id) {
        await actualizarRepuesto(id, repuesto);
        alert("Repuesto actualizado correctamente");
      } else {
        await guardarRepuesto(repuesto);
        alert("Repuesto registrado correctamente");
      }

      navigate("/admin/repuestos");
    } catch (error) {
      console.error("Error al guardar repuesto:", error);
      alert(
        "Error al guardar repuesto. Verifica que el backend y la base de datos permitan descripciones largas.",
      );
    } finally {
      setGuardando(false);
    }
  };

  const caracteres = (repuesto.descripcion || "").length;

  const inputClass =
    "w-full border-2 border-gray-200 rounded-2xl p-4 focus:outline-none focus:border-orange-500 transition";

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

            <h1 className="text-3xl md:text-5xl font-black mt-2">
              {id ? "Editar Repuesto" : "Registrar Repuesto"}
            </h1>

            <p className="text-orange-100 mt-3 text-base md:text-lg">
              Gestión profesional de repuestos e inventario.
            </p>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="p-4 md:p-8">
          <div className="max-w-5xl mx-auto bg-white rounded-[30px] shadow-2xl overflow-hidden">
            <div className="bg-orange-500 text-white p-6">
              <h2 className="text-2xl font-bold">Información del Repuesto</h2>

              <p className="text-orange-100 mt-2">
                Complete los datos para registrar o actualizar el repuesto.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-5 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* NOMBRE */}
                <div>
                  <label className="block font-bold text-gray-700 mb-3">
                    Nombre
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    value={repuesto.nombre || ""}
                    onChange={handleChange}
                    placeholder="Ej. Pistón STIHL MS 250"
                    required
                    className={inputClass}
                  />
                </div>

                {/* CATEGORÍA */}
                <div>
                  <label className="block font-bold text-gray-700 mb-3">
                    Categoría
                  </label>

                  <select
                    name="categoria"
                    value={repuesto.categoria || ""}
                    onChange={handleChange}
                    required
                    className={inputClass}
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
                  <label className="block font-bold text-gray-700 mb-3">
                    Precio (S/)
                  </label>

                  <input
                    type="number"
                    name="precio"
                    value={repuesto.precio ?? ""}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                    className={inputClass}
                  />
                </div>

                {/* STOCK */}
                <div>
                  <label className="block font-bold text-gray-700 mb-3">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={repuesto.stock ?? ""}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="1"
                    required
                    className={inputClass}
                  />
                </div>

                {/* IMAGEN */}
                <div className="md:col-span-2">
                  <label className="block font-bold text-gray-700 mb-3">
                    URL de Imagen
                  </label>

                  <input
                    type="text"
                    name="imagen"
                    value={repuesto.imagen || ""}
                    onChange={handleChange}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>

                {/* =========================
                    DESCRIPCIÓN AMPLIADA
                ========================== */}
                <div className="md:col-span-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <label
                      htmlFor="descripcion-repuesto"
                      className="block font-bold text-gray-800 text-lg"
                    >
                      Descripción del Repuesto
                    </label>

                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full">
                      Hasta 5,000 caracteres
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    Agrega información sobre compatibilidad, materiales,
                    características técnicas, instalación y recomendaciones.
                  </p>

                  <textarea
                    id="descripcion-repuesto"
                    name="descripcion"
                    value={repuesto.descripcion || ""}
                    onChange={handleChange}
                    maxLength={LIMITE_DESCRIPCION}
                    rows={12}
                    placeholder={`Escribe aquí la descripción completa...

Características del repuesto:
- 
- 

Modelos compatibles:
- 
- 

Especificaciones técnicas:
- 
- 

Recomendaciones:
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
                      Puedes escribir párrafos, listas y especificaciones en
                      diferentes líneas.
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
                      <strong>Repuesto:</strong> {repuesto.nombre || "-"}
                    </p>

                    <p>
                      <strong>Categoría:</strong> {repuesto.categoria || "-"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p>
                      <strong>Precio:</strong> S/ {repuesto.precio || "0"}
                    </p>

                    <p>
                      <strong>Stock:</strong> {repuesto.stock || "0"}
                    </p>
                  </div>
                </div>

                {repuesto.descripcion && (
                  <div className="mt-5 pt-5 border-t border-orange-200">
                    <h4 className="font-bold text-gray-800 mb-2">
                      Descripción:
                    </h4>

                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                      {repuesto.descripcion}
                    </p>
                  </div>
                )}
              </div>

              {/* BOTONES */}
              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  type="submit"
                  disabled={guardando}
                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
                >
                  {guardando
                    ? "Guardando..."
                    : id
                      ? "Actualizar Repuesto"
                      : "Guardar Repuesto"}
                </button>

                <Link
                  to="/admin/repuestos"
                  className="bg-gray-200 hover:bg-gray-300 px-8 py-4 rounded-2xl font-bold transition"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          </div>

          {/* CONSEJO DE GESTIÓN */}
          <div className="max-w-5xl mx-auto mt-8">
            <div className="bg-white rounded-[30px] shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Consejo de Gestión
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Mantén actualizado el stock de repuestos para evitar quiebres de
                inventario y mejorar la atención a los clientes de Grupo
                Comercial J&G.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioRepuesto;
