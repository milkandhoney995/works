// https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html
export class CalculatorClass {
  previousOperandTextElement: HTMLDivElement;
  currentOperandTextElement:  HTMLDivElement;
  currentOperand?: string
  previousOperand?: string
  number?: number
  operation?: string

  constructor(
    previousOperandTextElement: HTMLDivElement,
    currentOperandTextElement: HTMLDivElement,
    currentOperand?: string, previousOperand?: string, number?: number,
    operation?: string
  ) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.currentOperand = currentOperand
    this.previousOperand = previousOperand
    this.number = number
    this.operation = operation
  }
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand!.slice(0, -1)
  }

  appendNumber(number: string | number) {
    if (number === '.' && this.currentOperand!.includes('.')) return
    this.currentOperand = this.currentOperand! + number.toString()
  }

  chooseOperation(operation: string) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') this.compute()
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation: number
    const prev = parseFloat(this.previousOperand!)
    const current = parseFloat(this.currentOperand!)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
          return

    }
    this.currentOperand = computation.toString()
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number: number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText =
        this.getDisplayNumber(Number(this.currentOperand))
    if (this.operation != null) {
        this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(Number(this.previousOperand))} ${this.operation}`
    } else {
        this.previousOperandTextElement.innerText = ''
    }
  }
}