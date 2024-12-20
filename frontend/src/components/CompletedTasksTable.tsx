import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Task } from "../types/task";

interface CompletedTasksTableProps {
  tasks: Task[];
  isLoading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleCompleted: (id: number) => void;
}

const CompletedTasksTable: React.FC<CompletedTasksTableProps> = ({
  tasks,
  isLoading,
  onEdit,
  onDelete,
  onToggleCompleted,
}) => {
  const completedTasks = tasks.filter((task) => task.completed === 1);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (completedTasks.length === 0) {
    return (
      <p className="text-center bg-gray-300 text-gray-500 py-12">
        Nenhuma tarefa concluída
      </p>
    );
  }

  return (
    <div className="overflow-x-auto py-4 md:px-36">
      <h2 className="text-center mx-auto font-bold text-xl">Tarefas Concluídas</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="w-1/6 px-4 py-2">Data de Conclusão</th>
            <th className="w-1/6 px-4 py-2">Título</th>
            <th className="w-2/6 sm:py-4 py-2 hidden mt-1 md:block">Descrição</th>
            <th className="w-1/6 md:px-4 py-2">Concluída</th>
            <th className="w-1/6 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task) => (
            <tr key={task.id} className="border-b border-gray-300">
              <td className="px-1 md:px-4 py-2">
                {task.completed_at
                  ? format(new Date(task.completed_at), "dd/MM/yyyy", {
                      locale: pt,
                    })
                  : "Não disponível"}
              </td>
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2 w-96 hidden md:table">{task.description}</td>
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={task.completed === 1}
                  onChange={() => onToggleCompleted(task.id)}
                  className="cursor-pointer ml-4 md:ml-8"
                />
              </td>
              <td className="px-4 py-16 sm:py-12 md:py-6 flex space-x-2">
                <button
                  onClick={() => onEdit(task.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletedTasksTable;