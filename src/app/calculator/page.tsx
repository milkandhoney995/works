'use client';

import { useRef } from "react";
import { CalculatorClass } from "./main"
import classes from "./page.module.scss"

export default function Calculator() {
  // const calculator = new CalculatorClass(previousOperandTextElement, currentOperandTextElement, '+', '+', 2, '+')

const previousOperandTextElement = useRef<HTMLDivElement>(null)
const currentOperandTextElement = useRef<HTMLDivElement>(null)

console.log(previousOperandTextElement.current?.innerHTML)
// you can use when you are sure that the value is never null by adding the ! operator to the end of your statement
// https://stackoverflow.com/questions/63520680/argument-of-type-htmlelement-null-is-not-assignable-to-parameter-of-type-el
const calculator = new CalculatorClass(previousOperandTextElement.current!, currentOperandTextElement.current!)

  function getNumber(buttonNumber: string) {
    calculator.appendNumber(buttonNumber)
    calculator.updateDisplay()
  }
 function operate(buttonText: string) {
    calculator.chooseOperation(buttonText)
    calculator.updateDisplay()
}
  function equal() {
    calculator.compute()
    calculator.updateDisplay()
  }
  function allClear(){
    calculator.clear()
    calculator.updateDisplay()
  }
  function deleteButton() {
    calculator.delete()
    calculator.updateDisplay()
  }
  return (
    <div className={classes.calculator}>
      <div className={classes.output}>
        <div className={classes.previousOperand} ref={previousOperandTextElement}></div>
        <div className={classes.currentOperand} ref={currentOperandTextElement}></div>
      </div>
      <button className={classes.spanTwo} onClick={() => allClear()}>AC</button>
        <button onClick={() => deleteButton()}>DEL</button>
        <button onClick={() => operate('÷')}>÷</button>
        <button onClick={() => getNumber('1')}>1</button>
        <button onClick={() => getNumber('2')}>2</button>
        <button onClick={() => getNumber('3')}>3</button>
        <button onClick={() => operate('*')}>*</button>
        <button onClick={() => getNumber('4')}>4</button>
        <button onClick={() => getNumber('5')}>5</button>
        <button onClick={() => getNumber('6')}>6</button>
        <button onClick={() => operate('+')}>+</button>
        <button onClick={() => getNumber('7')}>7</button>
        <button onClick={() => getNumber('8')}>8</button>
        <button onClick={() => getNumber('9')}>9</button>
        <button onClick={() => operate('-')}>-</button>
        <button onClick={() => getNumber('.')}>.</button>
        <button onClick={() => getNumber('0')}>0</button>
        <button className={classes.spanTwo} onClick={() => equal()}>=</button>
    </div>
  )
}