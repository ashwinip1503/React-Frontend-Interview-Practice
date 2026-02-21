import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, seteditingId] = useState(null);

  const handleAdd = () => {
    if (!input.trim()) return;

    if (editingId !== null) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, text: input } : todo
        )
      );
      seteditingId(null);
    } else {
      const newTodo = { id: Date.now(), text: input, completed: false };
      setTodos((prev) => [...prev, newTodo]);
    }

    setInput("");
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const editTodo = (id) => {
    const todoEdit = todos.find((todo) => todo.id === id);
    if (!todoEdit) return;
    setInput(todoEdit.text);
    seteditingId(id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-20">
      <div className="bg-white shadow-lg rounded-xl p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-6 underline">
          ToDo List
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter the text"
            className="border border-gray-400 px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-md font-semibold"
            onClick={handleAdd}
          >
            {editingId !== null ? "Save" : "Add"}
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md shadow-sm"
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`cursor-pointer ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {todo.text}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => editTodo(todo.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-sm transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}