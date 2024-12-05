import React, { useState } from "react";
import api, { getCsrfToken, fetchTasks, addTask} from "../services/api";
import { toast } from "react-toastify";
import { Task } from "../types/task";

interface TaskInputProps {
  onAddTask: (task: Task[]) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async () => {
    if (!title.trim()) {
      toast.error("O título da tarefa é obrigatório!");
      return;
    }
    try {
      const response = await addTask(title, description);
      toast.success(response.message || "Tarefa criada com sucesso!");
      setTitle("");
      setDescription("");
      const updatedTasks = await fetchTasks();
      onAddTask(updatedTasks);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      toast.error("Erro ao criar a tarefa. Tente novamente mais tarde.");
    }
  };
  
  return (
    <div className="bg-white p-4 shadow rounded-lg max-w-lg mx-auto">
      <h2 className="text-m font-bold mb-4 text-center">Adicionar Nova Tarefa</h2>
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
