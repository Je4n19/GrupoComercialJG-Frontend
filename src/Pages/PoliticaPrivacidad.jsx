import { LegalLayout, Seccion, Aviso } from "./LegalLayout";

const CORREO = "grupo.comercial@yahoo.es";

export default function PoliticaPrivacidad() {
  return (
    <LegalLayout
      categoria="Protección de datos personales"
      titulo="Política de Privacidad"
      descripcion="Conoce cómo Grupo Comercial J&G recopila, utiliza y protege la información personal relacionada con consultas y compras."
      rutaActual="/politica-de-privacidad"
    >
      <Aviso>
        Tu privacidad es importante para nosotros. Esta política explica el
        tratamiento de los datos personales relacionados con nuestra tienda
        virtual. Puedes comunicarte con nosotros para realizar consultas o
        ejercer tus derechos.
      </Aviso>

      <Seccion numero="01" titulo="Identificación del responsable">
        <p>
          La tienda virtual <strong>Grupo Comercial J&G</strong>
          es operada por <strong>Jesús Oliver Guevara Torres</strong>, persona
          natural con negocio identificada con
          <strong> RUC N.º 10167608308</strong>.
        </p>

        <p>
          <strong>Nombre comercial:</strong> Grupo Comercial J&G.
        </p>

        <p>
          <strong>Dirección del establecimiento:</strong> Av. Luis Gonzales
          1599A, Chiclayo, Lambayeque, Perú.
        </p>

        <p>
          <strong>Correo electrónico:</strong>{" "}
          <a
            href={`mailto:${CORREO}`}
            className="font-bold text-[#007E3B] hover:underline"
          >
            {CORREO}
          </a>
        </p>

        <p>
          <strong>Teléfono:</strong> 979 501 557.
        </p>
      </Seccion>

      <Seccion numero="02" titulo="Datos personales recopilados">
        <p>
          Según el servicio solicitado, podemos recopilar los siguientes datos
          personales:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Nombres y apellidos del cliente.</li>
          <li>Teléfono y correo electrónico.</li>
          <li>Dirección y datos necesarios para la entrega.</li>
          <li>Información para emitir comprobantes de pago.</li>
          <li>Productos seleccionados y datos de pedidos.</li>
          <li>Números de operación y comprobantes de pago.</li>
          <li>Información proporcionada en consultas y reclamos.</li>
        </ul>

        <p>
          No solicitamos contraseñas bancarias, claves de Yape o Plin ni códigos
          secretos de autenticación para procesar compras.
        </p>
      </Seccion>

      <Seccion numero="03" titulo="Finalidades del tratamiento">
        <p>
          Los datos personales proporcionados se utilizan, según corresponda,
          para:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Responder consultas sobre productos y repuestos.</li>
          <li>Registrar y administrar pedidos.</li>
          <li>Comunicarnos con el comprador.</li>
          <li>Verificar las operaciones de pago.</li>
          <li>Coordinar recojos y envíos.</li>
          <li>Emitir comprobantes cuando corresponda.</li>
          <li>Atender garantías, devoluciones y reclamos.</li>
          <li>Cumplir las obligaciones legales aplicables.</li>
        </ul>

        <p>
          El tratamiento de datos para publicidad o promociones, cuando requiera
          consentimiento, deberá contar con una autorización previa, libre,
          informada y específica.
        </p>
      </Seccion>

      <Seccion numero="04" titulo="Normativa y fundamento legal">
        <p>
          El tratamiento de datos personales se encuentra sujeto a la Ley N.º
          29733, Ley de Protección de Datos Personales, y a su Reglamento
          aprobado mediante Decreto Supremo N.º 016-2024-JUS, así como a las
          demás disposiciones aplicables.
        </p>

        <p>
          Los datos podrán tratarse cuando exista consentimiento válido o cuando
          corresponda alguna de las excepciones permitidas por la legislación
          peruana.
        </p>

        <p>
          Proporcionar los datos necesarios para gestionar un pedido permite
          atender la solicitud comercial. Si no se proporciona información
          indispensable, podría no ser posible procesar la operación solicitada.
        </p>
      </Seccion>

      <Seccion numero="05" titulo="Proveedores y destinatarios">
        <p>
          La operación de nuestra tienda virtual utiliza servicios tecnológicos
          para presentar el catálogo, procesar solicitudes y administrar
          información relacionada con pedidos.
        </p>

        <p>
          Entre los servicios tecnológicos empleados en la plataforma se
          encuentran:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Vercel:</strong> alojamiento de la interfaz de la tienda
            virtual.
          </li>
          <li>
            <strong>Render:</strong> alojamiento de servicios del sistema.
          </li>
          <li>
            <strong>Railway:</strong> infraestructura utilizada para la base de
            datos.
          </li>
          <li>
            <strong>Cloudinary:</strong> servicio utilizado para gestionar
            archivos asociados a operaciones de la tienda.
          </li>
        </ul>

        <p>
          Para coordinar envíos, podrá ser necesario proporcionar a la empresa
          de transporte seleccionada los datos indispensables para realizar la
          entrega.
        </p>

        <p>
          Las ubicaciones de tratamiento, transferencias internacionales y
          condiciones de acceso de estos proveedores deberán verificarse
          técnicamente y documentarse conforme a la normativa aplicable.
        </p>
      </Seccion>

      <Seccion numero="06" titulo="Seguridad de la información">
        <p>
          Grupo Comercial J&G reconoce la importancia de proteger los datos
          personales de sus clientes frente a accesos no autorizados,
          alteraciones, pérdidas y divulgaciones indebidas.
        </p>

        <p>
          La protección de la información requiere controles técnicos y
          organizativos adecuados, incluyendo la gestión de accesos, permisos,
          credenciales y servicios de almacenamiento.
        </p>

        <p>
          Los controles de seguridad de la plataforma se encuentran sujetos a
          revisión técnica. Ningún sistema conectado a Internet puede garantizar
          la ausencia absoluta de riesgos.
        </p>
      </Seccion>

      <Seccion numero="07" titulo="Conservación de los datos">
        <p>
          Los datos personales deben conservarse únicamente durante el periodo
          necesario para las finalidades informadas y para cumplir las
          obligaciones legales aplicables.
        </p>

        <p>
          Los periodos de conservación pueden variar según se trate de
          consultas, pedidos, comprobantes, garantías o reclamaciones.
        </p>

        <p>
          Los plazos específicos y los procedimientos de eliminación o
          anonimización deben establecerse y documentarse según los procesos
          reales del establecimiento.
        </p>
      </Seccion>

      <Seccion numero="08" titulo="Derechos de los titulares">
        <p>
          Las personas pueden ejercer los derechos reconocidos por la
          legislación peruana, incluyendo información, acceso, rectificación,
          cancelación y oposición, según corresponda.
        </p>

        <p>
          También podrán solicitar información sobre el uso de sus datos
          personales y las condiciones aplicables a su tratamiento.
        </p>

        <p>Para presentar una solicitud, escribe a:</p>

        <a
          href={`mailto:${CORREO}?subject=Solicitud%20de%20protecci%C3%B3n%20de%20datos`}
          className="font-bold text-[#007E3B] hover:underline"
        >
          {CORREO}
        </a>

        <p>
          Indica el derecho que deseas ejercer y la información necesaria para
          identificar tu solicitud. La verificación de identidad se realizará
          conforme a la normativa, procurando no solicitar información
          innecesaria.
        </p>

        <p>
          Las solicitudes se atenderán dentro de los plazos legales
          correspondientes. Cuando proceda, el titular también podrá acudir ante
          la Autoridad Nacional de Protección de Datos Personales.
        </p>
      </Seccion>

      <Seccion numero="09" titulo="Cookies y almacenamiento local">
        <p>
          La tienda puede utilizar mecanismos de almacenamiento del navegador
          necesarios para mantener el carrito de compras y facilitar
          determinadas operaciones.
        </p>

        <p>
          Algunas funciones de sesión y seguridad también pueden requerir
          tecnologías de almacenamiento o cookies técnicas.
        </p>

        <p>
          El uso de herramientas analíticas, publicitarias o de seguimiento
          adicionales, en caso de incorporarse, deberá evaluarse e informarse
          según la normativa aplicable, incluyendo los mecanismos de
          consentimiento que correspondan.
        </p>
      </Seccion>

      <Seccion numero="10" titulo="Actualizaciones de la política">
        <p>
          Esta política podrá actualizarse para reflejar cambios en los
          servicios tecnológicos, procesos comerciales o disposiciones legales.
        </p>

        <p>
          La versión disponible en esta sección será la referencia informativa
          para los visitantes de nuestra tienda. Los cambios relevantes se
          comunicarán cuando corresponda legalmente.
        </p>
      </Seccion>

      <div className="mt-10 rounded-2xl bg-[#0A2543] p-7 text-white sm:p-8">
        <h3 className="text-xl font-black">
          ¿Tienes consultas sobre tus datos?
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Puedes comunicarte con nosotros para solicitar información o ejercer
          tus derechos relacionados con la protección de datos personales.
        </p>

        <a
          href={`mailto:${CORREO}`}
          className="mt-5 inline-flex rounded-xl bg-[#009E49] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#00843D]"
        >
          Contactar por correo
        </a>
      </div>
    </LegalLayout>
  );
}
