import stihlLogo from "../assets/Marcas/stihl.png";
import hondaLogo from "../assets/Marcas/honda.png";
import husqvarnaLogo from "../assets/Marcas/Husqvarna.png";
import mebaLogo from "../assets/Marcas/meba.png";
import ptkLogo from "../assets/Marcas/PTK.png";
import truperLogo from "../assets/Marcas/truper.png";

function Marcas() {
  const marcas = [
    stihlLogo,
    hondaLogo,
    husqvarnaLogo,
    mebaLogo,
    ptkLogo,
    truperLogo,
  ];

  return (
    <section className="bg-white py-24 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-bold uppercase tracking-widest">
            Marcas Aliadas
          </span>

          <h2 className="text-5xl font-black text-gray-900 mt-4">
            Trabajamos con las mejores marcas
          </h2>

          <p className="text-gray-600 mt-5 text-lg max-w-3xl mx-auto">
            Comercializamos equipos y repuestos de fabricantes reconocidos a
            nivel nacional e internacional.
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl shadow-lg p-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 items-center">
            {marcas.map((logo, index) => (
              <div
                key={index}
                className="flex justify-center items-center group"
              >
                <img
                  src={logo}
                  alt="Marca"
                  className="h-20 object-contain grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-orange-500 text-white rounded-2xl p-8 text-center shadow-xl">
            <h3 className="text-4xl font-black">6+</h3>
            <p className="mt-2">Marcas Reconocidas</p>
          </div>

          <div className="bg-white border-2 border-orange-500 rounded-2xl p-8 text-center shadow-lg">
            <h3 className="text-4xl font-black text-orange-500">100%</h3>
            <p className="mt-2 text-gray-700">Productos Originales</p>
          </div>

          <div className="bg-white border-2 border-orange-500 rounded-2xl p-8 text-center shadow-lg">
            <h3 className="text-4xl font-black text-orange-500">24/7</h3>
            <p className="mt-2 text-gray-700">Atención Comercial</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Marcas;
