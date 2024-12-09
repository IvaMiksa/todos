import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem/TodoItem";
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

  // Edit/Save todo
  const handleEditSaveTodo = (id, newName, setIsEditing) => {
    if (newName.trim()) {
      dispatch(editTodo({ id, newName }));
      setIsEditing(false);
    }
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    // Search filter
    const searchResults =
      todo.name?.toLowerCase().includes(search?.toLowerCase() || "") || false;

    // Status filter
    if (selectedFilter === "Completed") return todo.completed;
    if (selectedFilter === "Uncompleted") return !todo.completed;

    return searchResults && selectedFilter; 
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredTodos.length / todosPerPage));
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const paginatedTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

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
            handleEditSaveTodo={(newName, setIsEditing) =>
              handleEditSaveTodo(todo.id, newName, setIsEditing)
            }
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
