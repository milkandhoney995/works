'use client';

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AddTodo from "@/components/todoList/addTodo";
import TodoItem from "@/components/todoList/todoItem";

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todo.todos);

  return (
    <div style={{ padding: 20 }}>
      <h1>Redux Todo List</h1>

      <AddTodo />

      <div style={{ marginTop: 20 }}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}