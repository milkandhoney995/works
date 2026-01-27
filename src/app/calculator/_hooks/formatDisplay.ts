/**
 * 数値を電卓表示用にフォーマットする
 *
 * @param value 数値文字列
 * @returns フォーマット済み文字列
 */
export const formatDisplayNumber = (value: string): string => {
  if (!value) return '0';

  const number = parseFloat(value);
  if (isNaN(number)) return '';

  const [integer, decimal] = value.split('.');
  const integerDisplay = parseInt(integer).toLocaleString();

  return decimal != null
    ? `${integerDisplay}.${decimal}`
    : integerDisplay;
};