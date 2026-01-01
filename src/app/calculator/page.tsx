'use client';

import classes from "@/app/calculator/page.module.scss";
import CalculatorButton from "@/app/calculator/components/CalculatorButton";
import { useCalculator } from "@/features/calculator/hooks/useCalculator";
import { calculatorButtons, CalculatorButtonData } from "@/data/calculatorButton";

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

  // 各ボタンにクリック処理を割り当てる
  const getButtonOnClick = (btn: CalculatorButtonData) => {
    switch (btn.label) {
      case 'AC': return allClear;
      case 'DEL': return deleteLast;
      case '=': return compute;
      case '+':
      case '-':
      case '*':
      case '÷': return () => chooseOperation(btn.label as any);
      default: return () => appendNumber(btn.label);
    }
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