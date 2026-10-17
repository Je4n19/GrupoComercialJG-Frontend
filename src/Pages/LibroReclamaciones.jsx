import { useState } from "react";
import { LegalLayout, Aviso } from "./LegalLayout";

const datosIniciales = {
  nombres: "",
  tipoDocumento: "DNI",
  documento: "",
  domicilio: "",
  correo: "",
  telefono: "",
  menorEdad: false,
  representante: "",
  tipoBien: "PRODUCTO",
  producto: "",
  monto: "",
  numeroPedido: "",
  tipoSolicitud: "RECLAMO",
  detalle: "",
  pedidoCliente: "",
  declaracion: false,
};

const estiloInput =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#009E49] focus:ring-2 focus:ring-green-100";

const estiloLabel = "mb-2 block text-sm font-bold text-[#0A2543]";

export default function LibroReclamaciones() {
  const [formulario, setFormulario] = useState(datosIniciales);
  const [mensaje, setMensaje] = useState(false);

  const actualizar = (e) => {
    const { name, type, value, checked } = e.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMensaje(false);
  };

  const enviarDemostracion = (e) => {
    e.preventDefault();
    setMensaje(true);
  };

  return (
    <LegalLayout
      categoria="Atención al consumidor"
      titulo="Libro de Reclamaciones"
      descripcion="Información y formulario demostrativo para la presentación de reclamos y quejas relacionados con productos y servicios de Grupo Comercial J&G."
      rutaActual="/libro-de-reclamaciones"
    >
      <Aviso>
        <strong>Formulario en desarrollo.</strong> Esta página todavía no recibe
        ni registra reclamos oficiales. Para ejercer tu derecho a presentar un
        reclamo, solicita al establecimiento su mecanismo formal de Libro de
        Reclamaciones.
      </Aviso>

      {/* INFORMACIÓN DEL ESTABLECIMIENTO */}
      <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-black text-[#0A2543]">
          Datos del establecimiento
        </h2>

        <div className="mt-5 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
          <p>
            <strong className="text-[#0A2543]">Nombre comercial:</strong> Grupo
            Comercial J&G
          </p>

          <p>
            <strong className="text-[#0A2543]">RUC:</strong> 10167608308
          </p>

          <p>
            <strong className="text-[#0A2543]">Teléfono:</strong> 979 501 557
          </p>

          <p>
            <strong className="text-[#0A2543]">Correo:</strong>{" "}
            grupo.comercial@yahoo.es
          </p>

          <p className="sm:col-span-2">
            <strong className="text-[#0A2543]">Dirección:</strong> Av. Luis
            Gonzales 1599A, Chiclayo, Lambayeque, Perú.
          </p>
        </div>
      </div>

      {/* TIPOS DE SOLICITUD */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-black text-[#0A2543]">Reclamo</h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Disconformidad relacionada con los productos o servicios adquiridos.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-black text-[#0A2543]">Queja</h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Disconformidad relacionada con la atención recibida u otros aspectos
            distintos del producto o servicio.
          </p>
        </div>
      </div>

      <form onSubmit={enviarDemostracion} className="space-y-10">
        {/* SECCIÓN 1 */}
        <section>
          <h2 className="mb-6 border-b border-slate-200 pb-4 text-xl font-black text-[#0A2543]">
            01. Identificación del consumidor
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="nombres" className={estiloLabel}>
                Nombres y apellidos *
              </label>

              <input
                id="nombres"
                name="nombres"
                type="text"
                required
                maxLength={150}
                value={formulario.nombres}
                onChange={actualizar}
                className={estiloInput}
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="tipoDocumento" className={estiloLabel}>
                Tipo de documento *
              </label>

              <select
                id="tipoDocumento"
                name="tipoDocumento"
                value={formulario.tipoDocumento}
                onChange={actualizar}
                className={estiloInput}
              >
                <option value="DNI">DNI</option>
                <option value="CE">Carné de extranjería</option>
                <option value="PASAPORTE">Pasaporte</option>
                <option value="OTRO">Otro documento</option>
              </select>
            </div>

            <div>
              <label htmlFor="documento" className={estiloLabel}>
                Número de documento *
              </label>

              <input
                id="documento"
                name="documento"
                type="text"
                required
                maxLength={25}
                value={formulario.documento}
                onChange={actualizar}
                className={estiloInput}
                placeholder="Número de documento"
              />
            </div>

            <div>
              <label htmlFor="correo" className={estiloLabel}>
                Correo electrónico *
              </label>

              <input
                id="correo"
                name="correo"
                type="email"
                required
                maxLength={150}
                value={formulario.correo}
                onChange={actualizar}
                className={estiloInput}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="telefono" className={estiloLabel}>
                Teléfono de contacto *
              </label>

              <input
                id="telefono"
                name="telefono"
                type="tel"
                required
                maxLength={25}
                value={formulario.telefono}
                onChange={actualizar}
                className={estiloInput}
                placeholder="Número de contacto"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="domicilio" className={estiloLabel}>
                Dirección de domicilio *
              </label>

              <input
                id="domicilio"
                name="domicilio"
                type="text"
                required
                maxLength={250}
                value={formulario.domicilio}
                onChange={actualizar}
                className={estiloInput}
                placeholder="Dirección del consumidor"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="menorEdad"
                  checked={formulario.menorEdad}
                  onChange={actualizar}
                  className="h-4 w-4 accent-[#009E49]"
                />
                El consumidor es menor de edad
              </label>
            </div>

            {formulario.menorEdad && (
              <div className="sm:col-span-2">
                <label htmlFor="representante" className={estiloLabel}>
                  Padre, madre o representante *
                </label>

                <input
                  id="representante"
                  name="representante"
                  type="text"
                  required
                  maxLength={150}
                  value={formulario.representante}
                  onChange={actualizar}
                  className={estiloInput}
                />
              </div>
            )}
          </div>
        </section>

        {/* SECCIÓN 2 */}
        <section>
          <h2 className="mb-6 border-b border-slate-200 pb-4 text-xl font-black text-[#0A2543]">
            02. Identificación del producto o servicio
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="tipoBien" className={estiloLabel}>
                Tipo de bien *
              </label>

              <select
                id="tipoBien"
                name="tipoBien"
                value={formulario.tipoBien}
                onChange={actualizar}
                className={estiloInput}
              >
                <option value="PRODUCTO">Producto</option>
                <option value="SERVICIO">Servicio</option>
              </select>
            </div>

            <div>
              <label htmlFor="monto" className={estiloLabel}>
                Monto reclamado (S/)
              </label>

              <input
                id="monto"
                name="monto"
                type="number"
                min="0"
                step="0.01"
                value={formulario.monto}
                onChange={actualizar}
                className={estiloInput}
                placeholder="0.00"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="producto" className={estiloLabel}>
                Descripción del producto o servicio *
              </label>

              <input
                id="producto"
                name="producto"
                type="text"
                required
                maxLength={200}
                value={formulario.producto}
                onChange={actualizar}
                className={estiloInput}
                placeholder="Ejemplo: Motosierra STIHL MS 250"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="numeroPedido" className={estiloLabel}>
                Número de pedido (opcional)
              </label>

              <input
                id="numeroPedido"
                name="numeroPedido"
                type="text"
                maxLength={50}
                value={formulario.numeroPedido}
                onChange={actualizar}
                className={estiloInput}
                placeholder="Número de pedido o referencia"
              />
            </div>
          </div>
        </section>

        {/* SECCIÓN 3 */}
        <section>
          <h2 className="mb-6 border-b border-slate-200 pb-4 text-xl font-black text-[#0A2543]">
            03. Detalle del reclamo o queja
          </h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="tipoSolicitud" className={estiloLabel}>
                Tipo de solicitud *
              </label>

              <select
                id="tipoSolicitud"
                name="tipoSolicitud"
                value={formulario.tipoSolicitud}
                onChange={actualizar}
                className={estiloInput}
              >
                <option value="RECLAMO">Reclamo</option>
                <option value="QUEJA">Queja</option>
              </select>
            </div>

            <div>
              <label htmlFor="detalle" className={estiloLabel}>
                Descripción de los hechos *
              </label>

              <textarea
                id="detalle"
                name="detalle"
                rows={6}
                required
                maxLength={4000}
                value={formulario.detalle}
                onChange={actualizar}
                className={estiloInput}
                placeholder="Describe detalladamente lo sucedido"
              />

              <p className="mt-2 text-right text-xs text-slate-500">
                {formulario.detalle.length}/4000
              </p>
            </div>

            <div>
              <label htmlFor="pedidoCliente" className={estiloLabel}>
                ¿Qué solución solicitas? *
              </label>

              <textarea
                id="pedidoCliente"
                name="pedidoCliente"
                rows={4}
                required
                maxLength={2000}
                value={formulario.pedidoCliente}
                onChange={actualizar}
                className={estiloInput}
                placeholder="Indica la solución que solicitas"
              />
            </div>
          </div>
        </section>

        {/* SECCIÓN 4 */}
        <section className="border-t border-slate-200 pt-8">
          <h2 className="mb-5 text-xl font-black text-[#0A2543]">
            04. Declaración del consumidor
          </h2>

          <p className="mb-5 text-sm leading-7 text-slate-600">
            La presentación de un reclamo no impide acudir a las autoridades
            competentes ni limita los derechos del consumidor.
          </p>

          <label className="flex items-start gap-3 text-sm leading-7 text-slate-700">
            <input
              type="checkbox"
              name="declaracion"
              required
              checked={formulario.declaracion}
              onChange={actualizar}
              className="mt-1 h-4 w-4 shrink-0 accent-[#009E49]"
            />
            Declaro que la información ingresada es correcta y comprendo que
            este formulario es únicamente una demostración, sin registro
            oficial.
          </label>

          <button
            type="submit"
            className="mt-7 rounded-xl bg-[#009E49] px-8 py-4 text-sm font-black text-white transition-colors hover:bg-[#00843D]"
          >
            Validar formulario de demostración
          </button>

          {mensaje && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm leading-7 text-amber-950"
            >
              <strong>Formulario validado.</strong>

              <p className="mt-2">
                Esta es una demostración. No se ha registrado ni enviado ningún
                reclamo y no se ha generado una constancia oficial.
              </p>
            </div>
          )}
        </section>
      </form>

      {/* CONTACTO */}
      <div className="mt-12 rounded-2xl bg-[#0A2543] p-7 text-white">
        <h3 className="text-xl font-black">Canales de atención</h3>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Para consultas relacionadas con productos, pedidos o atención
          comercial, puedes comunicarte con nuestro establecimiento. Solicita
          también información sobre el mecanismo formal de reclamaciones
          disponible.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://wa.me/51979501557"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#009E49] px-5 py-3 text-sm font-bold text-white hover:bg-[#00843D]"
          >
            WhatsApp: 979 501 557
          </a>

          <a
            href="mailto:grupo.comercial@yahoo.es"
            className="rounded-xl border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
          >
            Enviar correo
          </a>
        </div>
      </div>
    </LegalLayout>
  );
}
