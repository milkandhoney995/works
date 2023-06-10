import classes from "./page.module.scss"

export default function Calculator() {
  return (
    <div className={classes.calculator}>
      <div className={classes.output}>
        <div data-previousOperand className={classes.previousOperand}></div>
        <div data-current-operand className={classes.currentOperand}></div>
      </div>
      <button data-all-clear className={classes.spanTwo}>AC</button>
        <button data-delete>DEL</button>
        <button data-operation>÷</button>
        <button data-number>1</button>
        <button data-number>2</button>
        <button data-number>3</button>
        <button data-operation>*</button>
        <button data-number>4</button>
        <button data-number>5</button>
        <button data-number>6</button>
        <button data-operation>+</button>
        <button data-number>7</button>
        <button data-number>8</button>
        <button data-number>9</button>
        <button data-operation>-</button>
        <button data-number>.</button>
        <button data-number>0</button>
        <button data-equals className={classes.spanTwo}>=</button>
    </div>
  )
}