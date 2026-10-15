import { useCallback, useEffect, useMemo, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://grupocomercialjg-backend.onrender.com"
).replace(/\/+$/, "");

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

  const convertida = new Date(valor);

  if (Number.isNaN(convertida.getTime())) {
    return "Sin registrar";
  }

  return convertida.toLocaleString("es-PE", {
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
        {valor || "No registrado"}
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
      "No se pudo obtener el token de seguridad. Inicia sesión nuevamente.",
    );
  }

  const datos = await respuesta.json();

  const token = datos.token || datos.csrfToken || datos._csrf?.token;

  const nombreHeader =
    datos.headerName || datos._csrf?.headerName || "X-CSRF-TOKEN";

  if (!token) {
    throw new Error(
      "El servidor no devolvió el token CSRF necesario para guardar.",
    );
  }

  return { token, nombreHeader };
}

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
    } catch (error) {
      setErrorFormulario(error.message || "No se pudo guardar el flete.");
    }
  };

  return (
    <section className="rounded-2xl border border-orange-200 bg-orange-50/70 p-5">
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-widest text-[#C94E14]">
          Gestión de transporte
        </p>

        <h3 className="mt-2 text-lg font-black text-[#063D2A]">
          Cotizar flete contra entrega
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Ingresa el costo informado por {pedido.metodoEntrega}. El cliente
          pagará este importe directamente a la agencia cuando recoja su pedido.
          J&G no cobrará el flete.
        </p>
      </div>

      <form onSubmit={enviar} className="space-y-4">
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
              onChange={(evento) => setCosto(evento.target.value)}
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
              onChange={(evento) => setEstado(evento.target.value)}
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
            onChange={(evento) => setObservacion(evento.target.value)}
            disabled={guardando}
            placeholder="Ejemplo: 2 bultos, peso aproximado 15 kg, agencia Shalom..."
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
          className="w-full rounded-xl bg-[#C94E14] px-5 py-3 font-black text-white transition hover:bg-[#A83E0B] disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto"
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

function DetallePedido({ pedido, cerrar, guardarFlete, guardandoFlete }) {
  if (!pedido) return null;

  const detalles = Array.isArray(pedido.detalles) ? pedido.detalles : [];

  const esAgencia = tieneAgencia(pedido);
  const cotizado = fleteCotizado(pedido);

  const subtotal = Number(pedido.subtotal) || 0;
  const flete = cotizado ? Number(pedido.costoEnvio) || 0 : 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={guardandoFlete ? undefined : cerrar}
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
            disabled={guardandoFlete}
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

                <EtiquetaEstado estado={pedido.estadoPago} />
              </div>

              <Dato etiqueta="Método de pago" valor={pedido.metodoPago} />
            </div>
          </section>

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

              <div className="flex justify-between gap-3 text-sm">
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
                        ? moneda(subtotal + flete)
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

export default function PedidosAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [actualizando, setActualizando] = useState(false);
  const [guardandoFlete, setGuardandoFlete] = useState(false);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroPago, setFiltroPago] = useState("TODOS");
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [mensajeExito, setMensajeExito] = useState("");

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
            "No se pudo validar la sesión administrativa. " +
              "Inicia sesión nuevamente. Si el problema continúa, " +
              "revisa las cookies entre React y Render.",
          );
        }

        throw new Error(
          `No se pudieron cargar los pedidos. Error HTTP ${respuesta.status}.`,
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

      if (err instanceof TypeError) {
        setError(
          "No se pudo conectar con Render. " +
            "Comprueba la URL del backend, CORS y la conexión.",
        );
      } else {
        setError(err.message || "Ocurrió un error inesperado.");
      }
    } finally {
      setCargando(false);
      setActualizando(false);
    }
  }, []);

  useEffect(() => {
    cargarPedidos();
  }, [cargarPedidos]);

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
        let mensaje = "";

        try {
          const cuerpo = await respuesta.json();

          mensaje = cuerpo.message || cuerpo.detail || cuerpo.error || "";
        } catch {
          // El servidor puede devolver una respuesta sin JSON.
        }

        if (respuesta.status === 401 || respuesta.status === 403) {
          throw new Error(
            "No tienes una sesión administrativa válida " +
              "o el token CSRF fue rechazado. " +
              "Vuelve a iniciar sesión.",
          );
        }

        if (respuesta.status === 404) {
          throw new Error(
            "No se encontró la ruta para actualizar el flete. " +
              "Comprueba que el backend actualizado esté desplegado en Render.",
          );
        }

        throw new Error(
          mensaje ||
            `No se pudo guardar el flete. Error HTTP ${respuesta.status}.`,
        );
      }

      const pedidoActualizado = await respuesta.json();

      setPedidos((anteriores) =>
        anteriores.map((pedido) =>
          pedido.id === pedidoActualizado.id ? pedidoActualizado : pedido,
        ),
      );

      setPedidoSeleccionado(pedidoActualizado);

      setMensajeExito(
        `Cotización del pedido #${pedidoActualizado.id} guardada correctamente.`,
      );
    } catch (err) {
      console.error("Error guardando cotización:", err);

      if (err instanceof TypeError) {
        throw new Error(
          "No se pudo conectar con Render para guardar el flete.",
        );
      }

      throw err;
    } finally {
      setGuardandoFlete(false);
    }
  };

  const estadisticas = useMemo(() => {
    return {
      total: pedidos.length,

      pendientes: pedidos.filter((pedido) => pedido.estadoPago === "PENDIENTE")
        .length,

      revision: pedidos.filter((pedido) => pedido.estadoPago === "EN_REVISION")
        .length,

      aprobados: pedidos.filter((pedido) => pedido.estadoPago === "APROBADO")
        .length,
    };
  }, [pedidos]);

  const pedidosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return pedidos.filter((pedido) => {
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
  }, [pedidos, busqueda, filtroPago]);

  return (
    <main className="min-h-screen bg-[#F4F7F5]">
      <header className="bg-gradient-to-r from-[#063D2A] to-[#009E49] px-5 py-9 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-widest text-green-100">
            Grupo Comercial J&G
          </p>

          <h1 className="mt-3 text-3xl font-black">Gestión de pedidos</h1>

          <p className="mt-2 text-sm text-green-50">
            Consulta las órdenes, revisa sus pagos y gestiona el flete contra
            entrega de cada envío.
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
              onClick={() => cargarPedidos(true)}
              disabled={actualizando || cargando}
              className="rounded-xl bg-[#009E49] px-5 py-3 text-sm font-black text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
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
              onChange={(evento) => setBusqueda(evento.target.value)}
              placeholder="Buscar por pedido, cliente o teléfono..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#009E49]"
            />

            <select
              value={filtroPago}
              onChange={(evento) => setFiltroPago(evento.target.value)}
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
                          onClick={() => {
                            setMensajeExito("");
                            setPedidoSeleccionado(pedido);
                          }}
                          className="rounded-lg bg-green-50 px-4 py-2 text-xs font-black text-[#009E49] hover:bg-green-100"
                        >
                          {tieneAgencia(pedido)
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

      <DetallePedido
        pedido={pedidoSeleccionado}
        cerrar={() => setPedidoSeleccionado(null)}
        guardarFlete={guardarCotizacionFlete}
        guardandoFlete={guardandoFlete}
      />
    </main>
  );
}
