import React, { useState } from "react";

interface AddTodoProps {
  onAdd: (todo: {
    date: string;
    title: string;
    description: string;
  }) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.title || !formData.description) return;
    onAdd(formData);
    setFormData({ date: "", title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="px-4 py-2 border rounded"
        required
      />
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter todo title"
        className="px-4 py-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Enter description"
        className="px-4 py-2 border rounded"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
