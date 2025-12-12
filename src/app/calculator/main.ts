export class CalculatorClass {
  previousOperandTextElement: HTMLDivElement;
  currentOperandTextElement: HTMLDivElement;
  currentOperand: string = '';
  previousOperand: string = '';
  operation?: string;

  constructor(
    previousOperandTextElement: HTMLDivElement,
    currentOperandTextElement: HTMLDivElement
  ) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
    this.updateDisplay()
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1)
    this.updateDisplay()
  }

  appendNumber(number: string | number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand + number.toString()
    this.updateDisplay()
  }

  chooseOperation(operation: string) {
    if (!this.currentOperand) return
    if (this.previousOperand) this.compute()
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
    this.updateDisplay()
  }

  compute() {
    if (!this.previousOperand || !this.currentOperand || !this.operation) return
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    let computation: number
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
    this.updateDisplay()
  }

  getDisplayNumber(number: number) {
    if (isNaN(number)) return '';
    const stringNumber = number.toString()
    const [integerPart, decimalPart] = stringNumber.split('.')
    const integerDisplay = parseInt(integerPart).toLocaleString('en')
    return decimalPart != null ? `${integerDisplay}.${decimalPart}` : integerDisplay
  }

  updateDisplay() {
    // currentOperand が空なら「0」を表示
    this.currentOperandTextElement.innerText =
      this.currentOperand ? this.getDisplayNumber(Number(this.currentOperand)) : '0';

    // previousOperand と operation がある場合のみ表示
    if (this.previousOperand && this.operation) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(Number(this.previousOperand))} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}