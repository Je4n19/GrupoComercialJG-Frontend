import { useEffect, useState } from "react";

import Hero from "../Components/Hero";
import GrillaProductos from "../Components/GrillaProductos";
import Marcas from "../Components/Marcas";
import Servicios from "../Components/Servicios";
import Nosotros from "../Components/Nosotros";
import ContactoRapido from "../Components/ContactoRapido";
import Footer from "../Components/Footer";

import { obtenerProductos } from "../Services/productoService";

function Inicio() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-4">
          Productos Destacados
        </h2>

        <p className="text-center text-gray-600 mb-10">
          Equipos seleccionados para agricultura, forestación e industria.
        </p>

        <GrillaProductos productos={productos.slice(0, 6)} />
      </section>

      <Marcas />

      <Servicios />

      <Nosotros />

      <ContactoRapido />

      <Footer />
    </>
  );
}

export default Inicio;
