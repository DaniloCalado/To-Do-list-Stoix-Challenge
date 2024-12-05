import React, { useState, useEffect } from "react";
import { Task } from "../../types/task";
import { FaTimes } from "react-icons/fa";

interface TaskEditModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (updatedTask: Task) => void;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({ task, isOpen, onClose, onEdit }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = () => {
    if (task && (title !== task.title || description !== task.description)) {
      onEdit({ ...task, title, description });
      onClose();
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Editar Tarefa</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Título
          </label>
          <input
            type="text"
            id="title"
            className="w-full border border-gray-300 rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Descrição
          </label>
          <textarea
            id="description"
            className="w-full border border-gray-300 rounded p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={title === task.title && description === task.description}
        >
          Confirmar Edição
        </button>
      </div>
    </div>
  );
};

export default TaskEditModal;
