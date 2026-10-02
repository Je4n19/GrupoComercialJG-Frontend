const API_URL = "http://localhost:8080/api/auth";

export const login = async (correo, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo,
      password,
    }),
  });

  return await response.json();
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const guardarToken = (token) => {
  localStorage.setItem("token", token);
};

export const obtenerToken = () => {
  return localStorage.getItem("token");
};
