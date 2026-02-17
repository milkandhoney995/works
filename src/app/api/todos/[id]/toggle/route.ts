import { NextRequest, NextResponse } from "next/server";

// This is a placeholder - in production, this would connect to a database
let todos: Array<{ id: number; title: string; completed: boolean }> = [];

/**
 * PATCH /api/todos/[id]/toggle
 * Todoの完了状態を切り替えるエンドポイント
 * - リクエストURLが /toggle で終わる場合にのみ、完了状態を切り替えるロジックを実行
 * - それ以外のPATCHリクエストは、通常の更新処理として扱う
 * - 完了状態の切り替えが成功した場合、更新されたTodoを返す
 * - エラーが発生した場合は、適切なエラーメッセージとステータスコードを返す
 * @param request - Next.jsのリクエストオブジェクト
 * @param params - URLパラメータ（idを含む）
 * @returns 更新されたTodoまたはエラーメッセージを含むJSONレスポンス
 */
export async function PATCH(
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

    todo.completed = !todo.completed;

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to toggle todo" },
      { status: 500 }
    );
  }
}
