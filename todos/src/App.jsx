import "./index.css";
import NewTodo from "./components/NewTodo/NewTodo";
import TodoList from "./components/TodoList";
import TodoSearch from "./components/TodoSearch/TodoSearch";
import TodoFilter from "./components/TodoFilter/TodoFilter";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full p-6 bg-custom-image bg-cover bg-center bg-no-repeat">
      <div className="w-full max-w-xl bg-white bg-opacity-80 rounded-lg p-6 space-y-4 shadow-lg">
        <TodoSearch />
        <NewTodo />
        <TodoFilter />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
