'use client';

import { useEffect, useRef, useState } from "react";
import { CalculatorClass } from "./main"
import classes from "./page.module.scss"

export default function Calculator() {
  const previousOperandRef = useRef<HTMLDivElement>(null);
  const currentOperandRef = useRef<HTMLDivElement>(null);
  const [calculator, setCalculator] = useState<CalculatorClass | null>(null);
  const [previousOperandTextElement, setPreviousOperandTextElement] = useState<HTMLDivElement>()
  const [currentOperandTextElement, setCurrentOperandTextElement] = useState<HTMLDivElement>()
  const [previousOperand, setPreviousOperand] = useState<string>('')
  const [currentOperand, setCurrentOperand] = useState<string>('')
  const [number, setNumber] = useState<string>("")

   // 初回マウント時に CalculatorClass を生成
  useEffect(() => {
    if (previousOperandRef.current && currentOperandRef.current) {
      const calc = new CalculatorClass(previousOperandRef.current, currentOperandRef.current);
      calc.clear();
      calc.updateDisplay();
      setCalculator(calc);
    }
  }, [])

  const handleNumber = (value: string) => {
    if (!calculator) return;
    calculator.appendNumber(value);
    calculator.updateDisplay();
  };

  const handleOperation = (value: string) => {
    if (!calculator) return;
    calculator.chooseOperation(value);
    calculator.updateDisplay();
  };

  const handleEqual = () => {
    if (!calculator) return;
    calculator.compute();
    calculator.updateDisplay();
  };

  const handleAllClear = () => {
    if (!calculator) return;
    calculator.clear();
    calculator.updateDisplay();
  };

  const handleDelete = () => {
    if (!calculator) return;
    calculator.delete();
    calculator.updateDisplay();
  };

  return (
    <div className={classes.calculator}>
      <div className={classes.output}>
        <div className={classes.previousOperand} ref={previousOperandRef}></div>
        <div className={classes.currentOperand} ref={currentOperandRef}></div>
      </div>
      <button className={classes.spanTwo} onClick={() => handleAllClear()}>AC</button>
      <button onClick={() => handleDelete()}>DEL</button>
      <button onClick={() => handleOperation('÷')}>÷</button>
      <button onClick={() => handleNumber('1')}>1</button>
      <button onClick={() => handleNumber('2')}>2</button>
      <button onClick={() => handleNumber('3')}>3</button>
      <button onClick={() => handleOperation('*')}>*</button>
      <button onClick={() => handleNumber('4')}>4</button>
      <button onClick={() => handleNumber('5')}>5</button>
      <button onClick={() => handleNumber('6')}>6</button>
      <button onClick={() => handleOperation('+')}>+</button>
      <button onClick={() => handleNumber('7')}>7</button>
      <button onClick={() => handleNumber('8')}>8</button>
      <button onClick={() => handleNumber('9')}>9</button>
      <button onClick={() => handleOperation('-')}>-</button>
      <button onClick={() => handleNumber('.')}>.</button>
      <button onClick={() => handleNumber('0')}>0</button>
      <button className={classes.spanTwo} onClick={handleEqual}>=</button>
    </div>
  )
}