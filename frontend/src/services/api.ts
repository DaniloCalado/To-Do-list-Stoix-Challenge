import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const getCsrfToken = async () => {
    try {
      const response = await api.get("/csrf-token");
      const { csrfToken } = response.data;
      api.defaults.headers.common["X-CSRF-Token"] = csrfToken;
    } catch (error) {
      console.error("Erro ao obter CSRF Token", error);
    }
  };

  export const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar tarefas", error);
      return [];
    }
  };
  

export default api;
