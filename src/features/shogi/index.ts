/**
 * #### index.ts public APIの役割
 * - import 元を 1か所に固定
 * - 内部構造の変更に柔軟
 */
// ===== Board / Pieces =====
export { initialBoard } from "./board/board";
export { pieceMap, promotable, unpromote } from "./board/pieces";

// ===== Helpers =====
export { isSentePiece } from "./utils/shogiHelpers";

// ===== State =====
export { initialShogiState } from "./state/shogiState";
export { shogiReducer } from "./state/shogiReducer";

export type { HandsByPlayer, UseShogiReturn } from "./state/types"