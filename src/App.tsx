import React, { useEffect, useState } from "react";
import axios from "axios";
import { type Todo } from "./types";

import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import EditTodoModal from "./components/EditTodoModal";


const API_URL = "http://localhost:3000/todos";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({
    date: "",
    title: "",
    description: "",
    completed: false,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditTodo, setCurrentEditTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (todo: {
    date: string;
    title: string;
    description: string;
  }) => {
    const newTodoData = {
      ...todo,
      completed: false,
    };

    try {
      await axios.post(API_URL, newTodoData);
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = (todo: Todo) => {
    setCurrentEditTodo(todo);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Todo App using React, TypeScript & Tailwind CSS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Todo</h2>
          {/* Add Todo Form */}
          <AddTodo onAdd={handleAddTodo} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Todo List</h2>
          {/* Todo List */}
          <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentEditTodo && (
        <EditTodoModal
          todo={currentEditTodo}
          setTodo={setCurrentEditTodo}
          onClose={() => {
            setIsEditModalOpen(false);
            setCurrentEditTodo(null);
          }}
          onUpdate={fetchTodos}
          apiUrl={API_URL}
        />
      )}
    </div>
  );
}

export default App;
