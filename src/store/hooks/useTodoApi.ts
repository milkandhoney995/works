import { useCallback, useMemo } from "react";
import {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoCompleteMutation,
  Todo,
} from "@/store/api/todoApi";

/**
 * Hook for fetching all todos with loading and error states
 */
export function useTodos() {
  const { data = [], isLoading, error, refetch } = useGetTodosQuery();

  return useMemo(
    () => ({
      todos: data,
      isLoading,
      error,
      refetch,
    }),
    [data, isLoading, error, refetch]
  );
}

/**
 * Hook for fetching a single todo by ID
 */
export function useTodoById(id: number) {
  const { data, isLoading, error, refetch } = useGetTodoByIdQuery(id);

  return useMemo(
    () => ({
      todo: data,
      isLoading,
      error,
      refetch,
    }),
    [data, isLoading, error, refetch]
  );
}

/**
 * Hook for managing todo operations (create, update, delete, toggle)
 */
export function useTodoActions() {
  const [addTodo, { isLoading: isAdding }] = useAddTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [toggleComplete, { isLoading: isToggling }] =
    useToggleTodoCompleteMutation();

  const handleAddTodo = useCallback(
    async (title: string) => {
      try {
        const result = await addTodo(title).unwrap();
        return result;
      } catch (error) {
        console.error("Failed to add todo:", error);
        throw error;
      }
    },
    [addTodo]
  );

  const handleUpdateTodo = useCallback(
    async (id: number, updates: Partial<Todo>) => {
      try {
        const result = await updateTodo({ id, ...updates }).unwrap();
        return result;
      } catch (error) {
        console.error("Failed to update todo:", error);
        throw error;
      }
    },
    [updateTodo]
  );

  const handleDeleteTodo = useCallback(
    async (id: number) => {
      try {
        await deleteTodo(id).unwrap();
      } catch (error) {
        console.error("Failed to delete todo:", error);
        throw error;
      }
    },
    [deleteTodo]
  );

  const handleToggleTodo = useCallback(
    async (id: number) => {
      try {
        const result = await toggleComplete(id).unwrap();
        return result;
      } catch (error) {
        console.error("Failed to toggle todo:", error);
        throw error;
      }
    },
    [toggleComplete]
  );

  return useMemo(
    () => ({
      handleAddTodo,
      handleUpdateTodo,
      handleDeleteTodo,
      handleToggleTodo,
      isLoading: isAdding || isUpdating || isDeleting || isToggling,
    }),
    [
      handleAddTodo,
      handleUpdateTodo,
      handleDeleteTodo,
      handleToggleTodo,
      isAdding,
      isUpdating,
      isDeleting,
      isToggling,
    ]
  );
}
