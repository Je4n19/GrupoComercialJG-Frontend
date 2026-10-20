import { Link } from "react-router-dom";
import { LegalLayout, Seccion, Aviso } from "./LegalLayout";

const CORREO = "grupo.comercial@yahoo.es";
const TELEFONO = "979 501 557";

export default function TerminosCondiciones() {
  return (
    <LegalLayout
      categoria="Información legal"
      titulo="Términos y Condiciones"
      descripcion="Conoce las condiciones de uso de nuestra tienda virtual, los procedimientos de compra y las disposiciones aplicables a nuestros productos y servicios."
      rutaActual="/terminos-y-condiciones"
    >
      <Aviso>
        Te recomendamos leer estos términos antes de realizar una compra. Aquí
        encontrarás información sobre nuestros productos, pedidos, métodos de
        pago, entregas, garantías y canales de atención.
      </Aviso>

      <Seccion numero="01" titulo="Identificación del establecimiento">
        <p>
          El presente sitio web corresponde a{" "}
          <strong>Grupo Comercial J&G</strong>, nombre comercial del negocio
          cuyo titular es <strong>Jesús Oliver Guevara Torres</strong>, persona
          natural con negocio identificada con RUC N.º{" "}
          <strong>10167608308</strong>.
        </p>

        <p>
          El establecimiento se dedica a la comercialización de maquinaria,
          herramientas, equipos, accesorios y repuestos para actividades
          agrícolas, forestales e industriales.
        </p>

        <p>
          <strong>Dirección comercial:</strong> Av. Luis Gonzales 1599A,
          Chiclayo, Lambayeque, Perú.
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
          <strong>Teléfono:</strong> {TELEFONO}.
        </p>
      </Seccion>

      <Seccion numero="02" titulo="Acceso y uso de la tienda virtual">
        <p>
          Estos términos regulan el acceso, navegación y utilización de la
          tienda virtual de Grupo Comercial J&G, así como las condiciones
          generales de adquisición de productos.
        </p>

        <p>
          Los visitantes pueden consultar el catálogo sin necesidad de crear una
          cuenta. Para registrar un pedido, se solicitará la información
          necesaria para atender la operación comercial.
        </p>

        <p>
          Antes de confirmar un pedido, el comprador debe tener acceso a la
          información relevante del producto, precio, disponibilidad, modalidad
          de entrega y condiciones aplicables.
        </p>
      </Seccion>

      <Seccion numero="03" titulo="Productos comercializados">
        <p>
          Grupo Comercial J&G comercializa productos como motosierras,
          desbrozadoras, motobombas, fumigadoras, herramientas eléctricas,
          maquinaria agrícola, equipos forestales, accesorios y repuestos.
        </p>

        <p>
          Las características técnicas, marcas, modelos y especificaciones se
          presentan en las fichas de producto.
        </p>

        <p>
          Las fotografías son referenciales cuando así se indique. Las
          características esenciales del producto ofrecido deben corresponder
          con la información comunicada al comprador.
        </p>

        <p>
          Para adquirir repuestos, recomendamos verificar la marca, el modelo y
          la compatibilidad con el equipo correspondiente. Nuestro personal
          puede orientar al cliente cuando necesite información adicional.
        </p>
      </Seccion>

      <Seccion numero="04" titulo="Precios y disponibilidad">
        <p>
          Los precios publicados en nuestra tienda virtual se expresan en soles
          peruanos (S/).
        </p>

        <p>
          El cliente debe conocer el importe total correspondiente a los
          productos y los costos adicionales aplicables antes de confirmar su
          operación.
        </p>

        <p>
          La disponibilidad está sujeta a las existencias reales del
          establecimiento. La información de inventario puede actualizarse
          durante la navegación.
        </p>

        <p>
          Si después de registrar un pedido se detecta que un producto no está
          disponible, nos comunicaremos con el comprador para informarle la
          situación y coordinar una alternativa o la devolución del importe que
          corresponda.
        </p>
      </Seccion>

      <Seccion numero="05" titulo="Proceso de compra">
        <p>
          Para realizar una compra, el cliente puede seleccionar productos del
          catálogo, agregarlos al carrito y completar los datos solicitados
          durante el proceso de pedido.
        </p>

        <p>
          El comprador deberá proporcionar información correcta y actualizada,
          especialmente su nombre, teléfono, correo electrónico y datos de
          entrega.
        </p>

        <p>
          El registro del pedido no implica automáticamente que el pago haya
          sido aprobado ni que la compra se encuentre lista para despacho.
        </p>

        <p>
          La atención y confirmación del pedido estarán sujetas a la validación
          correspondiente, incluida la verificación del pago y la disponibilidad
          del producto.
        </p>
      </Seccion>

      <Seccion numero="06" titulo="Métodos de pago">
        <p>
          Grupo Comercial J&G acepta los métodos de pago que se encuentren
          habilitados durante el proceso de compra, entre ellos:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Yape.</li>
          <li>Plin.</li>
          <li>Transferencia bancaria BCP.</li>
          <li>Transferencia bancaria BBVA.</li>
        </ul>

        <p>
          Los pagos deben realizarse únicamente a los destinatarios y cuentas
          indicados por los canales oficiales del establecimiento.
        </p>

        <p>
          Cuando el sistema solicite un comprobante de pago o número de
          operación, el comprador deberá proporcionar información auténtica que
          permita verificar la transacción.
        </p>

        <p>
          <strong>
            El envío de un comprobante no significa que el pago haya sido
            aprobado.
          </strong>{" "}
          La operación será revisada antes de confirmar su recepción.
        </p>

        <p>
          Si se identifica alguna inconsistencia, nos comunicaremos con el
          cliente mediante los datos proporcionados en el pedido.
        </p>
      </Seccion>

      <Seccion numero="07" titulo="Envíos y entregas">
        <p>
          Grupo Comercial J&G atiende pedidos para diferentes destinos del Perú,
          de acuerdo con la disponibilidad de los servicios de transporte.
        </p>

        <p>
          Las entregas pueden coordinarse mediante empresas como Shalom,
          Emtrafesa u Olva, según el destino y las condiciones del servicio
          seleccionado.
        </p>

        <p>
          También puede coordinarse el recojo en el establecimiento cuando dicha
          modalidad esté disponible.
        </p>

        <p>
          Cuando el envío se realice bajo la modalidad de{" "}
          <strong>flete por pagar</strong>, el cliente abonará el costo del
          transporte directamente a la agencia correspondiente. Este importe no
          forma parte del precio de los productos cuando se informa como un
          cobro separado.
        </p>

        <p>
          Antes de confirmar el pedido se deberá informar claramente la
          modalidad de envío y las condiciones económicas conocidas. Si el
          importe exacto del transporte depende de una cotización de la agencia,
          esta circunstancia deberá comunicarse al comprador.
        </p>

        <p>
          Los plazos de entrega son estimados y pueden variar por factores
          relacionados con el destino, la disponibilidad y la operación del
          transportista.
        </p>

        <p>
          Cualquier incidencia durante el envío será evaluada de acuerdo con las
          circunstancias del caso y los derechos reconocidos al consumidor.
        </p>
      </Seccion>

      <Seccion numero="08" titulo="Cambios, devoluciones y garantías">
        <p>
          Los productos comercializados están sujetos a las garantías y derechos
          reconocidos por la legislación peruana de protección al consumidor.
        </p>

        <p>
          Si un producto presenta defectos, problemas de funcionamiento o no
          corresponde con las características ofrecidas, el comprador podrá
          solicitar la atención que corresponda.
        </p>

        <p>
          Las condiciones específicas de las garantías comerciales ofrecidas por
          fabricantes o proveedores se informarán según el producto
          correspondiente.
        </p>

        <p>
          Los cambios voluntarios por motivos distintos de una falla o
          incumplimiento estarán sujetos a las condiciones comerciales
          efectivamente ofrecidas e informadas al comprador.
        </p>

        <p>
          Ninguna disposición de esta sección limita los derechos irrenunciables
          reconocidos al consumidor.
        </p>

        <p>
          Puedes consultar nuestra{" "}
          <Link
            to="/cambios-y-devoluciones"
            className="font-bold text-[#007E3B] hover:underline"
          >
            Política de Cambios y Devoluciones
          </Link>
          .
        </p>
      </Seccion>

      <Seccion numero="09" titulo="Uso adecuado del sitio web">
        <p>
          Los visitantes deberán utilizar la plataforma de manera lícita,
          responsable y respetando los derechos de terceros.
        </p>

        <p>
          No está permitido intentar acceder sin autorización a cuentas,
          sistemas, información privada o funcionalidades restringidas del
          establecimiento.
        </p>

        <p>
          Tampoco está permitido realizar actividades destinadas a comprometer
          la seguridad, disponibilidad o integridad de la tienda virtual.
        </p>

        <p>
          Grupo Comercial J&G podrá adoptar medidas razonables para proteger sus
          servicios y prevenir usos indebidos de la plataforma.
        </p>
      </Seccion>

      <Seccion numero="10" titulo="Propiedad intelectual">
        <p>
          Los textos, diseños, fotografías originales y demás contenidos propios
          de Grupo Comercial J&G están sujetos a la protección prevista por la
          legislación de propiedad intelectual aplicable.
        </p>

        <p>
          Las marcas, logotipos y denominaciones comerciales de fabricantes como
          STIHL, Honda y otras marcas utilizadas para identificar productos
          pertenecen a sus respectivos titulares.
        </p>

        <p>
          La aparición de una marca en nuestro catálogo tiene una finalidad de
          identificación comercial del producto y no implica necesariamente una
          representación o autorización oficial del fabricante.
        </p>
      </Seccion>

      <Seccion numero="11" titulo="Protección de datos personales">
        <p>
          Los datos personales proporcionados durante consultas, pedidos y
          compras serán tratados conforme a las disposiciones legales
          aplicables.
        </p>

        <p>
          El tratamiento de información personal se encuentra sujeto a la Ley
          N.º 29733, Ley de Protección de Datos Personales, y a su normativa
          reglamentaria vigente.
        </p>

        <p>
          Para conocer las finalidades de tratamiento, los datos recopilados y
          los mecanismos de ejercicio de derechos, consulta nuestra{" "}
          <Link
            to="/politica-de-privacidad"
            className="font-bold text-[#007E3B] hover:underline"
          >
            Política de Privacidad
          </Link>
          .
        </p>
      </Seccion>

      <Seccion numero="12" titulo="Atención y reclamaciones">
        <p>
          Para consultas relacionadas con productos, pedidos, pagos, garantías,
          devoluciones o entregas, puedes comunicarte mediante nuestros canales
          oficiales de atención.
        </p>

        <p>
          <strong>Correo:</strong>{" "}
          <a
            href={`mailto:${CORREO}`}
            className="font-bold text-[#007E3B] hover:underline"
          >
            {CORREO}
          </a>
        </p>

        <p>
          <strong>Teléfono:</strong> {TELEFONO}.
        </p>

        <p>
          El establecimiento debe disponer de un mecanismo formal de Libro de
          Reclamaciones conforme a las disposiciones legales aplicables.
        </p>

        <p>
          Actualmente, el formulario mostrado en nuestra página web se encuentra
          en desarrollo y no registra reclamaciones oficiales. Mientras se
          implementa el mecanismo correspondiente, el consumidor puede solicitar
          información sobre el Libro de Reclamaciones disponible en el
          establecimiento.
        </p>

        <p>
          <Link
            to="/libro-de-reclamaciones"
            className="font-bold text-[#007E3B] hover:underline"
          >
            Consultar información sobre el Libro de Reclamaciones
          </Link>
          .
        </p>

        <p>
          La presentación de una reclamación no limita los derechos del
          consumidor ni impide acudir ante las autoridades competentes.
        </p>
      </Seccion>

      <Seccion numero="13" titulo="Legislación y actualizaciones">
        <p>
          Las relaciones de consumo se rigen por las normas aplicables de la
          República del Perú, incluyendo la Ley N.º 29571, Código de Protección
          y Defensa del Consumidor.
        </p>

        <p>
          Grupo Comercial J&G podrá actualizar estos términos para reflejar
          cambios en sus operaciones comerciales, servicios tecnológicos o
          disposiciones legales.
        </p>

        <p>
          Las modificaciones no afectarán retroactivamente los derechos
          adquiridos por los consumidores ni las condiciones válidamente
          acordadas para operaciones anteriores.
        </p>
      </Seccion>

      <div className="mt-10 rounded-2xl bg-[#0A2543] p-7 text-white sm:p-8">
        <h3 className="text-xl font-black">¿Necesitas ayuda con tu compra?</h3>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          Nuestro equipo puede orientarte sobre productos, disponibilidad,
          pagos, entregas y atención posventa.
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
