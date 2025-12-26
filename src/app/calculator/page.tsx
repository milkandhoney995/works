'use client';

import { useState } from "react";
import classes from "./page.module.scss";

type Operation = "+" | "-" | "*" | "÷" | undefined;

const Calculator = () => {
  const [currentOperand, setCurrentOperand] = useState<string>('');
  const [previousOperand, setPreviousOperand] = useState<string>('');
  const [operation, setOperation] = useState<Operation>();

  const appendNumber = (num: string) => {
    if (num === '.' && currentOperand.includes('.')) return;
    setCurrentOperand(prev => prev + num);
  };

  const chooseOperation = (op: Operation) => {
    if (!currentOperand) return;
    if (previousOperand) compute();
    setOperation(op);
    setPreviousOperand(currentOperand);
    setCurrentOperand('');
  };

  const compute = () => {
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
  };

  const deleteLast = () => setCurrentOperand(prev => prev.slice(0, -1));
  const allClear = () => {
    setCurrentOperand('');
    setPreviousOperand('');
    setOperation(undefined);
  };

  const getDisplayNumber = (num: string) => {
    if (!num) return '0';
    const number = parseFloat(num);
    if (isNaN(number)) return '';
    const [integer, decimal] = num.split('.');
    const integerDisplay = parseInt(integer).toLocaleString();
    return decimal != null ? `${integerDisplay}.${decimal}` : integerDisplay;
  };

  // ボタンの配置を明示的に定義
  const buttons: { label: string, onClick: () => void, spanTwo?: boolean }[] = [
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
        <button
          key={idx}
          className={btn.spanTwo ? classes.spanTwo : undefined}
          onClick={btn.onClick}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default Calculator;