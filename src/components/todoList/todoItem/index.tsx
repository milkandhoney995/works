'use client';

import { useDispatch } from "react-redux";
import { toggleComplete, deleteTodo, Todo } from "@/store/todoSlice";

export default function TodoItem({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleComplete(todo.id))}
      />
      <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        {todo.title}
      </span>
      <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
    </div>
  );
}