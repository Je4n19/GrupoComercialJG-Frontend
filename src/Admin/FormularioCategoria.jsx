import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  crearCategoria,
  actualizarCategoria,
  obtenerCategoriaPorId,
} from "../Services/categoriaService";

function FormularioCategoria() {
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
          const data = await obtenerCategoriaPorId(id);
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
        await actualizarCategoria(id, categoria);
        alert("Categoría actualizada correctamente");
      } else {
        await crearCategoria(categoria);
        alert("Categoría registrada correctamente");
      }

      navigate("/admin/categorias");
    } catch (error) {
      console.error(error);
      alert("Error al guardar categoría");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <MenuAdmin />

      <div className="flex-1 p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">
            {id ? "Editar Categoría" : "Nueva Categoría"}
          </h1>

          <p className="text-gray-500 mb-8">
            Complete la información de la categoría.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="font-semibold block mb-2">Nombre</label>

                <input
                  type="text"
                  name="nombre"
                  value={categoria.nombre}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  placeholder="Ej. Motosierras"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">Descripción</label>

                <textarea
                  rows="5"
                  name="descripcion"
                  value={categoria.descripcion}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  placeholder="Descripción de la categoría..."
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
              >
                {id ? "Actualizar Categoría" : "Guardar Categoría"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/categorias")}
                className="bg-gray-300 px-8 py-3 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioCategoria;
