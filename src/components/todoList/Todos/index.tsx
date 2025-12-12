import TodoItem from '../todoItem';
import { Todo } from '@/store/todoSlice';

// PropTypes
type propTypes = {
  todos: Array<Todo>,
  markComplete: () => void,
  delTodo: () => void,
}

export default function Todos(props: propTypes) {

  return props.todos.map((todo, index) => (
    <TodoItem key={index} todo={todo} />
  ));
}