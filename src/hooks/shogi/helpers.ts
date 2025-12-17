// 敵陣内かどうかを判定するヘルパー関数
// isUpper: 自分が先手か後手か
export const inEnemyCamp = (y: number, isUpper: boolean): boolean => {
  return isUpper ? y <= 2 : y >= 6;
};