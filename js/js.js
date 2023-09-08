const keyboard = document.querySelector('#keyboard');
const btnOperands = document.querySelectorAll('[data-subop]');
const btnNumbers = document.querySelectorAll('[data-number]');
const btnEqual = document.querySelector('[data-equal]');
const btnClear = document.querySelector('[data-allclear]');
const btnDelete = document.querySelector('[data-delete]');

const display = document.querySelector('#display');
const displayActual = document.querySelector('#displayActual');
const displayPrevious = document.querySelector('#displayPrevious');
const clickSound = new Audio('assets/click2.wav')

class Calculator {
  constructor(displayPrevious, displayActual) {
    this.previous = displayPrevious;
    this.current = displayActual;
    this.clear();
  }

  display() {
    this.current.innerText = this.currentOperand;
    this.previous.innerText = this.previousOperand;
  }

  evaluation() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const act = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(act)) return;

    switch (this.operator) {
      case '+':
        result = prev + act;
        break;
      case '-':
        result = prev - act;
        break;
      case '*':
        result = prev * act;
        break;
      case '/':
        result = prev / act;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operator = undefined;
    this.previousOperand = '';
  }

  addNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  performOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.evaluation();
    }
    this.operator = operation;
    this.previousOperand = this.current.innerText + ' ' + operation;
    this.currentOperand = '';
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operator = undefined;
    this.display()
  }

  backspace() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.display()
  }
}

const calculator = new Calculator(displayPrevious, displayActual);



keyboard.addEventListener('click', () => {
  if (event.target.classList.contains('disable')) return
  clickSound.play()
})

btnNumbers.forEach(number => {
  number.addEventListener('click', () => {
    clickSound.play()
    calculator.addNumber(number.value);
    calculator.display();
  });
});

btnOperands.forEach(operand => {
  operand.addEventListener('click', () => {
    calculator.performOperation(operand.value);
    calculator.display();
  });
});

btnEqual.addEventListener('click', () => {
  calculator.evaluation();
  calculator.display();
});

btnClear.addEventListener('click', () => {
  calculator.clear()
});

btnDelete.addEventListener('click', () => {
  calculator.backspace()
});