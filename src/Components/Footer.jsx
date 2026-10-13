import { Link } from "react-router-dom";

import logoJ from "../assets/logoJ&G.png";
import metodosPago from "../assets/metodos.png";

// ========================================
// DATOS DE CONTACTO Y REDES SOCIALES
// ========================================

const FACEBOOK_URL =
  "https://www.facebook.com/p/Grupo-Comercial-JG-61572533279515/";

const INSTAGRAM_URL = "https://www.instagram.com/grupocomercialjg/";

const WHATSAPP_URL =
  "https://wa.me/51979501557?text=" +
  encodeURIComponent(
    "Hola, deseo información sobre los productos de Grupo Comercial J&G.",
  );

// ========================================
// ICONOS
// ========================================

function Icono({ tipo, className = "w-5 h-5" }) {
  const iconos = {
    telefono: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.8a2 2 0 0 1-.45 2.11L9.03 10.9a16 16 0 0 0 4.07 4.07l1.27-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.68A2 2 0 0 1 22 16.92z" />
    ),

    correo: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </>
    ),

    ubicacion: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),

    camion: (
      <>
        <path d="M3 6h11v11H3z" />
        <path d="M14 10h4l3 4v3h-7" />
        <circle cx="7.5" cy="18" r="2" />
        <circle cx="17.5" cy="18" r="2" />
      </>
    ),

    flecha: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconos[tipo]}
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 fill-current"
      aria-hidden="true"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.099 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.974h-1.513c-1.491 0-1.956.931-1.956 1.887v2.26h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.099 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 fill-current"
      aria-hidden="true"
    >
      <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zm8.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  );
}

// ========================================
// COMPONENTE FOOTER
// ========================================

