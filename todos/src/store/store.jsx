import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice";
import filterSlice from "./slices/filterSlice";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";

// Load persisted state from LS
const persistedState = {
  todo: {
    todos: loadFromLocalStorage("todos") || [],
    search: "",
    currentPage: 1,
    todosPerPage: 5,
  },
};
//console.log("persisted todos from LS:", persistedState.todo.todos);

const store = configureStore({
  reducer: {
    todo: todoSlice,
    filter: filterSlice,
  },
  preloadedState: persistedState,
});

// Save redux state to LS whenever it changes
store.subscribe(() => {
  saveToLocalStorage("todos", store.getState().todo.todos);
  //console.log("redux state:", store.getState());
});

export default store;
