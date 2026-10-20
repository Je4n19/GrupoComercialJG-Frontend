import { useEffect, useMemo, useRef, useState } from "react";

import { Link } from "react-router-dom";

import { obtenerProductos } from "../Services/productoService";

import { obtenerRepuestos } from "../Services/repuestoService";

import logoYape from "../assets/Pagos/yape.png";

import logoPlin from "../assets/Pagos/plin.png";

import logoBCP from "../assets/Pagos/bcp.png";

import logoBBVA from "../assets/Pagos/bbva.png";

import logoVisa from "../assets/Pagos/visa.png";

import logoShalom from "../assets/shalom.png";

import logoEmtrafesa from "../assets/emtrafesa.png";

import logoOlva from "../assets/olva.png";

// ======================================================

// CONFIGURACIÓN

// ======================================================

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://grupocomercialjg-backend.onrender.com"
).replace(/\/+$/, "");

const CLAVE_CARRITO = "jg_carrito";

const CLAVE_PEDIDO = "jg_ultimo_pedido";

const DATOS_BANCARIOS = {
  titular: "Jesus Oliver Guevara Torres",

  celular: "943168545",

  bcp: {
    cuenta: "305-2469851-0-96",

    cci: "00230500246985109613",
  },

  bbva: {
    cuenta: "0011-0287-0200258047",

    cci: "0112870020025804706",
  },
};

const ENTREGAS = [
  {
    id: "SHALOM",

    nombre: "Shalom",

    descripcion: "Flete contra entrega en agencia",

    logo: logoShalom,
  },

  {
    id: "EMTRAFESA",

    nombre: "Emtrafesa",

    descripcion: "Flete contra entrega en agencia",

    logo: logoEmtrafesa,
  },

  {
    id: "OLVA",

    nombre: "Olva Courier",

    descripcion: "Flete contra entrega en agencia",

    logo: logoOlva,
  },

  {
    id: "RECOJO",

    nombre: "Recojo en tienda",

    descripcion: "Recoge tu pedido en nuestro local",

    logo: null,
  },
];

const PAGOS = [
  {
    id: "YAPE",

    nombre: "Yape",

    descripcion: "Billetera digital",

    logo: logoYape,

    habilitado: true,
  },

  {
    id: "PLIN",

    nombre: "Plin",

    descripcion: "Billetera digital",

    logo: logoPlin,

    habilitado: true,
  },

  {
    id: "BCP",

    nombre: "BCP",

    descripcion: "Transferencia bancaria",

    logo: logoBCP,

    habilitado: true,
  },

  {
    id: "BBVA",

    nombre: "BBVA",

    descripcion: "Transferencia bancaria",

    logo: logoBBVA,

    habilitado: true,
  },

  {
    id: "TARJETA",

    nombre: "Tarjeta",

    descripcion: "Crédito o débito",

    logo: logoVisa,

    habilitado: false,
  },
];

const DATOS_INICIALES = {
  nombreCliente: "",

  telefonoCliente: "",

  correoCliente: "",

  metodoEntrega: "RECOJO",

  departamento: "Lambayeque",

  provincia: "Chiclayo",

  distrito: "",

  direccionEntrega: "",

  referencia: "",
};

// ======================================================

// UTILIDADES

// ======================================================

function leerCarrito() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_CARRITO) || "[]");

    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function formatearPrecio(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return "Por confirmar";
  }

  const numero = Number(valor);

  if (!Number.isFinite(numero) || numero < 0) {
    return "Por confirmar";
  }

  return `S/ ${numero.toLocaleString("es-PE", {
    minimumFractionDigits: 2,

    maximumFractionDigits: 2,
  })}`;
}

function Logo({ src, alt, grande = false }) {
  if (!src) {
    return <span className="text-3xl">🏬</span>;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`object-contain ${grande ? "h-14 w-28" : "h-12 w-20"}`}
    />
  );
}

