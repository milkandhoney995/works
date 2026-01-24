import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addTodo } from "@/store/todoSlice";
import classes from './AddTodo.module.scss'


const AddTodo = () => {
  const [title, setTitle] = useState<string>("")
  const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim()) return;

      dispatch(addTodo(title));
      setTitle("");
    };

    return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input
        className={classes.form__input}
        type="text"
        placeholder="Add Todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className={classes.form__input} type="submit">Submit</button>
    </form>
  );
}

export default AddTodo;
