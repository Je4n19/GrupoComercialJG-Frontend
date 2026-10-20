import { useEffect } from "react";
import { Link } from "react-router-dom";
import { LegalLayout, Seccion, Aviso } from "./LegalLayout";

const pasos = [
  {
    numero: "01",
    titulo: "Comunícate con nosotros",
    descripcion:
      "Indica el producto adquirido, el número de pedido y el motivo de tu solicitud.",
  },
  {
    numero: "02",
    titulo: "Proporciona los detalles",
    descripcion:
      "Describe el inconveniente y adjunta fotografías u otra información pertinente cuando sea necesario.",
  },
  {
    numero: "03",
    titulo: "Evaluación del caso",
    descripcion:
      "Revisaremos la solicitud de acuerdo con las características del producto y la normativa aplicable.",
  },
  {
    numero: "04",
    titulo: "Coordinación de la solución",
    descripcion:
      "Te informaremos el procedimiento y la solución que corresponda.",
  },
];

export default function CambiosDevoluciones() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const whatsapp =
    "https://wa.me/51979501557?text=" +
    encodeURIComponent(
      "Hola, deseo realizar una consulta sobre cambios, devoluciones o garantías de Grupo Comercial J&G.",
    );

  return (
    <LegalLayout
      categoria="Servicio de atención posventa"
      titulo="Cambios y Devoluciones"
      descripcion="Conoce cómo solicitar atención por inconvenientes con maquinaria, herramientas, equipos y repuestos adquiridos en Grupo Comercial J&G."
      rutaActual="/cambios-y-devoluciones"
    >
      <Aviso>
        Nuestro compromiso es atender las solicitudes de manera clara y
        responsable, respetando los derechos reconocidos por la legislación
        peruana de protección al consumidor.
      </Aviso>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-black text-[#0A2543]">
          ¿Cómo solicitar atención?
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {pasos.map((paso) => (
            <div
              key={paso.numero}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
            >
              <span className="text-3xl font-black text-[#F06A16]">
                {paso.numero}
              </span>

              <h3 className="mt-3 text-lg font-black text-[#0A2543]">
                {paso.titulo}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {paso.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Seccion numero="01" titulo="Alcance de la política">
        <p>
          Esta política contiene información sobre la atención de solicitudes
          relacionadas con productos comercializados por Grupo Comercial J&G.
        </p>

        <p>
          Comprende maquinaria agrícola, equipos forestales, motosierras,
          desbrozadoras, motobombas, herramientas, accesorios y repuestos.
        </p>
      </Seccion>

      <Seccion numero="02" titulo="Productos defectuosos">
        <p>
          Si un producto presenta defectos, fallas de funcionamiento o no
          corresponde con las características ofrecidas, el cliente podrá
          solicitar atención conforme a sus derechos como consumidor.
        </p>

        <p>
          La solución dependerá de las circunstancias del caso y de las
          obligaciones legales que correspondan.
        </p>
      </Seccion>

      <Seccion numero="03" titulo="Garantías de productos">
        <p>
          Las garantías serán atendidas de acuerdo con las condiciones
          informadas para cada producto, las garantías ofrecidas por fabricantes
          o proveedores cuando correspondan y la legislación aplicable.
        </p>

        <p>
          Antes de adquirir un equipo, el cliente puede solicitar información
          sobre sus condiciones de garantía.
        </p>
      </Seccion>

      <Seccion numero="04" titulo="Evaluación técnica">
        <p>
          Algunos equipos pueden requerir una revisión técnica para identificar
          el origen de un problema de funcionamiento.
        </p>

        <p>
          Cuando corresponda, se informará al cliente sobre el procedimiento de
          evaluación y los pasos necesarios para atender su solicitud.
        </p>

        <p>
          La revisión técnica no implica automáticamente el rechazo de una
          solicitud de garantía.
        </p>
      </Seccion>

      <Seccion numero="05" titulo="Compatibilidad de repuestos">
        <p>
          Antes de comprar repuestos, recomendamos verificar marca, modelo,
          referencia y medidas del equipo.
        </p>

        <p>
          Nuestro personal puede orientar al comprador sobre las características
          y compatibilidad de los productos disponibles.
        </p>

        <p>
          Esta recomendación no limita los derechos que correspondan cuando el
          producto entregado no coincida con lo ofrecido.
        </p>
      </Seccion>

      <Seccion numero="06" titulo="Cambios por decisión del comprador">
        <p>
          Los cambios voluntarios por motivos distintos de una falla o
          incumplimiento estarán sujetos a las condiciones comerciales que el
          establecimiento haya ofrecido e informado al cliente.
        </p>

        <p>
          <strong>
            Las condiciones específicas de J&G para cambios voluntarios están
            pendientes de confirmación.
          </strong>
        </p>

        <p>
          Estas condiciones no podrán eliminar ni reducir los derechos legales
          del consumidor.
        </p>
      </Seccion>

      <Seccion numero="07" titulo="Transporte de productos">
        <p>
          Si una solicitud requiere transportar un producto para revisión,
          cambio o devolución, se coordinará el procedimiento correspondiente.
        </p>

        <p>
          Los costos de transporte serán determinados según las circunstancias
          del caso y las obligaciones legales aplicables.
        </p>
      </Seccion>

      <Seccion numero="08" titulo="Documentación de la compra">
        <p>
          Para facilitar la identificación de una operación, recomendamos
          proporcionar el número de pedido, comprobante de compra o cualquier
          referencia disponible.
        </p>

        <p>
          La falta de un documento específico no elimina por sí sola los
          derechos que correspondan al consumidor.
        </p>
      </Seccion>

      <Seccion numero="09" titulo="Atención de reclamaciones">
        <p>
          Los clientes pueden presentar consultas sobre sus compras mediante
          nuestros canales de atención comercial.
        </p>

        <p>
          Para presentar un reclamo o queja formal deberá utilizarse el
          mecanismo de Libro de Reclamaciones que corresponda.
        </p>

        <Link
          to="/libro-de-reclamaciones"
          className="inline-flex font-bold text-[#007E3B] hover:underline"
        >
          Consultar información sobre reclamaciones →
        </Link>
      </Seccion>

      <div className="mt-10 rounded-2xl bg-[#0A2543] p-7 text-white sm:p-8">
        <h3 className="text-xl font-black">¿Necesitas ayuda con tu compra?</h3>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Nuestro equipo de atención puede orientarte sobre cambios, garantías y
          devoluciones.
        </p>

        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-xl bg-[#009E49] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#00843D]"
        >
          Consultar por WhatsApp ↗
        </a>
      </div>
    </LegalLayout>
  );
}
