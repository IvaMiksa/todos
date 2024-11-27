import "./index.css";
import Filter from "./components/Filter";
import NewTodo from "./components/NewTodo";
import SearchBar from "./components/SearchBar";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 min-h-screen flex flex-col justify-center items-center w-full p-6">
      <div className="w-full max-w-xl space-y-4">
        <SearchBar />
        <NewTodo />
        <Filter />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
