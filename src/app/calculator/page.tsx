'use client';

import { useState, useEffect, useCallback } from "react";
import classes from "@/app/calculator/page.module.scss";
import CalculatorButton from "@/app/calculator/components/CalculatorButton";

type Operation = "+" | "-" | "*" | "÷" | undefined;

const Calculator = () => {
  const [currentOperand, setCurrentOperand] = useState<string>('');
  const [previousOperand, setPreviousOperand] = useState<string>('');
  const [operation, setOperation] = useState<Operation>();

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

  // キーボード入力対応
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
      else if (e.key === '.') appendNumber('.');
      else if (e.key === '+' || e.key === '-' || e.key === '*') chooseOperation(e.key as Operation);
      else if (e.key === '/') chooseOperation('÷');
      else if (e.key === 'Enter' || e.key === '=') compute();
      else if (e.key === 'Backspace') deleteLast();
      else if (e.key === 'Escape') allClear();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appendNumber, chooseOperation, compute, deleteLast, allClear]);

  // ボタン配置
  const buttons: { label: string; onClick: () => void; spanTwo?: boolean }[] = [
    { label: 'AC', onClick: allClear, spanTwo: true },
    { label: 'DEL', onClick: deleteLast },
    { label: '÷', onClick: () => chooseOperation('÷') },

    { label: '1', onClick: () => appendNumber('1') },
    { label: '2', onClick: () => appendNumber('2') },
    { label: '3', onClick: () => appendNumber('3') },
    { label: '*', onClick: () => chooseOperation('*') },

    { label: '4', onClick: () => appendNumber('4') },
    { label: '5', onClick: () => appendNumber('5') },
    { label: '6', onClick: () => appendNumber('6') },
    { label: '+', onClick: () => chooseOperation('+') },

    { label: '7', onClick: () => appendNumber('7') },
    { label: '8', onClick: () => appendNumber('8') },
    { label: '9', onClick: () => appendNumber('9') },
    { label: '-', onClick: () => chooseOperation('-') },

    { label: '.', onClick: () => appendNumber('.') },
    { label: '0', onClick: () => appendNumber('0') },
    { label: '=', onClick: compute, spanTwo: true },
  ];

  return (
    <div className={classes.calculator}>
      <div className={classes.output}>
        <div className={classes.previousOperand}>
          {previousOperand && operation ? `${getDisplayNumber(previousOperand)} ${operation}` : ''}
        </div>
        <div className={classes.currentOperand}>
          {getDisplayNumber(currentOperand)}
        </div>
      </div>

      {buttons.map((btn, idx) => (
        <CalculatorButton
          key={idx}
          label={btn.label}
          onClick={btn.onClick}
          spanTwo={btn.spanTwo}
        />
      ))}
    </div>
  );
};

export default Calculator;