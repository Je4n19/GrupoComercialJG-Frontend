import { Link } from "react-router-dom";
import { LegalLayout, Seccion, Aviso } from "./LegalLayout";

const CORREO = "grupo.comercial@yahoo.es";
const TELEFONO = "979 501 557";
const WHATSAPP = "https://wa.me/51979501557";

export default function CambiosDevoluciones() {
  return (
    <LegalLayout
      categoria="Atención posventa"
      titulo="Cambios y Devoluciones"
      descripcion="Conoce cómo solicitar atención por productos defectuosos, errores en pedidos, garantías y cambios de productos adquiridos en Grupo Comercial J&G."
      rutaActual="/cambios-y-devoluciones"
    >
      <Aviso>
        En Grupo Comercial J&G buscamos brindar una atención adecuada después de
        cada compra. Si tienes algún inconveniente con un producto, comunícate
        con nosotros para evaluar tu caso. Esta política no limita los derechos
        que te corresponden como consumidor.
      </Aviso>

      <Seccion numero="01" titulo="Alcance de la política">
        <p>
          Esta política se aplica a los productos comercializados por{" "}
          <strong>Grupo Comercial J&G</strong>, nombre comercial del negocio
          cuyo titular es <strong>Jesús Oliver Guevara Torres</strong>,
          identificado con RUC N.º <strong>10167608308</strong>.
        </p>

        <p>
          Comprende la atención de solicitudes relacionadas con maquinaria,
          herramientas, motosierras, desbrozadoras, motobombas, fumigadoras,
          accesorios, repuestos y otros productos adquiridos en nuestro
          establecimiento o tienda virtual.
        </p>

        <p>
          Las solicitudes serán evaluadas según las características del
          producto, las condiciones de la compra y los derechos reconocidos por
          la legislación peruana de protección al consumidor.
        </p>
      </Seccion>

      <Seccion numero="02" titulo="¿Cuándo puedes solicitar atención?">
        <p>
          Puedes comunicarte con nosotros cuando se presente alguna de las
          siguientes situaciones:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            El producto recibido no corresponde al modelo o características
            ofrecidas.
          </li>
          <li>El pedido contiene un producto diferente al solicitado.</li>
          <li>El producto presenta fallas de funcionamiento o defectos.</li>
          <li>Faltan componentes o accesorios incluidos en la compra.</li>
          <li>Se presentan inconvenientes relacionados con la garantía.</li>
          <li>
            Deseas consultar la posibilidad de realizar un cambio voluntario.
          </li>
        </ul>

        <p>
          La atención aplicable dependerá de la naturaleza del inconveniente y
          de las condiciones verificadas en cada caso.
        </p>
      </Seccion>

      <Seccion numero="03" titulo="Cómo solicitar un cambio o devolución">
        <p>
          Para solicitar atención posventa, puedes comunicarte mediante nuestros
          canales oficiales:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>WhatsApp:</strong>{" "}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#007E3B] hover:underline"
            >
              {TELEFONO}
            </a>
          </li>
          <li>
            <strong>Correo electrónico:</strong>{" "}
            <a
              href={`mailto:${CORREO}`}
              className="font-bold text-[#007E3B] hover:underline"
            >
              {CORREO}
            </a>
          </li>
          <li>
            <strong>Establecimiento:</strong> Av. Luis Gonzales 1599A, Chiclayo,
            Lambayeque, Perú.
          </li>
        </ul>

        <p>
          Para facilitar la revisión de tu caso, te recomendamos proporcionar:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Nombre y datos de contacto.</li>
          <li>Número de pedido, si lo tienes.</li>
          <li>Boleta, factura u otro medio que permita acreditar la compra.</li>
          <li>Nombre, marca y modelo del producto.</li>
          <li>Descripción del inconveniente.</li>
          <li>Fotografías o videos del problema, cuando resulten útiles.</li>
        </ul>

        <p>
          La falta de alguno de estos documentos no implica automáticamente el
          rechazo de la solicitud. Podrán considerarse otros medios adecuados
          para verificar la compra y el inconveniente reportado.
        </p>
      </Seccion>

      <Seccion
        numero="04"
        titulo="Productos defectuosos o diferentes a lo ofrecido"
      >
        <p>
          Si el producto presenta un defecto, no corresponde a las
          características ofrecidas o existe otro incumplimiento, el cliente
          podrá solicitar la atención que corresponda de acuerdo con la
          legislación aplicable.
        </p>

        <p>
          Dependiendo de las circunstancias, podrán corresponder medidas como
          reparación, sustitución, devolución del importe pagado u otras
          soluciones reconocidas por la normativa.
        </p>

        <p>
          La solución deberá considerar la naturaleza del defecto, la idoneidad
          del producto y los derechos del consumidor.
        </p>

        <p>
          No se exigirá aceptar un cambio voluntario como sustituto de los
          derechos legales que correspondan por un producto defectuoso.
        </p>
      </Seccion>

      <Seccion numero="05" titulo="Garantías de los productos">
        <p>
          Los productos comercializados pueden contar con garantías legales,
          expresas o implícitas, según corresponda.
        </p>

        <p>
          Cuando un producto incluya una garantía comercial del fabricante o
          proveedor, se informarán las condiciones y la cobertura aplicables.
        </p>

        <p>
          La evaluación de una falla puede requerir una revisión técnica para
          determinar sus características, causas y posibles soluciones.
        </p>

        <p>
          La existencia de una garantía del fabricante no elimina las
          obligaciones que correspondan al proveedor frente al consumidor.
        </p>

        <p>
          Cualquier exclusión de garantía deberá evaluarse conforme a las
          condiciones informadas, las circunstancias verificadas y la normativa
          vigente.
        </p>
      </Seccion>

      <Seccion numero="06" titulo="Repuestos y compatibilidad">
        <p>
          Antes de adquirir un repuesto, recomendamos verificar la marca, modelo
          y especificaciones del equipo en el que será instalado.
        </p>

        <p>
          Nuestro equipo puede proporcionar orientación comercial y técnica
          sobre los productos disponibles.
        </p>

        <p>
          Si el cliente recibe un repuesto diferente al ofrecido o se presenta
          un defecto, podrá solicitar la atención que corresponda.
        </p>

        <p>
          Cuando se trate de una selección incorrecta realizada por el
          comprador, sin defecto ni incumplimiento del proveedor, cualquier
          cambio voluntario dependerá de las condiciones comerciales que se
          hayan ofrecido.
        </p>

        <p>
          Esta disposición no limita los derechos del consumidor cuando la
          incompatibilidad se origine en información incorrecta o insuficiente
          proporcionada por el establecimiento.
        </p>
      </Seccion>

      <Seccion numero="07" titulo="Cambios voluntarios">
        <p>
          Un cambio voluntario es aquel solicitado por razones distintas de un
          defecto, una falta de idoneidad o un incumplimiento de las condiciones
          ofrecidas.
        </p>

        <p>
          Por ejemplo, cuando el comprador desea cambiar de modelo o prefiere
          otro producto.
        </p>

        <p>
          Los cambios voluntarios no se encuentran habilitados de forma general
          mediante esta política. Su disponibilidad y condiciones deberán ser
          confirmadas por Grupo Comercial J&G antes de asumir cualquier
          compromiso.
        </p>

        <p>
          Si se ofrece expresamente un cambio voluntario al momento de la
          compra, se respetarán las condiciones informadas al consumidor.
        </p>
      </Seccion>

      <Seccion numero="08" titulo="Evaluación de solicitudes">
        <p>
          Al recibir una solicitud, revisaremos la información proporcionada y,
          cuando sea necesario, coordinaremos una evaluación del producto.
        </p>

        <p>Según el caso, la revisión podrá considerar:</p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Características y estado del producto.</li>
          <li>Descripción de la falla reportada.</li>
          <li>Condiciones de funcionamiento.</li>
          <li>Información ofrecida al comprador.</li>
          <li>Condiciones de garantía aplicables.</li>
          <li>Resultados de una evaluación técnica.</li>
        </ul>

        <p>
          Comunicaremos al cliente los resultados y las medidas que
          correspondan.
        </p>

        <p>
          Las evaluaciones no deben utilizarse para imponer restricciones
          injustificadas al ejercicio de los derechos del consumidor.
        </p>
      </Seccion>

      <Seccion numero="09" titulo="Envíos y transporte">
        <p>
          Cuando sea necesario trasladar un producto para su evaluación, cambio
          o devolución, se coordinará con el comprador el procedimiento
          correspondiente.
        </p>

        <p>
          Las coordinaciones podrán realizarse mediante las empresas de
          transporte disponibles para el destino.
        </p>

        <p>
          La asignación de los costos de transporte dependerá del motivo de la
          solicitud, las condiciones de la compra y las obligaciones legales
          aplicables.
        </p>

        <p>
          Cuando corresponda atender un incumplimiento atribuible al proveedor,
          no se trasladarán indebidamente al consumidor costos que legalmente
          deba asumir el establecimiento.
        </p>
      </Seccion>

      <Seccion numero="10" titulo="Devolución de importes">
        <p>
          Cuando corresponda una devolución de dinero, se coordinará con el
          cliente el procedimiento adecuado para efectuarla.
        </p>

        <p>
          La devolución deberá considerar el importe que legalmente corresponda
          y las circunstancias de la operación.
        </p>

        <p>
          Los plazos y medios de devolución serán comunicados al comprador de
          acuerdo con el caso, respetando las disposiciones legales aplicables.
        </p>

        <p>
          No se impondrá una nota de crédito o un vale de compra como única
          alternativa cuando legalmente corresponda devolver el dinero.
        </p>
      </Seccion>

      <Seccion numero="11" titulo="Libro de Reclamaciones">
        <p>
          Los consumidores tienen derecho a presentar quejas y reclamos a través
          del Libro de Reclamaciones conforme a la normativa peruana.
        </p>

        <p>
          La presentación de una reclamación no impide acudir a Indecopi ni
          ejercer otros derechos reconocidos por ley.
        </p>

        <p>
          La sección digital del Libro de Reclamaciones de nuestra tienda se
          encuentra en desarrollo y actualmente no registra reclamaciones
          oficiales.
        </p>

        <p>
          Para conocer el mecanismo formal disponible, puedes comunicarte con
          nuestro establecimiento.
        </p>

        <p>
          <Link
            to="/libro-de-reclamaciones"
            className="font-bold text-[#007E3B] hover:underline"
          >
            Consultar el Libro de Reclamaciones
          </Link>
          .
        </p>
      </Seccion>

      <Seccion numero="12" titulo="Normativa aplicable">
        <p>
          Esta política se interpreta conforme a la legislación peruana,
          especialmente la Ley N.º 29571, Código de Protección y Defensa del
          Consumidor, y las demás disposiciones que resulten aplicables.
        </p>

        <p>
          Ninguna condición publicada en nuestra tienda limita los derechos
          irrenunciables de los consumidores.
        </p>

        <p>
          Grupo Comercial J&G podrá actualizar esta política para reflejar
          cambios en sus procedimientos comerciales o en la normativa vigente.
        </p>
      </Seccion>

      <div className="mt-10 rounded-2xl bg-[#0A2543] p-7 text-white sm:p-8">
        <h3 className="text-xl font-black">¿Necesitas atención posventa?</h3>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Comunícate con nosotros para recibir orientación sobre tu pedido,
          garantía, cambio o devolución.
        </p>

        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-xl bg-[#009E49] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#00843D]"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </LegalLayout>
  );
}
