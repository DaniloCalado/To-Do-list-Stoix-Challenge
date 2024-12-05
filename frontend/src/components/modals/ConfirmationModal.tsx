import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface ModalConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  taskTitle?: string;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  taskTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-l font-bold text-center mb-4">Tem certeza que quer apagar esta Tarefa?</h2>
        {taskTitle && (
          <p className="text-center text-gray-800 font-medium mb-4">
            {`"${taskTitle}"`}
          </p>
        )}
        <p className="text-sm text-yellow-600 bg-yellow-100 rounded-md p-2 flex items-center justify-center">
        <FaExclamationTriangle className="text-yellow-500 mr-2" />
          Esta ação não pode ser revertida.
        </p>
        <div className="flex justify-around mt-6">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Confirmar
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;