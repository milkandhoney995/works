import TodoItem from '../todoItem';

// PropTypes
interface Item {
  title: string
  id: number
  completed: boolean
}
type propTypes = {
  todos: Array<Item>,
  markComplete: () => void,
  delTodo: () => void,
}

export default function Todos(props: propTypes) {

  return props.todos.map((todo, index) => (
    <TodoItem key={index} todo={todo} markComplete={props.markComplete} delTodo={props.delTodo}/>
  ));
}