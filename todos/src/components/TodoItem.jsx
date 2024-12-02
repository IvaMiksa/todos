import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";

function TodoItem({
  todo,
  handleRemoveTodo,
  handleToggleTodo,
  handleEditTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(todo.name);

  const handleSaveEdit = () => {
    if (newName.trim()) {
      handleEditTodo(newName);
      setIsEditing(false);
    }
  };
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
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        ) : (
          <span
            className={`${
              todo.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {todo.name}
          </span>
        )}
        {/*
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
        </span>*/}
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <button
            onClick={handleSaveEdit}
            className="text-green-400 hover:text-green-500"
          >
            <CheckIcon className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-400 hover:text-blue-500"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={handleRemoveTodo}
          className="text-red-400 hover:text-red-500"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
