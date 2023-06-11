import classes from "./todoItem.module.scss"

// PropTypes
type propTypes = {
  todo: { title: string, id: string, completed: boolean},
  markComplete: () => boolean,
  delTodo: () => boolean,
}

export default function TodoItem(props: propTypes) {
    function getStyle() {
      return {
        textDecoration: props.todo.completed ?
        'line-through' : 'none'
      }
    }

    const { id, title } = props.todo;
    return (
      <div style={getStyle()} className={classes.item}>
        <p>
          <input type="checkbox" onChange={props.markComplete.bind(id)} />{ '' }
          { title}
          <button onClick={props.delTodo.bind(id)} className={classes.item__button}>x</button>
        </p>
      </div>
    );
}