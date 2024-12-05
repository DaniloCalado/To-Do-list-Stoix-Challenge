import React, { useState } from "react";
import api, { getCsrfToken } from "../services/api";

const TaskInput: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async () => {
    if (!title.trim()) {
      alert("O título da tarefa é obrigatório!");
      return;
    }

    try {
      // Obtém o CSRF Token antes de enviar
      await getCsrfToken();

      // Envia a nova tarefa para o backend
      await api.post("/tasks", { title, description });

      alert("Tarefa adicionada com sucesso!");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      alert("Ocorreu um erro ao adicionar a tarefa. Tente novamente.");
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Adicionar Nova Tarefa</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Descrição da tarefa (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTask}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Adicionar Tarefa
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
