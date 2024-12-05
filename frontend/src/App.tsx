import React, { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskTable from "./components/TasksTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Task } from "./types/task";
import { fetchTasks } from "./services/api";


const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };

    getTasks();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Minha Lista de Tarefas</h1>
      <TaskInput />
      <ToastContainer position="top-center" autoClose={3000} />
      <TaskTable tasks={tasks} onEdit={function (id: number): void {
        throw new Error("Function not implemented.");
      } } onDelete={function (id: number): void {
        throw new Error("Function not implemented.");
      } } onToggleCompleted={function (id: number): void {
        throw new Error("Function not implemented.");
      } }  />
    </div>
  );
};

export default App;
