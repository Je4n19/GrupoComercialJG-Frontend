export const filtrarProductos = (productos, texto) => {
  return productos.filter(
    (producto) =>
      producto.model.toLowerCase().includes(texto.toLowerCase()) ||
      producto.brand.toLowerCase().includes(texto.toLowerCase()),
  );
};
