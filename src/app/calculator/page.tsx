'use client';

import { useEffect, useRef, useState } from "react";
import { CalculatorClass } from "./main"
import classes from "./page.module.scss"

export default function Calculator() {
  // const calculator = new CalculatorClass(previousOperandTextElementRef, currentOperandTextElementRef, '+', '+', 2, '+')

  // you can use when you are sure that the value is never null by adding the ! operator to the end of your statement
  // https://stackoverflow.com/questions/63520680/argument-of-type-htmlelement-null-is-not-assignable-to-parameter-of-type-el
  const previousOperandTextElementRef = useRef<HTMLDivElement>(null);
  const currentOperandTextElementRef = useRef<HTMLDivElement>(null)
  const [previousOperandTextElement, setPreviousOperandTextElement] = useState<HTMLDivElement>()
  const [currentOperandTextElement, setCurrentOperandTextElement] = useState<HTMLDivElement>()
  const [previousOperand, setPreviousOperand] = useState<string>('')
  const [currentOperand, setCurrentOperand] = useState<string>('')
  const [number, setNumber] = useState<string>("")

  useEffect(() => {
    setPreviousOperandTextElement(previousOperandTextElementRef.current!)
    setCurrentOperandTextElement(currentOperandTextElementRef.current!)
  })

  const calculator = new CalculatorClass(
    previousOperandTextElement!, currentOperandTextElement!,
    previousOperand, currentOperand, 0, currentOperand
  )

  function getNumber(e: React.MouseEvent) {
    const element = e.target as HTMLDivElement;
    const selectednumber = element.innerHTML
    calculator.appendNumber(selectednumber)
    calculator.updateDisplay()
    console.log(`getNumber: ${selectednumber}`)
  }
  function operate(e: React.MouseEvent) {
    const element = e.target as HTMLDivElement;
    const selectedOperand = element.innerHTML

    setPreviousOperand(currentOperand)
    setCurrentOperand(selectedOperand)
    calculator.chooseOperation(selectedOperand)

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
        <div className={classes.previousOperand} ref={previousOperandTextElementRef}></div>
        <div className={classes.currentOperand} ref={currentOperandTextElementRef}></div>
      </div>
      <button className={classes.spanTwo} onClick={() => allClear()}>AC</button>
      <button onClick={() => deleteButton()}>DEL</button>
      <button onClick={(e) => operate(e)}>÷</button>
      <button onClick={(e) => getNumber(e)}>1</button>
      <button onClick={(e) => getNumber(e)}>2</button>
      <button onClick={(e) => getNumber(e)}>3</button>
      <button onClick={(e) => operate(e)}>*</button>
      <button onClick={(e) => getNumber(e)}>4</button>
      <button onClick={(e) => getNumber(e)}>5</button>
      <button onClick={(e) => getNumber(e)}>6</button>
      <button onClick={(e) => operate(e)}>+</button>
      <button onClick={(e) => getNumber(e)}>7</button>
      <button onClick={(e) => getNumber(e)}>8</button>
      <button onClick={(e) => getNumber(e)}>9</button>
      <button onClick={(e) => operate(e)}>-</button>
      <button onClick={(e) => getNumber(e)}>.</button>
      <button onClick={(e) => getNumber(e)}>0</button>
      <button className={classes.spanTwo} onClick={() => equal()}>=</button>
    </div>
  )
}