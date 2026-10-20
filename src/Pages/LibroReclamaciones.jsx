import { useState } from "react";
import { LegalLayout, Seccion, Aviso } from "./LegalLayout";

// ========================================
// CONFIGURACION DEL BACKEND
// ========================================

const API_RECLAMOS = import.meta.env.VITE_RECLAMOS_API_URL || "";

const HABILITADO = import.meta.env.VITE_RECLAMOS_HABILITADO === "true";

const disponible = Boolean(API_RECLAMOS) && HABILITADO;

const obtenerBaseApi = () => {
  if (!API_RECLAMOS) return "";

  return API_RECLAMOS.replace(/\/api\/reclamaciones\/?$/, "").replace(
    /\/$/,
    "",
  );
};

// ========================================
// DATOS INICIALES
// ========================================

const inicial = {
  nombres: "",
  apellidos: "",
  tipoDocumento: "DNI",
  numeroDocumento: "",
  domicilio: "",
  telefono: "",
  correo: "",
  menorEdad: false,
  representante: "",
  domicilioRepresentante: "",
  telefonoRepresentante: "",
  correoRepresentante: "",
  tipoBien: "PRODUCTO",
  descripcionBien: "",
  monto: "",
  numeroPedido: "",
  tipo: "RECLAMO",
  detalle: "",
  pedido: "",
  acepta: false,
};

// ========================================
// ESTILOS
// ========================================

const campo =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#009E49] focus:ring-2 focus:ring-green-100";

const etiqueta = "mb-2 block text-sm font-semibold text-slate-700";

// ========================================
// COMPONENTE CAMPO
// ========================================

function Campo({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  ...props
}) {
  return (
    <label className="block min-w-0">
      <span className={etiqueta}>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>

      <input
        className={campo}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
    </label>
  );
}

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

