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

  // Sort todos by priority
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const sortedTodos = filteredTodos.slice().sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <ul>
      {sortedTodos.map((todo) => (
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
