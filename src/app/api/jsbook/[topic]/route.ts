import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ topic: string }> }
) {
  try {
    const { topic } = await params;
    const filePath = path.join(
      process.cwd(),
      'src/app/jsbook/_content',
      `${topic}.md`
    );

    // ファイルが存在するか確認
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'トピックが見つかりません' },
        { status: 404 }
      );
    }

    // ファイルの内容を読み込む
    const content = fs.readFileSync(filePath, 'utf-8');

    // テキスト形式で返す
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json(
      { error: 'サーバーエラー' },
      { status: 500 }
    );
  }
}
