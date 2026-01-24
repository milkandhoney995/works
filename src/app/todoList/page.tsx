'use client';

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import classes from './page.module.scss';
import AddTodo from "./_components/AddTodo/AddTodo";
import TodoItem from "./_components/TodoItem/TodoItem";

// todo: todoリストを追加後も編集できるようにする
const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);

  return (
    <div className={classes.todoList}>
      <h1 className={classes.todoList__title}>Todo List</h1>

      <AddTodo />

      <div className={classes.todoList__todos}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;