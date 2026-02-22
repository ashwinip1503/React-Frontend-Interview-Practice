import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      const { id, newTodo } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = newTodo;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, editTodo } = TodoSlice.actions;
export default TodoSlice.reducer;
