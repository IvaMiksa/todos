import "./App.css";
// import { useSelector } from "react-redux";
import TodoList from "./components/TodoList";

function App() {
  //const todos = useSelector((store) => store.todo.todos);
  //console.log(todos);

  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
