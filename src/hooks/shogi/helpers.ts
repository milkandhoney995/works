// 敵陣内かどうかを判定するヘルパー関数
export const inEnemyCamp = (y: number, isUpper: boolean) => {
  return isUpper ? y <= 2 : y >= 6;
};