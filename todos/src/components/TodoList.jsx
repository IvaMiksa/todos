import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import {
  removeTodo,
  setCurrentPage,
  toggleTodo,
} from "../store/slices/todoSlice";

function TodoList() {
  const todos = useSelector((store) => store.todo.todos);
  const dispatch = useDispatch();
  const selectedStatus = useSelector((store) => store.filter.selectedStatus);
  const search = useSelector((store) => store.todo.search) || "";
  const selectedPriority = useSelector(
    (store) => store.filter.selectedPriority
  );
  const currentPage = useSelector((store) => store.todo.currentPage) || 1;
  const todosPerPage = useSelector((store) => store.todo.todosPerPage) || 5;
  //const state = useSelector((state) => state);
  //console.log("Redux State:", state);

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

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedTodos.length / todosPerPage));
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const paginatedTodos = sortedTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  //console.log("sorted todos:", sortedTodos);
  //console.log("paginated todos:", paginatedTodos);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
    <div>
      <ul>
        {paginatedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleRemoveTodo={() => handleRemoveTodo(todo.id)}
            handleToggleTodo={() => handleToggleTodo(todo.id)}
          />
        ))}
      </ul>

      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          {currentPage} / {totalPages || 1}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TodoList;
