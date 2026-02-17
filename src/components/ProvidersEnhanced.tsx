'use client';

import { Provider } from "react-redux";
import { store } from "@/store";

/**
 * Redux の Provider をラップするコンポーネント
 * 
 * 機能:
 * - Redux Toolkit による状態管理
 * - RTK Query API によるデータフェッチングとキャッシュ管理
 * - 非同期操作のためのミドルウェア（Redux Thunk）を組み込み
 * 
 * The store includes:
 * - todoSlice: ローカル状態管理用のスライス
 * - todoApi: RTK Query API スライスで、サーバーとの通信を管理
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
