import React from "react";
import { type Todo } from "../types";

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos available.</p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            className="border p-4 rounded shadow-sm flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{todo.date}</p>
                <h3 className="text-lg font-semibold">{todo.title}</h3>
                <p className="text-gray-700">{todo.description}</p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <button
                  onClick={() => onEdit(todo)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
