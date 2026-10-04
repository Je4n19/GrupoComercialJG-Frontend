import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MenuAdmin from "../Components/MenuAdmin";

import {
  guardarProducto,
  actualizarProducto,
  obtenerProductoPorId,
} from "../Services/productoService";

import { obtenerCategorias } from "../Services/categoriaService";

function FormularioProducto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categorias, setCategorias] = useState([]);

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
        setCategorias(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    const cargarProducto = async () => {
      if (id) {
        try {
          const data = await obtenerProductoPorId(id);
          setProducto(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    cargarCategorias();
    cargarProducto();
  }, [id]);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.error(error);
      alert("Error al guardar producto");
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

            <h1 className="text-5xl font-bold mt-2">
              {id ? "Editar Producto" : "Registrar Producto"}
            </h1>

            <p className="text-orange-100 mt-3 text-lg">
              Gestión de maquinaria y equipos comerciales.
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-white rounded-[30px] shadow-2xl overflow-hidden">
            <div className="bg-orange-500 text-white px-8 py-5">
              <h2 className="text-2xl font-bold">Información del Producto</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Nombre del Producto
                  </label>

                  <input
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    placeholder="Ej. Motosierra STIHL MS 250"
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Marca
                  </label>

                  <input
                    type="text"
                    name="marca"
                    value={producto.marca}
                    onChange={handleChange}
                    placeholder="Ej. STIHL"
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Categoría
                  </label>

                  <select
                    name="categoria"
                    value={producto.categoria}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
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
                  <label className="block mb-2 font-semibold text-gray-700">
                    Precio
                  </label>

                  <input
                    type="number"
                    name="precio"
                    value={producto.precio}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Stock Disponible
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={producto.stock}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Imagen URL
                  </label>

                  <input
                    type="text"
                    name="imagen"
                    value={producto.imagen}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="block mb-2 font-semibold text-gray-700">
                  Descripción
                </label>

                <textarea
                  rows="6"
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={handleChange}
                  placeholder="Describe las características del producto..."
                  className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              {/* PREVIEW */}

              <div className="mt-8 bg-orange-50 border border-orange-200 rounded-3xl p-6">
                <h3 className="font-bold text-xl text-orange-600 mb-4">
                  Vista Previa
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
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

                  <div>
                    <p>
                      <strong>Precio:</strong> S/. {producto.precio || "0"}
                    </p>

                    <p>
                      <strong>Stock:</strong> {producto.stock || "0"}
                    </p>
                  </div>
                </div>
              </div>

              {/* BOTONES */}

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition"
                >
                  {id ? "Actualizar Producto" : "Guardar Producto"}
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
