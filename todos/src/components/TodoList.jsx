import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { removeTodo, toggleTodo } from "../store/slices/todoSlice";

function TodoList() {
  const todos = useSelector((store) => store.todo.todos);
  const dispatch = useDispatch();

  // Remove a todo
  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  // Toggle a todo
  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <ul>
      {todos.map((todo) => (
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
