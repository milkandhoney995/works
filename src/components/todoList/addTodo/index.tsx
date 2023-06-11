import React, { useState } from 'react';
import classes from './addTodo.module.scss'

// PropTypes

type propsType = {
  addTodo: (title: string) => void,
  markComplete: () => void,
  delTodo: () => void
}

export default function AddTodo(props: propsType) {
  const [title, setTitle] = useState<string>("")

    function handleChange(e: React.ChangeEvent) {
      console.log(e)
      // this.setState({ [e.target.name]: e.target.value })
    }

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      props.addTodo(title)
      setTitle("")
    }

    return (
      <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
        <input
          type="text"
          name="title"
          className={classes.form__input}
          placeholder="Add Todo..."
          value={title}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="submit"
          value="Submit"
          className={classes.form__input}
        />
      </form>
    )

}
