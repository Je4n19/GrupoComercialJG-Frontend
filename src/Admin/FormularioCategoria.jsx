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

  const grupos = [
    "AGROINDUSTRIA",
    "COMPRESORAS DE AIRE",
    "ELECTROBOMBAS",
    "GENERADORES",
    "HERRAMIENTAS ELÉCTRICAS",
    "JARDINERÍA",
    "LIMPIEZA INDUSTRIAL",
    "MOTORES",
    "MOTOBOMBAS",
    "SOLDADURA Y CORTE",
    "OFERTAS Y LIQUIDACIONES",
  ];

  const [categoria, setCategoria] = useState({
    grupo: "",
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    const cargarCategoria = async () => {
      if (id) {
        try {
          const data = await obtenerCategoriaPorId(id);

          setCategoria({
            grupo: data.grupo || "",
            nombre: data.nombre || "",
            descripcion: data.descripcion || "",
          });
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
              {id ? "Editar Categoría" : "Nueva Categoría"}
            </h1>

            <p className="text-orange-100 mt-3 text-lg">
              Gestión y organización del catálogo de productos.
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
                Selecciona el grupo y registra la categoría correspondiente.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-8">
                {/* GRUPO */}

                <div>
                  <label className="block font-bold text-gray-700 mb-3">
                    Grupo de Productos
                  </label>

                  <select
                    name="grupo"
                    value={categoria.grupo}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-2xl p-4 bg-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="">Selecciona un grupo</option>

                    {grupos.map((grupo) => (
                      <option key={grupo} value={grupo}>
                        {grupo}
                      </option>
                    ))}
                  </select>

                  <p className="text-sm text-gray-500 mt-2">
                    Ejemplo: JARDINERÍA, AGROINDUSTRIA o MOTOBOMBAS.
                  </p>
                </div>

                {/* NOMBRE */}

                <div>
                  <label className="block font-bold text-gray-700 mb-3">
                    Nombre de la Categoría
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    value={categoria.nombre}
                    onChange={handleChange}
                    placeholder="Ejemplo: Motosierras"
                    required
                    className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:outline-none focus:border-orange-500"
                  />

                  <p className="text-sm text-gray-500 mt-2">
                    Esta categoría será utilizada para clasificar los productos.
                  </p>
                </div>

                {/* DESCRIPCIÓN */}

                <div>
                  <label className="block font-bold text-gray-700 mb-3">
                    Descripción
                  </label>

                  <textarea
                    rows="6"
                    name="descripcion"
                    value={categoria.descripcion}
                    onChange={handleChange}
                    placeholder="Describe esta categoría..."
                    className="w-full border-2 border-gray-200 rounded-2xl p-4 resize-none focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* VISTA PREVIA */}

              {categoria.grupo && categoria.nombre && (
                <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-5">
                  <p className="text-xs text-orange-600 font-black uppercase tracking-wider">
                    Organización
                  </p>

                  <p className="text-gray-900 font-bold mt-2">
                    {categoria.grupo}
                    <span className="text-gray-400 mx-2">→</span>
                    {categoria.nombre}
                  </p>
                </div>
              )}

              {/* BOTONES */}

              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition"
                >
                  {id ? "Actualizar Categoría" : "Guardar Categoría"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/admin/categorias")}
                  className="bg-gray-200 hover:bg-gray-300 px-8 py-4 rounded-2xl font-bold transition"
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
                ¿Cómo funciona?
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Los grupos permiten organizar las categorías del catálogo. Por
                ejemplo, el grupo <strong>JARDINERÍA</strong> puede contener
                categorías como <strong>Motosierras</strong>,{" "}
                <strong>Desbrozadoras</strong> y <strong>Cortasetos</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioCategoria;
