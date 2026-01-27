import { formatDisplayNumber } from './formatDisplay';
import { useCalculatorKeyboard } from './useCalculatorKeyboard';
import { useCalculatorState } from './useCalculatorState';

/**
 * Calculator 用の Facade hook
 *
 * UI はこの hook のみを利用し、
 * 内部の状態管理・キーボード処理には直接依存しない。
 *
 * @returns Calculator UI 向け API
 */
export const useCalculator = () => {
  const calculator = useCalculatorState();

  useCalculatorKeyboard({
    appendDigit: calculator.appendDigit,
    selectOperation: calculator.selectOperation,
    calculate: calculator.calculate,
    deleteLastDigit: calculator.deleteLastDigit,
    clearAll: calculator.clearAll,
    setActiveKey: calculator.setActiveKey,
  });

  return {
    currentOperand: calculator.currentOperand,
    previousOperand: calculator.previousOperand,
    operation: calculator.operation,
    activeKey: calculator.activeKey,

    appendNumber: calculator.appendDigit,
    chooseOperation: calculator.selectOperation,
    compute: calculator.calculate,
    deleteLast: calculator.deleteLastDigit,
    allClear: calculator.clearAll,
    getDisplayNumber: formatDisplayNumber,
  };
};