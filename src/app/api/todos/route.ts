import { NextRequest, NextResponse } from "next/server";

// In-memory storage for demonstration
// In production, this would connect to a real database
let todos: Array<{ id: number; title: string; completed: boolean }> = [];
let nextId = 1;

/**
 * GET /api/todos - 全てのTodoを取得
 * POST /api/todos - 新しいTodoを作成
 */
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Title is required and must be a string" },
        { status: 400 }
      );
    }

    const newTodo = {
      id: nextId++,
      title,
      completed: false,
    };

    todos.push(newTodo);

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
