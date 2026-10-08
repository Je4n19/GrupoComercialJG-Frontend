import { Link } from "react-router-dom";
import nosotrosImg from "../assets/Nosotros/nosotros.jpg";

function Nosotros() {
  return (
    <section className="relative bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute -right-40 top-20 w-[500px] h-[500px] bg-orange-100/60 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 w-[400px] h-[400px] bg-[#e84d05]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* =========================
              IMAGEN
          ========================== */}

          <div className="relative pl-3 pt-3 lg:pl-5 lg:pt-5">
            {/* Marco naranja decorativo */}
            <div className="absolute top-0 left-0 right-6 bottom-6 bg-[#e84d05] rounded-[30px]" />

            {/* Imagen principal */}
            <div className="relative rounded-[30px] overflow-hidden shadow-2xl">
              <img
                src={nosotrosImg}
                alt="Maquinaria y soluciones de Grupo Comercial J&G"
                className="w-full h-[420px] sm:h-[500px] lg:h-[590px] object-cover"
              />

              {/* Degradado para mejorar la lectura */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              {/* Texto inferior sobre la imagen */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 text-white">
                <span className="text-orange-300 font-bold text-xs sm:text-sm uppercase tracking-[0.16em]">
                  Grupo Comercial J&G
                </span>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-2 leading-tight">
                  Soluciones para cada trabajo
                </h3>

                <p className="text-gray-200 text-sm sm:text-base mt-3 max-w-md leading-relaxed">
                  Maquinaria, repuestos y atención especializada para nuestros
                  clientes.
                </p>
              </div>
            </div>
          </div>

          {/* =========================
              CONTENIDO
          ========================== */}

          <div>
            <span className="inline-flex items-center gap-2 text-[#e84d05] font-black uppercase tracking-[0.18em] text-xs sm:text-sm">
              <span className="w-10 h-[3px] bg-[#e84d05] rounded-full" />
              Quiénes Somos
            </span>

            <h2 className="text-4xl md:text-5xl xl:text-6xl font-black text-gray-950 mt-6 leading-[1.08]">
              Más que vender
              <span className="block text-[#e84d05] mt-2">maquinaria.</span>
            </h2>

            <h3 className="text-xl md:text-2xl font-black text-gray-800 mt-4 leading-snug">
              Queremos ser parte de tu trabajo.
            </h3>

            <p className="text-base lg:text-lg text-gray-600 mt-6 leading-relaxed">
              En Grupo Comercial J&G nos especializamos en maquinaria, equipos y
              repuestos para los sectores agrícola, forestal e industrial.
            </p>

            <p className="text-base lg:text-lg text-gray-600 mt-4 leading-relaxed">
              Buscamos que cada cliente encuentre el equipo adecuado para su
              trabajo, acompañado de productos de calidad y una atención cercana
              y especializada.
            </p>

            <div className="w-full h-px bg-gray-200 my-8" />

            {/* =========================
                BENEFICIOS
            ========================== */}

            <div className="grid sm:grid-cols-2 gap-x-7 gap-y-6">
              {/* Equipos profesionales */}
              <div className="flex gap-4 group">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl group-hover:bg-orange-200 transition">
                  🚜
                </div>

                <div>
                  <h3 className="font-black text-gray-900 text-base lg:text-lg">
                    Equipos Profesionales
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    Equipos preparados para trabajos exigentes.
                  </p>
                </div>
              </div>

              {/* Repuestos */}
              <div className="flex gap-4 group">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl group-hover:bg-orange-200 transition">
                  ⚙️
                </div>

                <div>
                  <h3 className="font-black text-gray-900 text-base lg:text-lg">
                    Repuestos
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    Alternativas para mantener tus equipos operativos.
                  </p>
                </div>
              </div>

              {/* Soporte técnico */}
              <div className="flex gap-4 group">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl group-hover:bg-orange-200 transition">
                  🛠️
                </div>

                <div>
                  <h3 className="font-black text-gray-900 text-base lg:text-lg">
                    Soporte Técnico
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    Orientación y asistencia para tus equipos.
                  </p>
                </div>
              </div>

              {/* Cobertura nacional */}
              <div className="flex gap-4 group">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl group-hover:bg-orange-200 transition">
                  🚚
                </div>

                <div>
                  <h3 className="font-black text-gray-900 text-base lg:text-lg">
                    Cobertura Nacional
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    Atención para clientes en diferentes partes del Perú.
                  </p>
                </div>
              </div>
            </div>

            {/* =========================
                BOTONES
            ========================== */}

            <div className="flex flex-wrap items-center gap-4 mt-9">
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center bg-[#e84d05] hover:bg-[#c94104] text-white px-7 py-4 rounded-xl font-black shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Conocer Productos
              </Link>

              <a
                href="https://wa.me/51979501557?text=Hola,%20deseo%20recibir%20asesoría%20sobre%20sus%20productos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gray-950 hover:bg-black text-white px-7 py-4 rounded-xl font-black transition-all duration-300 hover:-translate-y-1"
              >
                Hablar con un Asesor
              </a>
            </div>
          </div>
        </div>

        {/* =========================
            FRANJA INFERIOR
        ========================== */}

        <div className="mt-16 lg:mt-20 bg-gray-950 rounded-[30px] overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-3">
            {/* Asesoría */}
            <div className="p-7 lg:p-9 border-b md:border-b-0 md:border-r border-white/10">
              <span className="text-[#e84d05] font-black text-3xl">01</span>

              <h3 className="text-white text-xl font-black mt-3">Asesoría</h3>

              <p className="text-gray-400 mt-2 leading-relaxed">
                Te orientamos para encontrar el equipo adecuado para tu trabajo.
              </p>
            </div>

            {/* Confianza */}
            <div className="p-7 lg:p-9 border-b md:border-b-0 md:border-r border-white/10">
              <span className="text-[#e84d05] font-black text-3xl">02</span>

              <h3 className="text-white text-xl font-black mt-3">Confianza</h3>

              <p className="text-gray-400 mt-2 leading-relaxed">
                Buscamos construir relaciones duraderas con nuestros clientes.
              </p>
            </div>

            {/* Respaldo */}
            <div className="p-7 lg:p-9">
              <span className="text-[#e84d05] font-black text-3xl">03</span>

              <h3 className="text-white text-xl font-black mt-3">Respaldo</h3>

              <p className="text-gray-400 mt-2 leading-relaxed">
                Te acompañamos también después de elegir tu maquinaria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Nosotros;
