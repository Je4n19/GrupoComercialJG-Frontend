import { LegalLayout, Seccion, Aviso } from "./LegalLayout";

export default function PoliticaPrivacidad() {
  return (
    <LegalLayout
      categoria="Protección de datos personales"
      titulo="Política de Privacidad"
      descripcion="Información sobre la recopilación, utilización, protección y conservación de los datos personales proporcionados a Grupo Comercial J&G."
      rutaActual="/politica-de-privacidad"
    >
      <Aviso>
        Esta política describe el tratamiento previsto de datos. Antes de
        publicarla se deben verificar los servicios tecnológicos utilizados, los
        plazos de conservación y la identificación legal del titular del
        negocio.
      </Aviso>

      <Seccion numero="01" titulo="Identificación del responsable">
        <p>
          <strong>Grupo Comercial J&G</strong> es el nombre comercial utilizado
          por el establecimiento que opera esta tienda virtual.
        </p>

        <p>
          <strong>RUC:</strong> 10167608308.
        </p>

        <p>
          <strong>Dirección:</strong> Av. Luis Gonzales 1599A, Chiclayo,
          Lambayeque, Perú.
        </p>

        <p>
          <strong>Correo de contacto:</strong> grupo.comercial@yahoo.es.
        </p>

        <p>
          El nombre legal del titular del RUC debe incorporarse una vez
          verificado.
        </p>
      </Seccion>

      <Seccion numero="02" titulo="Datos personales recopilados">
        <p>
          Dependiendo de la operación realizada, podemos solicitar los
          siguientes datos:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Nombres y apellidos.</li>
          <li>Teléfono y correo electrónico.</li>
          <li>Dirección o destino de entrega.</li>
          <li>Datos necesarios para emitir comprobantes.</li>
          <li>Productos seleccionados e historial de pedidos.</li>
          <li>Referencias de operaciones de pago.</li>
          <li>Información proporcionada en consultas o reclamos.</li>
        </ul>

        <p>
          No solicitamos claves bancarias, contraseñas de billeteras digitales
          ni códigos secretos de autenticación.
        </p>
      </Seccion>

      <Seccion numero="03" titulo="Finalidades del tratamiento">
        <p>Los datos se utilizan, según corresponda, para:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Responder consultas y solicitudes de cotización.</li>
          <li>Registrar y gestionar pedidos.</li>
          <li>Verificar pagos realizados.</li>
          <li>Coordinar recojos y entregas.</li>
          <li>Emitir comprobantes cuando corresponda.</li>
          <li>Atender garantías, devoluciones y reclamaciones.</li>
          <li>Cumplir obligaciones legales aplicables.</li>
        </ul>

        <p>
          El envío de promociones que requiera consentimiento se realizará
          únicamente cuando exista la autorización correspondiente.
        </p>
      </Seccion>

      <Seccion numero="04" titulo="Base legal del tratamiento">
        <p>
          El tratamiento de los datos personales se realizará conforme a las
          bases legales aplicables a cada finalidad, incluyendo la atención de
          operaciones comerciales, el cumplimiento de obligaciones legales y el
          consentimiento cuando sea exigible.
        </p>

        <p>
          Cuando sea necesario solicitar consentimiento, este deberá obtenerse
          de manera informada y mediante un mecanismo adecuado.
        </p>
      </Seccion>

      <Seccion numero="05" titulo="Uso de proveedores externos">
        <p>
          Para gestionar determinadas operaciones, puede resultar necesario
          compartir información con proveedores de alojamiento web,
          procesamiento de pedidos, servicios tecnológicos o empresas de
          transporte.
        </p>

        <p>
          En los envíos, únicamente deberán comunicarse los datos necesarios
          para coordinar la entrega correspondiente.
        </p>

        <p>
          La versión definitiva de esta política deberá reflejar los proveedores
          reales, los destinatarios y las transferencias de datos que
          correspondan.
        </p>
      </Seccion>

      <Seccion numero="06" titulo="Seguridad de la información">
        <p>
          Grupo Comercial J&G deberá implementar medidas técnicas y
          organizativas razonables para proteger los datos personales contra
          accesos no autorizados, pérdida, modificación o divulgación indebida.
        </p>

        <p>
          Estas medidas incluyen, cuando corresponda, controles de acceso,
          autenticación, administración de permisos y protección de la
          información almacenada.
        </p>
      </Seccion>

      <Seccion numero="07" titulo="Conservación de datos">
        <p>
          Los datos se conservarán durante el tiempo necesario para atender las
          finalidades informadas y cumplir las obligaciones legales
          correspondientes.
        </p>

        <p>
          Los periodos específicos de conservación deberán establecerse de
          acuerdo con los procesos reales del negocio.
        </p>
      </Seccion>

      <Seccion numero="08" titulo="Derechos de los titulares">
        <p>
          Los titulares pueden ejercer los derechos de acceso, rectificación,
          cancelación y oposición, así como los demás reconocidos por la
          normativa peruana aplicable.
        </p>

        <p>
          Para presentar una solicitud, pueden comunicarse mediante el siguiente
          correo:
        </p>

        <a
          href="mailto:grupo.comercial@yahoo.es"
          className="font-bold text-[#007E3B] hover:underline"
        >
          grupo.comercial@yahoo.es
        </a>
      </Seccion>

      <Seccion numero="09" titulo="Cookies y tecnologías de navegación">
        <p>
          El sitio web puede utilizar tecnologías de almacenamiento necesarias
          para el funcionamiento de la navegación, el carrito de compras y la
          sesión del usuario.
        </p>

        <p>
          La utilización de cookies analíticas, publicitarias u otras
          tecnologías adicionales deberá comunicarse conforme a las obligaciones
          legales correspondientes.
        </p>
      </Seccion>

      <Seccion numero="10" titulo="Actualización de la política">
        <p>
          Esta política podrá actualizarse para reflejar modificaciones en los
          procesos comerciales, servicios tecnológicos o disposiciones legales.
        </p>

        <p>
          La versión vigente estará disponible en esta sección de la tienda
          virtual.
        </p>
      </Seccion>

      <div className="mt-10 rounded-2xl bg-[#0A2543] p-7 text-white">
        <h3 className="text-xl font-black">
          ¿Tienes alguna consulta sobre tus datos?
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Comunícate con nuestro equipo mediante el correo de atención.
        </p>

        <a
          href="mailto:grupo.comercial@yahoo.es"
          className="mt-5 inline-flex rounded-xl bg-[#009E49] px-6 py-3 text-sm font-bold text-white hover:bg-[#00843D]"
        >
          Contactar por correo
        </a>
      </div>
    </LegalLayout>
  );
}
