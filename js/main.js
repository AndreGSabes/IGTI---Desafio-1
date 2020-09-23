var globalCalculations = [
  {
    id: 1,
    description: 'Soma dos Valores (A + B)',
    calculationFunction: function (a, b) {
      return a + b;
    },
    type: 'a_b',
  },

  {
    id: 2,
    description: 'Subtração dos valores (A - B)',
    calculationFunction: function subOfValues(a, b) {
      return a - b;
    },
    type: 'a_b',
  },

  {
    id: 3,
    description: 'Subtração dos valores (B - A)',
    calculationFunction: function subOfValues(a, b) {
      return b - a;
    },
    type: 'b_a',
  },

  {
    id: 4,
    description: 'Mutiplicação dos Valores (A x B)',
    calculationFunction: function multiOfValues(a, b) {
      return a * b;
    },
    type: 'a_b',
  },

  {
    id: 5,
    description: 'Divisão dos valores (A ÷ B)',
    calculationFunction: function divOfValues(a, b) {
      return getDivisionsFrom(a, b);
    },
    type: 'a_b',
  },

  {
    id: 6,
    description: 'Divisão dos valores (B ÷ A)',
    calculationFunction: function divOfValues(b, a) {
      return getDivisionsFrom(b, a);
    },
    type: 'b_a',
  },

  {
    id: 7,
    description: 'Quadrado de A(a²) :',
    calculationFunction: function squareOfValue(a) {
      return formatNumber(a ** 2);
    },
    type: 'a',
  },

  {
    id: 8,
    description: 'Quadrado de B(b²) :',
    calculationFunction: function squareOfValue(b) {
      return formatNumber(b ** 2);
    },
    type: 'b',
  },

  {
    id: 9,
    description: 'Divisores inteiros de A:',
    calculationFunction: function divisorsFrom(a) {
      return getDivisorsFrom(a);
    },
    type: 'a',
  },

  {
    id: 10,
    description: 'Divisores inteiros de B:',
    calculationFunction: function divisorsFrom(b) {
      return getDivisorsFrom(b);
    },
    type: 'b',
  },

  {
    id: 11,
    description: 'Fatorial de A(a!):',
    calculationFunction: function factorial(a) {
      return getFactorialFrom(a);
    },
    type: 'a',
  },

  {
    id: 12,
    description: 'Fatorial de B(b!):',
    calculationFunction: function factorial(b) {
      return getFactorialFrom(b);
    },
    type: 'b',
  },
];

var globalInputA = document.querySelector('#numberA');
var globalInputB = document.querySelector('#numberB');

function start() {
  globalInputA.addEventListener('input', handleChangeNumberA);
  globalInputB.addEventListener('input', handleChangeNumberB);

  calculate();
}

function handleChangeNumberA() {
  calculate();
}

function handleChangeNumberB() {
  calculate();
}

function calculate() {
  var divCalculations = document.querySelector('#calculations');

  var innerCalculations = document.createElement('div');
  innerCalculations.classList.add('row');

  var a = parseInt(globalInputA.value, 10);
  var b = parseInt(globalInputB.value, 10);

  for (var i = 0; i < globalCalculations.length; i++) {
    var currentCalculation = globalCalculations[i];
    var type = currentCalculation.type;
    var calculationFunction = currentCalculation.calculationFunction;

    var id = 'input_' + currentCalculation.id;

    var value = getCalculationFrom(type, calculationFunction, a, b);

    var div = getMaterializeDiv();
    var input = getMaterializeInput(id, value);
    var label = getMaterializeLabel(id, currentCalculation.description);

    div.appendChild(input);
    div.appendChild(label);
    innerCalculations.appendChild(div);
  }

  divCalculations.innerHTML = '';
  divCalculations.appendChild(innerCalculations);
}

function getMaterializeDiv() {
  var div = document.createElement('div');
  div.classList.add('input-field', 'col', 's12', 'm6', 'l4');
  //51:07
  return div;
}

function getMaterializeInput(id, value) {
  var input = document.createElement('input');
  input.readOnly = true;
  input.type = 'text';
  input.id = id;
  input.value = value;

  return input;
}

function getMaterializeLabel(id, description) {
  var label = document.createElement('label');
  label.for = id;
  label.textContent = description;
  label.classList.add('active');

  return label;
}

function getCalculationFrom(type, calculationFunction, a, b) {
  var value = '';

  switch (type) {
    case 'a':
      value = calculationFunction(a);
      break;

    case 'b':
      value = calculationFunction(b);
      break;

    case 'a_b':
      value = calculationFunction(a, b);
      break;

    case 'b_a':
      value = calculationFunction(b, a);
      break;

    default:
      value = 'Cálculo não identificado.';
  }

  return value;
}

function getFactorialFrom(number) {
  if (number > 21) return 'Número é muito grande';

  var factorial = 1;

  for (var i = number; i > 1; i--) {
    factorial *= i;
  }

  return formatNumber(factorial);
}

function getDivisionsFrom(number1, number2) {
  if (number2 === 0) return 'Não é possivel dividir por 0';

  return formatNumber((number1 / number2).toFixed(2));
}

function getDivisorsFrom(number) {
  var divisors = [];

  for (var i = 1; i <= number; i++) {
    if (number % i === 0) {
      divisors.push(i);
    }
  }

  return divisors.join(',') + '(' + divisors.length + ')';
}

function resetCalc() {
  document.getElementById('numberA').value = '0';
  document.getElementById('numberB').value = '0';
}

function formatNumber(number) {
  return new Intl.NumberFormat('pt-BR').format(number);
}

start();
