'use client'

import Header from "@/components/todoList/header";
import AddTodo from "@/components/todoList/addTodo";
import axios from 'axios';
import { useState } from "react";
import TodoItem from "@/components/todoList/todoItem";

interface todoInterface {
  id: number,
  title: string,
  completed: boolean
  userId: string
}

export default function TodoList() {
  const [todos, setTodos] = useState<Array<todoInterface>>([])
  axios.get("https://jsonplaceholder.typicode.com/todos").then(res => {
    setTodos(res.data)
  })
  // Toggle complete
  function markComplete(id: number) {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }))
  }
  // delete todo
  function deleteTodo(id: number): void {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => {
        const remains = todos.filter(todo => todo.id !== id)
        setTodos(remains)
      })
  }
  // Add todo
  function addTodo(title: string) {
    axios.post('https://jsonplaceholder.typicode.com/users/1/todos', {
      title, completed: false
    })
      .then(res => {
        console.log(res)
        const clonedTodos = [...todos]
        clonedTodos.push(res.data)
        setTodos(clonedTodos)
      })
  }
  return (
    <div className="app">
      <div className="">
        <Header />
        <AddTodo addTodo={() => addTodo('')} markComplete={() => markComplete(1)} delTodo={() => deleteTodo(1)} />
        {
          todos.map((todo, index) => (
            <TodoItem
              key={index} todo={todo}
              markComplete={() => markComplete(todo.id)}
              delTodo={() => deleteTodo(todo.id)}
            />
          ))
        }
      </div>
    </div>
  );
}