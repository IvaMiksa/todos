import "./App.css";
import NewTodo from "./components/NewTodo";
// import { useSelector } from "react-redux";
import TodoList from "./components/TodoList";

function App() {
  //const todos = useSelector((store) => store.todo.todos);
  //console.log(todos);

  return (
    <>
      <NewTodo />
      <TodoList />
    </>
  );
}

export default App;
