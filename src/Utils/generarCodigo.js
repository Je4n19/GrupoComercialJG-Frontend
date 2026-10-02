export const generarCodigo = (prefijo = "PROD") => {
  const numero = Math.floor(1000 + Math.random() * 9000);

  return `${prefijo}-${numero}`;
};
