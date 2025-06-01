// src/components/EditTodoModal.tsx
import React from "react";
import { type Todo } from "../types";
import axios from "axios";

interface EditTodoModalProps {
  todo: Todo;
  onClose: () => void;
  onUpdate: () => void;
  apiUrl: string;
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  todo,
  onClose,
  onUpdate,
  apiUrl,
  setTodo,
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`${apiUrl}/${todo.id}`, todo);
    onUpdate(); // refresh todos
    onClose();  // close modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="date"
            value={todo.date}
            onChange={(e) => setTodo({ ...todo, date: e.target.value })}
            className="px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            className="px-4 py-2 border rounded"
            required
          />
          <textarea
            value={todo.description}
            onChange={(e) =>
              setTodo({ ...todo, description: e.target.value })
            }
            className="px-4 py-2 border rounded"
            required
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;
