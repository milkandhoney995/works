/**
 * #### index.ts public APIの役割
 * - import 元を 1か所に固定
 * - 内部構造の変更に柔軟
 */
// ===== Board / Pieces =====
export { initialBoard } from "./model/board";
export { pieceMap, promotable, unpromote } from "./model/pieces";

// ===== Helpers =====
export { isSentePiece } from "./model/helpers/camp";

// ===== State =====
export { initialShogiState } from "./state/shogiState";
export { shogiReducer } from "./state/shogiReducer";

export type { HandsByPlayer, UseShogiReturn, Position, Hands, PendingPromotion  } from "./model/types"