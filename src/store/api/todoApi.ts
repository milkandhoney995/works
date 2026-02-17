import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoResponse {
  todos: Todo[];
}

/**
 * RTK Query API スライス - サーバーとの通信を管理
 * - getTodos: サーバーからTodoリストを取得
 * - getTodoById: 特定のTodoをIDで取得
 * - addTodo: 新しいTodoをサーバーに追加
 * - updateTodo: 既存のTodoを更新（タイトルや完了状態の変更）
 * - deleteTodo: Todoをサーバーから削除
 * - toggleTodoComplete: Todoの完了状態を切り替える
 */
export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api`,
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todo"],
    }),

    getTodoById: builder.query<Todo, number>({
      query: (id) => `/todos/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Todo", id }],
    }),

    addTodo: builder.mutation<Todo, string>({
      query: (title) => ({
        url: "/todos",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Todo"],
    }),

    updateTodo: builder.mutation<Todo, Partial<Todo> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Todo", id }],
    }),

    deleteTodo: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Todo", id }],
    }),

    toggleTodoComplete: builder.mutation<Todo, number>({
      query: (id) => ({
        url: `/todos/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Todo", id }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoCompleteMutation,
} = todoApi;
