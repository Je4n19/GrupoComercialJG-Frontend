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
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Marcas que Comercializamos
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Trabajamos con marcas líderes en maquinaria agrícola, forestal e
            industrial.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {marcas.map((marca, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-2xl
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                p-6
                flex
                flex-col
                items-center
                justify-center
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
    </section>
  );
}

export default Marcas;
