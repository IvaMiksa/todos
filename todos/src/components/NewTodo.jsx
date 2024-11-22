import { useState } from "react";
import { addTodo } from "../store/slices/todoSlice";
import { useDispatch, useSelector } from "react-redux";

function NewTodo() {
  const todos = useSelector((store) => store.todo.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const todo = {
      id: Date.now(),
      name: newTodo,
      completed: false,
    };

    // Don't allow empty inputs
    if (newTodo === "") {
      alert("Please enter a new todo");
      return;
    }

    dispatch(addTodo(todo));
    setNewTodo("");
    //console.log(todo);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your next todo"
          value={newTodo}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default NewTodo;
