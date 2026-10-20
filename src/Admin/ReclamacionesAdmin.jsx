import { useCallback, useEffect, useMemo, useState } from "react";
import MenuAdmin from "../Components/MenuAdmin";

/* ========================================
   CONFIGURACIÓN DEL BACKEND
======================================== */

const API_BASE = (
  import.meta.env.VITE_API_URL ||
  "https://grupocomercialjg-backend.onrender.com"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

const API_RECLAMACIONES = `${API_BASE}/api/admin/reclamaciones`;
const API_CSRF = `${API_BASE}/api/auth/csrf`;

/* ========================================
   FUNCIONES AUXILIARES
======================================== */

const formatoFecha = (fecha) => {
  if (!fecha) return "Sin fecha";

  const fechaFormateada = new Date(fecha);

  if (Number.isNaN(fechaFormateada.getTime())) {
    return String(fecha);
  }

  return fechaFormateada.toLocaleString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatoSoles = (monto) => {
  if (monto === null || monto === undefined || monto === "") {
    return "No indicado";
  }

  const numero = Number(monto);

  if (!Number.isFinite(numero)) return "No indicado";

  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(numero);
};

const texto = (valor) => {
  if (valor === null || valor === undefined || valor === "") {
    return "No indicado";
  }

  return String(valor);
};

const nombreCompleto = (reclamacion) =>
  [reclamacion?.nombres, reclamacion?.apellidos].filter(Boolean).join(" ") ||
  "Sin nombre";

const etiquetaEstado = (estado) => {
  const estados = {
    PENDIENTE: "Pendiente",
    EN_REVISION: "En revisión",
    RESPONDIDO: "Respondido",
  };

  return estados[estado] || estado || "Sin estado";
};

const estiloEstado = (estado) => {
  const estilos = {
    PENDIENTE: "bg-yellow-100 text-yellow-800",
    EN_REVISION: "bg-blue-100 text-blue-800",
    RESPONDIDO: "bg-green-100 text-green-800",
  };

  return estilos[estado] || "bg-gray-100 text-gray-700";
};

const obtenerMensajeError = async (respuesta) => {
  if (respuesta.status === 401 || respuesta.status === 403) {
    return "Tu sesión no tiene autorización. Inicia sesión nuevamente como administrador.";
  }

  const contenido = await respuesta.json().catch(() => null);

  return (
    contenido?.mensaje ||
    contenido?.message ||
    `Error del servidor (${respuesta.status}).`
  );
};

/* ========================================
   COMPONENTE DE INFORMACIÓN
======================================== */

function CampoDetalle({ titulo, valor }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
        {titulo}
      </p>

      <p className="mt-1 text-sm text-gray-800 break-words whitespace-pre-wrap">
        {texto(valor)}
      </p>
    </div>
  );
}

/* ========================================
   PANEL DE RECLAMACIONES
======================================== */

function ReclamacionesAdmin() {
  const [reclamaciones, setReclamaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");

  const [seleccionada, setSeleccionada] = useState(null);
  const [respuesta, setRespuesta] = useState("");

  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errorRespuesta, setErrorRespuesta] = useState("");

  /* ========================================
     CARGAR RECLAMACIONES
  ======================================== */

  const cargarReclamaciones = useCallback(async (signal) => {
    try {
      setCargando(true);
      setError("");

      const resultado = await fetch(API_RECLAMACIONES, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
        signal,
      });

      if (!resultado.ok) {
        throw new Error(await obtenerMensajeError(resultado));
      }

      const datos = await resultado.json();

      if (!Array.isArray(datos)) {
        throw new Error("El servidor devolvió un formato inválido.");
      }

      setReclamaciones(datos);
    } catch (err) {
      if (err.name === "AbortError") return;

      setError(err.message || "No se pudieron cargar las reclamaciones.");
      setReclamaciones([]);
    } finally {
      if (!signal?.aborted) {
        setCargando(false);
      }
    }
  }, []);

  useEffect(() => {
    const controlador = new AbortController();

    cargarReclamaciones(controlador.signal);

    return () => controlador.abort();
  }, [cargarReclamaciones]);

  /* ========================================
     ESTADÍSTICAS
  ======================================== */

  const estadisticas = useMemo(() => {
    return {
      total: reclamaciones.length,
      pendientes: reclamaciones.filter((item) => item.estado === "PENDIENTE")
        .length,
      revision: reclamaciones.filter((item) => item.estado === "EN_REVISION")
        .length,
      respondidas: reclamaciones.filter((item) => item.estado === "RESPONDIDO")
        .length,
    };
  }, [reclamaciones]);

  /* ========================================
     FILTRAR RECLAMACIONES
  ======================================== */

  const reclamacionesFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return reclamaciones.filter((item) => {
      const coincideEstado =
        filtroEstado === "TODOS" || item.estado === filtroEstado;

      const contenido = [
        item.numeroHoja,
        item.nombres,
        item.apellidos,
        item.numeroDocumento,
        item.correo,
        item.tipo,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return coincideEstado && contenido.includes(termino);
    });
  }, [reclamaciones, busqueda, filtroEstado]);

  /* ========================================
     ABRIR DETALLES
  ======================================== */

  const abrirDetalle = async (item) => {
    setMensaje("");
    setErrorRespuesta("");
    setRespuesta("");

    try {
      const resultado = await fetch(`${API_RECLAMACIONES}/${item.id}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!resultado.ok) {
        throw new Error(await obtenerMensajeError(resultado));
      }

      const datos = await resultado.json();

      setSeleccionada(datos);
      setRespuesta(datos.respuestaProveedor || "");
    } catch (err) {
      setError(err.message || "No se pudo consultar la reclamación.");
    }
  };

  const cerrarDetalle = () => {
    if (guardando) return;

    setSeleccionada(null);
    setRespuesta("");
    setMensaje("");
    setErrorRespuesta("");
  };

  /* ========================================
     RESPONDER RECLAMACIÓN
  ======================================== */

  const responderReclamacion = async (event) => {
    event.preventDefault();

    if (!seleccionada || guardando) return;

    if (seleccionada.estado === "RESPONDIDO") return;

    const respuestaLimpia = respuesta.trim();

    if (!respuestaLimpia) {
      setErrorRespuesta("Escribe una respuesta antes de continuar.");
      return;
    }

    const confirmar = window.confirm(
      "¿Confirmas que deseas registrar esta respuesta? La reclamación pasará al estado RESPONDIDO.",
    );

    if (!confirmar) return;

    try {
      setGuardando(true);
      setErrorRespuesta("");
      setMensaje("");

      // Obtener el token CSRF usando la misma sesión.
      const csrfResponse = await fetch(API_CSRF, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!csrfResponse.ok) {
        throw new Error("No se pudo obtener el token de seguridad.");
      }

      const csrf = await csrfResponse.json();

      if (!csrf.token || !csrf.headerName) {
        throw new Error("El token CSRF recibido es inválido.");
      }

      const resultado = await fetch(
        `${API_RECLAMACIONES}/${seleccionada.id}/responder`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            [csrf.headerName]: csrf.token,
          },
          body: JSON.stringify({
            respuesta: respuestaLimpia,
          }),
        },
      );

      if (!resultado.ok) {
        throw new Error(await obtenerMensajeError(resultado));
      }

      const actualizada = await resultado.json();

      setSeleccionada(actualizada);
      setRespuesta(actualizada.respuestaProveedor || respuestaLimpia);

      setReclamaciones((anteriores) =>
        anteriores.map((item) =>
          item.id === actualizada.id ? actualizada : item,
        ),
      );

      setMensaje("La respuesta fue registrada correctamente en el sistema.");
    } catch (err) {
      setErrorRespuesta(err.message || "No se pudo registrar la respuesta.");
    } finally {
      setGuardando(false);
    }
  };

  /* ========================================
     INTERFAZ
  ======================================== */

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#F4F7F5]">
      <MenuAdmin />

      <main className="flex-1 min-w-0 overflow-x-hidden">
        {/* ENCABEZADO */}

        <header className="bg-gradient-to-r from-[#063D2A] via-[#006B3C] to-[#009E49] text-white shadow-lg">
          <div className="px-4 sm:px-8 lg:px-10 py-8 sm:py-10">
            <p className="uppercase tracking-[0.2em] text-green-100 text-xs font-bold">
              Grupo Comercial J&G
            </p>

            <h1 className="text-2xl sm:text-4xl font-black mt-3">
              Libro de Reclamaciones
            </h1>

            <p className="text-green-100 mt-3 text-sm sm:text-base">
              Gestión administrativa de reclamos y quejas de consumidores.
            </p>

            <div className="w-20 h-1 bg-[#FF6600] rounded-full mt-5" />
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
          {/* ESTADÍSTICAS */}

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              {
                titulo: "Total",
                valor: estadisticas.total,
                icono: "📋",
                color: "text-[#063D2A]",
              },
              {
                titulo: "Pendientes",
                valor: estadisticas.pendientes,
                icono: "⏳",
                color: "text-yellow-600",
              },
              {
                titulo: "En revisión",
                valor: estadisticas.revision,
                icono: "🔍",
                color: "text-blue-600",
              },
              {
                titulo: "Respondidas",
                valor: estadisticas.respondidas,
                icono: "✅",
                color: "text-green-600",
              },
            ].map((item) => (
              <div
                key={item.titulo}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6"
              >
                <div className="flex justify-between items-center gap-2">
                  <p className="text-sm font-bold text-gray-600">
                    {item.titulo}
                  </p>

                  <span className="text-2xl">{item.icono}</span>
                </div>

                <h2
                  className={`text-3xl sm:text-4xl font-black mt-4 ${item.color}`}
                >
                  {cargando || error ? "—" : item.valor}
                </h2>
              </div>
            ))}
          </div>

          {/* LISTADO */}

          <section className="mt-7 bg-white border border-gray-100 rounded-2xl shadow-sm p-4 sm:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#063D2A]">
                  Reclamaciones recibidas
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Consulta, revisa y responde las solicitudes.
                </p>
              </div>

              <button
                type="button"
                onClick={() => cargarReclamaciones()}
                disabled={cargando}
                className="bg-[#063D2A] hover:bg-[#075238] disabled:opacity-60 text-white px-5 py-3 rounded-xl font-bold transition"
              >
                {cargando ? "Actualizando..." : "Actualizar"}
              </button>
            </div>

            {/* MENSAJES */}

            {error && (
              <div
                role="alert"
                className="mt-5 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl"
              >
                <p>{error}</p>

                <button
                  type="button"
                  onClick={() => cargarReclamaciones()}
                  className="mt-3 underline font-bold"
                >
                  Reintentar
                </button>
              </div>
            )}

            {/* FILTROS */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label
                  htmlFor="buscar-reclamacion"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Buscar reclamación
                </label>

                <input
                  id="buscar-reclamacion"
                  type="search"
                  value={busqueda}
                  onChange={(event) => setBusqueda(event.target.value)}
                  placeholder="Número de hoja, nombre o documento..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#009E49]"
                />
              </div>

              <div>
                <label
                  htmlFor="estado-reclamacion"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Filtrar por estado
                </label>

                <select
                  id="estado-reclamacion"
                  value={filtroEstado}
                  onChange={(event) => setFiltroEstado(event.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#009E49]"
                >
                  <option value="TODOS">Todos los estados</option>
                  <option value="PENDIENTE">Pendientes</option>
                  <option value="EN_REVISION">En revisión</option>
                  <option value="RESPONDIDO">Respondidos</option>
                </select>
              </div>
            </div>

            {/* TABLA */}

            <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[780px] text-sm">
                <thead className="bg-[#063D2A] text-white">
                  <tr>
                    <th className="px-4 py-4 text-left">N.º de hoja</th>
                    <th className="px-4 py-4 text-left">Consumidor</th>
                    <th className="px-4 py-4 text-left">Tipo</th>
                    <th className="px-4 py-4 text-left">Fecha</th>
                    <th className="px-4 py-4 text-left">Estado</th>
                    <th className="px-4 py-4 text-center">Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {cargando ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center p-10 text-gray-500"
                      >
                        Cargando reclamaciones...
                      </td>
                    </tr>
                  ) : reclamacionesFiltradas.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center p-10 text-gray-500"
                      >
                        {error
                          ? "No se pudieron cargar los registros."
                          : "No se encontraron reclamaciones."}
                      </td>
                    </tr>
                  ) : (
                    reclamacionesFiltradas.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-4 py-4 font-bold text-[#063D2A]">
                          {texto(item.numeroHoja)}
                        </td>

                        <td className="px-4 py-4">{nombreCompleto(item)}</td>

                        <td className="px-4 py-4">
                          {item.tipo === "RECLAMO" ? "Reclamo" : "Queja"}
                        </td>

                        <td className="px-4 py-4">
                          {formatoFecha(item.fechaRegistro)}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${estiloEstado(item.estado)}`}
                          >
                            {etiquetaEstado(item.estado)}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => abrirDetalle(item)}
                            className="bg-[#FF6600] hover:bg-[#E85C00] text-white font-bold px-4 py-2 rounded-lg transition"
                          >
                            Ver detalle
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Mostrando {reclamacionesFiltradas.length} de{" "}
              {reclamaciones.length} reclamaciones.
            </p>
          </section>
        </div>
      </main>

      {/* ========================================
          MODAL DE DETALLE
      ======================================== */}

      {seleccionada && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-3 sm:p-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-detalle-reclamacion"
            className="bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl"
          >
            {/* CABECERA MODAL */}

            <div className="sticky top-0 z-10 bg-[#063D2A] text-white p-5 sm:p-6 flex justify-between items-start gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-green-200">
                  Hoja de reclamación
                </p>

                <h2
                  id="titulo-detalle-reclamacion"
                  className="text-xl sm:text-2xl font-black mt-2"
                >
                  {texto(seleccionada.numeroHoja)}
                </h2>
              </div>

              <button
                type="button"
                onClick={cerrarDetalle}
                disabled={guardando}
                aria-label="Cerrar detalles"
                className="text-white hover:text-orange-300 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-5 sm:p-7 space-y-7">
              {/* ESTADO */}

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold ${estiloEstado(seleccionada.estado)}`}
                >
                  {etiquetaEstado(seleccionada.estado)}
                </span>

                <span className="text-sm text-gray-500">
                  Registrada: {formatoFecha(seleccionada.fechaRegistro)}
                </span>
              </div>

              {/* CONSUMIDOR */}

              <section>
                <h3 className="text-lg font-black text-[#063D2A] border-b pb-3 mb-4">
                  1. Datos del consumidor
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CampoDetalle
                    titulo="Nombres y apellidos"
                    valor={nombreCompleto(seleccionada)}
                  />

                  <CampoDetalle
                    titulo="Documento"
                    valor={`${texto(seleccionada.tipoDocumento)} - ${texto(seleccionada.numeroDocumento)}`}
                  />

                  <CampoDetalle
                    titulo="Domicilio"
                    valor={seleccionada.domicilio}
                  />

                  <CampoDetalle
                    titulo="Teléfono"
                    valor={seleccionada.telefono}
                  />

                  <CampoDetalle
                    titulo="Correo electrónico"
                    valor={seleccionada.correo}
                  />
                </div>

                {seleccionada.menorEdad && (
                  <div className="mt-5 bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <h4 className="font-bold text-[#063D2A] mb-4">
                      Representante del menor
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <CampoDetalle
                        titulo="Representante"
                        valor={seleccionada.representante}
                      />

                      <CampoDetalle
                        titulo="Domicilio"
                        valor={seleccionada.domicilioRepresentante}
                      />

                      <CampoDetalle
                        titulo="Teléfono"
                        valor={seleccionada.telefonoRepresentante}
                      />

                      <CampoDetalle
                        titulo="Correo"
                        valor={seleccionada.correoRepresentante}
                      />
                    </div>
                  </div>
                )}
              </section>

              {/* PRODUCTO O SERVICIO */}

              <section>
                <h3 className="text-lg font-black text-[#063D2A] border-b pb-3 mb-4">
                  2. Producto o servicio
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CampoDetalle
                    titulo="Tipo de bien"
                    valor={seleccionada.tipoBien}
                  />

                  <CampoDetalle
                    titulo="Monto"
                    valor={formatoSoles(seleccionada.monto)}
                  />

                  <CampoDetalle
                    titulo="Número de pedido"
                    valor={seleccionada.numeroPedido}
                  />

                  <CampoDetalle
                    titulo="Descripción"
                    valor={seleccionada.descripcionBien}
                  />
                </div>
              </section>

              {/* RECLAMACIÓN */}

              <section>
                <h3 className="text-lg font-black text-[#063D2A] border-b pb-3 mb-4">
                  3. Detalle de la reclamación
                </h3>

                <div className="space-y-4">
                  <CampoDetalle titulo="Tipo" valor={seleccionada.tipo} />

                  <CampoDetalle titulo="Detalle" valor={seleccionada.detalle} />

                  <CampoDetalle
                    titulo="Pedido del consumidor"
                    valor={seleccionada.pedidoConsumidor}
                  />
                </div>
              </section>

              {/* RESPUESTA */}

              <section className="bg-[#F4F7F5] border border-gray-200 rounded-xl p-5">
                <h3 className="text-lg font-black text-[#063D2A] mb-4">
                  4. Respuesta del proveedor
                </h3>

                {seleccionada.estado === "RESPONDIDO" ? (
                  <div>
                    <CampoDetalle
                      titulo="Respuesta registrada"
                      valor={seleccionada.respuestaProveedor}
                    />

                    <p className="mt-4 text-sm text-gray-500">
                      Fecha de respuesta:{" "}
                      {formatoFecha(seleccionada.fechaRespuesta)}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={responderReclamacion}>
                    <label
                      htmlFor="respuesta-proveedor"
                      className="block font-bold text-sm text-gray-700 mb-2"
                    >
                      Escribe la respuesta
                    </label>

                    <textarea
                      id="respuesta-proveedor"
                      rows={6}
                      value={respuesta}
                      onChange={(event) => setRespuesta(event.target.value)}
                      maxLength={5000}
                      required
                      placeholder="Escribe aquí la respuesta al consumidor..."
                      className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:ring-2 focus:ring-[#009E49] resize-y"
                    />

                    <p className="text-xs text-gray-500 mt-2">
                      La respuesta quedará registrada en el sistema. Este
                      proceso no envía automáticamente un correo al consumidor.
                    </p>

                    {errorRespuesta && (
                      <p
                        role="alert"
                        className="mt-4 text-sm text-red-700 font-semibold"
                      >
                        {errorRespuesta}
                      </p>
                    )}

                    {mensaje && (
                      <p
                        role="status"
                        className="mt-4 text-sm text-green-700 font-semibold"
                      >
                        {mensaje}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={guardando || !respuesta.trim()}
                      className="mt-5 bg-[#009E49] hover:bg-[#007A39] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-black transition"
                    >
                      {guardando
                        ? "Registrando respuesta..."
                        : "Registrar respuesta"}
                    </button>
                  </form>
                )}
              </section>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={cerrarDetalle}
                  disabled={guardando}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-bold transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReclamacionesAdmin;
