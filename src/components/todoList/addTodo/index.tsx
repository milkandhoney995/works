import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './addTodo.module.scss'

// PropTypes
AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
}

export default function AddTodo() {
  const [title, setTitle] = useState<string>("")

    function handleChange(e: React.ChangeEvent) {
      console.log(e)
      // this.setState({ [e.target.name]: e.target.value })
    }

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setTitle("")
    }
    // onSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.addTodo(this.state.title);
    //     this.setState({ title: ''});
    // }

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
