'use client';

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AddTodo from "@/components/todoList/addTodo";
import TodoItem from "@/components/todoList/todoItem";
import classes from './page.module.scss';

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todo.todos);

  return (
    <div className={classes.todoList}>
      <h1 className={classes.todoList__title}>Redux Todo List</h1>

      <AddTodo />

      <div className={classes.todoList__todos}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}