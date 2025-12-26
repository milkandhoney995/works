'use client';

import { useState, useEffect, useCallback } from "react";
import classes from "@/app/calculator/page.module.scss";
import CalculatorButton from "@/app/calculator/components/CalculatorButton";

type Operation = "+" | "-" | "*" | "÷" | undefined;

const Calculator = () => {
  const [currentOperand, setCurrentOperand] = useState<string>('');
  const [previousOperand, setPreviousOperand] = useState<string>('');
  const [operation, setOperation] = useState<Operation>();
  const [activeKey, setActiveKey] = useState<string | null>(null); // キーボード押下中のキー

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

  // キーボード操作対応 + 押下ハイライト
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

  // ボタン配置
  const buttons: { label: string; onClick: () => void; spanTwo?: boolean; type?: 'number' | 'operator' | 'special' }[] = [
    { label: 'AC', onClick: allClear, spanTwo: true, type: 'special' },
    { label: 'DEL', onClick: deleteLast, type: 'special' },
    { label: '÷', onClick: () => chooseOperation('÷'), type: 'operator' },

    { label: '1', onClick: () => appendNumber('1'), type: 'number' },
    { label: '2', onClick: () => appendNumber('2'), type: 'number' },
    { label: '3', onClick: () => appendNumber('3'), type: 'number' },
    { label: '*', onClick: () => chooseOperation('*'), type: 'operator' },

    { label: '4', onClick: () => appendNumber('4'), type: 'number' },
    { label: '5', onClick: () => appendNumber('5'), type: 'number' },
    { label: '6', onClick: () => appendNumber('6'), type: 'number' },
    { label: '+', onClick: () => chooseOperation('+'), type: 'operator' },

    { label: '7', onClick: () => appendNumber('7'), type: 'number' },
    { label: '8', onClick: () => appendNumber('8'), type: 'number' },
    { label: '9', onClick: () => appendNumber('9'), type: 'number' },
    { label: '-', onClick: () => chooseOperation('-'), type: 'operator' },

    { label: '.', onClick: () => appendNumber('.'), type: 'number' },
    { label: '0', onClick: () => appendNumber('0'), type: 'number' },
    { label: '=', onClick: compute, spanTwo: true, type: 'special' },
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

      {buttons.map((btn, idx) => {
        // キーボード押下とボタンラベルを照合
        let isActive = false;
        if (activeKey) {
          if (btn.label === activeKey || (btn.label === '÷' && activeKey === '/') || (btn.label === '=' && (activeKey === 'Enter' || activeKey === '='))) {
            isActive = true;
          }
        }

        return (
          <CalculatorButton
            key={idx}
            label={btn.label}
            onClick={btn.onClick}
            spanTwo={btn.spanTwo}
            type={btn.type}
            active={isActive}
          />
        );
      })}
    </div>
  );
};

export default Calculator;