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
    <section className="bg-gradient-to-b from-white to-orange-50 py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* TITULO */}

        <div className="text-center mb-16">
          <span className="bg-orange-100 text-orange-600 px-5 py-2 rounded-full font-bold text-sm uppercase tracking-wider">
            Marcas Líderes
          </span>

          <h2 className="text-5xl font-black text-gray-900 mt-6">
            Distribuidores de Marcas Reconocidas
          </h2>

          <p className="text-gray-600 text-lg mt-5 max-w-3xl mx-auto">
            Comercializamos equipos y repuestos originales respaldados por
            fabricantes líderes en maquinaria agrícola, forestal e industrial.
          </p>
        </div>

        {/* LOGOS */}

        <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 p-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {marcas.map((marca, index) => (
              <div
                key={index}
                className="
                  bg-white
                  rounded-3xl
                  border
                  border-gray-100
                  p-6
                  flex
                  flex-col
                  items-center
                  justify-center
                  hover:shadow-xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >
                <img
                  src={marca.logo}
                  alt={marca.nombre}
                  className="h-16 object-contain mb-4"
                />

                <span className="font-bold text-gray-700">{marca.nombre}</span>
              </div>
            ))}
          </div>
        </div>

        {/* INDICADORES */}

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          <div className="bg-orange-500 text-white rounded-3xl p-8 text-center shadow-xl">
            <h3 className="text-5xl font-black">6+</h3>

            <p className="mt-3 text-orange-100">Marcas Internacionales</p>
          </div>

          <div className="bg-white rounded-3xl p-8 text-center shadow-xl border">
            <h3 className="text-5xl font-black text-orange-500">100%</h3>

            <p className="mt-3 text-gray-600">Productos Originales</p>
          </div>

          <div className="bg-white rounded-3xl p-8 text-center shadow-xl border">
            <h3 className="text-5xl font-black text-orange-500">Perú</h3>

            <p className="mt-3 text-gray-600">Cobertura Nacional</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Marcas;
