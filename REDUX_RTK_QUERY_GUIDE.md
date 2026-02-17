# Redux & RTK Query Integration Guide

This project has been improved with comprehensive Redux Toolkit and RTK Query integration for advanced state management and API data fetching.

## What's New

### 1. **RTK Query API Layer** (`src/store/api/`)

#### `todoApi.ts`
Complete RTK Query API service with endpoints for:
- `GET /api/todos` - Fetch all todos
- `GET /api/todos/:id` - Fetch a single todo
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status

**Auto-generated hooks:**
```typescript
// Query hooks
useGetTodosQuery()       // Fetch all todos
useGetTodoByIdQuery(id)  // Fetch single todo

// Mutation hooks
useAddTodoMutation()           // Create todo
useUpdateTodoMutation()        // Update todo
useDeleteTodoMutation()        // Delete todo
useToggleTodoCompleteMutation() // Toggle complete status
```

### 2. **Custom Store Hooks** (`src/store/hooks/`)

#### `useAppRedux.ts`
Pre-typed Redux hooks for maximum TypeScript support:
```typescript
import { useAppDispatch, useAppSelector } from "@/store/hooks"

// Full type safety for dispatch and selector
const dispatch = useAppDispatch()
const todos = useAppSelector(state => state.todo.todos)
```

#### `useTodoApi.ts`
High-level RTK Query hooks:
```typescript
import { useTodos, useTodoById, useTodoActions } from "@/store/hooks"

// Fetch all todos with loading/error states
const { todos, isLoading, error, refetch } = useTodos()

// Fetch single todo
const { todo, isLoading, error } = useTodoById(1)

// Manager mutation operations
const { 
  handleAddTodo, 
  handleUpdateTodo, 
  handleDeleteTodo, 
  handleToggleTodo,
  isLoading 
} = useTodoActions()
```

### 3. **API Route Handlers** (`src/app/api/`)

#### `todos/route.ts`
- `GET /api/todos` - Returns all todos
- `POST /api/todos` - Creates a new todo

#### `todos/[id]/route.ts`
- `GET /api/todos/:id` - Fetch specific todo
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

#### `todos/[id]/toggle/route.ts`
- `PATCH /api/todos/:id/toggle` - Toggle todo completion

### 4. **Enhanced Store Configuration** (`src/store/index.ts`)

```typescript
export const store = configureStore({
  reducer: {
    todo: todoReducer,           // Local Redux state
    [todoApi.reducerPath]: todoApi.reducer, // RTK Query cache
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware), // RTK Query middleware
});
```

## Usage Examples

### Using RTK Query for Server-Synced Todos

```typescript
'use client'

import { useTodos, useTodoActions } from '@/store/hooks'

export function TodoListWithAPI() {
  const { todos, isLoading, error } = useTodos()
  const { handleAddTodo, handleDeleteTodo, handleToggleTodo } = useTodoActions()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading todos</div>

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleTodo(todo.id)}
          />
          <span>{todo.title}</span>
          <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

### Using Local Redux State

```typescript
'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addTodo, toggleComplete, deleteTodo } from '@/store/todoSlice'

export function TodoListLocal() {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => state.todo.todos)

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleComplete(todo.id))}
          />
          <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

### Mixing Both (Real-time UI + Server Sync)

```typescript
'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useTodos } from '@/store/hooks'
import { addTodo } from '@/store/todoSlice'

export function HybridTodoList() {
  const dispatch = useAppDispatch()
  
  // Local state for immediate UI feedback
  const localTodos = useAppSelector(state => state.todo.todos)
  
  // Server state for persistence
  const { todos: serverTodos } = useTodos()

  const handleAddTodo = async (title: string) => {
    // Optimistic update
    dispatch(addTodo(title))
    
    // Then sync with server
    // could use RTK Query mutation here
  }

  return (
    <div>
      {/* Display local todos for responsiveness */}
      {localTodos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  )
}
```

## Environment Configuration

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# RTK Query cache configuration (optional)
NEXT_PUBLIC_RTK_QUERY_POLLING_INTERVAL=0
```

## Key Benefits

✅ **Type Safety** - Full TypeScript support with pre-typed hooks
✅ **Automatic Caching** - RTK Query handles cache invalidation
✅ **Loading States** - Built-in loading indicators
✅ **Error Handling** - Automatic error management  
✅ **Optimistic Updates** - Combine local Redux state with RTK Query
✅ **Middleware Integration** - Automatic API call management
✅ **Tag-based Invalidation** - Smart cache busting

## Next Steps

1. **Connect to Real Database** - Replace in-memory storage in route handlers
2. **Add Authentication** - Implement auth middleware in API routes
3. **Enable Polling/Refetching** - Configure RTK Query cache options
4. **Add Error Boundaries** - Handle RTK Query errors gracefully
5. **Optimize Queries** - Use selectFromResult for component optimization

## Resources

- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
