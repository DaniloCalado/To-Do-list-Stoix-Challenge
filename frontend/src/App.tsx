import React from "react";
import TaskInput from "./components/TaskInput";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Minha Lista de Tarefas</h1>
      <TaskInput />
    </div>
  );
};

export default App;
