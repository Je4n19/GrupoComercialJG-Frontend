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

      <div className="flex-1 min-h-screen bg-orange-50">
        {/* HEADER */}

        <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 text-white shadow-2xl">
          <div className="px-10 py-10">
            <p className="uppercase tracking-widest text-orange-100 text-sm">
              Grupo Comercial J&G
            </p>

            <h1 className="text-5xl font-black mt-2">Configuración General</h1>

            <p className="text-orange-100 mt-3 text-lg">
              Personaliza la información principal de la empresa.
            </p>
          </div>
        </div>

        <div className="p-8">
          {/* RESUMEN */}

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-[30px] shadow-xl p-6">
              <p className="text-gray-500">Empresa</p>

              <h2 className="text-2xl font-black text-orange-600 mt-2">J&G</h2>
            </div>

            <div className="bg-white rounded-[30px] shadow-xl p-6">
              <p className="text-gray-500">WhatsApp</p>

              <h2 className="text-xl font-black text-green-600 mt-2">Activo</h2>
            </div>

            <div className="bg-white rounded-[30px] shadow-xl p-6">
              <p className="text-gray-500">Redes</p>

              <h2 className="text-xl font-black text-orange-500 mt-2">
                Configurables
              </h2>
            </div>

            <div className="bg-white rounded-[30px] shadow-xl p-6">
              <p className="text-gray-500">Sistema</p>

              <h2 className="text-xl font-black text-blue-600 mt-2">
                Operativo
              </h2>
            </div>
          </div>

          {/* FORMULARIO */}

          <div className="bg-white rounded-[30px] shadow-2xl overflow-hidden">
            <div className="bg-orange-500 text-white p-6">
              <h2 className="text-2xl font-bold">Información Corporativa</h2>

              <p className="text-orange-100 mt-2">
                Datos mostrados en la página web y sistema administrativo.
              </p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-3 font-bold text-gray-700">
                    Nombre de la Empresa
                  </label>

                  <input
                    type="text"
                    name="nombreEmpresa"
                    value={configuracion.nombreEmpresa}
                    onChange={handleChange}
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
                  <label className="block mb-3 font-bold text-gray-700">
                    Teléfono
                  </label>

                  <input
                    type="text"
                    name="telefono"
                    value={configuracion.telefono}
                    onChange={handleChange}
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
                  <label className="block mb-3 font-bold text-gray-700">
                    Correo Electrónico
                  </label>

                  <input
                    type="email"
                    name="correo"
                    value={configuracion.correo}
                    onChange={handleChange}
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
                  <label className="block mb-3 font-bold text-gray-700">
                    WhatsApp
                  </label>

                  <input
                    type="text"
                    name="whatsapp"
                    value={configuracion.whatsapp}
                    onChange={handleChange}
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
              </div>

              <div className="mt-6">
                <label className="block mb-3 font-bold text-gray-700">
                  Dirección
                </label>

                <textarea
                  rows="4"
                  name="direccion"
                  value={configuracion.direccion}
                  onChange={handleChange}
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

              <div className="mt-6">
                <label className="block mb-3 font-bold text-gray-700">
                  Horario de Atención
                </label>

                <textarea
                  rows="4"
                  name="horario"
                  value={configuracion.horario}
                  onChange={handleChange}
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

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block mb-3 font-bold text-gray-700">
                    Facebook
                  </label>

                  <input
                    type="text"
                    name="facebook"
                    value={configuracion.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/..."
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
                  <label className="block mb-3 font-bold text-gray-700">
                    Instagram
                  </label>

                  <input
                    type="text"
                    name="instagram"
                    value={configuracion.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/..."
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
              </div>

              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={guardar}
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
                  Guardar Configuración
                </button>

                <button
                  onClick={cargarConfiguracion}
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
                  Recargar Datos
                </button>
              </div>
            </div>
          </div>

          {/* INFORMACIÓN */}

          <div className="bg-white rounded-[30px] shadow-xl p-8 mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Información del Sistema
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-500">Empresa</p>
                <p className="font-bold text-lg">Grupo Comercial J&G</p>
              </div>

              <div>
                <p className="text-gray-500">Contacto Principal</p>
                <p className="font-bold text-lg">+51 979 501 557</p>
              </div>

              <div>
                <p className="text-gray-500">Cobertura</p>
                <p className="font-bold text-lg">Nivel Nacional</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configuracion;
