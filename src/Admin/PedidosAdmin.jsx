import { useCallback, useEffect, useMemo, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://grupocomercialjg-backend.onrender.com"
).replace(/\/+$/, "");

const WHATSAPP_EMPRESA = "979501557";

const ESTADOS_PAGO = [
  "TODOS",
  "PENDIENTE",
  "EN_REVISION",
  "APROBADO",
  "RECHAZADO",
];

const FORMATO_MONEDA = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

function moneda(valor) {
  const numero = Number(valor);
  return FORMATO_MONEDA.format(Number.isFinite(numero) ? numero : 0);
}

function fecha(valor) {
  if (!valor) return "Sin registrar";

  const fechaConvertida = new Date(valor);

  if (Number.isNaN(fechaConvertida.getTime())) {
    return "Sin registrar";
  }

  return fechaConvertida.toLocaleString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function textoEstado(estado) {
  return String(estado || "SIN_ESTADO").replaceAll("_", " ");
}

function tieneAgencia(pedido) {
  return ["SHALOM", "EMTRAFESA", "OLVA"].includes(
    String(pedido?.metodoEntrega || "").toUpperCase(),
  );
}

function fleteCotizado(pedido) {
  return (
    tieneAgencia(pedido) &&
    ["ESTIMADO", "CONFIRMADO"].includes(pedido?.estadoCotizacionFlete)
  );
}

function numeroWhatsApp(telefono) {
  const numero = String(telefono || "").replace(/\D/g, "");

  if (/^9\d{8}$/.test(numero)) return `51${numero}`;
  if (/^519\d{8}$/.test(numero)) return numero;

  return null;
}

function crearMensajeWhatsApp(pedido, estado, observacion) {
  const nombre = pedido.nombreCliente || "estimado cliente";
  const numeroPedido = pedido.id;
  const total = moneda(pedido.total);

  if (estado === "APROBADO") {
    return `🟢 *GRUPO COMERCIAL J&G*

¡Hola, ${nombre}! 👋

Te informamos que hemos verificado correctamente el pago de tu pedido *#${numeroPedido}*.

✅ *ESTADO DEL PAGO: APROBADO*
💰 *Importe recibido: ${total}*
💳 *Método de pago: ${pedido.metodoPago || "No especificado"}*

Tu pedido continuará con el proceso de preparación y entrega.

${
  tieneAgencia(pedido)
    ? `📦 *Agencia de transporte: ${pedido.metodoEntrega}*

Recuerda que el costo del flete se paga directamente a la agencia al recoger tu pedido.`
    : "📦 Te mantendremos informado sobre la disponibilidad de tu pedido para recojo."
}

Muchas gracias por confiar en *Grupo Comercial J&G*. 🧡

📲 Consultas: ${WHATSAPP_EMPRESA}`;
  }

  return `🔴 *GRUPO COMERCIAL J&G*

Hola, ${nombre}.

Te informamos sobre la verificación del pago correspondiente a tu pedido *#${numeroPedido}*.

❌ *ESTADO DEL PAGO: RECHAZADO*
💰 *Importe del pedido: ${total}*

*Motivo:*
${observacion || "No se pudo verificar el abono reportado."}

Por favor, revisa tu operación y comunícate con nosotros para ayudarte a solucionar el inconveniente.

Tu pago todavía no ha sido confirmado.

Atentamente,
*Grupo Comercial J&G*

📲 WhatsApp: ${WHATSAPP_EMPRESA}`;
}

function notificarWhatsApp(pedido, estadoPago, observacionPago) {
  const estado = estadoPago || pedido.estadoPago;

  if (!["APROBADO", "RECHAZADO"].includes(estado)) {
    alert("Primero debes aprobar o rechazar el pago.");
    return;
  }

  const numero = numeroWhatsApp(pedido.telefonoCliente);

  if (!numero) {
    alert("El cliente no tiene un número de celular peruano válido.");
    return;
  }

  const mensaje = crearMensajeWhatsApp(
    pedido,
    estado,
    observacionPago ?? pedido.observacionPago,
  );

  const enlace = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  const ventana = window.open(enlace, "_blank", "noopener,noreferrer");

  if (!ventana) {
    window.location.href = enlace;
  }
}

function EtiquetaEstado({ estado }) {
  const estilos = {
    PENDIENTE: "bg-amber-100 text-amber-800",
    EN_REVISION: "bg-blue-100 text-blue-800",
    APROBADO: "bg-green-100 text-green-800",
    RECHAZADO: "bg-red-100 text-red-800",
    PREPARANDO: "bg-blue-100 text-blue-800",
    LISTO_RECOJO: "bg-purple-100 text-purple-800",
    ENVIADO: "bg-indigo-100 text-indigo-800",
    ENTREGADO: "bg-green-100 text-green-800",
    CANCELADO: "bg-red-100 text-red-800",
    ESTIMADO: "bg-orange-100 text-orange-800",
    CONFIRMADO: "bg-green-100 text-green-800",
    NO_APLICA: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
        estilos[estado] || "bg-gray-100 text-gray-700"
      }`}
    >
      {textoEstado(estado)}
    </span>
  );
}

function TarjetaEstadistica({ titulo, valor }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold text-gray-500">{titulo}</p>
      <p className="mt-3 text-3xl font-black text-[#063D2A]">{valor}</p>
    </div>
  );
}

function Dato({ etiqueta, valor }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500">{etiqueta}</p>
      <p className="mt-1 break-words text-sm font-bold text-[#063D2A]">
        {valor === null || valor === undefined || valor === ""
          ? "No registrado"
          : valor}
      </p>
    </div>
  );
}

async function obtenerCsrf() {
  const respuesta = await fetch(`${API_URL}/api/auth/csrf`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!respuesta.ok) {
    throw new Error(
      "No se pudo obtener el token CSRF. Inicia sesión nuevamente.",
    );
  }

  const datos = await respuesta.json();

  const token = datos.token || datos.csrfToken || datos._csrf?.token;

  const nombreHeader =
    datos.headerName || datos._csrf?.headerName || "X-CSRF-TOKEN";

  if (!token) {
    throw new Error("El servidor no devolvió el token CSRF.");
  }

  return { token, nombreHeader };
}

async function leerError(respuesta) {
  try {
    const cuerpo = await respuesta.json();

    return (
      cuerpo.message ||
      cuerpo.detail ||
      cuerpo.error ||
      `Error HTTP ${respuesta.status}`
    );
  } catch {
    return `Error HTTP ${respuesta.status}`;
  }
}

/*
========================================
VISUALIZADOR PRIVADO DE COMPROBANTES
========================================
*/

function VisorComprobante({ pedidoId, disponible }) {
  const [mostrar, setMostrar] = useState(false);
  const [imagenUrl, setImagenUrl] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMostrar(false);
    setError("");
    setImagenUrl(null);
  }, [pedidoId]);

  useEffect(() => {
    if (!mostrar || !disponible) return;

    const controlador = new AbortController();
    let urlTemporal = null;

    async function cargarImagen() {
      setCargando(true);
      setError("");
      setImagenUrl(null);

      try {
        const respuesta = await fetch(
          `${API_URL}/api/admin/pagos/${pedidoId}/comprobante`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "image/jpeg,image/png,image/webp",
            },
            signal: controlador.signal,
          },
        );

        if (!respuesta.ok) {
          if (respuesta.status === 401 || respuesta.status === 403) {
            throw new Error(
              "No tienes autorización para visualizar el comprobante. Inicia sesión nuevamente.",
            );
          }

          if (respuesta.status === 404) {
            throw new Error("No se encontró un comprobante para este pedido.");
          }

          throw new Error(
            `No se pudo cargar la imagen. HTTP ${respuesta.status}.`,
          );
        }

        const tipo = respuesta.headers.get("content-type") || "";

        if (!tipo.startsWith("image/")) {
          throw new Error("El servidor no devolvió una imagen válida.");
        }

        const archivo = await respuesta.blob();

        if (archivo.size === 0 || archivo.size > 5 * 1024 * 1024) {
          throw new Error("El comprobante recibido tiene un tamaño inválido.");
        }

        if (controlador.signal.aborted) return;

        urlTemporal = URL.createObjectURL(archivo);
        setImagenUrl(urlTemporal);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "No se pudo recuperar el comprobante.");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarImagen();

    return () => {
      controlador.abort();

      if (urlTemporal) {
        URL.revokeObjectURL(urlTemporal);
      }
    };
  }, [mostrar, disponible, pedidoId]);

  if (!disponible) {
    return (
      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-800">
          Este pedido no tiene un comprobante de pago adjunto.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-5 rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-black text-[#063D2A]">Comprobante de pago</h4>

          <p className="mt-1 text-xs text-gray-600">
            Imagen privada almacenada en Cloudinary.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMostrar((anterior) => !anterior)}
          className="rounded-xl bg-[#063D2A] px-5 py-3 text-sm font-black text-white transition hover:bg-[#009E49]"
        >
          {mostrar ? "Ocultar comprobante" : "Ver comprobante"}
        </button>
      </div>

      {mostrar && (
        <div className="mt-4 rounded-xl bg-white p-4">
          {cargando && (
            <p className="py-8 text-center text-sm text-gray-500">
              Cargando comprobante desde Cloudinary...
            </p>
          )}

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {imagenUrl && !cargando && (
            <div className="space-y-3">
              <img
                src={imagenUrl}
                alt={`Comprobante de pago del pedido ${pedidoId}`}
                className="mx-auto max-h-[550px] w-auto max-w-full rounded-xl border border-gray-200 object-contain"
              />

              <p className="text-center text-xs text-gray-500">
                Verifica el importe, número de operación, fecha y cuenta
                receptora.
              </p>

              <p className="text-center text-xs font-semibold text-amber-700">
                La imagen no demuestra por sí sola que el dinero haya ingresado
                a la cuenta.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

/*
========================================
FORMULARIO DE FLETE
========================================
*/

function FormularioFlete({ pedido, guardar, guardando }) {
  const [costo, setCosto] = useState("");
  const [estado, setEstado] = useState("ESTIMADO");
  const [observacion, setObservacion] = useState("");
  const [errorFormulario, setErrorFormulario] = useState("");

  useEffect(() => {
    setCosto(fleteCotizado(pedido) ? String(pedido.costoEnvio ?? "") : "");

    setEstado(
      ["ESTIMADO", "CONFIRMADO"].includes(pedido.estadoCotizacionFlete)
        ? pedido.estadoCotizacionFlete
        : "ESTIMADO",
    );

    setObservacion(pedido.observacionFlete || "");
    setErrorFormulario("");
  }, [pedido]);

  const enviar = async (evento) => {
    evento.preventDefault();
    setErrorFormulario("");

    const numero = Number(costo);

    if (costo.trim() === "" || !Number.isFinite(numero) || numero <= 0) {
      setErrorFormulario("Ingresa un costo de flete mayor que cero.");
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(costo.trim())) {
      setErrorFormulario(
        "El costo debe tener como máximo dos decimales. Usa punto decimal.",
      );
      return;
    }

    if (numero > 9999999999.99) {
      setErrorFormulario("El importe del flete es demasiado alto.");
      return;
    }

    if (observacion.length > 500) {
      setErrorFormulario("La observación no puede superar 500 caracteres.");
      return;
    }

    try {
      await guardar({
        costoFlete: numero,
        estadoCotizacion: estado,
        observacion: observacion.trim(),
      });
    } catch (err) {
      setErrorFormulario(err.message || "No se pudo guardar el flete.");
    }
  };

  return (
    <section className="rounded-2xl border border-orange-200 bg-orange-50/70 p-5">
      <p className="text-xs font-black uppercase tracking-widest text-[#C94E14]">
        Gestión de transporte
      </p>

      <h3 className="mt-2 text-lg font-black text-[#063D2A]">
        Cotizar flete contra entrega
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        Ingresa el costo informado por {pedido.metodoEntrega}. El cliente pagará
        este importe directamente a la agencia cuando recoja su pedido. J&G no
        cobrará el flete.
      </p>

      <form onSubmit={enviar} className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="costo-flete"
              className="mb-2 block text-sm font-bold text-[#063D2A]"
            >
              Costo del flete (S/)
            </label>

            <input
              id="costo-flete"
              type="number"
              min="0.01"
              step="0.01"
              value={costo}
              onChange={(e) => setCosto(e.target.value)}
              placeholder="Ejemplo: 35.00"
              required
              disabled={guardando}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#009E49]"
            />
          </div>

          <div>
            <label
              htmlFor="estado-cotizacion"
              className="mb-2 block text-sm font-bold text-[#063D2A]"
            >
              Estado de la cotización
            </label>

            <select
              id="estado-cotizacion"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              disabled={guardando}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#009E49]"
            >
              <option value="ESTIMADO">Estimado</option>
              <option value="CONFIRMADO">Confirmado por la agencia</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="observacion-flete"
            className="mb-2 block text-sm font-bold text-[#063D2A]"
          >
            Observaciones del flete
          </label>

          <textarea
            id="observacion-flete"
            rows={3}
            maxLength={500}
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            disabled={guardando}
            placeholder="Ejemplo: 2 bultos, peso aproximado 15 kg..."
            className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#009E49]"
          />

          <p className="mt-1 text-right text-xs text-gray-500">
            {observacion.length}/500 caracteres
          </p>
        </div>

        {errorFormulario && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {errorFormulario}
          </p>
        )}

        <div className="rounded-xl bg-white p-4">
          <div className="flex justify-between gap-3 text-sm">
            <span className="text-gray-600">Productos (pago a J&G)</span>

            <strong className="text-[#063D2A]">{moneda(pedido.total)}</strong>
          </div>

          <div className="mt-3 flex justify-between gap-3 text-sm">
            <span className="text-gray-600">
              Flete (pago a {pedido.metodoEntrega})
            </span>

            <strong className="text-[#C94E14]">
              {costo && Number(costo) > 0 ? moneda(costo) : "Por definir"}
            </strong>
          </div>

          <div className="mt-3 flex justify-between gap-3 border-t border-gray-100 pt-3">
            <span className="text-sm font-bold text-[#063D2A]">
              Costo total para el cliente
            </span>

            <strong className="text-[#063D2A]">
              {costo && Number(costo) > 0
                ? moneda(Number(pedido.total) + Number(costo))
                : "Pendiente de flete"}
            </strong>
          </div>
        </div>

        <button
          type="submit"
          disabled={guardando}
          className="w-full rounded-xl bg-[#C94E14] px-5 py-3 font-black text-white transition hover:bg-[#A83E0B] disabled:bg-gray-400 sm:w-auto"
        >
          {guardando
            ? "Guardando cotización..."
            : fleteCotizado(pedido)
              ? "Actualizar cotización"
              : "Guardar cotización"}
        </button>
      </form>
    </section>
  );
}

/*
========================================
GESTIÓN DE PAGOS
========================================
*/

function GestionPago({
  pedido,
  informacionPago,
  aprobarPago,
  rechazarPago,
  procesandoPago,
  cargandoPago,
  errorPago,
}) {
  const [motivo, setMotivo] = useState("");
  const [mostrarRechazo, setMostrarRechazo] = useState(false);
  const [errorFormulario, setErrorFormulario] = useState("");

  useEffect(() => {
    setMotivo("");
    setMostrarRechazo(false);
    setErrorFormulario("");
  }, [pedido.id]);

  const estado = informacionPago?.estadoPago || pedido.estadoPago;

  const numeroOperacion =
    informacionPago?.numeroOperacion ?? pedido.numeroOperacionPago;

  const fechaReporte = informacionPago?.fechaReporte ?? pedido.fechaReportePago;

  const fechaVerificacion =
    informacionPago?.fechaVerificacion ?? pedido.fechaVerificacionPago;

  const observacion = informacionPago?.observacion ?? pedido.observacionPago;

  const comprobanteDisponible = informacionPago?.comprobanteDisponible === true;

  const puedeDecidir =
    estado === "EN_REVISION" && pedido.estadoPedido !== "CANCELADO";

  const confirmarAprobacion = async () => {
    setErrorFormulario("");

    if (
      !window.confirm(
        `¿Confirmas que verificaste el ingreso real de ${moneda(
          pedido.total,
        )} en la cuenta de J&G para el pedido #${pedido.id}?\n\n` +
          "Esta acción marcará el pago como APROBADO.",
      )
    ) {
      return;
    }

    try {
      await aprobarPago(pedido.id);
    } catch (err) {
      setErrorFormulario(err.message);
    }
  };

  const confirmarRechazo = async (evento) => {
    evento.preventDefault();
    setErrorFormulario("");

    if (!motivo.trim() || motivo.trim().length > 500) {
      setErrorFormulario(
        "Indica un motivo de rechazo de hasta 500 caracteres.",
      );
      return;
    }

    if (!window.confirm(`¿Rechazar el pago del pedido #${pedido.id}?`)) {
      return;
    }

    try {
      await rechazarPago(pedido.id, motivo.trim());

      setMostrarRechazo(false);
      setMotivo("");
    } catch (err) {
      setErrorFormulario(err.message);
    }
  };

  return (
    <section className="rounded-2xl border border-green-200 bg-green-50/60 p-5">
      <p className="text-xs font-black uppercase tracking-widest text-[#009E49]">
        Administración de pagos
      </p>

      <h3 className="mt-2 text-lg font-black text-[#063D2A]">
        Verificación del pago
      </h3>

      <p className="mt-2 text-sm text-gray-600">
        Comprueba el abono en Yape, Plin o tu cuenta bancaria antes de
        aprobarlo. El número de operación por sí solo no demuestra que el dinero
        fue recibido.
      </p>

      {cargandoPago && (
        <p className="mt-4 text-sm text-gray-500">
          Consultando información del pago...
        </p>
      )}

      {errorPago && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {errorPago}
        </p>
      )}

      <div className="mt-5 grid gap-4 rounded-xl bg-white p-4 sm:grid-cols-2">
        <Dato etiqueta="Método de pago" valor={pedido.metodoPago} />

        <div>
          <p className="mb-2 text-xs font-semibold text-gray-500">
            Estado del pago
          </p>
          <EtiquetaEstado estado={estado} />
        </div>

        <Dato etiqueta="Número de operación" valor={numeroOperacion} />

        <Dato etiqueta="Importe a verificar" valor={moneda(pedido.total)} />

        <Dato etiqueta="Fecha de reporte" valor={fecha(fechaReporte)} />

        <Dato
          etiqueta="Fecha de verificación"
          valor={fecha(fechaVerificacion)}
        />

        {observacion && (
          <div className="sm:col-span-2">
            <Dato etiqueta="Observación del pago" valor={observacion} />
          </div>
        )}
      </div>

      <VisorComprobante
        pedidoId={pedido.id}
        disponible={comprobanteDisponible}
      />

      {estado === "APROBADO" && (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-100 p-4 text-sm font-semibold text-green-800">
          ✓ Pago aprobado. El abono fue marcado como verificado por el
          administrador.
        </div>
      )}

      {estado === "RECHAZADO" && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          El pago fue rechazado. El cliente deberá comunicarse con J&G para
          solucionar el inconveniente.
        </div>
      )}

      {estado === "PENDIENTE" && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          El cliente todavía no tiene un pago en revisión. Espera a que reporte
          su número de operación y adjunte su comprobante.
        </div>
      )}

      {puedeDecidir && (
        <div className="mt-5 space-y-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            Antes de aprobar, verifica el importe, la cuenta receptora y la
            operación en el banco. No apruebes pagos de prueba ni comprobantes
            no verificados.
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={confirmarAprobacion}
              disabled={procesandoPago || cargandoPago || !!errorPago}
              className="rounded-xl bg-[#009E49] px-5 py-3 text-sm font-black text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {procesandoPago ? "Procesando..." : "✓ Aprobar pago"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMostrarRechazo((actual) => !actual);
                setErrorFormulario("");
              }}
              disabled={procesandoPago || cargandoPago || !!errorPago}
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:bg-gray-400"
            >
              ✕ Rechazar pago
            </button>
          </div>

          {mostrarRechazo && (
            <form
              onSubmit={confirmarRechazo}
              className="rounded-xl border border-red-200 bg-white p-4"
            >
              <label
                htmlFor="motivo-rechazo"
                className="mb-2 block text-sm font-bold text-red-800"
              >
                Motivo del rechazo
              </label>

              <textarea
                id="motivo-rechazo"
                rows={3}
                maxLength={500}
                required
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ejemplo: No se encontró el abono en la cuenta bancaria."
                className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500"
              />

              <p className="mt-1 text-right text-xs text-gray-500">
                {motivo.length}/500 caracteres
              </p>

              <button
                type="submit"
                disabled={procesandoPago}
                className="mt-3 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white hover:bg-red-700 disabled:bg-gray-400"
              >
                Confirmar rechazo
              </button>
            </form>
          )}
        </div>
      )}

      {pedido.estadoPedido === "CANCELADO" && (
        <p className="mt-4 text-sm text-red-700">
          Este pedido está cancelado y no puede aprobarse desde este panel.
        </p>
      )}

      {errorFormulario && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {errorFormulario}
        </p>
      )}

      {["APROBADO", "RECHAZADO"].includes(estado) && (
        <div className="mt-5 rounded-2xl border border-green-200 bg-white p-5">
          <h4 className="font-black text-[#063D2A]">
            📲 Notificación al cliente por WhatsApp
          </h4>

          <p className="mt-2 text-sm text-gray-600">
            El pago está {estado === "APROBADO" ? "aprobado" : "rechazado"}.
            Puedes comunicar el resultado al número registrado por el cliente.
          </p>

          <p className="mt-3 text-sm font-bold text-[#063D2A]">
            Número del cliente: {pedido.telefonoCliente || "No registrado"}
          </p>

          <button
            type="button"
            onClick={() => notificarWhatsApp(pedido, estado, observacion)}
            disabled={procesandoPago}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 text-sm font-black text-white transition hover:bg-[#128C7E] disabled:bg-gray-400"
          >
            📲 Notificar al cliente por WhatsApp
          </button>

          <p className="mt-3 text-xs text-gray-500">
            Se abrirá WhatsApp con el mensaje preparado. Comprueba que estés
            usando la cuenta de J&G ({WHATSAPP_EMPRESA}) y presiona Enviar.
          </p>
        </div>
      )}
    </section>
  );
}

