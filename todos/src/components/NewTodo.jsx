import { useState } from "react";
import { addTodo } from "../store/slices/todoSlice";
import { useDispatch } from "react-redux";

function NewTodo() {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  //const [priority, setPriority] = useState("Medium");

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const todo = {
      id: Date.now(),
      name: newTodo,
      completed: false,
      //priority: priority,
    };

    // Don't allow empty inputs
    if (newTodo === "") {
      alert("Please enter a new todo");
      return;
    }

    dispatch(addTodo(todo));
    setNewTodo("");
    //setPriority("Medium");
    //console.log(todo);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full flex space-x-2">
        <input
          type="text"
          placeholder="Your next todo"
          value={newTodo}
          onChange={handleChange}
          className="flex-1 p-3 border rounded-sm shadow"
        />
        {/*
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-sm p-2 mr-2"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>*/}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default NewTodo;
