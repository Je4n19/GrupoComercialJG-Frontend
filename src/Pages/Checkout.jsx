import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import logoYape from "../assets/Pagos/yape.png";
import logoPlin from "../assets/Pagos/plin.png";
import logoBCP from "../assets/Pagos/bcp.png";
import logoBBVA from "../assets/Pagos/bbva.png";
import logoVisa from "../assets/Pagos/visa.png";

import logoShalom from "../assets/shalom.png";
import logoEmtrafesa from "../assets/emtrafesa.png";
import logoOlva from "../assets/olva.png";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const CLAVE_CARRITO = "jg_carrito";
const CLAVE_PEDIDO = "jg_ultimo_pedido";

const ENTREGAS = [
  {
    id: "SHALOM",
    nombre: "Shalom",
    descripcion: "Envío mediante agencia Shalom",
    logo: logoShalom,
  },
  {
    id: "EMTRAFESA",
    nombre: "Emtrafesa",
    descripcion: "Envío mediante agencia Emtrafesa",
    logo: logoEmtrafesa,
  },
  {
    id: "OLVA",
    nombre: "Olva Courier",
    descripcion: "Envío mediante Olva Courier",
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
    habilitado: false,
  },
  {
    id: "BBVA",
    nombre: "BBVA",
    descripcion: "Transferencia bancaria",
    logo: logoBBVA,
    habilitado: false,
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

function leerCarrito() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_CARRITO) || "[]");
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function formatearPrecio(valor) {
  const numero = Number(valor);
  if (!Number.isFinite(numero) || valor == null || valor === "") {
    return "Consultar";
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

async function obtenerCsrf() {
  const respuesta = await fetch(`${API_URL}/api/auth/csrf`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener la sesión de seguridad del servidor.");
  }

  const csrf = await respuesta.json();

  if (!csrf.token || !csrf.headerName) {
    throw new Error("El servidor no devolvió un token CSRF válido.");
  }

  return csrf;
}

async function leerError(respuesta) {
  let mensaje = `Error HTTP ${respuesta.status} al registrar el pedido.`;

  try {
    const datos = await respuesta.json();
    mensaje = datos.detail || datos.message || mensaje;
  } catch {
    // Mantener mensaje general.
  }

  if (respuesta.status === 403) {
    return "El servidor rechazó la solicitud de seguridad. Revisa las cookies, CORS y CSRF.";
  }

  if (respuesta.status === 409) {
    return "Uno de los artículos no tiene stock suficiente. Revisa tu carrito.";
  }

  return mensaje;
}

export default function Checkout() {
  const [carrito, setCarrito] = useState(leerCarrito);
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [metodoPago, setMetodoPago] = useState("YAPE");

  const [registrando, setRegistrando] = useState(false);
  const [errorPedido, setErrorPedido] = useState("");
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);
  const [tokenSeguimiento, setTokenSeguimiento] = useState("");

  const enviandoRef = useRef(false);

  const esRecojo = datos.metodoEntrega === "RECOJO";

  const entregaSeleccionada = ENTREGAS.find(
    (opcion) => opcion.id === datos.metodoEntrega,
  );

  const pagoSeleccionado = PAGOS.find((opcion) => opcion.id === metodoPago);

  useEffect(() => {
    const actualizar = () => setCarrito(leerCarrito());

    window.addEventListener("storage", actualizar);
    window.addEventListener("jg-carrito-actualizado", actualizar);

    return () => {
      window.removeEventListener("storage", actualizar);
      window.removeEventListener("jg-carrito-actualizado", actualizar);
    };
  }, []);

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

    return { subtotal, unidades, sinPrecio };
  }, [carrito]);

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;

    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setErrorPedido("");
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    if (enviandoRef.current || pedidoConfirmado) return;

    setErrorPedido("");

    if (!carrito.length) {
      setErrorPedido("Tu carrito está vacío.");
      return;
    }

    if (!/^\d{9}$/.test(datos.telefonoCliente.trim())) {
      setErrorPedido("Ingresa un teléfono válido de 9 dígitos.");
      return;
    }

    if (!["YAPE", "PLIN"].includes(metodoPago)) {
      setErrorPedido("Selecciona Yape o Plin.");
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
      const csrf = await obtenerCsrf();

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

      // NUEVA ESTRUCTURA DEL BACKEND
      const pedido = resultado.pedido;
      const token = resultado.tokenSeguimiento;

      if (!pedido?.id || !token) {
        throw new Error(
          "El servidor respondió sin la confirmación completa. No vuelvas a registrar el pedido sin verificarlo primero.",
        );
      }

      setPedidoConfirmado(pedido);
      setTokenSeguimiento(token);

      // Guardar temporalmente la referencia del pedido.
      // El token es secreto: no se comparte en enlaces.
      try {
        sessionStorage.setItem(
          CLAVE_PEDIDO,
          JSON.stringify({
            pedidoId: pedido.id,
            tokenSeguimiento: token,
          }),
        );
      } catch {
        console.warn("No fue posible guardar temporalmente el seguimiento.");
      }

      try {
        localStorage.removeItem(CLAVE_CARRITO);
        window.dispatchEvent(new Event("jg-carrito-actualizado"));
      } catch {
        console.warn("No se pudo limpiar el carrito.");
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error registrando pedido:", error);

      setErrorPedido(
        error instanceof TypeError
          ? "No se pudo conectar con el backend. Verifica Render, CORS y la configuración de cookies."
          : error.message || "Ocurrió un error al registrar el pedido.",
      );
    } finally {
      enviandoRef.current = false;
      setRegistrando(false);
    }
  };

  // ==========================================
  // CONFIRMACIÓN DEL PEDIDO
  // ==========================================

  if (pedidoConfirmado) {
    const entrega = ENTREGAS.find(
      (opcion) => opcion.id === pedidoConfirmado.metodoEntrega,
    );

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
            Hemos recibido tu pedido correctamente. Conserva tu número para
            futuras consultas.
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
                <p className="font-bold text-amber-700">
                  {pedidoConfirmado.estadoPago}
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-gray-200 pt-5 text-left">
              <p className="text-xs text-gray-500">Subtotal de artículos</p>

              <p className="mt-1 text-2xl font-black text-[#FF6600]">
                {formatearPrecio(pedidoConfirmado.subtotal)}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                {pedidoConfirmado.metodoEntrega === "RECOJO"
                  ? "Sin costo de envío."
                  : "El costo de envío todavía debe confirmarse. Este no es el importe final."}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50 p-5 text-left">
            <h2 className="font-black text-[#063D2A]">
              Método elegido: {pedidoConfirmado.metodoPago}
            </h2>

            <p className="mt-2 text-sm text-gray-700">
              Tu pedido está registrado, pero el pago todavía no ha sido
              realizado ni verificado.
            </p>

            <p className="mt-3 text-sm font-semibold text-purple-800">
              Próximamente podrás reportar tu operación de Yape o Plin desde
              esta pantalla.
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left">
            <p className="text-sm font-bold text-amber-800">
              Pedido pendiente de confirmación
            </p>

            <p className="mt-2 text-sm text-amber-700">
              Registrar el pedido no significa que esté pagado ni que los
              artículos estén reservados. No realices pagos todavía desde esta
              pantalla.
            </p>
          </div>

          {tokenSeguimiento && (
            <p className="mt-4 text-xs text-gray-500">
              Se generó correctamente tu acceso privado de seguimiento para esta
              sesión.
            </p>
          )}

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

  // ==========================================
  // FORMULARIO DE CHECKOUT
  // ==========================================

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
            Completa tus datos, selecciona la entrega y el método de pago
            preferido.
          </p>
        </div>

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
            <form onSubmit={manejarEnvio} className="space-y-6 lg:col-span-2">
              {/* INFORMACIÓN DEL CLIENTE */}

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

              {/* MÉTODO DE ENTREGA */}

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
                  </>
                ) : (
                  <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
                    <h3 className="font-black text-[#063D2A]">
                      🏬 Recojo en tienda
                    </h3>

                    <p className="mt-2 text-sm text-gray-700">
                      Podrás recoger tus productos cuando confirmemos que están
                      listos.
                    </p>

                    <p className="mt-2 text-xs font-semibold text-[#009E49]">
                      Sin costo de envío.
                    </p>
                  </div>
                )}
              </section>

              {/* MÉTODO DE PAGO */}

              <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                <h2 className="text-xl font-black text-[#063D2A]">
                  3. Método de pago
                </h2>

                <p className="mb-6 mt-2 text-sm text-gray-500">
                  Selecciona un método disponible. El registro del pedido no
                  realiza cobros.
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

                        <div className="mb-3 flex h-16 items-center">
                          <Logo src={opcion.logo} alt={opcion.nombre} grande />
                        </div>

                        <span className="text-sm font-black text-[#063D2A]">
                          {opcion.nombre}
                        </span>

                        <span className="mt-1 text-xs text-gray-500">
                          {opcion.descripcion}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {["YAPE", "PLIN"].includes(metodoPago) && (
                  <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50 p-5">
                    <div className="flex items-center gap-3">
                      <Logo
                        src={metodoPago === "YAPE" ? logoYape : logoPlin}
                        alt={metodoPago}
                        grande
                      />

                      <h3 className="font-black text-[#063D2A]">
                        {metodoPago}
                      </h3>
                    </div>

                    <p className="mt-3 text-sm text-gray-700">
                      Este método está disponible para seleccionarlo al
                      registrar tu pedido.
                    </p>

                    <div className="mt-4 rounded-xl border border-purple-200 bg-white p-4">
                      <p className="text-sm font-bold text-purple-800">
                        Verificación de pagos en preparación
                      </p>

                      <p className="mt-2 text-sm text-gray-600">
                        Estamos terminando el formulario para informar el número
                        de operación y verificar el abono recibido.
                      </p>

                      <p className="mt-2 text-xs text-gray-500">
                        No realices pagos todavía. El número oficial y las
                        instrucciones de pago se mostrarán cuando activemos el
                        proceso completo.
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-bold text-amber-800">
                    ⚠️ Los cobros todavía no están habilitados
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-amber-700">
                    Al continuar, registrarás un pedido pendiente. No se
                    procesará dinero ni se reservará stock automáticamente.
                  </p>
                </div>
              </section>

              {/* ERRORES */}

              {errorPedido && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
                >
                  {errorPedido}
                </div>
              )}

              {/* REGISTRO */}

              <button
                type="submit"
                disabled={registrando}
                className="w-full rounded-xl bg-[#FF6600] px-6 py-4 font-black text-white shadow-sm transition hover:bg-[#E65C00] disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {registrando
                  ? "Registrando tu pedido..."
                  : "Registrar mi pedido →"}
              </button>

              <p className="text-center text-xs text-gray-500">
                Tu pedido quedará pendiente de revisión. No se realizará ningún
                cobro al registrarlo.
              </p>
            </form>

            {/* RESUMEN */}

            <aside className="rounded-2xl bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
              <h2 className="text-xl font-black text-[#063D2A]">
                Resumen de tu pedido
              </h2>

              <div className="mt-5 space-y-4">
                {carrito.map((item, indice) => {
                  const cantidad = Math.max(
                    1,
                    Math.floor(Number(item.cantidad) || 1),
                  );

                  return (
                    <div
                      key={`${item.carritoId || item.id}-${indice}`}
                      className="flex justify-between gap-3 border-b border-gray-100 pb-4"
                    >
                      <div className="min-w-0">
                        <p className="break-words text-sm font-bold text-[#063D2A]">
                          {item.nombre || "Artículo"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Cantidad: {cantidad}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-black text-[#063D2A]">
                        {item.precio != null && item.precio !== ""
                          ? formatearPrecio(Number(item.precio) * cantidad)
                          : "Consultar"}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Unidades</span>
                  <strong>{resumen.unidades}</strong>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">Método de entrega</span>
                  <strong className="text-right text-[#063D2A]">
                    {entregaSeleccionada?.nombre}
                  </strong>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">Método de pago</span>
                  <strong className="text-right text-[#063D2A]">
                    {pagoSeleccionado?.nombre}
                  </strong>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <strong>{formatearPrecio(resumen.subtotal)}</strong>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Envío</span>
                  <strong
                    className={esRecojo ? "text-[#009E49]" : "text-amber-700"}
                  >
                    {esRecojo ? "Sin costo" : "Por confirmar"}
                  </strong>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-500">
                    {esRecojo ? "Total de artículos" : "Subtotal sin envío"}
                  </p>

                  <p className="mt-2 text-3xl font-black text-[#FF6600]">
                    {formatearPrecio(resumen.subtotal)}
                  </p>
                </div>

                {!esRecojo && (
                  <p className="text-xs text-amber-700">
                    El envío se cotizará según el destino y la agencia.
                  </p>
                )}

                {resumen.sinPrecio > 0 && (
                  <p className="text-xs text-amber-700">
                    Hay {resumen.sinPrecio} artículo(s) sin precio registrado.
                  </p>
                )}

                <p className="text-xs text-gray-500">
                  Los precios y el stock serán verificados por el servidor.
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