function Campo({
  nombre,

  etiqueta,

  valor,

  onChange,

  type = "text",

  placeholder = "",

  required = true,

  maxLength,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-[#063D2A]">
        {etiqueta}
      </span>

      <input
        name={nombre}
        type={type}
        value={valor}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#009E49] focus:ring-2 focus:ring-green-100"
      />
    </label>
  );
}

function obtenerDetalles(carrito) {
  return carrito.map((item) => {
    const idArticulo = Number(item.id);

    const cantidad = Number(item.cantidad ?? 1);

    const tipo = String(item.tipo || "producto").toLowerCase();

    if (
      !Number.isSafeInteger(idArticulo) ||
      idArticulo <= 0 ||
      !Number.isSafeInteger(cantidad) ||
      cantidad <= 0 ||
      !["producto", "repuesto"].includes(tipo)
    ) {
      throw new Error(
        `El artículo "${item.nombre || "sin nombre"}" tiene datos inválidos.`,
      );
    }

    return {
      tipoArticulo: tipo.toUpperCase(),

      idArticulo,

      cantidad,
    };
  });
}

// ======================================================

// VERIFICACIÓN DE INVENTARIO

// ======================================================

async function verificarInventarioCheckout(carrito) {
  if (!Array.isArray(carrito) || carrito.length === 0) {
    throw new Error("Tu carrito está vacío.");
  }

  const necesitaProductos = carrito.some(
    (item) => String(item.tipo || "producto").toLowerCase() === "producto",
  );

  const necesitaRepuestos = carrito.some(
    (item) => String(item.tipo || "producto").toLowerCase() === "repuesto",
  );

  const [productos, repuestos] = await Promise.all([
    necesitaProductos ? obtenerProductos() : Promise.resolve([]),

    necesitaRepuestos ? obtenerRepuestos() : Promise.resolve([]),
  ]);

  if (!Array.isArray(productos) || !Array.isArray(repuestos)) {
    throw new Error("No se pudo verificar el inventario. Intenta nuevamente.");
  }

  const cantidades = new Map();

  for (const item of carrito) {
    const tipo = String(item.tipo || "producto").toLowerCase();

    const id = Number(item.id);

    const cantidad = Number(item.cantidad ?? 1);

    if (
      !["producto", "repuesto"].includes(tipo) ||
      !Number.isSafeInteger(id) ||
      id <= 0 ||
      !Number.isSafeInteger(cantidad) ||
      cantidad <= 0
    ) {
      throw new Error(`Hay datos inválidos en "${item.nombre || "Artículo"}".`);
    }

    const clave = `${tipo}-${id}`;

    const anterior = cantidades.get(clave);

    cantidades.set(clave, {
      tipo,

      id,

      nombre: item.nombre || "Artículo",

      cantidad: (anterior?.cantidad || 0) + cantidad,
    });
  }

  for (const item of cantidades.values()) {
    const lista = item.tipo === "repuesto" ? repuestos : productos;

    const articulo = lista.find(
      (elemento) => String(elemento.id) === String(item.id),
    );

    if (!articulo) {
      throw new Error(
        `"${item.nombre}" ya no está disponible. Regresa al carrito.`,
      );
    }

    const stock = Number(articulo.stock);

    if (
      articulo.stock === null ||
      articulo.stock === undefined ||
      articulo.stock === "" ||
      !Number.isSafeInteger(stock) ||
      stock < 0
    ) {
      throw new Error(`No se pudo confirmar el stock de "${item.nombre}".`);
    }

    if (stock < item.cantidad) {
      throw new Error(
        `Stock insuficiente para "${item.nombre}". ` +
          `Solicitaste ${item.cantidad} y solo quedan ${stock} unidades. ` +
          "Regresa al carrito para modificarlo.",
      );
    }
  }

  return true;
}

// ======================================================

// SEGURIDAD CSRF

// ======================================================

async function obtenerCsrf() {
  const respuesta = await fetch(`${API_URL}/api/auth/csrf`, {
    method: "GET",

    credentials: "include",

    headers: {
      Accept: "application/json",
    },
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el token de seguridad del servidor.");
  }

  const csrf = await respuesta.json();

  if (!csrf.token || !csrf.headerName) {
    throw new Error("El servidor no devolvió un token CSRF válido.");
  }

  return csrf;
}

async function leerError(respuesta) {
  let mensaje = `Error HTTP ${respuesta.status}.`;

  try {
    const datos = await respuesta.json();

    mensaje = datos.detail || datos.message || datos.error || mensaje;
  } catch {
    // Mantener el mensaje general.
  }

  if (respuesta.status === 403) {
    return (
      "El servidor rechazó la solicitud de seguridad. " +
      "Verifica los permisos del endpoint, las cookies, CORS y CSRF."
    );
  }

  if (respuesta.status === 409) {
    return "La operación no puede completarse en el estado actual. " + mensaje;
  }

  return mensaje;
}

// ======================================================

// DATOS BANCARIOS COPIABLES

// ======================================================

function DatoCopiable({ etiqueta, valor }) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(valor);

      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-xs font-semibold text-gray-500">{etiqueta}</p>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <span className="break-all text-sm font-black text-[#063D2A]">
          {valor}
        </span>

        <button
          type="button"
          onClick={copiar}
          className="rounded-lg bg-green-50 px-3 py-2 text-xs font-bold text-[#009E49] hover:bg-green-100"
        >
          {copiado ? "Copiado ✓" : "Copiar"}
        </button>
      </div>
    </div>
  );
}

// ======================================================

// INFORMACIÓN PARA REALIZAR EL PAGO

// ======================================================

function DatosPago({ metodoPago, importe }) {
  const metodo = PAGOS.find((opcion) => opcion.id === metodoPago);

  if (!metodo || metodoPago === "TARJETA") {
    return null;
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-green-200 bg-green-50 text-left">
      <div className="flex items-center gap-4 border-b border-green-200 bg-white p-5">
        <Logo src={metodo.logo} alt={metodo.nombre} grande />

        <div>
          <h3 className="font-black text-[#063D2A]">
            Pago mediante {metodo.nombre}
          </h3>

          <p className="mt-1 text-xs text-gray-500">Grupo Comercial J&G</p>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div className="rounded-xl border border-green-200 bg-white p-4">
          <p className="text-sm font-bold text-[#063D2A]">
            Importe exacto a transferir
          </p>

          <p className="mt-2 text-2xl font-black text-[#FF6600]">
            {formatearPrecio(importe)}
          </p>

          <p className="mt-2 text-xs text-gray-600">
            Este importe corresponde a los productos comprados en J&G. No
            incluye el flete contra entrega.
          </p>
        </div>

        {(metodoPago === "YAPE" || metodoPago === "PLIN") && (
          <>
            <DatoCopiable
              etiqueta={`Número de ${metodoPago}`}
              valor={DATOS_BANCARIOS.celular}
            />

            <DatoCopiable etiqueta="Titular" valor={DATOS_BANCARIOS.titular} />
          </>
        )}

        {metodoPago === "BCP" && (
          <>
            <DatoCopiable
              etiqueta="Cuenta BCP en soles"
              valor={DATOS_BANCARIOS.bcp.cuenta}
            />

            <DatoCopiable etiqueta="CCI BCP" valor={DATOS_BANCARIOS.bcp.cci} />

            <DatoCopiable etiqueta="Titular" valor={DATOS_BANCARIOS.titular} />
          </>
        )}

        {metodoPago === "BBVA" && (
          <>
            <DatoCopiable
              etiqueta="Cuenta BBVA en soles"
              valor={DATOS_BANCARIOS.bbva.cuenta}
            />

            <DatoCopiable
              etiqueta="CCI BBVA"
              valor={DATOS_BANCARIOS.bbva.cci}
            />

            <DatoCopiable etiqueta="Titular" valor={DATOS_BANCARIOS.titular} />
          </>
        )}
      </div>
    </div>
  );
}

// ======================================================

// SELECCIONAR COMPROBANTE DE PAGO

// ======================================================

function SelectorComprobante({
  archivo,

  onSeleccionar,

  deshabilitado = false,
}) {
  const [vistaPrevia, setVistaPrevia] = useState("");

  useEffect(() => {
    if (!archivo) {
      setVistaPrevia("");

      return;
    }

    const url = URL.createObjectURL(archivo);

    setVistaPrevia(url);

    return () => URL.revokeObjectURL(url);
  }, [archivo]);

  const seleccionar = (evento) => {
    const seleccionado = evento.target.files?.[0] || null;

    if (!seleccionado) return;

    const formatosPermitidos = ["image/jpeg", "image/png", "image/webp"];

    if (!formatosPermitidos.includes(seleccionado.type)) {
      evento.target.value = "";

      alert("Solo se permiten imágenes JPG, PNG o WebP.");

      return;
    }

    if (seleccionado.size > 5 * 1024 * 1024) {
      evento.target.value = "";

      alert("La imagen no puede superar los 5 MB.");

      return;
    }

    onSeleccionar(seleccionado);
  };

  return (
    <div className="mt-5 rounded-2xl border border-dashed border-green-300 bg-green-50 p-5">
      <h4 className="font-black text-[#063D2A]">
        📸 Adjuntar comprobante de pago
      </h4>

      <p className="mt-2 text-sm text-gray-600">
        Selecciona una captura o fotografía de tu transferencia para que podamos
        verificar el pago.
      </p>

      <label
        className={`mt-4 block rounded-xl border border-green-300 bg-white p-4 text-center transition ${
          deshabilitado
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:bg-green-100"
        }`}
      >
        <span className="text-sm font-bold text-[#009E49]">
          {archivo ? "Cambiar imagen" : "Seleccionar imagen del comprobante"}
        </span>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={seleccionar}
          disabled={deshabilitado}
          className="sr-only"
        />
      </label>

      <p className="mt-2 text-center text-xs text-gray-500">
        JPG, PNG o WebP. Máximo 5 MB.
      </p>

      {vistaPrevia && (
        <div className="mt-5">
          <img
            src={vistaPrevia}
            alt="Vista previa del comprobante"
            className="mx-auto max-h-80 w-full rounded-xl border border-gray-200 bg-white object-contain"
          />

          <p className="mt-3 break-all text-center text-xs text-gray-600">
            {archivo.name}
          </p>

          <button
            type="button"
            disabled={deshabilitado}
            onClick={() => onSeleccionar(null)}
            className="mt-3 w-full rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-600 disabled:opacity-50"
          >
            Quitar imagen
          </button>
        </div>
      )}

      <p className="mt-4 text-xs text-green-800">
        La imagen se enviará al servidor cuando reportes tu pago. Nuestro equipo
        verificará la operación antes de aprobarla.
      </p>
    </div>
  );
}

// ======================================================

// REPORTAR PAGO CON COMPROBANTE A CLOUDINARY

// ======================================================

function ReportarPago({ pedido, tokenSeguimiento, onPagoReportado }) {
  const [numeroOperacion, setNumeroOperacion] = useState("");

  const [archivo, setArchivo] = useState(null);

  const [enviando, setEnviando] = useState(false);

  const [error, setError] = useState("");

  const enviandoRef = useRef(false);

  const enviarReporte = async (evento) => {
    evento.preventDefault();

    if (enviandoRef.current) return;

    const operacion = numeroOperacion.trim();

    if (!/^[A-Za-z0-9-]{4,50}$/.test(operacion)) {
      setError("Ingresa un número de operación válido de 4 a 50 caracteres.");

      return;
    }

    if (!pedido?.id || !tokenSeguimiento) {
      setError("No se encontraron los datos del pedido.");

      return;
    }

    if (!archivo) {
      setError("Debes adjuntar una imagen del comprobante de pago.");

      return;
    }

    const formatosPermitidos = ["image/jpeg", "image/png", "image/webp"];

    if (!formatosPermitidos.includes(archivo.type)) {
      setError("El comprobante debe ser JPG, PNG o WebP.");

      return;
    }

    if (archivo.size > 5 * 1024 * 1024) {
      setError("El comprobante no puede superar los 5 MB.");

      return;
    }

    enviandoRef.current = true;

    setEnviando(true);

    setError("");

    try {
      // Obtener token CSRF

      const csrf = await obtenerCsrf();

      // Preparar el archivo y los datos del pedido

      const formData = new FormData();

      formData.append("pedidoId", String(pedido.id));

      formData.append("tokenSeguimiento", tokenSeguimiento);

      formData.append("numeroOperacion", operacion);

      formData.append("comprobante", archivo, archivo.name);

      // Enviar al backend Spring Boot

      const respuesta = await fetch(
        `${API_URL}/api/pagos/reportar-comprobante`,

        {
          method: "POST",

          credentials: "include",

          headers: {
            Accept: "application/json",

            [csrf.headerName]: csrf.token,
          },

          body: formData,
        },
      );

      // No establecer Content-Type:

      // el navegador configura multipart/form-data.

      if (!respuesta.ok) {
        throw new Error(await leerError(respuesta));
      }

      const resultado = await respuesta.json();

      if (resultado.estadoPago !== "EN_REVISION") {
        throw new Error(
          "El servidor no confirmó el estado de revisión. " +
            "Verifica el pedido antes de intentar enviarlo otra vez.",
        );
      }

      // Mostrar confirmación solamente

      // cuando el backend confirme el reporte.

      onPagoReportado(resultado);
    } catch (err) {
      console.error("Error reportando pago:", err);

      setError(
        err instanceof TypeError
          ? "No se pudo conectar con el backend. Verifica Render, CORS y la conexión."
          : err.message || "No se pudo reportar el pago.",
      );
    } finally {
      enviandoRef.current = false;

      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={enviarReporte}
      className="mt-6 rounded-2xl border border-green-200 bg-white p-5 text-left"
    >
      <h3 className="text-lg font-black text-[#063D2A]">Reportar mi pago</h3>

      <p className="mt-2 text-sm text-gray-600">
        Después de realizar la transferencia, ingresa el número de operación y
        adjunta la imagen de tu comprobante.
      </p>

      <div className="mt-5">
        <Campo
          nombre="numeroOperacion"
          etiqueta="Número de operación"
          valor={numeroOperacion}
          onChange={(evento) => {
            setNumeroOperacion(evento.target.value);

            setError("");
          }}
          placeholder="Ejemplo: 123456789"
          maxLength={50}
        />
      </div>

      <SelectorComprobante
        archivo={archivo}
        onSeleccionar={(seleccionado) => {
          setArchivo(seleccionado);

          setError("");
        }}
        deshabilitado={enviando}
      />

      {error && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={enviando || !archivo}
        className="mt-5 w-full rounded-xl bg-[#009E49] px-5 py-4 font-black text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {enviando
          ? "Subiendo comprobante y reportando pago..."
          : "Enviar comprobante y reportar pago →"}
      </button>

      <p className="mt-3 text-xs text-gray-500">
        El reporte no aprueba automáticamente el pago. Nuestro equipo verificará
        el abono recibido.
      </p>
    </form>
  );
}

// ======================================================

// RESUMEN DEL FLETE

// ======================================================

function ResumenFlete({ pedido }) {
  const esRecojo = pedido.metodoEntrega === "RECOJO";

  const cotizado = ["ESTIMADO", "CONFIRMADO"].includes(
    pedido.estadoCotizacionFlete,
  );

  const flete =
    cotizado && pedido.costoEnvio != null ? Number(pedido.costoEnvio) : null;

  return (
    <div className="mt-6 rounded-2xl bg-[#F4F7F5] p-5 text-left">
      <h3 className="font-black text-[#063D2A]">Resumen de importes</h3>

      <div className="mt-4 flex justify-between gap-3 text-sm">
        <span className="text-gray-600">Productos</span>

        <strong>{formatearPrecio(pedido.subtotal)}</strong>
      </div>

      <div className="mt-4 flex justify-between gap-3 text-sm">
        <span className="text-gray-600">
          {esRecojo ? "Recojo en tienda" : `Flete por ${pedido.metodoEntrega}`}
        </span>

        <strong>
          {esRecojo
            ? "Sin costo"
            : flete !== null
              ? formatearPrecio(flete)
              : "Pendiente de cotización"}
        </strong>
      </div>

      <div className="mt-4 flex justify-between gap-3 border-t border-gray-200 pt-4">
        <span className="font-bold text-[#063D2A]">Total a pagar a J&G</span>

        <strong className="text-xl text-[#FF6600]">
          {formatearPrecio(pedido.total)}
        </strong>
      </div>

      {!esRecojo && (
        <>
          <p className="mt-3 text-xs text-amber-700">
            El flete no está incluido en el pago a J&G. Se paga directamente a
            la agencia cuando recojas tu pedido.
          </p>

          <div className="mt-4 flex justify-between gap-3 border-t border-gray-200 pt-4">
            <span className="text-sm font-bold text-[#063D2A]">
              Gasto total estimado
            </span>

            <strong className="text-[#063D2A]">
              {flete !== null
                ? formatearPrecio(Number(pedido.total) + flete)
                : "Por confirmar"}
            </strong>
          </div>
        </>
      )}
    </div>
  );
}

// ======================================================

// COMPONENTE PRINCIPAL

// ======================================================

export default function Checkout() {
  const [carrito, setCarrito] = useState(leerCarrito);

  const [datos, setDatos] = useState(DATOS_INICIALES);

  const [metodoPago, setMetodoPago] = useState("YAPE");

  // Navegación visual del checkout, sin alterar la lógica del pedido.
  const [pasoActual, setPasoActual] = useState(1);
  const formularioRef = useRef(null);

  const [registrando, setRegistrando] = useState(false);

  const [errorPedido, setErrorPedido] = useState("");

  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);

  const [tokenSeguimiento, setTokenSeguimiento] = useState("");

  const [reporteConfirmado, setReporteConfirmado] = useState(null);

  const enviandoRef = useRef(false);

  const esRecojo = datos.metodoEntrega === "RECOJO";

  const entregaSeleccionada = ENTREGAS.find(
    (opcion) => opcion.id === datos.metodoEntrega,
  );

  // ====================================================

  // SINCRONIZAR CARRITO

  // ====================================================

  useEffect(() => {
    const actualizar = () => setCarrito(leerCarrito());

    window.addEventListener("storage", actualizar);

    window.addEventListener("jg-carrito-actualizado", actualizar);

    return () => {
      window.removeEventListener("storage", actualizar);

      window.removeEventListener("jg-carrito-actualizado", actualizar);
    };
  }, []);

  // ====================================================

  // RESUMEN DE COMPRA

  // ====================================================

  const resumen = useMemo(() => {
    let subtotal = 0;

    let unidades = 0;

    let sinPrecio = 0;

    carrito.forEach((item) => {
      const cantidad = Math.max(1, Math.floor(Number(item.cantidad) || 1));

      unidades += cantidad;

      if (
        item.precio != null &&
        item.precio !== "" &&
        Number.isFinite(Number(item.precio)) &&
        Number(item.precio) >= 0
      ) {
        subtotal += Number(item.precio) * cantidad;
      } else {
        sinPrecio++;
      }
    });

    return {
      subtotal,

      unidades,

      sinPrecio,
    };
  }, [carrito]);

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;

    setDatos((anterior) => ({
      ...anterior,

      [name]: value,
    }));

    setErrorPedido("");
  };

  // ====================================================

  // Validar los campos del paso visible antes de avanzar.
  const avanzarPaso = () => {
    const seccion = formularioRef.current?.querySelector(
      `[data-paso="${pasoActual}"]`,
    );
    if (!seccion) return;

    const campos = Array.from(
      seccion.querySelectorAll("input, select, textarea"),
    );
    const invalido = campos.find(
      (campo) => !campo.disabled && !campo.checkValidity(),
    );
    if (invalido) {
      invalido.reportValidity();
      invalido.focus();
      return;
    }

    if (pasoActual === 1 && !/^\d{9}$/.test(datos.telefonoCliente.trim())) {
      setErrorPedido("Ingresa un teléfono válido de 9 dígitos.");
      return;
    }

    setErrorPedido("");
    setPasoActual((actual) => Math.min(3, actual + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const retrocederPaso = () => {
    setErrorPedido("");
    setPasoActual((actual) => Math.max(1, actual - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // REGISTRAR PEDIDO

  // ====================================================

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (enviandoRef.current || pedidoConfirmado) {
      return;
    }

    setErrorPedido("");

    if (!carrito.length) {
      setErrorPedido("Tu carrito está vacío.");

      return;
    }

    if (!/^\d{9}$/.test(datos.telefonoCliente.trim())) {
      setErrorPedido("Ingresa un teléfono válido de 9 dígitos.");

      return;
    }

    if (!["YAPE", "PLIN", "BCP", "BBVA"].includes(metodoPago)) {
      setErrorPedido("Selecciona un método de pago válido.");

      return;
    }

    let detalles;

    try {
      detalles = obtenerDetalles(carrito);
    } catch (error) {
      setErrorPedido(error.message);

      return;
    }

    const cuerpo = {
      nombreCliente: datos.nombreCliente.trim(),

      telefonoCliente: datos.telefonoCliente.trim(),

      correoCliente: datos.correoCliente.trim() || null,

      metodoEntrega: datos.metodoEntrega,

      metodoPago,

      direccionEntrega: esRecojo
        ? "RECOJO EN TIENDA"
        : datos.direccionEntrega.trim(),

      departamento: esRecojo ? null : datos.departamento.trim(),

      provincia: esRecojo ? null : datos.provincia.trim(),

      distrito: esRecojo ? null : datos.distrito.trim(),

      referencia: datos.referencia.trim() || null,

      detalles,
    };

    enviandoRef.current = true;

    setRegistrando(true);

    try {
      const carritoActual = leerCarrito();

      if (JSON.stringify(carritoActual) !== JSON.stringify(carrito)) {
        setCarrito(carritoActual);

        throw new Error(
          "Tu carrito cambió mientras completabas el formulario. " +
            "Revisa las cantidades antes de continuar.",
        );
      }

      // Verificar el stock actualizado

      await verificarInventarioCheckout(carritoActual);

      // Obtener token CSRF

      const csrf = await obtenerCsrf();

      if (JSON.stringify(leerCarrito()) !== JSON.stringify(carritoActual)) {
        setCarrito(leerCarrito());

        throw new Error(
          "El carrito cambió durante la verificación. " +
            "Revisa tu pedido e inténtalo nuevamente.",
        );
      }

      // Crear pedido en Spring Boot

      const respuesta = await fetch(`${API_URL}/api/pedidos`, {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type": "application/json",

          Accept: "application/json",

          [csrf.headerName]: csrf.token,
        },

        body: JSON.stringify(cuerpo),
      });

      if (!respuesta.ok) {
        throw new Error(await leerError(respuesta));
      }

      const resultado = await respuesta.json();

      const pedido = resultado.pedido;

      const token = resultado.tokenSeguimiento;

      if (!pedido?.id || !token) {
        throw new Error(
          "El servidor respondió sin la confirmación completa. " +
            "No registres otro pedido sin verificarlo primero.",
        );
      }

      setPedidoConfirmado(pedido);

      setTokenSeguimiento(token);

      try {
        sessionStorage.setItem(
          CLAVE_PEDIDO,

          JSON.stringify({
            pedidoId: pedido.id,

            tokenSeguimiento: token,
          }),
        );
      } catch {
        console.warn("No se pudo guardar temporalmente el seguimiento.");
      }

      try {
        localStorage.removeItem(CLAVE_CARRITO);

        window.dispatchEvent(new Event("jg-carrito-actualizado"));
      } catch {
        console.warn("No se pudo limpiar el carrito.");
      }

      window.scrollTo({
        top: 0,

        behavior: "smooth",
      });
    } catch (error) {
      console.error("Error registrando pedido:", error);

      setErrorPedido(
        error instanceof TypeError
          ? "No se pudo conectar con el backend. Verifica Render, CORS y las cookies."
          : error.message || "Ocurrió un error al registrar el pedido.",
      );
    } finally {
      enviandoRef.current = false;

      setRegistrando(false);
    }
  };

  // ====================================================

  // CONFIRMAR REPORTE DE PAGO

  // ====================================================

  const manejarReporteConfirmado = (resultado) => {
    setReporteConfirmado(resultado);

    setPedidoConfirmado((anterior) => ({
      ...anterior,

      estadoPago: resultado.estadoPago,
    }));

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  // ====================================================

  // PANTALLA DE PEDIDO CONFIRMADO

  // ====================================================

  if (pedidoConfirmado) {
    const entrega = ENTREGAS.find(
      (opcion) => opcion.id === pedidoConfirmado.metodoEntrega,
    );

    const esRecojoConfirmado = pedidoConfirmado.metodoEntrega === "RECOJO";

    const puedeReportar =
      ["PENDIENTE", "RECHAZADO"].includes(pedidoConfirmado.estadoPago) &&
      Boolean(tokenSeguimiento) &&
      pedidoConfirmado.estadoPedido !== "CANCELADO" &&
      ["YAPE", "PLIN", "BCP", "BBVA"].includes(pedidoConfirmado.metodoPago);

    return (
      <main className="min-h-[75vh] bg-[#F4F7F5] px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-700">
            ✓
          </div>

          <p className="mt-6 text-xs font-black uppercase tracking-widest text-[#009E49]">
            Grupo Comercial J&G
          </p>

          <h1 className="mt-3 text-3xl font-black text-[#063D2A]">
            ¡Pedido registrado!
          </h1>

          <p className="mt-3 text-sm text-gray-600">
            Hemos recibido tu pedido. Conserva tu número para futuras consultas.
          </p>

          <div className="mt-7 rounded-2xl bg-[#F4F7F5] p-6">
            <p className="text-sm font-semibold text-gray-500">
              Número de pedido
            </p>

            <p className="mt-2 text-4xl font-black text-[#FF6600]">
              #{pedidoConfirmado.id}
            </p>

            <div className="mt-6 grid gap-4 border-t border-gray-200 pt-5 text-left sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500">Cliente</p>

                <p className="font-bold text-[#063D2A]">
                  {pedidoConfirmado.nombreCliente}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Entrega</p>

                <p className="font-bold text-[#063D2A]">
                  {entrega?.nombre || pedidoConfirmado.metodoEntrega}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Estado del pedido</p>

                <p className="font-bold text-amber-700">
                  {pedidoConfirmado.estadoPedido}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Estado del pago</p>

                <p className="font-bold text-[#063D2A]">
                  {pedidoConfirmado.estadoPago}
                </p>
              </div>
            </div>
          </div>

          <ResumenFlete pedido={pedidoConfirmado} />

          {!esRecojoConfirmado && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-left">
              <h2 className="font-black text-amber-800">
                Flete contra entrega
              </h2>

              <p className="mt-3 text-sm text-amber-700">
                Tu pedido será enviado mediante{" "}
                <strong>{entrega?.nombre}</strong>. El transporte se cotiza
                según el peso, volumen y destino.
              </p>

              <p className="mt-3 text-sm font-semibold text-amber-800">
                Pagarás el flete directamente a la agencia cuando recojas tus
                productos.
              </p>

              <p className="mt-2 text-xs text-amber-700">
                No necesitas esperar la cotización del flete para pagar los
                productos a J&G.
              </p>
            </div>
          )}

          {reporteConfirmado ||
          pedidoConfirmado.estadoPago === "EN_REVISION" ? (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6 text-left">
              <h2 className="text-lg font-black text-[#063D2A]">
                ✓ Pago reportado correctamente
              </h2>

              <p className="mt-3 text-sm text-gray-700">
                Recibimos tu número de operación y comprobante. El pago se
                encuentra en revisión.
              </p>

              {reporteConfirmado?.numeroOperacion && (
                <p className="mt-3 text-sm font-bold text-[#063D2A]">
                  Operación: {reporteConfirmado.numeroOperacion}
                </p>
              )}

              <p className="mt-3 text-xs text-gray-600">
                Nuestro equipo verificará el dinero recibido antes de aprobar el
                pago.
              </p>
            </div>
          ) : puedeReportar ? (
            <>
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5 text-left">
                <h2 className="font-black text-[#063D2A]">
                  Siguiente paso: realizar el pago
                </h2>

                <p className="mt-2 text-sm text-gray-700">
                  Método seleccionado:{" "}
                  <strong>{pedidoConfirmado.metodoPago}</strong>
                </p>

                <p className="mt-2 text-sm text-gray-700">
                  Importe de productos:{" "}
                  <strong>{formatearPrecio(pedidoConfirmado.total)}</strong>
                </p>

                <p className="mt-3 text-xs text-gray-600">
                  Verifica el importe y la cuenta antes de transferir.
                </p>
              </div>

              <DatosPago
                metodoPago={pedidoConfirmado.metodoPago}
                importe={pedidoConfirmado.total}
              />

              <ReportarPago
                pedido={pedidoConfirmado}
                tokenSeguimiento={tokenSeguimiento}
                onPagoReportado={manejarReporteConfirmado}
              />
            </>
          ) : (
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 text-left">
              <p className="text-sm font-semibold text-gray-700">
                Estado del pago: {pedidoConfirmado.estadoPago}. No hay un nuevo
                reporte disponible para este pedido.
              </p>
            </div>
          )}

          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-left">
            <p className="text-sm font-bold text-[#063D2A]">
              Información importante
            </p>

            <p className="mt-2 text-xs text-gray-600">
              Registrar un pedido o reportar una transferencia no significa que
              el pago esté aprobado. El stock tampoco se reserva
              automáticamente.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/catalogo"
              className="flex-1 rounded-xl bg-[#FF6600] px-5 py-3 font-black text-white hover:bg-[#E65C00]"
            >
              Seguir comprando
            </Link>

            <Link
              to="/"
              className="flex-1 rounded-xl border border-gray-300 px-5 py-3 font-bold text-[#063D2A] hover:bg-gray-50"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ====================================================

  // FORMULARIO DE CHECKOUT

  // ====================================================

  return (
    <main className="min-h-[75vh] bg-[#F4F7F5] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/carrito"
          className="text-sm font-bold text-[#009E49] hover:underline"
        >
          ← Volver al carrito
        </Link>

        <div className="mb-8 mt-6">
          <p className="text-xs font-black uppercase tracking-widest text-[#009E49]">
            Grupo Comercial J&G
          </p>

          <h1 className="mt-3 text-3xl font-black text-[#063D2A] sm:text-4xl">
            Finalizar pedido
          </h1>

          <p className="mt-3 text-sm text-gray-600">
            Completa tus datos, selecciona la entrega y el método de pago.
          </p>
        </div>

        {carrito.length > 0 && (
          <nav
            aria-label="Progreso de compra"
            className="mb-7 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6"
          >
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { numero: 1, titulo: "Tus datos", descripcion: "Contacto" },
                {
                  numero: 2,
                  titulo: "Entrega",
                  descripcion: "Agencia o tienda",
                },
                { numero: 3, titulo: "Pago", descripcion: "Confirmar pedido" },
              ].map((paso) => (
                <div
                  key={paso.numero}
                  className="flex min-w-0 items-center gap-2 sm:gap-3"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black sm:h-11 sm:w-11 ${
                      paso.numero === pasoActual
                        ? "bg-[#009E49] text-white"
                        : paso.numero < pasoActual
                          ? "bg-green-100 text-[#007E3B]"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {paso.numero < pasoActual ? "✓" : paso.numero}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-black sm:text-sm ${paso.numero === pasoActual ? "text-[#063D2A]" : "text-gray-500"}`}
                    >
                      {paso.titulo}
                    </p>
                    <p className="hidden text-xs text-gray-400 sm:block">
                      {paso.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[#009E49] transition-all duration-300"
                style={{ width: `${(pasoActual / 3) * 100}%` }}
              />
            </div>
          </nav>
        )}

        {carrito.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">🛒</div>

            <h2 className="mt-4 text-xl font-black text-[#063D2A]">
              Tu carrito está vacío
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Agrega productos o repuestos antes de continuar.
            </p>

            <Link
              to="/catalogo"
              className="mt-6 inline-block rounded-xl bg-[#FF6600] px-6 py-3 font-bold text-white"
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-3">
            <form
              ref={formularioRef}
              onSubmit={manejarEnvio}
              className="space-y-6 lg:col-span-2"
            >
              {/* INFORMACIÓN DEL CLIENTE */}

              <section
                data-paso="1"
                className={pasoActual === 1 ? "" : "hidden"}
              >
                <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                  <h2 className="text-xl font-black text-[#063D2A]">
                    1. Información del cliente
                  </h2>

                  <p className="mb-6 mt-2 text-sm text-gray-500">
                    Ingresa tus datos de contacto.
                  </p>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Campo
                      nombre="nombreCliente"
                      etiqueta="Nombre completo"
                      valor={datos.nombreCliente}
                      onChange={cambiarCampo}
                      placeholder="Nombres y apellidos"
                    />

                    <Campo
                      nombre="telefonoCliente"
                      etiqueta="Teléfono"
                      valor={datos.telefonoCliente}
                      onChange={cambiarCampo}
                      type="tel"
                      placeholder="987654321"
                      maxLength={9}
                    />

                    <div className="sm:col-span-2">
                      <Campo
                        nombre="correoCliente"
                        etiqueta="Correo electrónico (opcional)"
                        valor={datos.correoCliente}
                        onChange={cambiarCampo}
                        type="email"
                        placeholder="correo@ejemplo.com"
                        required={false}
                      />
                    </div>
                  </div>
                </section>
              </section>

              {/* MÉTODO DE ENTREGA */}

              <section
                data-paso="2"
                className={pasoActual === 2 ? "" : "hidden"}
              >
                <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                  <h2 className="text-xl font-black text-[#063D2A]">
                    2. Método de entrega
                  </h2>

                  <p className="mb-6 mt-2 text-sm text-gray-500">
                    Selecciona cómo deseas recibir tus productos.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {ENTREGAS.map((opcion) => {
                      const seleccionado = datos.metodoEntrega === opcion.id;

                      return (
                        <label
                          key={opcion.id}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition ${
                            seleccionado
                              ? "border-[#009E49] bg-green-50"
                              : "border-gray-200 hover:border-green-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name="metodoEntrega"
                            value={opcion.id}
                            checked={seleccionado}
                            onChange={cambiarCampo}
                            className="shrink-0 accent-[#009E49]"
                          />

                          <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-white p-1">
                            <Logo src={opcion.logo} alt={opcion.nombre} />
                          </div>

                          <div className="min-w-0">
                            <span className="block text-sm font-black text-[#063D2A]">
                              {opcion.nombre}
                            </span>

                            <span className="mt-1 block text-xs text-gray-500">
                              {opcion.descripcion}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {!esRecojo ? (
                    <>
                      <div className="mt-7">
                        <h3 className="text-lg font-black text-[#063D2A]">
                          Datos de destino
                        </h3>

                        <p className="mb-5 mt-1 text-sm text-gray-500">
                          Indica la ubicación o agencia de destino.
                        </p>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <Campo
                            nombre="departamento"
                            etiqueta="Departamento"
                            valor={datos.departamento}
                            onChange={cambiarCampo}
                          />

                          <Campo
                            nombre="provincia"
                            etiqueta="Provincia"
                            valor={datos.provincia}
                            onChange={cambiarCampo}
                          />

                          <Campo
                            nombre="distrito"
                            etiqueta="Distrito"
                            valor={datos.distrito}
                            onChange={cambiarCampo}
                          />

                          <div className="sm:col-span-2">
                            <Campo
                              nombre="direccionEntrega"
                              etiqueta="Dirección o agencia de destino"
                              valor={datos.direccionEntrega}
                              onChange={cambiarCampo}
                              placeholder="Dirección o sede de destino"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <Campo
                              nombre="referencia"
                              etiqueta="Referencia (opcional)"
                              valor={datos.referencia}
                              onChange={cambiarCampo}
                              required={false}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
                        <div className="flex flex-col gap-4 sm:flex-row">
                          <Logo
                            src={entregaSeleccionada?.logo}
                            alt={entregaSeleccionada?.nombre}
                            grande
                          />

                          <div>
                            <h3 className="font-black text-[#063D2A]">
                              ¡Podrás rastrear tu pedido!
                            </h3>

                            <p className="mt-2 text-sm text-gray-700">
                              Cuando despachemos tu pedido mediante{" "}
                              <strong>{entregaSeleccionada?.nombre}</strong>, te
                              proporcionaremos el número de guía.
                            </p>

                            <Link
                              to="/rastrear-pedido"
                              className="mt-4 inline-flex rounded-xl bg-[#009E49] px-5 py-3 text-sm font-black text-white"
                            >
                              📍 Rastrear mi pedido →
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-5">
                        <h3 className="font-black text-[#C94E14]">
                          Flete contra entrega
                        </h3>

                        <p className="mt-2 text-sm text-gray-700">
                          El costo de transporte se calcula según el peso,
                          tamaño y destino.
                        </p>

                        <p className="mt-2 text-sm font-semibold text-[#063D2A]">
                          Pagarás el flete directamente a la agencia al recoger
                          tu pedido.
                        </p>

                        <p className="mt-2 text-xs text-gray-600">
                          J&G solo recibirá el pago de los productos.
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
                      <h3 className="font-black text-[#063D2A]">
                        🏬 Recojo en tienda
                      </h3>

                      <p className="mt-2 text-sm text-gray-700">
                        Podrás recoger tus productos cuando confirmemos que
                        están listos.
                      </p>

                      <p className="mt-2 text-xs font-semibold text-[#009E49]">
                        Sin costo de envío.
                      </p>
                    </div>
                  )}
                </section>
              </section>

              {/* MÉTODO DE PAGO */}

              <section
                data-paso="3"
                className={pasoActual === 3 ? "" : "hidden"}
              >
                <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                  <h2 className="text-xl font-black text-[#063D2A]">
                    3. Método de pago
                  </h2>

                  <p className="mb-6 mt-2 text-sm text-gray-500">
                    Selecciona tu método de pago. El pedido se registra antes de
                    reportar la operación.
                  </p>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {PAGOS.map((opcion) => {
                      const seleccionado = metodoPago === opcion.id;

                      return (
                        <label
                          key={opcion.id}
                          className={`relative flex flex-col rounded-xl border-2 p-4 transition ${
                            !opcion.habilitado
                              ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-60"
                              : seleccionado
                                ? "cursor-pointer border-[#009E49] bg-green-50"
                                : "cursor-pointer border-gray-200 hover:border-green-200"
                          }`}
                        >
                          {!opcion.habilitado && (
                            <span className="mb-2 self-start rounded-full bg-gray-200 px-2 py-1 text-[10px] font-bold text-gray-600">
                              Próximamente
                            </span>
                          )}

                          <div className="mb-3 flex justify-end">
                            <input
                              type="radio"
                              name="metodoPago"
                              value={opcion.id}
                              checked={seleccionado}
                              disabled={!opcion.habilitado}
                              onChange={() => {
                                setMetodoPago(opcion.id);

                                setErrorPedido("");
                              }}
                              className="accent-[#009E49]"
                            />
                          </div>

                          <div className="flex h-16 items-center justify-center">
                            <Logo
                              src={opcion.logo}
                              alt={opcion.nombre}
                              grande
                            />
                          </div>

                          <p className="mt-3 text-center text-sm font-black text-[#063D2A]">
                            {opcion.nombre}
                          </p>

                          <p className="mt-1 text-center text-xs text-gray-500">
                            {opcion.descripcion}
                          </p>
                        </label>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
                    <p className="text-sm font-bold text-[#063D2A]">
                      ¿Cómo funciona el pago?
                    </p>

                    <p className="mt-2 text-sm text-gray-700">
                      Primero registras tu pedido. Luego recibirás los datos
                      para realizar tu transferencia. Finalmente, podrás enviar
                      tu número de operación y una imagen del comprobante.
                    </p>

                    <p className="mt-2 text-xs text-gray-600">
                      El pago quedará pendiente de verificación por nuestro
                      equipo.
                    </p>
                  </div>
                </section>
              </section>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                {pasoActual > 1 ? (
                  <button
                    type="button"
                    onClick={retrocederPaso}
                    disabled={registrando}
                    className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-[#063D2A] hover:bg-gray-50 disabled:opacity-50"
                  >
                    ← Volver al paso anterior
                  </button>
                ) : (
                  <Link
                    to="/carrito"
                    className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-center text-sm font-bold text-[#063D2A] hover:bg-gray-50"
                  >
                    ← Volver al carrito
                  </Link>
                )}
                {pasoActual < 3 && (
                  <button
                    type="button"
                    onClick={avanzarPaso}
                    className="rounded-xl bg-[#FF6600] px-7 py-3 text-sm font-black text-white hover:bg-[#E65C00]"
                  >
                    Continuar →
                  </button>
                )}
              </div>

              {/* ERRORES */}

              {errorPedido && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm font-semibold text-red-700"
                >
                  {errorPedido}
                </div>
              )}

              {/* CONFIRMAR PEDIDO */}

              {pasoActual === 3 && (
                <button
                  type="submit"
                  disabled={registrando}
                  className="w-full rounded-xl bg-[#009E49] px-6 py-4 text-base font-black text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {registrando
                    ? "Verificando inventario y registrando pedido..."
                    : "Confirmar y registrar mi pedido →"}
                </button>
              )}

              <p className="text-center text-xs text-gray-500">
                El servidor verificará la disponibilidad y confirmará los
                importes. Registrar un pedido no aprueba el pago.
              </p>
            </form>

            {/* RESUMEN LATERAL */}

            <aside className="rounded-2xl bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-xl font-black text-[#063D2A]">
                Resumen de tu pedido
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {resumen.unidades}{" "}
                {resumen.unidades === 1 ? "unidad" : "unidades"}
              </p>

              <div className="mt-5 space-y-4 border-y border-gray-100 py-5">
                {carrito.map((item, indice) => {
                  const cantidad = Math.max(
                    1,

                    Math.floor(Number(item.cantidad) || 1),
                  );

                  const precio =
                    item.precio != null &&
                    item.precio !== "" &&
                    Number.isFinite(Number(item.precio))
                      ? Number(item.precio)
                      : null;

                  return (
                    <div
                      key={`${item.tipo || "producto"}-${item.id}-${indice}`}
                      className="flex justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#063D2A]">
                          {item.nombre || "Artículo"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Cantidad: {cantidad}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {String(item.tipo || "producto").toLowerCase() ===
                          "repuesto"
                            ? "Repuesto"
                            : "Producto"}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-black text-[#063D2A]">
                        {precio !== null
                          ? formatearPrecio(precio * cantidad)
                          : "Por confirmar"}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-600">Subtotal</span>

                  <strong className="text-[#063D2A]">
                    {formatearPrecio(resumen.subtotal)}
                  </strong>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-600">Método de entrega</span>

                  <strong className="text-right text-[#063D2A]">
                    {entregaSeleccionada?.nombre}
                  </strong>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-600">Flete</span>

                  <strong className="text-right text-[#063D2A]">
                    {esRecojo ? "Gratis" : "Contra entrega"}
                  </strong>
                </div>

                <div className="flex justify-between gap-3 border-t border-gray-200 pt-4">
                  <span className="font-black text-[#063D2A]">
                    Total de productos
                  </span>

                  <strong className="text-xl text-[#FF6600]">
                    {formatearPrecio(resumen.subtotal)}
                  </strong>
                </div>

                {!esRecojo && (
                  <p className="rounded-xl bg-orange-50 p-3 text-xs text-[#A83E0B]">
                    El flete se cotizará según el peso, volumen y destino. No
                    está incluido en este total. Lo pagarás directamente a la
                    agencia al recoger tu pedido.
                  </p>
                )}

                {resumen.sinPrecio > 0 && (
                  <p className="text-xs text-amber-700">
                    Hay {resumen.sinPrecio} artículo(s) sin precio registrado.
                  </p>
                )}

                <p className="text-xs text-gray-500">
                  El stock se verificará nuevamente antes de registrar el
                  pedido. El servidor confirmará los importes y la
                  disponibilidad.
                </p>
              </div>

              <Link
                to="/carrito"
                className="mt-6 block rounded-xl border border-[#009E49] px-5 py-3 text-center text-sm font-bold text-[#009E49] hover:bg-green-50"
              >
                Modificar carrito
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
