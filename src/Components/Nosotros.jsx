import { Link } from "react-router-dom";
import nosotrosImg from "../assets/Nosotros/nosotros.jpg";

// ========================================
// ICONOS
// ========================================

function IconoNosotros({ tipo, className = "w-6 h-6" }) {
  const iconos = {
    maquinaria: (
      <>
        <circle cx="7" cy="17" r="3" />
        <circle cx="18" cy="17" r="2" />
        <path d="M4 14V9h8l3 5h4l2 3" />
        <path d="M9 9V5h5v4" />
        <path d="M3 17h1M10 17h6" />
      </>
    ),
    repuestos: (
      <>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        <path d="m5.6 5.6 2.1 2.1m8.6 8.6 2.1 2.1" />
        <path d="m18.4 5.6-2.1 2.1m-8.6 8.6-2.1 2.1" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    soporte: (
      <>
        <path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18a2.1 2.1 0 0 0 3 3l5.3-5.3a5 5 0 0 0 6.4-6.4L14 13l-3-3 3.7-3.7Z" />
      </>
    ),
    cobertura: (
      <>
        <path d="M3 7h11v10H3z" />
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
    mensaje: (
      <>
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3a8.5 8.5 0 0 1 8.5 8.5Z" />
        <path d="M8 11.5h9M8 15h6" />
      </>
    ),
    check: (
      <>
        <path d="m5 12 4 4L19 6" />
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

// ========================================
// COMPONENTE NOSOTROS
// ========================================

function Nosotros() {
  const beneficios = [
    {
      titulo: "Equipos Profesionales",
      descripcion: "Equipos preparados para trabajos exigentes.",
      icono: "maquinaria",
    },
    {
      titulo: "Repuestos",
      descripcion: "Alternativas para mantener tus equipos operativos.",
      icono: "repuestos",
    },
    {
      titulo: "Soporte Técnico",
      descripcion: "Orientación y asistencia para tus equipos.",
      icono: "soporte",
    },
    {
      titulo: "Cobertura Nacional",
      descripcion: "Atención para clientes en diferentes partes del Perú.",
      icono: "cobertura",
    },
  ];

  const valores = [
    {
      numero: "01",
      titulo: "Asesoría",
      descripcion:
        "Te orientamos para encontrar el equipo adecuado para tu trabajo.",
    },
    {
      numero: "02",
      titulo: "Confianza",
      descripcion:
        "Buscamos construir relaciones duraderas con nuestros clientes.",
    },
    {
      numero: "03",
      titulo: "Respaldo",
      descripcion: "Te acompañamos también después de elegir tu maquinaria.",
    },
  ];

  const whatsappUrl =
    "https://wa.me/51979501557?text=" +
    encodeURIComponent("Hola, deseo recibir asesoría sobre sus productos.");

  return (
    <section
      className="
        relative
        bg-white
        py-16
        md:py-20
        lg:py-24
        overflow-hidden
      "
    >
      {/* ======================================== */}
      {/* DECORACIÓN DE FONDO */}
      {/* ======================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          w-[500px]
          h-[500px]
          bg-[#009E49]/5
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-0
          w-[400px]
          h-[400px]
          bg-[#FF6600]/5
          rounded-full
          blur-3xl
        "
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* ======================================== */}
        {/* IMAGEN Y CONTENIDO */}
        {/* ======================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-12
            xl:gap-20
            items-center
          "
        >
          {/* ======================================== */}
          {/* IMAGEN IZQUIERDA */}
          {/* ======================================== */}

          <div className="relative pl-3 pt-3 lg:pl-5 lg:pt-5">
            {/* MARCO VERDE DECORATIVO */}
            <div
              className="
                absolute
                top-0
                left-0
                right-6
                bottom-6
                bg-[#009E49]
                rounded-[30px]
              "
            />

            {/* IMAGEN PRINCIPAL */}
            <div
              className="
                relative
                rounded-[30px]
                overflow-hidden
                shadow-2xl
                group
              "
            >
              <img
                src={nosotrosImg}
                alt="Maquinaria y soluciones de Grupo Comercial J&G"
                loading="lazy"
                className="
                  w-full
                  h-[380px]
                  sm:h-[480px]
                  lg:h-[570px]
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />

              {/* DEGRADADO */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#07140D]/95
                  via-[#07140D]/30
                  to-transparent
                "
              />

              {/* ETIQUETA SUPERIOR */}
              <div
                className="
                  absolute
                  top-5
                  left-5
                  sm:top-7
                  sm:left-7
                  inline-flex
                  items-center
                  gap-2
                  bg-white/95
                  backdrop-blur-sm
                  rounded-full
                  px-4
                  py-2
                  shadow-lg
                "
              >
                <span
                  className="
                    w-2.5
                    h-2.5
                    rounded-full
                    bg-[#009E49]
                  "
                />

                <span
                  className="
                    text-[#1A1A1A]
                    text-[11px]
                    sm:text-xs
                    font-black
                    uppercase
                    tracking-wider
                  "
                >
                  Grupo Comercial J&G
                </span>
              </div>

              {/* CONTENIDO INFERIOR DE IMAGEN */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-6
                  sm:p-8
                  md:p-10
                  text-white
                "
              >
                <span
                  className="
                    text-[#FF9A57]
                    font-black
                    text-xs
                    sm:text-sm
                    uppercase
                    tracking-[0.16em]
                  "
                >
                  Comprometidos con tu trabajo
                </span>

                <h3
                  className="
                    text-2xl
                    sm:text-3xl
                    lg:text-4xl
                    font-black
                    mt-3
                    leading-tight
                  "
                >
                  Soluciones para
                  <span className="block text-white">cada trabajo.</span>
                </h3>

                <p
                  className="
                    text-gray-200
                    text-sm
                    sm:text-base
                    mt-3
                    max-w-md
                    leading-relaxed
                  "
                >
                  Maquinaria, repuestos y atención especializada para nuestros
                  clientes.
                </p>

                {/* LÍNEA NARANJA */}
                <div
                  className="
                    mt-6
                    w-16
                    h-1
                    bg-[#FF6600]
                    rounded-full
                  "
                />
              </div>
            </div>

            {/* PEQUEÑO DETALLE NARANJA */}
            <div
              className="
                absolute
                -bottom-3
                right-5
                w-20
                h-3
                bg-[#FF6600]
                rounded-full
              "
            />
          </div>

          {/* ======================================== */}
          {/* CONTENIDO DERECHO */}
          {/* ======================================== */}

          <div>
            {/* ETIQUETA */}
            <div className="flex items-center gap-3">
              <span
                className="
                  w-10
                  h-[3px]
                  bg-[#FF6600]
                  rounded-full
                "
              />

              <span
                className="
                  text-[#009E49]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-xs
                  sm:text-sm
                "
              >
                Quiénes Somos
              </span>
            </div>

            {/* TÍTULO */}
            <h2
              className="
                text-4xl
                md:text-5xl
                xl:text-6xl
                font-black
                text-[#1A1A1A]
                mt-6
                leading-[1.08]
                tracking-tight
              "
            >
              Más que vender
              <span className="block text-[#009E49] mt-2">maquinaria.</span>
            </h2>

            {/* SUBTÍTULO */}
            <h3
              className="
                text-xl
                md:text-2xl
                font-black
                text-[#1A1A1A]
                mt-5
                leading-snug
              "
            >
              Queremos ser parte de tu trabajo.
            </h3>

            {/* DESCRIPCIÓN */}
            <p
              className="
                text-base
                lg:text-lg
                text-gray-600
                mt-6
                leading-relaxed
              "
            >
              En Grupo Comercial J&G nos especializamos en maquinaria, equipos y
              repuestos para los sectores agrícola, forestal e industrial.
            </p>

            <p
              className="
                text-base
                lg:text-lg
                text-gray-600
                mt-4
                leading-relaxed
              "
            >
              Buscamos que cada cliente encuentre el equipo adecuado para su
              trabajo, acompañado de productos de calidad y una atención cercana
              y especializada.
            </p>

            {/* SEPARADOR */}
            <div className="w-full h-px bg-gray-200 my-8" />

            {/* ======================================== */}
            {/* BENEFICIOS */}
            {/* ======================================== */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-x-7
                gap-y-6
              "
            >
              {beneficios.map((beneficio) => (
                <div key={beneficio.titulo} className="flex gap-4 group">
                  {/* ICONO */}
                  <div
                    className="
                      shrink-0
                      w-12
                      h-12
                      rounded-2xl
                      bg-[#E8F7EE]
                      text-[#009E49]
                      flex
                      items-center
                      justify-center
                      group-hover:bg-[#009E49]
                      group-hover:text-white
                      transition-all
                      duration-300
                    "
                  >
                    <IconoNosotros tipo={beneficio.icono} />
                  </div>

                  {/* TEXTO */}
                  <div>
                    <h3
                      className="
                        font-black
                        text-[#1A1A1A]
                        text-base
                        lg:text-lg
                      "
                    >
                      {beneficio.titulo}
                    </h3>

                    <p
                      className="
                        text-gray-500
                        text-sm
                        mt-1
                        leading-relaxed
                      "
                    >
                      {beneficio.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ======================================== */}
            {/* BOTONES */}
            {/* ======================================== */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:flex-wrap
                items-stretch
                sm:items-center
                gap-4
                mt-9
              "
            >
              {/* CATÁLOGO */}
              <Link
                to="/catalogo"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  bg-[#FF6600]
                  hover:bg-[#E65C00]
                  text-white
                  px-7
                  py-4
                  rounded-xl
                  font-black
                  text-sm
                  shadow-lg
                  shadow-orange-500/15
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                Conocer Productos
                <IconoNosotros tipo="flecha" className="w-5 h-5" />
              </Link>

              {/* WHATSAPP */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  bg-[#009E49]
                  hover:bg-[#00843D]
                  text-white
                  px-7
                  py-4
                  rounded-xl
                  font-black
                  text-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                <IconoNosotros tipo="mensaje" className="w-5 h-5" />
                Hablar con un Asesor
              </a>
            </div>
          </div>
        </div>

        {/* ======================================== */}
        {/* FRANJA INFERIOR */}
        {/* ======================================== */}

        <div
          className="
            relative
            mt-16
            lg:mt-20
            bg-[#1A1A1A]
            rounded-[30px]
            overflow-hidden
            shadow-xl
          "
        >
          {/* LÍNEA SUPERIOR */}
          <div className="h-1 bg-[#009E49]" />

          {/* DECORACIÓN */}
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -bottom-24
              w-72
              h-72
              bg-[#009E49]/10
              rounded-full
              blur-3xl
            "
          />

          <div className="relative grid grid-cols-1 md:grid-cols-3">
            {valores.map((valor, index) => (
              <div
                key={valor.numero}
                className={`
                  p-7
                  lg:p-9
                  ${
                    index !== valores.length - 1
                      ? "border-b md:border-b-0 md:border-r border-white/10"
                      : ""
                  }
                `}
              >
                {/* NÚMERO */}
                <span
                  className="
                    text-[#FF6600]
                    font-black
                    text-3xl
                  "
                >
                  {valor.numero}
                </span>

                {/* LÍNEA VERDE */}
                <div
                  className="
                    w-10
                    h-[3px]
                    bg-[#009E49]
                    rounded-full
                    mt-4
                  "
                />

                {/* TÍTULO */}
                <h3
                  className="
                    text-white
                    text-xl
                    font-black
                    mt-5
                  "
                >
                  {valor.titulo}
                </h3>

                {/* DESCRIPCIÓN */}
                <p
                  className="
                    text-gray-400
                    text-sm
                    sm:text-base
                    mt-3
                    leading-relaxed
                  "
                >
                  {valor.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Nosotros;
