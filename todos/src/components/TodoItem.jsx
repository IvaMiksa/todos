function TodoItem({ todo, handleRemoveTodo, handleToggleTodo }) {
  return (
    <li
      className={`flex justify-between items-center w-full p-4 mb-2 rounded shadow ${
        todo.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleTodo}
          className="mr-2 cursor-pointer"
        />
        <span
          className={`${
            todo.completed ? "line-through text-gray-500" : "text-gray-900"
          }`}
        >
          {todo.name}
        </span>
        <span
          className={`px-2 py-1 text-sm rounded ${
            todo.priority === "High"
              ? "bg-red-500 text-white"
              : todo.priority === "Medium"
              ? "bg-yellow-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {todo.priority}
        </span>
      </div>
      <button
        onClick={handleRemoveTodo}
        className="text-red-500 hover:text-red-700"
      >
        X
      </button>
    </li>
  );
}

export default TodoItem;
