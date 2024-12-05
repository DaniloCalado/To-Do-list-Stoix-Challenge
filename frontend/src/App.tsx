import React from "react";
import TaskInput from "./components/TaskInput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Minha Lista de Tarefas</h1>
      <TaskInput />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
