import { useState, useCallback, useEffect } from "react";

export type Operation = "+" | "-" | "*" | "÷" | undefined;

export const useCalculator = () => {
  const [currentOperand, setCurrentOperand] = useState<string>('');
  const [previousOperand, setPreviousOperand] = useState<string>('');
  const [operation, setOperation] = useState<Operation>();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const appendNumber = useCallback((num: string) => {
    if (num === '.' && currentOperand.includes('.')) return;
    setCurrentOperand(prev => prev + num);
  }, [currentOperand]);

  const chooseOperation = useCallback((op: Operation) => {
    if (!currentOperand) return;
    if (previousOperand) compute();
    setOperation(op);
    setPreviousOperand(currentOperand);
    setCurrentOperand('');
  }, [currentOperand, previousOperand]);

  const compute = useCallback(() => {
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
  }, [currentOperand, previousOperand, operation]);

  const deleteLast = useCallback(() => setCurrentOperand(prev => prev.slice(0, -1)), []);
  const allClear = useCallback(() => {
    setCurrentOperand('');
    setPreviousOperand('');
    setOperation(undefined);
  }, []);

  const getDisplayNumber = (num: string) => {
    if (!num) return '0';
    const number = parseFloat(num);
    if (isNaN(number)) return '';
    const [integer, decimal] = num.split('.');
    const integerDisplay = parseInt(integer).toLocaleString();
    return decimal != null ? `${integerDisplay}.${decimal}` : integerDisplay;
  };

  // キーボード対応
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setActiveKey(e.key);

      if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
      else if (e.key === '.') appendNumber('.');
      else if (e.key === '+' || e.key === '-' || e.key === '*') chooseOperation(e.key as Operation);
      else if (e.key === '/') chooseOperation('÷');
      else if (e.key === 'Enter' || e.key === '=') compute();
      else if (e.key === 'Backspace') deleteLast();
      else if (e.key === 'Escape') allClear();
    };

    const handleKeyUp = () => setActiveKey(null);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [appendNumber, chooseOperation, compute, deleteLast, allClear]);

  return {
    currentOperand,
    previousOperand,
    operation,
    activeKey,
    appendNumber,
    chooseOperation,
    compute,
    deleteLast,
    allClear,
    getDisplayNumber
  };
};