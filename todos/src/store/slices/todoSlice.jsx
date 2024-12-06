import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  search: "",
  currentPage: 1,
  todosPerPage: 5,
  newTodo: "",
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
    editTodo: (state, action) => {
      const { id, newName } = action.payload;

      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, name: newName } : todo
        ),
      };
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
    setNewTodo: (state, action) => {
      state.newTodo = action.payload;
    },
  },
});

export const {
  removeTodo,
  toggleTodo,
  addTodo,
  editTodo,
  setSearch,
  setCurrentPage,
  setTodosPerPage,
  setNewTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
