import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  search: "",
  currentPage: 1,
  todosPerPage: 5,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTodosPerPage: (state, action) => {
      state.todosPerPage = action.payload;
    },
  },
});

export const {
  removeTodo,
  toggleTodo,
  addTodo,
  setSearch,
  setCurrentPage,
  setTodosPerPage,
} = todoSlice.actions;

export default todoSlice.reducer;
