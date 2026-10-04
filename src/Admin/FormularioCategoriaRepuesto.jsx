import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  crearCategoriaRepuesto,
  actualizarCategoriaRepuesto,
  obtenerCategoriaRepuestoPorId,
} from "../Services/categoriaRepuestoService";

function FormularioCategoriaRepuesto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    const cargarCategoria = async () => {
      if (id) {
        try {
          const data = await obtenerCategoriaRepuestoPorId(id);
          setCategoria(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    cargarCategoria();
  }, [id]);

  const handleChange = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await actualizarCategoriaRepuesto(id, categoria);
        alert("Categoría de repuesto actualizada correctamente");
      } else {
        await crearCategoriaRepuesto(categoria);
        alert("Categoría de repuesto registrada correctamente");
      }

      navigate("/admin/categorias-repuesto");
    } catch (error) {
      console.error(error);
      alert("Error al guardar categoría");
    }
  };

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-h-screen bg-orange-50">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white shadow-xl">
          <div className="px-10 py-10">
            <p className="uppercase tracking-widest text-orange-100 text-sm">
              Grupo Comercial J&G
            </p>

            <h1 className="text-5xl font-black mt-2">
              {id
                ? "Editar Categoría de Repuesto"
                : "Nueva Categoría de Repuesto"}
            </h1>

            <p className="text-orange-100 mt-3 text-lg">
              Organización y gestión de categorías para repuestos.
            </p>
          </div>
        </div>

        {/* FORMULARIO */}

        <div className="p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-[30px] shadow-2xl overflow-hidden">
            <div className="bg-orange-500 text-white p-6">
              <h2 className="text-2xl font-bold">
                Información de la Categoría
              </h2>

              <p className="text-orange-100 mt-2">
                Complete los datos necesarios para registrar la categoría.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-8">
                <div>
                  <label className="block font-bold text-gray-700 mb-3">
                    Nombre de la Categoría
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    value={categoria.nombre}
                    onChange={handleChange}
                    placeholder="Ejemplo: Pistones"
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
                    Descripción
                  </label>

                  <textarea
                    rows="6"
                    name="descripcion"
                    value={categoria.descripcion}
                    onChange={handleChange}
                    placeholder="Describe esta categoría de repuestos..."
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
                    transition
                  "
                >
                  {id ? "Actualizar Categoría" : "Guardar Categoría"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/admin/categorias-repuesto")}
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
                </button>
              </div>
            </form>
          </div>

          {/* INFORMACIÓN */}

          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-white rounded-[30px] shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Recomendación
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Mantén una estructura clara de categorías para facilitar la
                búsqueda de repuestos y mejorar la organización del inventario
                de Grupo Comercial J&G.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioCategoriaRepuesto;
