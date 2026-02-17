import { NextRequest, NextResponse } from "next/server";

// This is a placeholder - in production, this would connect to a database
let todos: Array<{ id: number; title: string; completed: boolean }> = [];

/**
 * GET /api/todos/[id] - 特定のTodoを取得
 * PATCH /api/todos/[id] - 特定のTodoを更新（タイトルや完了状態の変更）
 * DELETE /api/todos/[id] - 特定のTodoを削除
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Next.jsではparamsはPromiseで提供される
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todo" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Next.jsではparamsはPromiseで提供される
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    // Handle toggle endpoint
    if (request.nextUrl.pathname.endsWith("/toggle")) {
      todo.completed = !todo.completed;
      return NextResponse.json(todo, { status: 200 });
    }

    // Handle general PATCH updates
    if (body.title) {
      todo.title = body.title;
    }
    if (body.completed !== undefined) {
      todo.completed = body.completed;
    }

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Next.jsではparamsはPromiseで提供される
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    todos.splice(index, 1);

    return NextResponse.json(
      { success: true, message: "Todo deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
