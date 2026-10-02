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
        setCategorias(data);
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

      <div className="flex-1 min-h-screen bg-gray-100">
        <div className="bg-orange-600 text-white p-6 shadow-lg">
          <h1 className="text-3xl font-bold">
            {id ? "Editar Repuesto" : "Registrar Repuesto"}
          </h1>

          <p className="mt-2">Gestión de repuestos de JyG Maquinarias</p>
        </div>

        <div className="max-w-5xl mx-auto p-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">Nombre</label>

                  <input
                    type="text"
                    name="nombre"
                    value={repuesto.nombre}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Categoría</label>

                  <select
                    name="categoria"
                    value={repuesto.categoria}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg"
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
                  <label className="block font-semibold mb-2">Precio</label>

                  <input
                    type="number"
                    name="precio"
                    value={repuesto.precio}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Stock</label>

                  <input
                    type="number"
                    name="stock"
                    value={repuesto.stock}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Imagen URL</label>

                  <input
                    type="text"
                    name="imagen"
                    value={repuesto.imagen}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold mb-2">
                    Descripción
                  </label>

                  <textarea
                    rows="4"
                    name="descripcion"
                    value={repuesto.descripcion}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  {id ? "Actualizar Repuesto" : "Guardar Repuesto"}
                </button>

                <Link
                  to="/admin/repuestos"
                  className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioRepuesto;
