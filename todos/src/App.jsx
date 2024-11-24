import "./App.css";
import Filter from "./components/Filter";
import NewTodo from "./components/NewTodo";
import SearchBar from "./components/SearchBar";
// import { useSelector } from "react-redux";
import TodoList from "./components/TodoList";

function App() {
  //const todos = useSelector((store) => store.todo.todos);
  //console.log(todos);

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
