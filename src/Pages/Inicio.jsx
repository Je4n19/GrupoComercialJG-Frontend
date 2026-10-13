import { useEffect, useState } from "react";

// ========================================
// COMPONENTES DE LA PÁGINA
// ========================================

import Hero from "../Components/Hero";
import Estadisticas from "../Components/Estadisticas";
import Marcas from "../Components/Marcas";
import ProductosDestacados from "../Components/ProductosDestacados";
import Ventajas from "../Components/Ventajas";
import Servicios from "../Components/Servicios";
import Nosotros from "../Components/Nosotros";
import ContactoRapido from "../Components/ContactoRapido";
import Footer from "../Components/Footer";

// ========================================
// SERVICIOS
// ========================================

import { obtenerProductos } from "../Services/productoService";

// ========================================
// PÁGINA PRINCIPAL
// ========================================

function Inicio() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // CARGAR PRODUCTOS DESDE EL BACKEND
  // ========================================

  useEffect(() => {
    let activo = true;

    const cargarProductos = async () => {
      setCargando(true);
      setError("");

      try {
        const data = await obtenerProductos();

        if (!activo) return;

        setProductos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error cargando productos:", err);

        if (activo) {
          setError("No se pudieron cargar los productos.");
          setProductos([]);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarProductos();

    return () => {
      activo = false;
    };
  }, []);

  // Mostrar máximo 6 productos destacados
  const productosDestacados = productos.slice(0, 6);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ======================================== */}
      {/* 1. HERO PRINCIPAL */}
      {/* ======================================== */}

      <Hero />

      {/* ======================================== */}
      {/* 2. ESTADÍSTICAS */}
      {/* ======================================== */}

      <Estadisticas />

      {/* ======================================== */}
      {/* 3. MARCAS */}
      {/* ======================================== */}

      <Marcas />

      {/* ======================================== */}
      {/* 4. PRODUCTOS DESTACADOS */}
      {/* ======================================== */}

      <section className="bg-white">
        {cargando ? (
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-[#DCEFE4] border-t-[#009E49] rounded-full animate-spin" />

              <p className="text-gray-500 font-semibold text-sm">
                Cargando productos destacados...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-2xl font-black text-[#1A1A1A]">
              Nuestros productos
            </h2>

            <p className="text-gray-500 mt-3">
              Por el momento no podemos mostrar los productos.
            </p>

            <a
              href="/catalogo"
              className="inline-flex items-center justify-center mt-6 bg-[#009E49] hover:bg-[#00843D] text-white px-7 py-3 rounded-xl font-black transition-colors"
            >
              Visitar catálogo
            </a>
          </div>
        ) : (
          <ProductosDestacados productos={productosDestacados} />
        )}
      </section>

      {/* ======================================== */}
      {/* 5. VENTAJAS */}
      {/* ======================================== */}

      <Ventajas />

      {/* ======================================== */}
      {/* 6. SERVICIOS */}
      {/* ======================================== */}

      <Servicios />

      {/* ======================================== */}
      {/* 7. NOSOTROS */}
      {/* ======================================== */}

      <Nosotros />

      {/* ======================================== */}
      {/* 8. CONTACTO RÁPIDO */}
      {/* ======================================== */}

      <ContactoRapido />

      {/* ======================================== */}
      {/* 9. FOOTER */}
      {/* ======================================== */}

      <Footer />
    </main>
  );
}

export default Inicio;
