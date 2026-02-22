import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  addTodo,
  editTodo,
  removeTodo,
  toggleTodo,
} from "./redux/Features/todoSlice";

function App() {
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!text.trim()) return;

    if (editingId) {
      dispatch(editTodo({ id: editingId, newTodo: text }));
      setEditingId(null);
    } else {
      dispatch(addTodo(text));
    }

    setText("");
  };

  const handleEditClick = (todo) => {
    setText(todo.text);
    setEditingId(todo.id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-4">
          Redux Todo App
        </h1>

        {/* Input Section */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}
        <ul className="mt-5 space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <span
                onClick={() => dispatch(toggleTodo(todo.id))}
                className={`cursor-pointer flex-1 ${
                  todo.completed ? "line-through text-red-500" : ""
                }`}
              >
                {todo.text}
              </span>

              <div className="flex gap-2 ml-3">
                <button
                  onClick={() => handleEditClick(todo)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
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

export default App;