'use client';

import classes from "@/app/calculator/page.module.scss";
import CalculatorButton from "./_components/CalculatorButton";
import { calculatorButtons, CalculatorButtonData } from "./_data/calculatorButton";
import { useCalculator } from "./_hooks/useCalculator";

const Calculator = () => {
  const {
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
  } = useCalculator();

  // ラベルと処理をマップで定義
  const buttonHandlers: Record<string, () => void> = {
    'AC': allClear,
    'DEL': deleteLast,
    '=': compute,
    '+': () => chooseOperation('+'),
    '-': () => chooseOperation('-'),
    '*': () => chooseOperation('*'),
    '÷': () => chooseOperation('÷'),
  };

  // ボタン押下時に処理を返す関数
  const getButtonOnClick = (btn: CalculatorButtonData) => {
    return buttonHandlers[btn.label] ?? (() => appendNumber(btn.label));
  };

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

      {calculatorButtons.map((btn, idx) => {
        const isActive = btn.keyMap?.includes(activeKey || '') || false;

        return (
          <CalculatorButton
            key={idx}
            label={btn.label}
            onClick={getButtonOnClick(btn)}
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