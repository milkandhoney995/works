import { useCallback, useState } from 'react';

export type Operation = '+' | '-' | '*' | '÷' | undefined;

/**
 * Calculator の状態と計算ロジックを管理する hook
 *
 * - 数値入力
 * - 演算子選択
 * - 計算実行
 *
 * UI / DOM / Keyboard に依存しない。
 *
 * @returns Calculator 状態管理 API
 */
export const useCalculatorState = () => {
  const [currentOperand, setCurrentOperand] = useState('');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState<Operation>();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  /**
   * 数字・小数点を入力する
   *
   * @param digit 入力文字
   */
  const appendDigit = useCallback((digit: string) => {
    if (digit === '.' && currentOperand.includes('.')) return;
    setCurrentOperand(prev => prev + digit);
  }, [currentOperand]);

  /**
   * 演算子を選択する
   *
   * @param op 演算子
   */
  const selectOperation = useCallback((op: Operation) => {
    if (!currentOperand) return;

    if (previousOperand) {
      calculate();
    }

    setOperation(op);
    setPreviousOperand(currentOperand);
    setCurrentOperand('');
  }, [currentOperand, previousOperand]);

  /**
   * 計算を実行する
   */
  const calculate = useCallback(() => {
    if (!previousOperand || !currentOperand || !operation) return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    let result: number;
    switch (operation) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '*': result = prev * current; break;
      case '÷': result = prev / current; break;
      default: return;
    }

    setCurrentOperand(result.toString());
    setPreviousOperand('');
    setOperation(undefined);
  }, [previousOperand, currentOperand, operation]);

  /**
   * 最後の1文字を削除する
   */
  const deleteLastDigit = useCallback(() => {
    setCurrentOperand(prev => prev.slice(0, -1));
  }, []);

  /**
   * すべてクリアする
   */
  const clearAll = useCallback(() => {
    setCurrentOperand('');
    setPreviousOperand('');
    setOperation(undefined);
  }, []);

  return {
    currentOperand,
    previousOperand,
    operation,
    activeKey,

    appendDigit,
    selectOperation,
    calculate,
    deleteLastDigit,
    clearAll,
    setActiveKey,
  };
};