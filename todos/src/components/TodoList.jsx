import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { removeTodo, toggleTodo } from "../store/slices/todoSlice";

function TodoList() {
  const todos = useSelector((store) => store.todo.todos);
  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.filter.selectedFilter);
  const search = useSelector((store) => store.todo.search);

  // Remove a todo
  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  // Toggle a todo
  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    const searchResults = todo.name
      .toLowerCase()
      .includes(search.toLowerCase());

    if (selectedFilter === "Completed") return searchResults && todo.completed;
    if (selectedFilter === "Uncompleted")
      return searchResults && !todo.completed;

    return searchResults;
  });

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleRemoveTodo={() => handleRemoveTodo(todo.id)}
          handleToggleTodo={() => handleToggleTodo(todo.id)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
