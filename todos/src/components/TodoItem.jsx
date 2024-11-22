function TodoItem({ todo, handleRemoveTodo, handleToggleTodo }) {
  return (
    <>
      <li>
        <p
          onClick={handleToggleTodo}
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            cursor: "pointer",
          }}
        >
          {todo.name}
        </p>
        <button onClick={handleRemoveTodo}>X</button>
      </li>
    </>
  );
}

export default TodoItem;
