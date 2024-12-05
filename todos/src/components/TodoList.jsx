import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import {
  editTodo,
  removeTodo,
  setCurrentPage,
  toggleTodo,
} from "../store/slices/todoSlice";

function TodoList() {
  const todos = useSelector((store) => store.todo.todos);
  const dispatch = useDispatch();
  const selectedFilter = useSelector((store) => store.filter.filter);
  const search = useSelector((store) => store.todo.search) || "";

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

  // Edit todo
  const handleEditTodo = (id, newName) => {
    dispatch(editTodo({ id, newName }));
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    // Search filter
    const searchResults =
      todo.name?.toLowerCase().includes(search?.toLowerCase() || "") || false;

    // Status filter
    if (selectedFilter === "Completed") return todo.completed;
    if (selectedFilter === "Uncompleted") return !todo.completed;

    /* 
    // Priority filter
    if (selectedPriority === "High") return todo.priority === "High";
    if (selectedPriority === "Medium") return todo.priority === "Medium";
    if (selectedPriority === "Low") return todo.priority === "Low";
    */

    return searchResults && selectedFilter; //&& selectedPriority;
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
    <div className="w-full bg-white p-4 rounded shadow space-y-4">
      <ul className="space-y-2">
        {paginatedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleRemoveTodo={() => handleRemoveTodo(todo.id)}
            handleToggleTodo={() => handleToggleTodo(todo.id)}
            handleEditTodo={(newName) => handleEditTodo(todo.id, newName)}
          />
        ))}
      </ul>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          {currentPage} / {totalPages || 1}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TodoList;
