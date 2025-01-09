import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

function TodoItem({
  todo,
  handleRemoveTodo,
  handleToggleTodo,
  handleEditSaveTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(todo.name);

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
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <button
            onClick={() => handleEditSaveTodo(newName, setIsEditing)}
            className="text-green-400 hover:text-green-500"
            id="edit-save-icon"
          >
            <CheckIcon className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-400 hover:text-blue-500"
            id="edit-icon"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={handleRemoveTodo}
          className="text-red-400 hover:text-red-500"
          id="delete-icon"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleToggleTodo: PropTypes.func.isRequired,
  handleEditSaveTodo: PropTypes.func.isRequired,
};

export default TodoItem;
