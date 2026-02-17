'use client';

import { useAppDispatch } from "@/store/hooks";
import { toggleComplete, deleteTodo, Todo } from "@/store/todoSlice";
import classes from './TodoItem.module.scss';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={classes.todoItem}>
      <input
        type="checkbox"
        className={classes.todoItem__checkbox}
        checked={todo.completed}
        onChange={() => dispatch(toggleComplete(todo.id))}
      />
      <span className={`${classes.todoItem__text} ${todo.completed ? classes['todoItem__text--completed'] : ''}`}>
        {todo.title}
      </span>
      <button className={classes.todoItem__delete} onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
    </div>
  );
}

export default TodoItem;