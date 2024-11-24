import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: 1, name: "cleaning", completed: false },
    { id: 2, name: "washing", completed: false },
    { id: 3, name: "walking", completed: false },
  ],
  search: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { removeTodo, toggleTodo, addTodo, setSearch } = todoSlice.actions;

export default todoSlice.reducer;
