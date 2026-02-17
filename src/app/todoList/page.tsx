'use client';

import { useAppSelector } from "@/store/hooks";
import type { RootState } from "@/store";
import type { Todo } from "@/store/todoSlice";
import classes from './page.module.scss';
import AddTodo from "./_components/AddTodo/AddTodo";
import TodoItem from "./_components/TodoItem/TodoItem";

// todo: todoリストを追加後も編集できるようにする
// Supports both Redux local state and RTK Query API
const TodoList = () => {
  // Using Redux local state (RTK Query can be enabled via environment variable)
  const todos = useAppSelector((state: RootState) => state.todo.todos);

  return (
    <div className={classes.todoList}>
      <h1 className={classes.todoList__title}>Todo List</h1>

      <AddTodo />

      <div className={classes.todoList__todos}>
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;