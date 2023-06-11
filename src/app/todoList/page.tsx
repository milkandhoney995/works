'use client'

import Header from "@/components/todoList/header";
import Todos from "@/components/todoList/Todos";
import AddTodo from "@/components/todoList/addTodo";
import axios from 'axios';
import { useState } from "react";

interface todoInterface {
  id: string,
  title: string,
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Array<todoInterface>>([])

  // Toggle complete
  function markComplete(id: string) {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }))
  }
  // delete todo
  function deleteTodo(id: string): void {
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
        setTodos(todos.push(res.data))
      })
  }
  return (
    <div className="app">
      <div className="">
        <Header />
        <AddTodo addTodo={addTodo('')} />
        <Todos delTodo={deleteTodo('')} todos={todos} />
      </div>
    </div>
  );
}