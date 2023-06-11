import { JsxElement } from 'typescript';
import TodoItem from '../todoItem';

export default function Todos(props: propTypes) {

  return props.todos.map((todo, index) => (
    <TodoItem key={index} todo={todo} markComplete={props.markComplete} delTodo={props.delTodo}/>
  ));
}
// PropTypes
interface Item {
  title: string
  id: string
  completed: boolean
}
type propTypes = {
  todos: Array<Item>,
  markComplete: () => boolean,
  delTodo: () => Element,
}