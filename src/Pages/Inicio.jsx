import { useEffect, useState } from "react";

import Hero from "../Components/Hero";
import Estadisticas from "../Components/Estadisticas";
import Marcas from "../Components/Marcas";
import ProductosDestacados from "../Components/ProductosDestacados";
import Servicios from "../Components/Servicios";
import Nosotros from "../Components/Nosotros";
import ContactoRapido from "../Components/ContactoRapido";
import Footer from "../Components/Footer";
import CategoriasHome from "../Components/CategoriasHome";
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
      console.error("Error cargando productos:", error);
    }
  };

  return (
    <>
      <Hero />

      <CategoriasHome />

      <Estadisticas />

      <Marcas />

      <ProductosDestacados productos={productos.slice(0, 6)} />

      <Servicios />

      <Nosotros />

      <ContactoRapido />

      <Footer />
    </>
  );
}

export default Inicio;