export default function LibroReclamaciones() {
  const [datos, setDatos] = useState(inicial);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [registro, setRegistro] = useState(null);

  // ========================================
  // ACTUALIZAR CAMPOS
  // ========================================

  const cambiar = (e) => {
    const { name, value, type, checked } = e.target;

    setDatos((actual) => ({
      ...actual,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ========================================
  // OBTENER TOKEN CSRF
  // ========================================

  const obtenerCsrf = async () => {
    const base = obtenerBaseApi();

    const respuesta = await fetch(`${base}/api/auth/csrf`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo iniciar una sesion segura con el servidor.");
    }

    const csrf = await respuesta.json();

    const token = csrf.token;

    const headerName = csrf.headerName || "X-CSRF-TOKEN";

    if (!token) {
      throw new Error("El servidor no devolvio un token de seguridad.");
    }

    return {
      token,
      headerName,
    };
  };

  // ========================================
  // ENVIAR RECLAMACION
  // ========================================

  const enviar = async (e) => {
    e.preventDefault();
    setError("");

    if (!disponible) {
      setError(
        "El registro electronico aun no esta habilitado. " +
          "Comunicate con el establecimiento para acceder " +
          "al Libro de Reclamaciones disponible.",
      );
      return;
    }

    if (!datos.acepta) {
      setError("Debes confirmar la veracidad de la informacion.");
      return;
    }

    if (
      datos.tipoDocumento === "DNI" &&
      !/^\d{8}$/.test(datos.numeroDocumento.trim())
    ) {
      setError("El DNI debe contener 8 digitos.");
      return;
    }

    setEnviando(true);

    try {
      // Obtener token CSRF y cookie de sesion
      const csrf = await obtenerCsrf();

      const payload = {
        nombres: datos.nombres.trim(),
        apellidos: datos.apellidos.trim(),
        tipoDocumento: datos.tipoDocumento,
        numeroDocumento: datos.numeroDocumento.trim(),
        domicilio: datos.domicilio.trim(),
        telefono: datos.telefono.trim(),
        correo: datos.correo.trim(),
        menorEdad: datos.menorEdad,

        representante: datos.menorEdad ? datos.representante.trim() : "",

        domicilioRepresentante: datos.menorEdad
          ? datos.domicilioRepresentante.trim()
          : "",

        telefonoRepresentante: datos.menorEdad
          ? datos.telefonoRepresentante.trim()
          : "",

        correoRepresentante: datos.menorEdad
          ? datos.correoRepresentante.trim()
          : "",

        tipoBien: datos.tipoBien,
        descripcionBien: datos.descripcionBien.trim(),

        monto: datos.monto === "" ? null : Number(datos.monto),

        numeroPedido: datos.numeroPedido.trim(),

        tipo: datos.tipo,
        detalle: datos.detalle.trim(),
        pedido: datos.pedido.trim(),
      };

      const respuesta = await fetch(API_RECLAMOS, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          [csrf.headerName]: csrf.token,
        },
        body: JSON.stringify(payload),
      });

      if (!respuesta.ok) {
        if (respuesta.status === 403) {
          throw new Error(
            "La sesion de seguridad no es valida. " +
              "Actualiza la pagina e intenta nuevamente.",
          );
        }

        if (respuesta.status === 400) {
          throw new Error(
            "Algunos datos son invalidos. " +
              "Revisa la informacion ingresada.",
          );
        }

        throw new Error(
          "No se pudo registrar la reclamacion. " +
            "Contacta al establecimiento antes de volver a enviarla.",
        );
      }

      const resultado = await respuesta.json();

      // Verificar que el backend devuelva
      // los datos de la constancia
      if (
        !resultado.numeroHoja ||
        !resultado.codigoSeguimiento ||
        !resultado.fechaRegistro
      ) {
        throw new Error(
          "El servidor no devolvio una constancia valida. " +
            "Contacta al establecimiento antes de volver a enviar.",
        );
      }

      setRegistro(resultado);
      setDatos({ ...inicial });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          "No se pudo conectar con el servidor. " +
            "Verifica tu conexion o intenta mas tarde.",
        );
      } else {
        setError(
          err.message || "Ocurrio un problema al registrar la solicitud.",
        );
      }
    } finally {
      setEnviando(false);
    }
  };

  // ========================================
  // IMPRIMIR CONFIRMACION
  // ========================================

  const imprimir = () => {
    window.print();
  };

  // ========================================
  // FORMATO DE FECHA
  // ========================================

  const formatearFecha = (fecha) => {
    if (!fecha) return "";

    // LocalDateTime de Spring Boot no incluye
    // necesariamente informacion de zona horaria.
    // Por eso mostramos el valor sin convertirlo
    // automaticamente a otra zona horaria.
    return String(fecha).replace("T", " ");
  };

  // ========================================
  // INTERFAZ
  // ========================================

  return (
    <LegalLayout
      categoria="Atención al consumidor"
      titulo="Libro de Reclamaciones"
      descripcion="Espacio para presentar reclamos o quejas relacionados con los productos y la atención de Grupo Comercial J&G."
      rutaActual="/libro-de-reclamaciones"
    >
      <Aviso>
        <strong>Información importante:</strong> El proveedor debe responder los
        reclamos y quejas dentro de un plazo máximo de 15 días hábiles, conforme
        a la normativa peruana. La presentación es gratuita.
      </Aviso>

      {/* AVISO DE FORMULARIO NO HABILITADO */}

      {!disponible && (
        <div
          role="status"
          className="mb-8 rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm leading-7 text-amber-950"
        >
          <strong>Registro electrónico aún no habilitado.</strong>

          <p className="mt-2">
            Este formulario está preparado para su implementación, pero todavía
            no recibe reclamaciones oficiales. Solicita acceso al Libro de
            Reclamaciones disponible en el establecimiento.
          </p>

          <a
            href="https://wa.me/51979501557"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-bold underline"
          >
            Consultar por WhatsApp
          </a>
        </div>
      )}

      {/* =====================================
          01. DATOS DEL PROVEEDOR
      ===================================== */}

      <Seccion numero="01" titulo="Datos del proveedor">
        <p>
          <strong>Nombre comercial:</strong> Grupo Comercial J&G.
        </p>

        <p>
          <strong>Titular:</strong> Jesús Oliver Guevara Torres.
        </p>

        <p>
          <strong>RUC:</strong> 10167608308.
        </p>

        <p>
          <strong>Dirección comercial:</strong> Av. Luis Gonzales 1599A,
          Chiclayo, Lambayeque, Perú.
        </p>

        <p>
          <strong>Correo:</strong> grupo.comercial@yahoo.es
        </p>
      </Seccion>

      {/* =====================================
          CONFIRMACION DE REGISTRO
      ===================================== */}

      {registro ? (
        <section
          aria-live="polite"
          className="rounded-2xl border border-green-200 bg-green-50 p-6"
        >
          <h2 className="text-xl font-black text-green-900">
            Solicitud registrada
          </h2>

          <p className="mt-3 text-sm text-green-900">
            El servidor confirmó el registro. Conserva estos datos para realizar
            el seguimiento.
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <p>
              <strong>Número de hoja:</strong> {registro.numeroHoja}
            </p>

            <p className="break-all">
              <strong>Código de seguimiento:</strong>{" "}
              {registro.codigoSeguimiento}
            </p>

            <p>
              <strong>Fecha de registro:</strong>{" "}
              {formatearFecha(registro.fechaRegistro)}
            </p>

            <p>
              <strong>Tipo:</strong> {registro.tipo}
            </p>

            <p>
              <strong>Estado:</strong> {registro.estado}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 print:hidden">
            <button
              type="button"
              onClick={imprimir}
              className="rounded-xl bg-[#009E49] px-5 py-3 font-bold text-white transition hover:bg-[#00843D]"
            >
              Imprimir confirmación
            </button>

            <button
              type="button"
              onClick={() => {
                setRegistro(null);
                setError("");
              }}
              className="rounded-xl border border-green-700 px-5 py-3 font-bold text-green-900"
            >
              Nueva solicitud
            </button>
          </div>

          <p className="mt-5 text-xs leading-6 text-slate-600">
            Esta confirmación contiene los datos de identificación del registro.
            La generación de la hoja completa y su entrega automática por correo
            requieren una implementación adicional.
          </p>
        </section>
      ) : (
        <form onSubmit={enviar} className="space-y-9">
          {/* =====================================
              02. DATOS DEL CONSUMIDOR
          ===================================== */}

          <section>
            <h2 className="mb-5 text-xl font-black text-[#0A2543]">
              02. Identificación del consumidor
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <Campo
                label="Nombres"
                name="nombres"
                value={datos.nombres}
                onChange={cambiar}
                required
                maxLength={100}
              />

              <Campo
                label="Apellidos"
                name="apellidos"
                value={datos.apellidos}
                onChange={cambiar}
                required
                maxLength={100}
              />

              <label className="block">
                <span className={etiqueta}>Tipo de documento *</span>

                <select
                  className={campo}
                  name="tipoDocumento"
                  value={datos.tipoDocumento}
                  onChange={cambiar}
                  required
                >
                  <option value="DNI">DNI</option>

                  <option value="CE">Carné de extranjería</option>

                  <option value="PASAPORTE">Pasaporte</option>

                  <option value="OTRO">Otro documento</option>
                </select>
              </label>

              <Campo
                label="Número de documento"
                name="numeroDocumento"
                value={datos.numeroDocumento}
                onChange={cambiar}
                required
                maxLength={20}
                inputMode={datos.tipoDocumento === "DNI" ? "numeric" : "text"}
                pattern={datos.tipoDocumento === "DNI" ? "[0-9]{8}" : undefined}
              />

              <Campo
                label="Teléfono"
                name="telefono"
                value={datos.telefono}
                onChange={cambiar}
                required
                type="tel"
                maxLength={20}
              />

              <Campo
                label="Correo electrónico"
                name="correo"
                value={datos.correo}
                onChange={cambiar}
                required
                type="email"
                maxLength={150}
              />

              <div className="sm:col-span-2">
                <Campo
                  label="Domicilio"
                  name="domicilio"
                  value={datos.domicilio}
                  onChange={cambiar}
                  required
                  maxLength={250}
                />
              </div>
            </div>

            {/* MENOR DE EDAD */}

            <label className="mt-5 flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                name="menorEdad"
                checked={datos.menorEdad}
                onChange={cambiar}
                className="h-4 w-4 accent-green-700"
              />
              El consumidor es menor de edad
            </label>

            {datos.menorEdad && (
              <div className="mt-5 grid gap-5 rounded-xl bg-slate-50 p-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Campo
                    label="Nombre del padre, madre o representante"
                    name="representante"
                    value={datos.representante}
                    onChange={cambiar}
                    required
                    maxLength={200}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Campo
                    label="Domicilio del representante"
                    name="domicilioRepresentante"
                    value={datos.domicilioRepresentante}
                    onChange={cambiar}
                    required
                    maxLength={250}
                  />
                </div>

                <Campo
                  label="Teléfono del representante"
                  name="telefonoRepresentante"
                  value={datos.telefonoRepresentante}
                  onChange={cambiar}
                  required
                  type="tel"
                  maxLength={20}
                />

                <Campo
                  label="Correo del representante"
                  name="correoRepresentante"
                  value={datos.correoRepresentante}
                  onChange={cambiar}
                  required
                  type="email"
                  maxLength={150}
                />
              </div>
            )}
          </section>

          {/* =====================================
              03. PRODUCTO O SERVICIO
          ===================================== */}

          <section>
            <h2 className="mb-5 text-xl font-black text-[#0A2543]">
              03. Identificación del bien contratado
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className={etiqueta}>Tipo de bien *</span>

                <select
                  className={campo}
                  name="tipoBien"
                  value={datos.tipoBien}
                  onChange={cambiar}
                  required
                >
                  <option value="PRODUCTO">Producto</option>

                  <option value="SERVICIO">Servicio</option>
                </select>
              </label>

              <Campo
                label="Monto reclamado o del bien (S/)"
                name="monto"
                type="number"
                min="0"
                step="0.01"
                value={datos.monto}
                onChange={cambiar}
              />

              <div className="sm:col-span-2">
                <Campo
                  label="Descripción del producto o servicio"
                  name="descripcionBien"
                  value={datos.descripcionBien}
                  onChange={cambiar}
                  required
                  maxLength={500}
                />
              </div>

              <div className="sm:col-span-2">
                <Campo
                  label="Número de pedido (si lo tienes)"
                  name="numeroPedido"
                  value={datos.numeroPedido}
                  onChange={cambiar}
                  maxLength={60}
                />
              </div>
            </div>
          </section>

          {/* =====================================
              04. DETALLE DE RECLAMACION
          ===================================== */}

          <section>
            <h2 className="mb-5 text-xl font-black text-[#0A2543]">
              04. Detalle de la reclamación
            </h2>

            <label className="block">
              <span className={etiqueta}>Tipo de solicitud *</span>

              <select
                className={campo}
                name="tipo"
                value={datos.tipo}
                onChange={cambiar}
                required
              >
                <option value="RECLAMO">
                  Reclamo: disconformidad con un producto o servicio
                </option>

                <option value="QUEJA">
                  Queja: malestar por la atención recibida
                </option>
              </select>
            </label>

            <label className="mt-5 block">
              <span className={etiqueta}>Detalle de lo ocurrido *</span>

              <textarea
                name="detalle"
                value={datos.detalle}
                onChange={cambiar}
                required
                minLength={10}
                maxLength={4000}
                rows={6}
                className={campo}
                placeholder="Describe qué ocurrió, cuándo y qué producto o atención estuvo involucrado."
              />
            </label>

            <label className="mt-5 block">
              <span className={etiqueta}>Pedido concreto del consumidor *</span>

              <textarea
                name="pedido"
                value={datos.pedido}
                onChange={cambiar}
                required
                minLength={5}
                maxLength={2000}
                rows={4}
                className={campo}
                placeholder="Indica qué solución o atención solicitas."
              />
            </label>
          </section>

          {/* =====================================
              05. DECLARACION Y ENVIO
          ===================================== */}

          <section>
            <h2 className="mb-5 text-xl font-black text-[#0A2543]">
              05. Declaración y envío
            </h2>

            <p className="mb-5 text-sm leading-7 text-slate-600">
              Los datos de este formulario se utilizarán para gestionar la
              reclamación conforme a nuestra Política de Privacidad.
            </p>

            <label className="flex items-start gap-3 text-sm leading-7 text-slate-700">
              <input
                type="checkbox"
                name="acepta"
                checked={datos.acepta}
                onChange={cambiar}
                required
                className="mt-1.5 h-4 w-4 shrink-0 accent-green-700"
              />
              Declaro que la información proporcionada es veraz y que he leído
              la información sobre el tratamiento de mis datos personales.
            </label>

            {/* ERRORES */}

            {error && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
              >
                {error}
              </div>
            )}

            {/* BOTON DE ENVIO */}

            <button
              type="submit"
              disabled={!disponible || enviando}
              className="mt-6 w-full rounded-xl bg-[#009E49] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#00843D] disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {enviando
                ? "Registrando solicitud..."
                : disponible
                  ? "Registrar reclamación"
                  : "Registro electrónico no disponible"}
            </button>

            <p className="mt-4 text-xs leading-6 text-slate-500">
              La reclamación se considerará registrada cuando el servidor
              confirme su recepción y devuelva un número de hoja.
            </p>
          </section>
        </form>
      )}
    </LegalLayout>
  );
}
