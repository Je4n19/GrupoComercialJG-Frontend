import { useState } from "react";

import logoYape from "../assets/Pagos/yape.png";
import logoPlin from "../assets/Pagos/plin.png";
import logoBCP from "../assets/Pagos/bcp.png";
import logoBBVA from "../assets/Pagos/bbva.png";

const TITULAR = "Jesus Oliver Guevara Torres";

const METODOS = {
  YAPE: {
    nombre: "Yape",
    logo: logoYape,
    numero: "943168545",
  },
  PLIN: {
    nombre: "Plin",
    logo: logoPlin,
    numero: "943168545",
  },
  BCP: {
    nombre: "BCP",
    logo: logoBCP,
    cuenta: "305-2469851-0-96",
    cci: "00230500246985109613",
  },
  BBVA: {
    nombre: "BBVA",
    logo: logoBBVA,
    cuenta: "0011-0287-0200258047",
    cci: "0112870020025804706",
  },
};

export default function MetodosPagoBancario({
  metodoPago = "YAPE",
  permitirPago = false,
}) {
  const [copiado, setCopiado] = useState("");

  const metodo = METODOS[metodoPago];

  if (!metodo) return null;

  const copiar = async (valor, campo) => {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(campo);
    } catch {
      setCopiado("ERROR");
    }
  };

  const FilaCuenta = ({ etiqueta, valor, campo }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-xs font-semibold text-gray-500">{etiqueta}</p>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <span className="break-all font-bold text-[#063D2A]">{valor}</span>

        <button
          type="button"
          onClick={() => copiar(valor, campo)}
          className="rounded-lg bg-[#063D2A] px-3 py-2 text-xs font-bold text-white hover:bg-[#09543B]"
        >
          {copiado === campo ? "¡Copiado!" : "Copiar"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-green-200 bg-green-50">
      <div className="flex items-center gap-4 border-b border-green-200 bg-white p-5">
        <img
          src={metodo.logo}
          alt={metodo.nombre}
          className="h-14 w-24 object-contain"
        />

        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-green-700">
            Grupo Comercial J&G
          </p>

          <h3 className="text-lg font-black text-[#063D2A]">{metodo.nombre}</h3>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-semibold text-gray-500">
            Titular de la cuenta
          </p>

          <p className="mt-1 font-bold text-[#063D2A]">{TITULAR}</p>
        </div>

        {metodo.numero ? (
          <FilaCuenta
            etiqueta={`Número para ${metodo.nombre}`}
            valor={metodo.numero}
            campo="numero"
          />
        ) : (
          <>
            <FilaCuenta
              etiqueta="Número de cuenta en soles"
              valor={metodo.cuenta}
              campo="cuenta"
            />

            <FilaCuenta
              etiqueta="Código de Cuenta Interbancario (CCI)"
              valor={metodo.cci}
              campo="cci"
            />
          </>
        )}

        <div
          className={`rounded-xl border p-4 ${
            permitirPago
              ? "border-green-200 bg-white"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <p
            className={`text-sm font-black ${
              permitirPago ? "text-green-800" : "text-amber-800"
            }`}
          >
            {permitirPago
              ? "Verificación manual del pago"
              : "Pagos pendientes de habilitación"}
          </p>

          <p className="mt-2 text-sm text-gray-700">
            {permitirPago
              ? "Después de transferir, registra tu número de operación. El negocio comprobará el abono antes de aprobar el pedido."
              : "Estos son los datos bancarios oficiales. Todavía no realices transferencias desde este proceso: estamos terminando la confirmación y verificación de pagos."}
          </p>
        </div>
      </div>
    </div>
  );
}
