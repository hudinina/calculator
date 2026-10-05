let firstNumber = '';
let operator = undefined;
let secondNumber = '';
let justCalculated = false;

const round = (value) => Number(value.toPrecision(9));

function operate() {
  if (operator === '+') {
    return add(firstNumber, secondNumber);
  } else if (operator === '-') {
    return subtract(firstNumber, secondNumber);
  } else if (operator === '×') {
    return multiply(firstNumber, secondNumber);
  } else if (operator === '÷') {
    return divide(firstNumber, secondNumber);
  } else {
    return percentage(firstNumber, secondNumber);
  };
};

const add = function(a,b) {
	return round(+a + +b);
};

const subtract = function(a,b) {
	return round(+a - +b);
};

const sum = function(arr) {
	return arr.reduce((sum, current) => sum + current, 0);
};

// const multiply = function(arr) {
//   return arr.reduce((result, current) => result * current, 1);
// };

const multiply = function (a,b) {
  return round(+a * +b);
};

const divide = function (a,b) {
  return round(+a / +b);
};

const percentage = function (a,b) {
  return round((+a / +b) * 100);
}

const power = function(a,b) {
	return round((+a) ** (+b));
};

const factorial = function(x) {
	let result = 1;
  for (let i = 1; i <= x; i++) {
    result *= i;
  };
  return result;
};

// const factorial = function (x) {
//   const numbers = [];
//   for (let i = 1; i <= x; i++) {
//     numbers.push(i);
//   }
//   return numbers.reduce((product, n) => product * n, 1);
// };

// create calculator body
const calculator = document.querySelector('#calculator');
calculator.classList.add('calculator');

// create dipslay
const display = document.querySelector('#display');
display.classList.add('display');

// create area for buttons
const container = document.querySelector('#container');
container.classList.add('container');

// create buttons
const numberButtons = ['0','1','2','3','4','5','6','7','8','9','.'];
for (const choice of numberButtons) {
  const button = document.createElement('button');
  button.textContent = choice;
  button.classList.add('button');
  button.addEventListener('click', () => {
    if (justCalculated === true) {
      firstNumber = '' + button.textContent;
      operator = undefined;
      secondNumber = '';
      display.textContent = '' + firstNumber;
      justCalculated = false; // option for starting new calculation when entering number after '=' has been clicked
    } else if (justCalculated === false && operator === undefined) {
      if (firstNumber.includes('.') && button.textContent === '.') {
        return;
      } 
        firstNumber += button.textContent; // enter first number if no operator is detected
        display.textContent += button.textContent;
    } else {
      if (secondNumber.includes('.') && button.textContent === '.') {
        return;
      } 
        secondNumber += button.textContent; // enter second number if operator has been entered
        display.textContent += button.textContent;
    };
  });
  container.appendChild(button);
};

const operatorButtons = ['+','-','×','÷','%'];
for (const choice of operatorButtons) {
  const button = document.createElement('button');
  button.textContent = choice;
  button.classList.add('button');
  button.addEventListener('click', () => {
    if (justCalculated === true) {
      operator = choice;
      secondNumber = '';
      display.textContent = `${firstNumber} ${operator} `;
      justCalculated = false;
    } else if (operator !== undefined && secondNumber !== '') {
      firstNumber = String(operate());
      operator = choice;
      secondNumber = '';
      display.textContent = `${firstNumber} ${operator} `; // option for when users press a new operator instead of '='
    } else if (operator !== undefined && secondNumber === '') {
      operator = choice;
      display.textContent = `${firstNumber} ${operator} `; // option for when users change operator mid-way (before entering second number)
    } else {
      operator = choice;
      display.textContent += ` ${choice} `;
    }
  });
  container.appendChild(button);
};

const resultButton = document.createElement('button');
resultButton.textContent = '=';
resultButton.classList.add('button');
resultButton.addEventListener('click', () => {
  if (operator === '÷' && secondNumber === '0') {
    display.textContent = `Invalid input!`;
    justCalculated = true;
    return;
  }
  display.textContent += ` = ${operate()}`;
  justCalculated = true;
  firstNumber = String(operate());
});
container.appendChild(resultButton);


const clearButton = document.createElement('button');
clearButton.textContent = 'C';
clearButton.classList.add('button');
clearButton.addEventListener('click', () => {
  display.textContent = '';
  firstNumber = '';
  operator = undefined;
  secondNumber = '';
  justCalculated = false;
});
container.appendChild(clearButton);

const backspaceButton = document.createElement('button');
backspaceButton.textContent = 'X';
backspaceButton.classList.add('button');
backspaceButton.addEventListener('click', () => {
  if (justCalculated === true) {
    return;
  } else if (operator === undefined) { 
        firstNumber = firstNumber.slice(0, -1);
        display.textContent = firstNumber;
    } else { 
      if (secondNumber === '') {
        operator = undefined;
        display.textContent = firstNumber;
      } else {
        secondNumber = secondNumber.slice(0, -1);
        display.textContent = `${firstNumber} ${operator} ${secondNumber}`;
      }
    };
});
container.appendChild(backspaceButton);