/*
========================================
DETALLE DEL PEDIDO
========================================
*/

function DetallePedido({
  pedido,
  cerrar,
  guardarFlete,
  guardandoFlete,
  informacionPago,
  aprobarPago,
  rechazarPago,
  procesandoPago,
  cargandoPago,
  errorPago,
}) {
  if (!pedido) return null;

  const detalles = Array.isArray(pedido.detalles) ? pedido.detalles : [];

  const esAgencia = tieneAgencia(pedido);
  const cotizado = fleteCotizado(pedido);
  const subtotal = Number(pedido.subtotal) || 0;
  const flete = cotizado ? Number(pedido.costoEnvio) || 0 : 0;

  const ocupado = guardandoFlete || procesandoPago;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={ocupado ? undefined : cerrar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Detalles del pedido ${pedido.id}`}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-xl"
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-[#063D2A] p-5 text-white">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-green-200">
              Grupo Comercial J&G
            </p>

            <h2 className="mt-2 text-xl font-black">Pedido #{pedido.id}</h2>
          </div>

          <button
            type="button"
            onClick={cerrar}
            disabled={ocupado}
            className="rounded-lg bg-white/10 px-4 py-2 font-bold hover:bg-white/20 disabled:opacity-50"
          >
            Cerrar ✕
          </button>
        </div>

        <div className="space-y-7 p-5 sm:p-7">
          <section>
            <h3 className="mb-4 text-lg font-black text-[#063D2A]">
              Información del cliente
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Dato etiqueta="Nombre completo" valor={pedido.nombreCliente} />
              <Dato etiqueta="Teléfono" valor={pedido.telefonoCliente} />
              <Dato
                etiqueta="Correo electrónico"
                valor={pedido.correoCliente}
              />
              <Dato
                etiqueta="Fecha del pedido"
                valor={fecha(pedido.fechaPedido)}
              />
            </div>
          </section>

          <section className="border-t border-gray-100 pt-6">
            <h3 className="mb-4 text-lg font-black text-[#063D2A]">
              Información de entrega
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Dato etiqueta="Método de entrega" valor={pedido.metodoEntrega} />
              <Dato etiqueta="Dirección" valor={pedido.direccionEntrega} />
              <Dato etiqueta="Departamento" valor={pedido.departamento} />
              <Dato etiqueta="Provincia" valor={pedido.provincia} />
              <Dato etiqueta="Distrito" valor={pedido.distrito} />
              <Dato etiqueta="Referencia" valor={pedido.referencia} />
            </div>
          </section>

          <section className="border-t border-gray-100 pt-6">
            <h3 className="mb-4 text-lg font-black text-[#063D2A]">
              Estado del pedido y pago
            </h3>

            <div className="flex flex-wrap gap-6">
              <div>
                <p className="mb-2 text-xs text-gray-500">Pedido</p>
                <EtiquetaEstado estado={pedido.estadoPedido} />
              </div>

              <div>
                <p className="mb-2 text-xs text-gray-500">Pago</p>
                <EtiquetaEstado
                  estado={informacionPago?.estadoPago || pedido.estadoPago}
                />
              </div>

              <Dato etiqueta="Método de pago" valor={pedido.metodoPago} />
            </div>
          </section>

          <GestionPago
            key={pedido.id}
            pedido={pedido}
            informacionPago={informacionPago}
            aprobarPago={aprobarPago}
            rechazarPago={rechazarPago}
            procesandoPago={procesandoPago}
            cargandoPago={cargandoPago}
            errorPago={errorPago}
          />

          {esAgencia && (
            <section className="border-t border-gray-100 pt-6">
              <h3 className="mb-4 text-lg font-black text-[#063D2A]">
                Información del flete
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <Dato
                  etiqueta="Modalidad de pago"
                  valor="Contra entrega en agencia"
                />

                <div>
                  <p className="mb-2 text-xs font-semibold text-gray-500">
                    Estado de cotización
                  </p>

                  <EtiquetaEstado
                    estado={pedido.estadoCotizacionFlete || "PENDIENTE"}
                  />
                </div>

                <Dato
                  etiqueta="Costo del flete"
                  valor={
                    cotizado
                      ? moneda(pedido.costoEnvio)
                      : "Pendiente de cotización"
                  }
                />

                <Dato
                  etiqueta="Fecha de cotización"
                  valor={fecha(pedido.fechaCotizacionFlete)}
                />

                <div className="sm:col-span-2">
                  <Dato
                    etiqueta="Observaciones"
                    valor={pedido.observacionFlete}
                  />
                </div>
              </div>
            </section>
          )}

          <section className="border-t border-gray-100 pt-6">
            <h3 className="mb-4 text-lg font-black text-[#063D2A]">
              Productos del pedido
            </h3>

            <div className="space-y-3">
              {detalles.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No se encontraron artículos.
                </p>
              ) : (
                detalles.map((detalle, indice) => (
                  <div
                    key={detalle.id || indice}
                    className="flex flex-wrap justify-between gap-3 rounded-xl border border-gray-100 p-4"
                  >
                    <div>
                      <p className="font-bold text-[#063D2A]">
                        {detalle.nombreArticulo ||
                          `Artículo #${detalle.idArticulo}`}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {detalle.marcaArticulo || ""}
                        {" · "}
                        {detalle.tipoArticulo || "Artículo"}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Cantidad: {detalle.cantidad}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Precio unitario: {moneda(detalle.precioUnitario)}
                      </p>
                    </div>

                    <p className="font-black text-[#FF6600]">
                      {moneda(detalle.subtotal)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-2xl bg-[#F4F7F5] p-5">
            <h3 className="mb-4 font-black text-[#063D2A]">
              Resumen económico
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-500">Subtotal de productos</span>
                <strong>{moneda(subtotal)}</strong>
              </div>

              <div className="mt-3 flex justify-between gap-3 text-sm">
                <span className="text-gray-500">
                  {esAgencia
                    ? `Flete contra entrega (${pedido.metodoEntrega})`
                    : "Flete"}
                </span>

                <strong>
                  {!esAgencia
                    ? "No aplica"
                    : cotizado
                      ? moneda(flete)
                      : "Pendiente de cotización"}
                </strong>
              </div>

              <div className="flex justify-between gap-3 border-t border-gray-200 pt-4">
                <span className="font-bold text-[#063D2A]">
                  Total a pagar a J&G
                </span>

                <span className="text-xl font-black text-[#FF6600]">
                  {moneda(pedido.total)}
                </span>
              </div>

              {esAgencia && (
                <>
                  <p className="text-xs text-gray-500">
                    El flete se paga directamente a la agencia cuando el cliente
                    recoge su pedido.
                  </p>

                  <div className="flex justify-between gap-3 border-t border-gray-200 pt-4">
                    <span className="font-bold text-[#063D2A]">
                      Costo total para el cliente
                    </span>

                    <span className="font-black text-[#063D2A]">
                      {cotizado
                        ? moneda(Number(pedido.total) + flete)
                        : "Pendiente de flete"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </section>

          {esAgencia && pedido.estadoPedido !== "CANCELADO" && (
            <FormularioFlete
              key={pedido.id}
              pedido={pedido}
              guardar={guardarFlete}
              guardando={guardandoFlete}
            />
          )}

          {esAgencia && pedido.estadoPedido === "CANCELADO" && (
            <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Este pedido está cancelado y no puede recibir nuevas cotizaciones
              de flete.
            </p>
          )}

          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
            Los pagos pendientes o en revisión no deben considerarse cobrados
            hasta verificar el abono directamente en la cuenta bancaria de J&G.
          </p>
        </div>
      </div>
    </div>
  );
}

/*
========================================
PÁGINA PRINCIPAL DE PEDIDOS
========================================
*/

export default function PedidosAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [pagosAdmin, setPagosAdmin] = useState([]);

  const [cargando, setCargando] = useState(true);
  const [actualizando, setActualizando] = useState(false);
  const [guardandoFlete, setGuardandoFlete] = useState(false);
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [cargandoPago, setCargandoPago] = useState(false);

  const [error, setError] = useState("");
  const [errorPago, setErrorPago] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [filtroPago, setFiltroPago] = useState("TODOS");

  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  const [mensajeExito, setMensajeExito] = useState("");

  /*
  ========================================
  CARGAR PEDIDOS
  ========================================
  */

  const cargarPedidos = useCallback(async (manual = false) => {
    if (manual) {
      setActualizando(true);
    } else {
      setCargando(true);
    }

    setError("");

    try {
      const respuesta = await fetch(`${API_URL}/api/pedidos`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (!respuesta.ok) {
        if (respuesta.status === 401 || respuesta.status === 403) {
          throw new Error(
            "No se pudo validar la sesión administrativa. Inicia sesión nuevamente.",
          );
        }

        throw new Error(
          `No se pudieron cargar los pedidos. HTTP ${respuesta.status}.`,
        );
      }

      const datos = await respuesta.json();

      if (!Array.isArray(datos)) {
        throw new Error("El servidor no devolvió una lista válida de pedidos.");
      }

      setPedidos(datos);

      setPedidoSeleccionado((anterior) => {
        if (!anterior) return null;

        return datos.find((pedido) => pedido.id === anterior.id) || null;
      });
    } catch (err) {
      console.error("Error cargando pedidos:", err);

      setError(err.message || "No se pudieron cargar los pedidos.");
    } finally {
      setCargando(false);
      setActualizando(false);
    }
  }, []);

  /*
  ========================================
  CARGAR PAGOS ADMINISTRATIVOS
  ========================================
  */

  const cargarPagosAdmin = useCallback(async () => {
    setCargandoPago(true);
    setErrorPago("");

    try {
      const respuesta = await fetch(`${API_URL}/api/admin/pagos`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (!respuesta.ok) {
        if (respuesta.status === 401 || respuesta.status === 403) {
          throw new Error(
            "No tienes acceso a la administración de pagos. Revisa tu sesión y los permisos del backend.",
          );
        }

        throw new Error(
          `No se pudieron consultar los pagos. HTTP ${respuesta.status}.`,
        );
      }

      const datos = await respuesta.json();

      if (!Array.isArray(datos)) {
        throw new Error("La respuesta de pagos no tiene el formato esperado.");
      }

      setPagosAdmin(datos);
    } catch (err) {
      console.error("Error cargando pagos:", err);

      setErrorPago(err.message || "No se pudieron cargar los pagos.");
    } finally {
      setCargandoPago(false);
    }
  }, []);

  useEffect(() => {
    cargarPedidos();
    cargarPagosAdmin();
  }, [cargarPedidos, cargarPagosAdmin]);

  /*
  ========================================
  GUARDAR COTIZACIÓN DE FLETE
  ========================================
  */

  const guardarCotizacionFlete = async (datosFlete) => {
    if (!pedidoSeleccionado) {
      throw new Error("Selecciona un pedido.");
    }

    setGuardandoFlete(true);
    setError("");
    setMensajeExito("");

    try {
      const csrf = await obtenerCsrf();

      const respuesta = await fetch(
        `${API_URL}/api/pedidos/${pedidoSeleccionado.id}/flete`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            [csrf.nombreHeader]: csrf.token,
          },
          body: JSON.stringify(datosFlete),
        },
      );

      if (!respuesta.ok) {
        throw new Error(await leerError(respuesta));
      }

      const actualizado = await respuesta.json();

      setPedidos((anteriores) =>
        anteriores.map((pedido) =>
          pedido.id === actualizado.id ? actualizado : pedido,
        ),
      );

      setPedidoSeleccionado(actualizado);

      setMensajeExito(
        `Cotización del pedido #${actualizado.id} guardada correctamente.`,
      );
    } catch (err) {
      console.error("Error guardando flete:", err);

      throw err;
    } finally {
      setGuardandoFlete(false);
    }
  };

  /*
  ========================================
  ACTUALIZAR DATOS LOCALES DEL PAGO
  ========================================
  */

  const actualizarPagoLocal = (pagoActualizado) => {
    setPagosAdmin((anteriores) => {
      const existe = anteriores.some(
        (pago) => pago.pedidoId === pagoActualizado.pedidoId,
      );

      if (existe) {
        return anteriores.map((pago) =>
          pago.pedidoId === pagoActualizado.pedidoId ? pagoActualizado : pago,
        );
      }

      return [pagoActualizado, ...anteriores];
    });

    setPedidos((anteriores) =>
      anteriores.map((pedido) =>
        pedido.id === pagoActualizado.pedidoId
          ? {
              ...pedido,
              estadoPago: pagoActualizado.estadoPago,
              numeroOperacionPago: pagoActualizado.numeroOperacion,
              fechaReportePago: pagoActualizado.fechaReporte,
              fechaVerificacionPago: pagoActualizado.fechaVerificacion,
              observacionPago: pagoActualizado.observacion,
            }
          : pedido,
      ),
    );

    setPedidoSeleccionado((anterior) => {
      if (!anterior || anterior.id !== pagoActualizado.pedidoId) {
        return anterior;
      }

      return {
        ...anterior,
        estadoPago: pagoActualizado.estadoPago,
        numeroOperacionPago: pagoActualizado.numeroOperacion,
        fechaReportePago: pagoActualizado.fechaReporte,
        fechaVerificacionPago: pagoActualizado.fechaVerificacion,
        observacionPago: pagoActualizado.observacion,
      };
    });
  };

  /*
  ========================================
  APROBAR O RECHAZAR PAGO
  ========================================
  */

  const ejecutarAccionPago = async (pedidoId, accion, motivo = null) => {
    setProcesandoPago(true);
    setErrorPago("");
    setMensajeExito("");

    try {
      const csrf = await obtenerCsrf();

      const respuesta = await fetch(
        `${API_URL}/api/admin/pagos/${pedidoId}/${accion}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            Accept: "application/json",
            ...(motivo !== null
              ? {
                  "Content-Type": "application/json",
                }
              : {}),
            [csrf.nombreHeader]: csrf.token,
          },
          ...(motivo !== null
            ? {
                body: JSON.stringify({
                  motivo,
                }),
              }
            : {}),
        },
      );

      if (!respuesta.ok) {
        const mensaje = await leerError(respuesta);

        if (respuesta.status === 401 || respuesta.status === 403) {
          throw new Error(
            "No se pudo autorizar la operación. Inicia sesión nuevamente y verifica los permisos. " +
              mensaje,
          );
        }

        throw new Error(mensaje);
      }

      const pagoActualizado = await respuesta.json();

      actualizarPagoLocal(pagoActualizado);

      setMensajeExito(
        accion === "aprobar"
          ? `Pago del pedido #${pedidoId} aprobado. Ya puedes notificar al cliente por WhatsApp.`
          : `Pago del pedido #${pedidoId} rechazado. Ya puedes notificar al cliente por WhatsApp.`,
      );
    } catch (err) {
      console.error(`Error al ${accion} pago:`, err);

      throw err;
    } finally {
      setProcesandoPago(false);
    }
  };

  const aprobarPago = (pedidoId) => ejecutarAccionPago(pedidoId, "aprobar");

  const rechazarPago = (pedidoId, motivo) =>
    ejecutarAccionPago(pedidoId, "rechazar", motivo);

  /*
  ========================================
  RELACIONAR PEDIDOS Y PAGOS
  ========================================
  */

  const pagosPorPedido = useMemo(() => {
    const mapa = new Map();

    pagosAdmin.forEach((pago) => {
      mapa.set(pago.pedidoId, pago);
    });

    return mapa;
  }, [pagosAdmin]);

  const pedidosConPago = useMemo(
    () =>
      pedidos.map((pedido) => {
        const pago = pagosPorPedido.get(pedido.id);

        return pago
          ? {
              ...pedido,
              estadoPago: pago.estadoPago,
              observacionPago: pago.observacion ?? pedido.observacionPago,
            }
          : pedido;
      }),
    [pedidos, pagosPorPedido],
  );

  /*
  ========================================
  ESTADÍSTICAS
  ========================================
  */

  const estadisticas = useMemo(
    () => ({
      total: pedidosConPago.length,

      pendientes: pedidosConPago.filter(
        (pedido) => pedido.estadoPago === "PENDIENTE",
      ).length,

      revision: pedidosConPago.filter(
        (pedido) => pedido.estadoPago === "EN_REVISION",
      ).length,

      aprobados: pedidosConPago.filter(
        (pedido) => pedido.estadoPago === "APROBADO",
      ).length,
    }),
    [pedidosConPago],
  );

  /*
  ========================================
  FILTRAR PEDIDOS
  ========================================
  */

  const pedidosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return pedidosConPago.filter((pedido) => {
      const coincideTexto =
        !termino ||
        String(pedido.id || "")
          .toLowerCase()
          .includes(termino) ||
        String(pedido.nombreCliente || "")
          .toLowerCase()
          .includes(termino) ||
        String(pedido.telefonoCliente || "")
          .toLowerCase()
          .includes(termino);

      const coincideEstado =
        filtroPago === "TODOS" || pedido.estadoPago === filtroPago;

      return coincideTexto && coincideEstado;
    });
  }, [pedidosConPago, busqueda, filtroPago]);

  const refrescarTodo = async () => {
    await Promise.all([cargarPedidos(true), cargarPagosAdmin()]);
  };

  const abrirPedido = (pedido) => {
    setMensajeExito("");
    setPedidoSeleccionado(pedido);
    cargarPagosAdmin();
  };

  /*
  ========================================
  INTERFAZ PRINCIPAL
  ========================================
  */

  return (
    <main className="min-h-screen bg-[#F4F7F5]">
      <header className="bg-gradient-to-r from-[#063D2A] to-[#009E49] px-5 py-9 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-widest text-green-100">
            Grupo Comercial J&G
          </p>

          <h1 className="mt-3 text-3xl font-black">Gestión de pedidos</h1>

          <p className="mt-2 text-sm text-green-50">
            Consulta las órdenes, verifica pagos, revisa comprobantes, notifica
            por WhatsApp y gestiona el flete contra entrega.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-5 px-4 py-7 sm:px-6">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <TarjetaEstadistica
            titulo="Total pedidos"
            valor={estadisticas.total}
          />

          <TarjetaEstadistica
            titulo="Pagos pendientes"
            valor={estadisticas.pendientes}
          />

          <TarjetaEstadistica
            titulo="Por verificar"
            valor={estadisticas.revision}
          />

          <TarjetaEstadistica
            titulo="Pagos aprobados"
            valor={estadisticas.aprobados}
          />
        </div>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-[#063D2A]">
                Órdenes registradas
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Información obtenida del backend.
              </p>
            </div>

            <button
              type="button"
              onClick={refrescarTodo}
              disabled={actualizando || cargando || cargandoPago}
              className="rounded-xl bg-[#009E49] px-5 py-3 text-sm font-black text-white transition hover:bg-green-700 disabled:bg-gray-400"
            >
              {actualizando ? "Actualizando..." : "Actualizar pedidos"}
            </button>
          </div>

          {mensajeExito && (
            <div
              role="status"
              className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800"
            >
              <span>{mensajeExito}</span>

              <button
                type="button"
                onClick={() => setMensajeExito("")}
                className="font-black"
              >
                ✕
              </button>
            </div>
          )}

          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por pedido, cliente o teléfono..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#009E49]"
            />

            <select
              value={filtroPago}
              onChange={(e) => setFiltroPago(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#009E49]"
            >
              {ESTADOS_PAGO.map((estado) => (
                <option key={estado} value={estado}>
                  {estado === "TODOS" ? "Todos los pagos" : textoEstado(estado)}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {errorPago && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              Administración de pagos: {errorPago}
            </div>
          )}

          {cargando ? (
            <div className="py-14 text-center text-sm text-gray-500">
              Cargando pedidos desde Render...
            </div>
          ) : pedidosFiltrados.length === 0 ? (
            <div className="py-14 text-center text-sm text-gray-500">
              {error
                ? "No se pudo obtener la información."
                : "No se encontraron pedidos."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-gray-200 text-xs uppercase text-gray-500">
                    <th className="px-3 py-4">Pedido</th>

                    <th className="px-3 py-4">Cliente</th>

                    <th className="px-3 py-4">Entrega</th>

                    <th className="px-3 py-4">Pago</th>

                    <th className="px-3 py-4">Total J&G</th>

                    <th className="px-3 py-4">Fecha</th>

                    <th className="px-3 py-4">Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {pedidosFiltrados.map((pedido) => (
                    <tr
                      key={pedido.id}
                      className="border-b border-gray-100 text-sm hover:bg-gray-50"
                    >
                      <td className="px-3 py-4 font-black text-[#FF6600]">
                        #{pedido.id}
                      </td>

                      <td className="px-3 py-4">
                        <p className="font-bold text-[#063D2A]">
                          {pedido.nombreCliente}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {pedido.telefonoCliente}
                        </p>
                      </td>

                      <td className="px-3 py-4">
                        <p className="font-semibold">{pedido.metodoEntrega}</p>

                        {tieneAgencia(pedido) && (
                          <p className="mt-1 text-xs text-gray-500">
                            {fleteCotizado(pedido)
                              ? `Flete: ${moneda(pedido.costoEnvio)}`
                              : "Flete pendiente"}
                          </p>
                        )}
                      </td>

                      <td className="px-3 py-4">
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-gray-500">
                            {pedido.metodoPago}
                          </p>

                          <EtiquetaEstado estado={pedido.estadoPago} />
                        </div>
                      </td>

                      <td className="px-3 py-4 font-black text-[#063D2A]">
                        {moneda(pedido.total)}
                      </td>

                      <td className="px-3 py-4 text-xs text-gray-500">
                        {fecha(pedido.fechaPedido)}
                      </td>

                      <td className="px-3 py-4">
                        <button
                          type="button"
                          onClick={() => abrirPedido(pedido)}
                          className="rounded-lg bg-green-50 px-4 py-2 text-xs font-black text-[#009E49] hover:bg-green-100"
                        >
                          {pedido.estadoPago === "EN_REVISION"
                            ? "Ver / Verificar pago"
                            : ["APROBADO", "RECHAZADO"].includes(
                                  pedido.estadoPago,
                                )
                              ? "Ver / Notificar WhatsApp"
                              : tieneAgencia(pedido)
                                ? "Ver / Cotizar flete"
                                : "Ver detalles"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
          Los pagos pendientes o en revisión no deben considerarse cobrados.
          Comprueba cada abono directamente en la cuenta bancaria antes de
          aprobarlo. Los fletes contra entrega se pagan directamente a la
          agencia de transporte y no forman parte del dinero recibido por J&G.
        </div>
      </div>

      {pedidoSeleccionado && (
        <DetallePedido
          pedido={pedidoSeleccionado}
          cerrar={() => setPedidoSeleccionado(null)}
          guardarFlete={guardarCotizacionFlete}
          guardandoFlete={guardandoFlete}
          informacionPago={pagosPorPedido.get(pedidoSeleccionado.id) || null}
          aprobarPago={aprobarPago}
          rechazarPago={rechazarPago}
          procesandoPago={procesandoPago}
          cargandoPago={cargandoPago}
          errorPago={errorPago}
        />
      )}
    </main>
  );
}
