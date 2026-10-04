import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  guardarRepuesto,
  actualizarRepuesto,
  obtenerRepuestoPorId,
} from "../Services/repuestoService";

import { obtenerCategoriasRepuesto } from "../Services/categoriaRepuestoService";

function FormularioRepuesto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categorias, setCategorias] = useState([]);

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
        setCategorias(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    const cargarRepuesto = async () => {
      if (id) {
        try {
          const data = await obtenerRepuestoPorId(id);
          setRepuesto(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    cargarCategorias();
    cargarRepuesto();
  }, [id]);

  const handleChange = (e) => {
    setRepuesto({
      ...repuesto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.error(error);
      alert("Error al guardar repuesto");
    }
  };

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-h-screen bg-orange-50">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white shadow-2xl">
          <div className="px-10 py-10">
            <p className="uppercase tracking-widest text-orange-100 text-sm">
              Grupo Comercial J&G
            </p>

            <h1 className="text-5xl font-black mt-2">
              {id ? "Editar Repuesto" : "Registrar Repuesto"}
            </h1>

            <p className="text-orange-100 mt-3 text-lg">
              Gestión profesional de repuestos e inventario.
            </p>
          </div>
        </div>

        {/* FORMULARIO */}

        <div className="p-8">
          <div className="max-w-5xl mx-auto bg-white rounded-[30px] shadow-2xl overflow-hidden">
            <div className="bg-orange-500 text-white p-6">
              <h2 className="text-2xl font-bold">Información del Repuesto</h2>

              <p className="text-orange-100 mt-2">
                Complete los datos para registrar o actualizar el repuesto.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold text-gray-700 mb-3">
                    Nombre
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    value={repuesto.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Pistón STIHL MS 250"
                    required
                    className="
                      w-full
                      border-2
                      border-gray-200
                      rounded-2xl
                      p-4
                      focus:outline-none
                      focus:border-orange-500
                    "
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-3">
                    Categoría
                  </label>

                  <select
                    name="categoria"
                    value={repuesto.categoria}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      border-2
                      border-gray-200
                      rounded-2xl
                      p-4
                      focus:outline-none
                      focus:border-orange-500
                    "
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
                  <label className="block font-bold text-gray-700 mb-3">
                    Precio (S/.)
                  </label>

                  <input
                    type="number"
                    name="precio"
                    value={repuesto.precio}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                    className="
                      w-full
                      border-2
                      border-gray-200
                      rounded-2xl
                      p-4
                      focus:outline-none
                      focus:border-orange-500
                    "
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-3">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={repuesto.stock}
                    onChange={handleChange}
                    placeholder="0"
                    required
                    className="
                      w-full
                      border-2
                      border-gray-200
                      rounded-2xl
                      p-4
                      focus:outline-none
                      focus:border-orange-500
                    "
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-gray-700 mb-3">
                    URL de Imagen
                  </label>

                  <input
                    type="text"
                    name="imagen"
                    value={repuesto.imagen}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="
                      w-full
                      border-2
                      border-gray-200
                      rounded-2xl
                      p-4
                      focus:outline-none
                      focus:border-orange-500
                    "
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-gray-700 mb-3">
                    Descripción
                  </label>

                  <textarea
                    rows="6"
                    name="descripcion"
                    value={repuesto.descripcion}
                    onChange={handleChange}
                    placeholder="Describe las características del repuesto..."
                    className="
                      w-full
                      border-2
                      border-gray-200
                      rounded-2xl
                      p-4
                      resize-none
                      focus:outline-none
                      focus:border-orange-500
                    "
                  />
                </div>
              </div>

              {/* BOTONES */}

              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  type="submit"
                  className="
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    px-8
                    py-4
                    rounded-2xl
                    font-bold
                    shadow-lg
                    transition
                  "
                >
                  {id ? "Actualizar Repuesto" : "Guardar Repuesto"}
                </button>

                <Link
                  to="/admin/repuestos"
                  className="
                    bg-gray-200
                    hover:bg-gray-300
                    px-8
                    py-4
                    rounded-2xl
                    font-bold
                    transition
                  "
                >
                  Cancelar
                </Link>
              </div>
            </form>
          </div>

          {/* INFORMACIÓN */}

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
