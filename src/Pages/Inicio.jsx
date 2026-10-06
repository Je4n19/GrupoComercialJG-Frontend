import { useEffect, useState } from "react";

import Hero from "../Components/Hero";
import Estadisticas from "../Components/Estadisticas";
import Marcas from "../Components/Marcas";
import ProductosDestacados from "../Components/ProductosDestacados";
import Servicios from "../Components/Servicios";
import Nosotros from "../Components/Nosotros";
import ContactoRapido from "../Components/ContactoRapido";
import Footer from "../Components/Footer";
import Ventajas from "../Components/Ventajas";
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
      {/* HERO PRINCIPAL */}
      <Hero />

      {/* CATEGORÍAS PRINCIPALES */}
      <CategoriasHome />

      {/* PRODUCTOS DESTACADOS */}
      <ProductosDestacados productos={productos.slice(0, 6)} />

      {/* RESPALDO DE LA EMPRESA */}
      <Estadisticas />

      {/* MARCAS */}
      <Marcas />

      {/* POR QUÉ ELEGIRNOS */}
      <Ventajas />

      {/* SERVICIOS */}
      <Servicios />

      {/* SOBRE NOSOTROS */}
      <Nosotros />

      {/* CONTACTO */}
      <ContactoRapido />

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default Inicio;
