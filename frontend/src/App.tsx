import React, { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskTable from "./components/TasksTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Task } from "./types/task";
import { fetchTasks } from "./services/api";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Minha Lista de Tarefas</h1>
      <TaskInput onAddTask={handleTaskUpdate} />
      <ToastContainer position="top-center" autoClose={3000} />
      <TaskTable
        tasks={tasks}
        isLoading={isLoading}
        onEdit={(id) => console.log("Edit", id)}
        onDelete={(id) => console.log("Delete", id)}
        onToggleCompleted={(id) => console.log("Toggle", id)}
      />
    </div>
  );
};

export default App;
