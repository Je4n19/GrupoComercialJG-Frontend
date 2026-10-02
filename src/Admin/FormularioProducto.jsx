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
        setCategorias(data);
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
          console.error("Error al cargar producto:", error);
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
    <div className="flex bg-gray-100 min-h-screen">
      <MenuAdmin />

      <div className="flex-1 p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">
            {id ? "Editar Producto" : "Registrar Producto"}
          </h1>

          <p className="text-gray-500 mb-8">
            Complete la información del producto.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold block mb-2">Nombre</label>

                <input
                  type="text"
                  name="nombre"
                  value={producto.nombre}
                  onChange={handleChange}
                  placeholder="Ej. MS 250"
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">Marca</label>

                <input
                  type="text"
                  name="marca"
                  value={producto.marca}
                  onChange={handleChange}
                  placeholder="Ej. STIHL"
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">Categoría</label>

                <select
                  name="categoria"
                  value={producto.categoria}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
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
                <label className="font-semibold block mb-2">Precio</label>

                <input
                  type="number"
                  name="precio"
                  value={producto.precio}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">Stock</label>

                <input
                  type="number"
                  name="stock"
                  value={producto.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">Imagen URL</label>

                <input
                  type="text"
                  name="imagen"
                  value={producto.imagen}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="font-semibold block mb-2">Descripción</label>

              <textarea
                rows="5"
                name="descripcion"
                value={producto.descripcion}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Descripción del producto..."
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
              >
                {id ? "Actualizar Producto" : "Guardar Producto"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/productos")}
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

export default FormularioProducto;
