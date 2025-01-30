import { addTodo, setNewTodo } from "../../store/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function NewTodo({
  buttonSubmit = "Add",
  placeholder = "Add your next todo",
  type = "text",
}) {
  const dispatch = useDispatch();
  const newTodo = useSelector((store) => store.todo.newTodo) || "";

  const handleChange = (e) => {
    dispatch(setNewTodo(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const todo = {
      id: Date.now(),
      name: newTodo.trim(),
      completed: false,
    };

    // Don't allow empty inputs
    if (!newTodo.trim()) {
      toast.error("Please enter a valid todo!");
      return;
    }

    dispatch(addTodo(todo));
    dispatch(setNewTodo(""));
    toast.success("Todo added successfully!");
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full flex space-x-2">
        <input
          type={type}
          placeholder={placeholder}
          value={newTodo}
          onChange={handleChange}
          className="flex-1 p-3 border rounded-sm shadow border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button type="submit" className="bg-blue-300">{buttonSubmit}</button>
      </form>
    </div>
  );
}

NewTodo.propTypes = {
  placeholder: PropTypes.string,
  buttonSubmit: PropTypes.string,
  type: PropTypes.string,
};

export default NewTodo;
