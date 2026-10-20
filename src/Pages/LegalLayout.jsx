import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Enlaces de las páginas legales
const enlacesLegales = [
  {
    nombre: "Términos y Condiciones",
    ruta: "/terminos-y-condiciones",
  },
  {
    nombre: "Política de Privacidad",
    ruta: "/politica-de-privacidad",
  },
  {
    nombre: "Cambios y Devoluciones",
    ruta: "/cambios-y-devoluciones",
  },
  {
    nombre: "Libro de Reclamaciones",
    ruta: "/libro-de-reclamaciones",
  },
];

// Diseño principal compartido
export function LegalLayout({
  categoria,
  titulo,
  descripcion,
  rutaActual,
  children,
}) {
  const { pathname } = useLocation();

  // Al cambiar de página legal, regresar al inicio.
  useEffect(() => {
    window.scrollTo(0, 0);

    // Restablecer también el desplazamiento del documento.
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return (
    <main className="min-h-screen bg-[#F5F7FA] text-slate-800">
      {/* ENCABEZADO */}
      <section className="relative overflow-hidden border-b-4 border-[#009E49] bg-[#081B33] text-white">
        {/* Decoración */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#009E49]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          {/* Navegación */}
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate-300">
            <Link to="/" className="transition-colors hover:text-white">
              Inicio
            </Link>

            <span className="text-slate-500">/</span>

            <span className="text-green-300">Información legal</span>
          </nav>

          {/* Categoría */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#FF8A36]" />

            <span className="text-xs font-bold uppercase tracking-widest text-[#FF9B55]">
              {categoria}
            </span>
          </div>

          {/* Título */}
          <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {titulo}
          </h1>

          {/* Descripción */}
          <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
            {descripcion}
          </p>

          {/* Línea decorativa */}
          <div className="mt-8 h-1 w-20 rounded-full bg-[#FF7A21]" />
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
        {/* MENÚ LATERAL */}
        <aside className="min-w-0">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <div className="mb-5 border-b border-slate-100 pb-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#F06A16]">
                Grupo Comercial J&G
              </p>

              <h2 className="text-lg font-black text-[#0A2543]">
                Información legal
              </h2>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                Documentos y políticas de nuestra tienda.
              </p>
            </div>

            {/* Enlaces */}
            <nav aria-label="Navegación legal" className="flex flex-col gap-2">
              {enlacesLegales.map((enlace) => {
                const activo = rutaActual === enlace.ruta;

                return (
                  <Link
                    key={enlace.ruta}
                    to={enlace.ruta}
                    aria-current={activo ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
                      activo
                        ? "border border-green-100 bg-green-50 font-bold text-[#007E3B]"
                        : "border border-transparent font-medium text-slate-600 hover:bg-slate-50 hover:text-[#007E3B]"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        activo
                          ? "bg-[#009E49]"
                          : "bg-slate-300 group-hover:bg-[#009E49]"
                      }`}
                    />

                    <span>{enlace.nombre}</span>

                    {activo && (
                      <span className="ml-auto text-[#009E49]">›</span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CONTACTO LATERAL */}
            <div className="mt-7 rounded-xl bg-[#F5F7FA] p-4">
              <h3 className="text-sm font-extrabold text-[#0A2543]">
                ¿Necesitas ayuda?
              </h3>

              <p className="mt-2 text-xs leading-6 text-slate-600">
                Nuestro equipo está disponible para atender tus consultas
                comerciales.
              </p>

              <a
                href="https://wa.me/51979501557"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#007E3B] hover:underline"
              >
                Contactar por WhatsApp
                <span>↗</span>
              </a>
            </div>
          </div>
        </aside>

        {/* DOCUMENTO LEGAL */}
        <div className="min-w-0">
          <article className="rounded-2xl border border-slate-200 bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10 lg:px-10">
            {/* CABECERA DEL DOCUMENTO */}
            <div className="mb-9 border-b border-slate-200 pb-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-[#007E3B]">
                  Grupo Comercial J&G
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  RUC: 10167608308
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-500">
                Documento informativo correspondiente a las operaciones
                comerciales de Grupo Comercial J&G.
              </p>
            </div>

            {/* CONTENIDO DE CADA PÁGINA */}
            <div>{children}</div>

            {/* PIE DEL DOCUMENTO */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <h3 className="text-base font-black text-[#0A2543]">
                Información de contacto
              </h3>

              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-[#0A2543]">Empresa:</strong> Grupo
                  Comercial J&G
                </p>

                <p>
                  <strong className="text-[#0A2543]">RUC:</strong> 10167608308
                </p>

                <p>
                  <strong className="text-[#0A2543]">Dirección:</strong> Av.
                  Luis Gonzales 1599A, Chiclayo, Lambayeque, Perú.
                </p>

                <p>
                  <strong className="text-[#0A2543]">Teléfono:</strong>{" "}
                  <a
                    href="tel:+51979501557"
                    className="hover:text-[#007E3B] hover:underline"
                  >
                    979 501 557
                  </a>
                </p>

                <p>
                  <strong className="text-[#0A2543]">Correo:</strong>{" "}
                  <a
                    href="mailto:grupo.comercial@yahoo.es"
                    className="break-all hover:text-[#007E3B] hover:underline"
                  >
                    grupo.comercial@yahoo.es
                  </a>
                </p>
              </div>
            </div>
          </article>

          {/* REGRESAR A LA TIENDA */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm font-extrabold text-[#0A2543]">
                Grupo Comercial J&G
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Maquinaria, herramientas y repuestos.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl bg-[#0A2543] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#009E49]"
            >
              ← Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

// COMPONENTE PARA CADA SECCIÓN DEL DOCUMENTO
export function Seccion({ numero, titulo, children }) {
  return (
    <section className="mb-10 last:mb-0">
      {/* TÍTULO DE SECCIÓN */}
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-sm font-black text-[#007E3B]">
          {numero}
        </div>

        <div className="min-w-0 flex-1 pt-1">
          <h2 className="text-lg font-black leading-7 text-[#0A2543] sm:text-xl">
            {titulo}
          </h2>

          <div className="mt-3 h-0.5 w-12 rounded-full bg-[#F06A16]" />
        </div>
      </div>

      {/* TEXTO */}
      <div className="space-y-4 text-sm leading-8 text-slate-600 sm:pl-14 sm:text-base">
        {children}
      </div>
    </section>
  );
}

// COMPONENTE PARA AVISOS IMPORTANTES
export function Aviso({ children }) {
  return (
    <div className="mb-10 rounded-r-xl border-l-4 border-[#F06A16] bg-orange-50 px-5 py-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 text-lg text-[#D45C12]">ℹ</span>

        <div className="text-sm leading-7 text-slate-700">{children}</div>
      </div>
    </div>
  );
}

export default LegalLayout;
