import axios from "axios";
import { Task } from "../types/task";

const api = axios.create({
  baseURL: "https://to-do-list-stoix-challenge.onrender.com/api",
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
    await getCsrfToken(); 
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar tarefas", error);
    return [];
  }
};

export const addTask = async (title: string, description: string) => {
  try {
    await getCsrfToken();
    const response = await api.post("/tasks", { title, description });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar tarefa", error);
    throw error; 
  }
};

export const deleteTask = async (id: number) => {
  try {
    await getCsrfToken();
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.error("Erro ao excluir tarefa", error);
    throw error;
  }
};

export const updateTaskCompletion = async (id: number, completed: number) => {
  try {
    await getCsrfToken();
    const response = await api.put(`/tasks/${id}/completed`, { completed });
    return response.data;
  } catch (error) {
    console.error("Erro ao alternar o status de conclusão da tarefa", error);
    throw error;
  }
};

export const updateTask = async (updatedTask: Task) => {
  try {
    await getCsrfToken(); 
    const response = await api.put(`/tasks/${updatedTask.id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar tarefa", error);
    throw error;
  }
};

export default api;
