import axios from "axios";

const API_URL =
  "https://grupocomercialjg-backend.onrender.com/api/configuracion";

export const obtenerConfiguracion = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const guardarConfiguracion = async (configuracion) => {
  const response = await axios.post(API_URL, configuracion);
  return response.data;
};
