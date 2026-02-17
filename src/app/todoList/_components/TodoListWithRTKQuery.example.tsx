'use client';

import { useState } from 'react';
import { useTodos, useTodoActions } from '@/store/hooks';

/**
 * Example component demonstrating RTK Query usage for todo management
 * This is a reference implementation showing best practices
 * 
 * To use this component, uncomment the import and add it to your app
 */
export function TodoListWithRTKQuery() {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  
  // RTK Query hooks for data fetching and mutations
  const { todos, isLoading, error, refetch } = useTodos();
  const { 
    handleAddTodo, 
    handleDeleteTodo, 
    handleToggleTodo,
    isLoading: isActionLoading 
  } = useTodoActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      await handleAddTodo(newTodoTitle);
      setNewTodoTitle('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await handleToggleTodo(id);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await handleDeleteTodo(id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading todos from server...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p>Error loading todos</p>
        <button 
          onClick={() => refetch()} 
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List (RTK Query)</h1>

      {/* Add Todo Form */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border rounded"
          disabled={isActionLoading}
        />
        <button
          type="submit"
          disabled={isActionLoading || !newTodoTitle.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {isActionLoading ? 'Adding...' : 'Add'}
        </button>
      </form>

      {/* Todo List */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500">No todos yet. Add one to get started!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-2 p-2 bg-gray-100 rounded"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                disabled={isActionLoading}
                className="w-5 h-5"
              />
              <span
                className={`flex-1 ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => handleDelete(todo.id)}
                disabled={isActionLoading}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Refetch Button */}
      <button
        onClick={() => refetch()}
        className="mt-4 text-sm text-blue-500 hover:underline"
      >
        Refresh from server
      </button>

      {/* Status Info */}
      <p className="mt-4 text-xs text-gray-500">
        Total: {todos.length} | Loading: {isActionLoading ? 'Yes' : 'No'}
      </p>
    </div>
  );
}
