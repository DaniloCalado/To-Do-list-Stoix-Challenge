import React, { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskTable from "./components/TasksTable";
import TaskEditModal from "./components/modals/TaskEditModal"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Task } from "./types/task";
import { deleteTask, fetchTasks, updateTask, updateTaskCompletion } from "./services/api";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      setIsLoading(true);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      setIsLoading(false);
    };
    getTasks();
  }, []);

  const handleTaskUpdate = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      toast.success("Tarefa excluída com sucesso!");
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
    } catch (error) {
      toast.error("Erro ao excluir tarefa.");
    }
  };

  const handleToggleCompleted = async (id: number) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
      const newStatus = task.completed === 1 ? 0 : 1;
      await updateTaskCompletion(id, newStatus);
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
      toast.success("Status da tarefa atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar status da tarefa.");
    }
  };

  const handleEditClick = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setSelectedTask(taskToEdit);
      setIsModalOpen(true);
    }
  };

  const handleEditSubmit = async (updatedTask: Task) => {
    try {
      await updateTask(updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(updatedTasks);
      toast.success("Tarefa editada com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar tarefa.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Minha Lista de Tarefas</h1>
      <TaskInput onAddTask={handleTaskUpdate} />
      <ToastContainer position="top-center" autoClose={3000} />
      <TaskTable
        tasks={tasks}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onDelete={handleDeleteTask}
        onToggleCompleted={handleToggleCompleted}
      />
      {isModalOpen && selectedTask && (
        <TaskEditModal
          task={selectedTask}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onEdit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default App;
