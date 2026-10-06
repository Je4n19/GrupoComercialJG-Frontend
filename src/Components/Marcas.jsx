import stihlLogo from "../assets/Marcas/stihl.png";
import hondaLogo from "../assets/Marcas/honda.png";
import husqvarnaLogo from "../assets/Marcas/Husqvarna.png";
import mebaLogo from "../assets/Marcas/meba.png";
import ptkLogo from "../assets/Marcas/PTK.png";
import truperLogo from "../assets/Marcas/truper.png";

function Marcas() {
  const marcas = [
    {
      nombre: "STIHL",
      logo: stihlLogo,
    },
    {
      nombre: "Honda",
      logo: hondaLogo,
    },
    {
      nombre: "Husqvarna",
      logo: husqvarnaLogo,
    },
    {
      nombre: "Meba",
      logo: mebaLogo,
    },
    {
      nombre: "PTK",
      logo: ptkLogo,
    },
    {
      nombre: "Truper",
      logo: truperLogo,
    },
  ];

  return (
    <section className="relative bg-gray-50 py-24 lg:py-28 overflow-hidden">
      {/* Decoración de fondo */}

      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[#e84d05]/5 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-40 -right-32 w-[450px] h-[450px] bg-orange-100/60 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* =========================
            ENCABEZADO
        ========================== */}

        <div className="grid lg:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <span className="inline-flex items-center gap-3 text-[#e84d05] font-black uppercase tracking-[0.18em] text-sm">
              <span className="w-10 h-[3px] bg-[#e84d05] rounded-full"></span>
              Nuestras Marcas
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-950 mt-6 leading-[1.05]">
              Marcas reconocidas,
              <span className="block text-[#e84d05] mt-2">
                equipos para cada trabajo.
              </span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl lg:ml-auto">
              Trabajamos con diferentes marcas de maquinaria, herramientas y
              equipos para ofrecer alternativas según las necesidades de cada
              cliente.
            </p>
          </div>
        </div>

        {/* =========================
            CONTENEDOR DE MARCAS
        ========================== */}

        <div className="bg-white rounded-[35px] shadow-xl border border-gray-100 p-6 md:p-10 lg:p-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {marcas.map((marca, index) => (
              <div
                key={index}
                className="
                  group
                  relative
                  min-h-[180px]
                  flex
                  items-center
                  justify-center
                  p-6
                  border-b
                  border-gray-100
                  last:border-b-0

                  md:border-r
                  lg:border-b-0

                  hover:bg-orange-50/70
                  transition-all
                  duration-300
                "
              >
                {/* Línea superior al hacer hover */}

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[4px] bg-[#e84d05] rounded-full group-hover:w-16 transition-all duration-300"></div>

                {/* Logo */}

                <div className="flex flex-col items-center justify-center">
                  <img
                    src={marca.logo}
                    alt={marca.nombre}
                    className="
                      max-h-20
                      max-w-[140px]
                      w-auto
                      object-contain
                      transition-all
                      duration-300
                      group-hover:scale-110
                    "
                  />

                  <span className="text-gray-400 text-sm font-bold mt-5 group-hover:text-[#e84d05] transition">
                    {marca.nombre}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================
            MENSAJE INFERIOR
        ========================== */}

        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-3 text-center">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#e84d05] font-black">
            ✓
          </div>

          <p className="text-gray-600">
            Diferentes marcas y alternativas para
            <span className="font-black text-gray-900">
              {" "}
              agricultura, trabajo forestal e industria.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Marcas;
