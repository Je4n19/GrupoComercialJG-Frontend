import axios from "axios";

const API_URL = "https://grupocomercialjg-backend.onrender.com/api/repuestos";

export const obtenerRepuestos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const guardarRepuesto = async (repuesto) => {
  const response = await axios.post(API_URL, repuesto);
  return response.data;
};

export const obtenerRepuestoPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const actualizarRepuesto = async (id, repuesto) => {
  const response = await axios.put(`${API_URL}/${id}`, repuesto);
  return response.data;
};

export const eliminarRepuesto = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
