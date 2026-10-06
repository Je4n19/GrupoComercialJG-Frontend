import nosotrosImg from "../assets/Nosotros/nosotros.jpg";

function Nosotros() {
  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-40 top-20 w-[500px] h-[500px] bg-orange-100/60 rounded-full blur-3xl"></div>
      <div className="absolute -left-40 bottom-0 w-[400px] h-[400px] bg-[#e84d05]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* =========================
              IMAGEN
          ========================== */}

          <div className="relative">
            {/* Marco naranja detrás */}
            <div className="absolute -left-5 -top-5 w-full h-full bg-[#e84d05] rounded-[35px]"></div>

            {/* Imagen */}
            <div className="relative rounded-[35px] overflow-hidden shadow-2xl">
              <img
                src={nosotrosImg}
                alt="Grupo Comercial J&G"
                className="w-full h-[520px] lg:h-[650px] object-cover"
              />

              {/* Degradado */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent"></div>

              {/* Texto inferior de imagen */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">
                <span className="text-orange-300 font-bold text-sm uppercase tracking-[0.2em]">
                  Grupo Comercial J&G
                </span>

                <h3 className="text-3xl md:text-4xl font-black mt-2">
                  Soluciones para cada trabajo
                </h3>

                <p className="text-gray-200 mt-3 max-w-md">
                  Maquinaria, repuestos y atención especializada para nuestros
                  clientes.
                </p>
              </div>
            </div>

            {/* Tarjeta flotante */}
            <div className="absolute -right-4 md:-right-8 top-10 bg-white rounded-2xl shadow-2xl p-5 md:p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                  ✓
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                    Nuestro compromiso
                  </p>

                  <p className="font-black text-gray-900 mt-1">
                    Calidad y confianza
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              CONTENIDO
          ========================== */}

          <div>
            {/* Etiqueta */}
            <span className="inline-flex items-center gap-2 text-[#e84d05] font-black uppercase tracking-[0.18em] text-sm">
              <span className="w-10 h-[3px] bg-[#e84d05] rounded-full"></span>
              Quiénes Somos
            </span>

            {/* Título */}
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-black text-gray-950 mt-6 leading-[1.05]">
              Más que vender
              <span className="block text-[#e84d05] mt-2">maquinaria.</span>
            </h2>

            <h3 className="text-2xl md:text-3xl font-black text-gray-800 mt-3">
              Queremos ser parte de tu trabajo.
            </h3>

            {/* Descripción */}
            <p className="text-lg text-gray-600 mt-7 leading-relaxed">
              En Grupo Comercial J&G nos especializamos en maquinaria, equipos y
              repuestos para los sectores agrícola, forestal e industrial.
            </p>

            <p className="text-lg text-gray-600 mt-4 leading-relaxed">
              Buscamos que cada cliente encuentre el equipo adecuado para su
              trabajo, acompañado de productos de calidad y una atención cercana
              y especializada.
            </p>

            {/* Línea */}
            <div className="w-full h-px bg-gray-200 my-9"></div>

            {/* BENEFICIOS */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
              {/* 1 */}
              <div className="flex gap-4 group">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl group-hover:bg-[#e84d05] transition">
                  🚜
                </div>

                <div>
                  <h3 className="font-black text-gray-900 text-lg">
                    Equipos Profesionales
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    Equipos preparados para trabajos exigentes.
                  </p>
                </div>
              </div>

              {/* 2 */}
              <div className="flex gap-4 group">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl group-hover:bg-[#e84d05] transition">
                  ⚙️
                </div>

                <div>
                  <h3 className="font-black text-gray-900 text-lg">
                    Repuestos
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    Alternativas para mantener tus equipos operativos.
                  </p>
                </div>
              </div>

              {/* 3 */}
              <div className="flex gap-4 group">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl group-hover:bg-[#e84d05] transition">
                  🛠️
                </div>

                <div>
                  <h3 className="font-black text-gray-900 text-lg">
                    Soporte Técnico
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    Orientación y asistencia para tus equipos.
                  </p>
                </div>
              </div>

              {/* 4 */}
              <div className="flex gap-4 group">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl group-hover:bg-[#e84d05] transition">
                  🚚
                </div>

                <div>
                  <h3 className="font-black text-gray-900 text-lg">
                    Cobertura Nacional
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    Atención para clientes en diferentes partes del Perú.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <a
                href="/catalogo"
                className="bg-[#e84d05] hover:bg-[#c94104] text-white px-7 py-4 rounded-xl font-black shadow-lg transition hover:-translate-y-1"
              >
                Conocer Productos
              </a>

              <a
                href="https://wa.me/51979501557?text=Hola,%20deseo%20recibir%20asesoría%20sobre%20sus%20productos"
                target="_blank"
                rel="noreferrer"
                className="bg-gray-950 hover:bg-black text-white px-7 py-4 rounded-xl font-black transition hover:-translate-y-1"
              >
                Hablar con un Asesor
              </a>
            </div>
          </div>
        </div>

        {/* =========================
            FRANJA INFERIOR
        ========================== */}

        <div className="mt-24 bg-gray-950 rounded-[35px] overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-3">
            <div className="p-8 lg:p-10 border-b md:border-b-0 md:border-r border-white/10">
              <span className="text-[#e84d05] font-black text-3xl">01</span>

              <h3 className="text-white text-xl font-black mt-3">Asesoría</h3>

              <p className="text-gray-400 mt-2 leading-relaxed">
                Te orientamos para encontrar el equipo adecuado para tu trabajo.
              </p>
            </div>

            <div className="p-8 lg:p-10 border-b md:border-b-0 md:border-r border-white/10">
              <span className="text-[#e84d05] font-black text-3xl">02</span>

              <h3 className="text-white text-xl font-black mt-3">Confianza</h3>

              <p className="text-gray-400 mt-2 leading-relaxed">
                Buscamos construir relaciones duraderas con nuestros clientes.
              </p>
            </div>

            <div className="p-8 lg:p-10">
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
