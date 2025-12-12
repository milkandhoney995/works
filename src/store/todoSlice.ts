import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number,
  title: string,
  completed: boolean
}

export interface TodoState {
  todos: Todo[]
}

const initialState: TodoState = {
  todos: []
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),
        title: action.payload,
        completed: false
      });
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    }

  }
});

export const { addTodo, deleteTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
