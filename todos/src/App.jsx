import "./App.css";
import Filter from "./components/Filter";
import NewTodo from "./components/NewTodo";
import SearchBar from "./components/SearchBar";
import TodoList from "./components/TodoList";

function App() {
  
  return (
    <>
      <SearchBar />
      <NewTodo />
      <Filter />
      <TodoList />
    </>
  );
}

export default App;
