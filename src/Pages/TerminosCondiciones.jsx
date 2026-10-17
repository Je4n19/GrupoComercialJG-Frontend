import { Link } from "react-router-dom";
import { LegalLayout, Seccion, Aviso } from "./LegalLayout";

export default function TerminosCondiciones() {
  return (
    <LegalLayout
      categoria="Información legal"
      titulo="Términos y Condiciones"
      descripcion="Conoce las condiciones de uso de nuestra tienda virtual, los procedimientos de compra y las disposiciones aplicables a nuestros productos y servicios."
      rutaActual="/terminos-y-condiciones"
    >
      <Aviso>
        Te recomendamos leer estos términos antes de realizar una compra. Para
        consultas puedes comunicarte con nuestro equipo de atención comercial.
      </Aviso>

      <Seccion numero="01" titulo="Identificación de la empresa">
        <p>
          El presente sitio web corresponde a{" "}
          <strong>Grupo Comercial J&G</strong>, establecimiento comercial
          dedicado a la venta de maquinaria, equipos, herramientas, accesorios y
          repuestos para los sectores agrícola, forestal e industrial.
        </p>

        <p>
          <strong>RUC:</strong> 10167608308.
        </p>

        <p>
          <strong>Dirección comercial:</strong> Av. Luis Gonzales 1599A,
          Chiclayo, Lambayeque, Perú.
        </p>

        <p>
          <strong>Correo electrónico:</strong> grupo.comercial@yahoo.es.
        </p>

        <p>
          <strong>Teléfono:</strong> 979 501 557.
        </p>

        <p>
          La identificación legal completa del titular del RUC deberá
          verificarse y consignarse antes de publicar la versión definitiva.
        </p>
      </Seccion>

      <Seccion numero="02" titulo="Acceso y aceptación">
        <p>
          Estos términos regulan el acceso, navegación y utilización de la
          tienda virtual de Grupo Comercial J&G, así como las condiciones
          generales relacionadas con la consulta y adquisición de productos.
        </p>

        <p>
          Los visitantes pueden consultar el catálogo sin necesidad de
          registrarse. Para realizar determinadas operaciones se podrán
          solicitar los datos necesarios para gestionar la compra.
        </p>

        <p>
          Antes de confirmar una operación, el cliente deberá tener acceso a la
          información relevante del producto, precio, entrega y condiciones
          aplicables.
        </p>
      </Seccion>

      <Seccion numero="03" titulo="Productos comercializados">
        <p>
          Grupo Comercial J&G comercializa diferentes categorías de productos,
          entre ellas motosierras, desbrozadoras, motobombas, fumigadoras,
          herramientas eléctricas, equipos agrícolas, maquinaria forestal y
          repuestos.
        </p>

        <p>
          Las características técnicas, modelos, dimensiones y demás
          especificaciones se presentan en las fichas de producto. La
          disponibilidad puede variar de acuerdo con las existencias del
          establecimiento.
        </p>

        <p>
          En la adquisición de repuestos se recomienda verificar previamente el
          modelo y la compatibilidad con el equipo correspondiente.
        </p>
      </Seccion>

      <Seccion numero="04" titulo="Precios y disponibilidad">
        <p>
          Los precios de los productos se expresan en soles peruanos (S/). El
          cliente deberá conocer el importe de la compra y los costos
          adicionales aplicables antes de confirmar su pedido.
        </p>

        <p>
          Si un producto no estuviera disponible después de realizar una
          solicitud, Grupo Comercial J&G se comunicará con el cliente para
          ofrecer una alternativa o gestionar la devolución que corresponda.
        </p>
      </Seccion>

      <Seccion numero="05" titulo="Proceso de compra">
        <p>
          El cliente podrá seleccionar productos del catálogo, agregarlos al
          carrito y proporcionar los datos solicitados para procesar el pedido.
        </p>

        <p>
          Es responsabilidad del comprador proporcionar información correcta
          sobre sus datos de contacto y destino de entrega.
        </p>

        <p>
          La confirmación de la compra estará sujeta al procedimiento de
          validación correspondiente, incluida la verificación del pago cuando
          resulte aplicable.
        </p>
      </Seccion>

      <Seccion numero="06" titulo="Métodos de pago">
        <p>
          Grupo Comercial J&G puede aceptar pagos mediante Yape, Plin y
          transferencias bancarias a las cuentas BCP y BBVA comunicadas por sus
          canales oficiales.
        </p>

        <p>
          El comprador deberá realizar el pago utilizando únicamente los datos
          proporcionados oficialmente por el establecimiento.
        </p>

        <p>
          Los comprobantes o números de operación enviados por el cliente serán
          revisados antes de confirmar la recepción del dinero. El envío de una
          captura no constituye por sí solo una aprobación del pago.
        </p>
      </Seccion>

      <Seccion numero="07" titulo="Envíos y entregas">
        <p>
          Grupo Comercial J&G atiende solicitudes de compra desde diferentes
          destinos del territorio peruano, según la disponibilidad de los
          servicios de transporte.
        </p>

        <p>
          Las entregas pueden coordinarse mediante agencias como Shalom,
          Emtrafesa u Olva, cuando estos servicios estén disponibles para el
          destino solicitado.
        </p>

        <p>
          Cuando se acuerde un envío con flete contra entrega, el cliente
          realizará el pago del transporte directamente a la agencia
          correspondiente.
        </p>

        <p>
          El costo y las condiciones de envío deberán informarse antes de
          confirmar la compra. Los plazos estimados pueden variar según el
          transportista y el destino.
        </p>
      </Seccion>

      <Seccion numero="08" titulo="Cambios, devoluciones y garantías">
        <p>
          Las solicitudes relacionadas con productos defectuosos, problemas de
          funcionamiento o diferencias respecto de lo ofrecido serán atendidas
          conforme a la legislación peruana de protección al consumidor.
        </p>

        <p>
          Las condiciones comerciales aplicables a cambios voluntarios y las
          garantías ofrecidas deberán informarse al cliente según el producto.
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
          Los usuarios deberán utilizar la plataforma de manera lícita y
          responsable. No está permitido realizar acciones destinadas a
          perjudicar su funcionamiento, acceder sin autorización a información o
          comprometer la seguridad del sistema.
        </p>

        <p>
          Grupo Comercial J&G podrá adoptar medidas razonables para proteger la
          integridad y disponibilidad de su plataforma.
        </p>
      </Seccion>

      <Seccion numero="10" titulo="Propiedad intelectual">
        <p>
          Los diseños, textos, contenidos originales y elementos propios del
          sitio web están protegidos por las normas de propiedad intelectual
          aplicables.
        </p>

        <p>
          Las marcas comerciales y denominaciones de fabricantes utilizadas para
          identificar productos pertenecen a sus respectivos titulares.
        </p>
      </Seccion>

      <Seccion numero="11" titulo="Protección de datos personales">
        <p>
          Los datos proporcionados durante consultas y compras serán utilizados
          para las finalidades informadas y tratados de acuerdo con la normativa
          peruana de protección de datos personales.
        </p>

        <p>
          Para mayor información consulta nuestra{" "}
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
          Para consultas sobre productos, pagos, pedidos, garantías o entregas,
          los clientes pueden comunicarse mediante nuestros canales oficiales de
          atención.
        </p>

        <p>
          El establecimiento deberá disponer de un mecanismo formal de Libro de
          Reclamaciones conforme a las disposiciones legales aplicables.
        </p>
      </Seccion>

      <Seccion numero="13" titulo="Legislación y actualizaciones">
        <p>
          Las relaciones de consumo se rigen por las normas aplicables de la
          República del Perú, incluido el Código de Protección y Defensa del
          Consumidor.
        </p>

        <p>
          Grupo Comercial J&G podrá actualizar estas condiciones cuando sea
          necesario, respetando los derechos adquiridos por los consumidores.
        </p>
      </Seccion>
    </LegalLayout>
  );
}
