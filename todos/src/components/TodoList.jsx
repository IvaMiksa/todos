import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { removeTodo, toggleTodo } from "../store/slices/todoSlice";

function TodoList() {
  const todos = useSelector((store) => store.todo.todos);
  const dispatch = useDispatch();
  const selectedStatus = useSelector((state) => state.filter.selectedStatus);
  const search = useSelector((store) => store.todo.search);
  const selectedPriority = useSelector(
    (state) => state.filter.selectedPriority
  );

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
    // Search filter
    const searchResults =
      todo.name?.toLowerCase().includes(search?.toLowerCase() || "") || false; 

    // Status filter
    if (selectedStatus === "Completed") return todo.completed;
    if (selectedStatus === "Uncompleted") return !todo.completed;

    // Priority filter
    if (selectedPriority === "High") return todo.priority === "High";
    if (selectedPriority === "Medium") return todo.priority === "Medium";
    if (selectedPriority === "Low") return todo.priority === "Low";

    return searchResults && selectedStatus && selectedPriority;
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
