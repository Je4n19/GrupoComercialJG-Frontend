import { useEffect, useState } from "react";
import MenuAdmin from "../Components/MenuAdmin";

import {
  obtenerConfiguracion,
  guardarConfiguracion,
} from "../Services/configuracionService";

function Configuracion() {
  const [configuracion, setConfiguracion] = useState({
    nombreEmpresa: "Grupo Comercial J&G",
    telefono: "+51 979 501 557",
    correo: "ventas@grupocomercialjyg.com",
    whatsapp: "51979501557",
    direccion: "Perú",
    horario:
      "Lunes a Viernes: 08:00 AM - 06:00 PM | Sábados: 08:00 AM - 01:00 PM",
    facebook: "",
    instagram: "",
  });

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const cargarConfiguracion = async () => {
    try {
      const data = await obtenerConfiguracion();

      if (data) {
        setConfiguracion(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setConfiguracion({
      ...configuracion,
      [e.target.name]: e.target.value,
    });
  };

  const guardar = async () => {
    try {
      await guardarConfiguracion(configuracion);

      alert("Configuración guardada correctamente");
    } catch (error) {
      console.error(error);

      alert("Error al guardar configuración");
    }
  };

  return (
    <div className="flex">
      <MenuAdmin />

      <div className="flex-1 min-h-screen bg-gray-100">
        <div className="bg-orange-600 text-white p-6 shadow-lg">
          <h1 className="text-3xl font-bold">Configuración General</h1>

          <p className="mt-2">
            Personaliza la información principal de la empresa
          </p>
        </div>

        <div className="max-w-5xl mx-auto p-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-8">Datos de la Empresa</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold">
                  Nombre de Empresa
                </label>

                <input
                  type="text"
                  name="nombreEmpresa"
                  value={configuracion.nombreEmpresa}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Teléfono</label>

                <input
                  type="text"
                  name="telefono"
                  value={configuracion.telefono}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Correo</label>

                <input
                  type="email"
                  name="correo"
                  value={configuracion.correo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">WhatsApp</label>

                <input
                  type="text"
                  name="whatsapp"
                  value={configuracion.whatsapp}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block mb-2 font-semibold">Dirección</label>

              <textarea
                rows="4"
                name="direccion"
                value={configuracion.direccion}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg"
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 font-semibold">
                Horario de Atención
              </label>

              <textarea
                rows="3"
                name="horario"
                value={configuracion.horario}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg"
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 font-semibold">Facebook</label>

              <input
                type="text"
                name="facebook"
                value={configuracion.facebook}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg"
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 font-semibold">Instagram</label>

              <input
                type="text"
                name="instagram"
                value={configuracion.instagram}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg"
              />
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={guardar}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Guardar Configuración
              </button>

              <button
                onClick={cargarConfiguracion}
                className="bg-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Recargar Datos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configuracion;