function Footer() {
  const navegacion = [
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Catálogo", ruta: "/catalogo" },
    { nombre: "Repuestos", ruta: "/repuestos" },
    { nombre: "Contacto", ruta: "/contacto" },
  ];

  const servicios = [
    "Venta de Maquinaria",
    "Venta de Repuestos",
    "Servicio Técnico",
    "Asesoría Especializada",
    "Cotizaciones Empresariales",
  ];

  return (
    <footer className="bg-[#050914] text-white">
      {/* LÍNEA SUPERIOR VERDE */}
      <div className="h-1 bg-[#009E49]" />

      <div
        className="
          max-w-[1500px]
          mx-auto
          px-5
          sm:px-8
          lg:px-10
          pt-14
          pb-7
        "
      >
        {/* ======================================== */}
        {/* CUATRO COLUMNAS PRINCIPALES */}
        {/* ======================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-[1.15fr_0.85fr_1fr_1.3fr]
            gap-x-8
            lg:gap-x-10
            gap-y-10
            items-start
          "
        >
          {/* ======================================== */}
          {/* COLUMNA 1: EMPRESA */}
          {/* ======================================== */}

          <div className="lg:row-span-2 flex flex-col min-w-0">
            {/* LOGO */}
            <Link to="/" className="inline-block self-start">
              <img
                src={logoJ}
                alt="Grupo Comercial J&G"
                className="
                  w-24
                  h-24
                  object-contain
                  bg-white
                  p-2
                  rounded-xl
                "
              />
            </Link>

            {/* NOMBRE */}
            <h3 className="text-xl font-black mt-6 mb-4">
              Grupo Comercial J&G
            </h3>

            {/* DESCRIPCIÓN */}
            <p className="text-gray-400 text-sm leading-7 max-w-xs">
              Comercialización de maquinaria, equipos y repuestos para los
              sectores agrícola, forestal e industrial.
            </p>

            {/* REDES SOCIALES ABAJO */}
            <div className="mt-10">
              <h4 className="text-white font-bold text-sm mb-4">
                Síguenos en nuestras redes
              </h4>

              <div className="flex items-center gap-3">
                {/* FACEBOOK */}
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook de Grupo Comercial J&G"
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-[#1F2937]
                    border border-white/10
                    flex items-center
                    justify-center
                    hover:bg-[#1877F2]
                    hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  <FacebookIcon />
                </a>

                {/* INSTAGRAM */}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de Grupo Comercial J&G"
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-[#1F2937]
                    border border-white/10
                    flex items-center
                    justify-center
                    hover:bg-pink-600
                    hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
          </div>

          {/* ======================================== */}
          {/* COLUMNA 2: NAVEGACIÓN */}
          {/* ======================================== */}

          <div>
            <h3 className="text-lg font-black text-[#FF6600] mb-7">
              Navegación
            </h3>

            <ul className="space-y-5">
              {navegacion.map((enlace) => (
                <li key={enlace.ruta}>
                  <Link
                    to={enlace.ruta}
                    className="
                      text-gray-400
                      text-sm
                      hover:text-[#009E49]
                      transition-colors
                    "
                  >
                    {enlace.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ======================================== */}
          {/* COLUMNA 3: SERVICIOS */}
          {/* ======================================== */}

          <div>
            <h3 className="text-lg font-black text-[#FF6600] mb-7">
              Servicios
            </h3>

            <ul className="space-y-5">
              {servicios.map((servicio) => (
                <li
                  key={servicio}
                  className="text-gray-400 text-sm leading-relaxed"
                >
                  {servicio}
                </li>
              ))}
            </ul>
          </div>

          {/* ======================================== */}
          {/* COLUMNA 4: CONTÁCTANOS */}
          {/* ======================================== */}

          <div className="lg:row-span-2 min-w-0">
            <h3 className="text-lg font-black text-[#FF6600] mb-7">
              Contáctanos
            </h3>

            <div className="space-y-6">
              {/* TELÉFONO */}
              <a
                href="tel:+51979501557"
                className="
                  flex
                  items-start
                  gap-4
                  text-gray-400
                  hover:text-white
                  transition-colors
                "
              >
                <Icono
                  tipo="telefono"
                  className="w-5 h-5 shrink-0 text-[#009E49]"
                />

                <span className="text-sm">979 501 557</span>
              </a>

              {/* CORREO */}
              <a
                href="mailto:grupo.comercial@yahoo.es"
                className="
                  flex
                  items-start
                  gap-4
                  text-gray-400
                  hover:text-white
                  transition-colors
                "
              >
                <Icono
                  tipo="correo"
                  className="w-5 h-5 shrink-0 text-[#009E49]"
                />

                <span className="text-sm break-words">
                  grupo.comercial@yahoo.es
                </span>
              </a>

              {/* DIRECCIÓN */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Av.+Luis+Gonzales+1599A+Chiclayo+Lambayeque+Peru"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-start
                  gap-4
                  text-gray-400
                  hover:text-white
                  transition-colors
                "
              >
                <Icono
                  tipo="ubicacion"
                  className="w-5 h-5 shrink-0 text-[#009E49]"
                />

                <span className="text-sm leading-7">
                  Av. Luis Gonzales 1599A
                  <span className="block">Chiclayo - Lambayeque - Perú</span>
                </span>
              </a>

              {/* COBERTURA */}
              <div className="flex items-start gap-4 text-gray-400">
                <Icono
                  tipo="camion"
                  className="w-5 h-5 shrink-0 text-[#009E49]"
                />

                <span className="text-sm">Cobertura Nacional</span>
              </div>
            </div>

            {/* WHATSAPP */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                mt-7
                bg-[#009E49]
                hover:bg-[#00843D]
                text-white
                px-7
                py-3.5
                rounded-xl
                text-sm
                font-black
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              WhatsApp
              <Icono tipo="flecha" className="w-4 h-4" />
            </a>
          </div>

          {/* ======================================== */}
          {/* MÉTODOS DE PAGO */}
          {/* DEBAJO DE NAVEGACIÓN Y SERVICIOS */}
          {/* ======================================== */}

          <div
            className="
              sm:col-span-2
              lg:col-start-2
              lg:col-span-2
              lg:row-start-2
              min-w-0
              self-start
              border-t
              border-white/10
              pt-5
            "
          >
            <h3 className="text-lg font-black text-[#FF6600]">
              Métodos de pago
            </h3>

            <p className="text-gray-400 text-sm mt-2">
              Aceptamos pagos mediante Plin, BCP, BBVA y Yape.
            </p>

            {/* MÉTODOS DE PAGO */}
            <div
              className="
                mt-4
                w-full
                max-w-[520px]
                h-[105px]
                bg-white
                rounded-xl
                shadow-lg
                overflow-hidden
                flex
                items-center
                justify-center
              "
            >
              <img
                src={metodosPago}
                alt="Métodos de pago: Plin, BCP, BBVA y Yape"
                loading="lazy"
                className="
                  block
                  w-full
                  h-full
                  object-cover
                  object-center
                "
              />
            </div>
          </div>
        </div>

        {/* ======================================== */}
        {/* PARTE INFERIOR */}
        {/* ======================================== */}

        <div
          className="
            mt-14
            pt-7
            border-t
            border-white/10
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
          "
        >
          <p
            className="
              text-gray-500
              text-xs
              sm:text-sm
              text-center
              md:text-left
            "
          >
            © {new Date().getFullYear()} Grupo Comercial J&G. Todos los derechos
            reservados.
          </p>

          <Link
            to="/login"
            className="
              text-gray-500
              hover:text-[#009E49]
              text-xs
              sm:text-sm
              transition-colors
            "
          >
            Acceso administrativo
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
