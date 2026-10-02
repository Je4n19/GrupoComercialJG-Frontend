export const validarFormulario = (datos) => {
  const errores = {};

  if (!datos.nombre) {
    errores.nombre = "Nombre obligatorio";
  }

  if (!datos.precio) {
    errores.precio = "Precio obligatorio";
  }

  if (!datos.stock) {
    errores.stock = "Stock obligatorio";
  }

  return errores;
};
