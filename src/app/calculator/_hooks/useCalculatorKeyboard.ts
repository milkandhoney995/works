import { useEffect } from 'react';
import { Operation } from './useCalculatorState';

interface KeyboardHandlers {
  appendDigit: (digit: string) => void;
  selectOperation: (op: Operation) => void;
  calculate: () => void;
  deleteLastDigit: () => void;
  clearAll: () => void;
  setActiveKey: (key: string | null) => void;
}

/**
 * Calculator のキーボード入力を管理する hook
 *
 * @param handlers 各操作のハンドラ
 */
export const useCalculatorKeyboard = (handlers: KeyboardHandlers) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handlers.setActiveKey(e.key);

      if (e.key >= '0' && e.key <= '9') handlers.appendDigit(e.key);
      else if (e.key === '.') handlers.appendDigit('.');
      else if (e.key === '+' || e.key === '-' || e.key === '*') {
        handlers.selectOperation(e.key as Operation);
      }
      else if (e.key === '/') handlers.selectOperation('÷');
      else if (e.key === 'Enter' || e.key === '=') handlers.calculate();
      else if (e.key === 'Backspace') handlers.deleteLastDigit();
      else if (e.key === 'Escape') handlers.clearAll();
    };

    const handleKeyUp = () => handlers.setActiveKey(null);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handlers]);
};