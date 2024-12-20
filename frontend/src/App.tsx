import React, { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskTable from "./components/TasksTable";
import TaskEditModal from "./components/modals/TaskEditModal";
import ConfirmationModal from "./components/modals/ConfirmationModal";
import CompletedTasksTable from "./components/CompletedTasksTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Task } from "./types/task";
import {
  deleteTask,
  fetchTasks,
  updateTask,
  updateTaskCompletion,
} from "./services/api";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        toast.error("Erro ao carregar as tarefas.");
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    const updatedTasks = await fetchTasks();
    setTasks(updatedTasks);
  };

  const handleToggleCompleted = async (id: number) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;
  
      const newStatus = task.completed === 1 ? 0 : 1;
      await updateTaskCompletion(id, newStatus);
  
      setTimeout(() => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, completed: newStatus, completed_at: newStatus ? new Date().toISOString() : null } : t
          )
        );
      }, 1000); 
  
      toast.success("Status da tarefa atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar o status da tarefa.");
    }
  };

  const handleDeleteTaskClick = (id: number) => {
    setTaskToDelete(id);
    setIsConfirmationOpen(true);
  };

  const confirmDeleteTask = async () => {
    if (taskToDelete !== null) {
      try {
        await deleteTask(taskToDelete);
        setTasks((prev) => prev.filter((task) => task.id !== taskToDelete));
        toast.success("Tarefa excluída com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir tarefa.");
      } finally {
        setIsConfirmationOpen(false);
      }
    }
  };

  const handleEditClick = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setSelectedTask(taskToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleEditSubmit = async (updatedTask: Task) => {
    try {
      await updateTask(updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      toast.success("Tarefa editada com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar a tarefa.");
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const pendingTasks = tasks.filter((task) => task.completed === 0);
  const completedTasks = tasks.filter((task) => task.completed === 1);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Minha Lista de Tarefas
      </h1>
      <TaskInput onAddTask={handleAddTask} />
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="space-y-6 mt-6">
        <TaskTable
          tasks={pendingTasks}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDeleteTaskClick}
          onToggleCompleted={handleToggleCompleted}
        />
        <CompletedTasksTable
          tasks={completedTasks}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDeleteTaskClick}
          onToggleCompleted={handleToggleCompleted}
        />
      </div>

      {isEditModalOpen && selectedTask && (
        <TaskEditModal
          task={selectedTask}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleEditSubmit}
        />
      )}

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onConfirm={confirmDeleteTask}
        onCancel={() => setIsConfirmationOpen(false)}
        taskTitle={tasks.find((t) => t.id === taskToDelete)?.title || ""}
      />
    </div>
  );
};

export default App;