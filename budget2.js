/* eslint-disable no-self-assign */
const add = document.querySelector('.add');
const select = add.querySelector('.add__type');
const description = add.querySelector('.add__description');
const incExp = add.querySelector('.add__value');
const addBtn = add.querySelector('.add__btn');
const incList = document.querySelector('.income__list');
const expList = document.querySelector('.expenses__list');
const bdInc = document.querySelector('.budget__income--value');
const bdExp = document.querySelector('.budget__expenses--value');
const display_total = document.querySelector('.budget__value');
const percentageDis = document.querySelector('.budget__expenses--percentage');
const dateDisplay = document.querySelector('.budget__title--month')

class totalBudget {
  constructor(balance) {
    this.balance = balance;
    this.income = [];
    this.expense = [];
  }
  newInput(select, description, incExp) {
    let input = new newIncExp(description, incExp),
      listLocation, percentage, arrayLocation,
      display;
    if (select === 'inc') {
      arrayLocation = budget.income
      listLocation = incList;
      display = bdInc;
      percentage = ''
    } else if (select === 'exp') {
      input.value = input.value * -1;
      arrayLocation = budget.expense
      listLocation = expList;
      display = bdExp;
      percentage = `<div class="item__percentage" id = '${input.id}'></div>`
    }
    arrayLocation.push(input);
    this.printList(input, listLocation, display, percentage);
    this.removeData(input.id, listLocation, input, arrayLocation);
    this.disExpenseAbove(input)
    this.expensePercentage();
  }

  printList(input, listLocation, display, percentage) {
    const stringInput = `<div class="item clearfix" id="expense-0">
      <div class="item__description">${input.description}</div>
      <div class="right clearfix">
      <div class="item__value">${input.value}</div>
      ${percentage}
      <div class="item__delete">
      <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
      </div>
      </div>
      </div>`;
    let newDiv = document.createElement('div');
    newDiv.className = input.id;
    newDiv.innerHTML = stringInput;
    listLocation.appendChild(newDiv);
    display.innerHTML = input.value;
    this.updateBalance(input.value);
  }

  removeData(nameSpecific, listLocation, input, arrayLocation) {
    const removeThis = document.querySelector('.' + nameSpecific);
    removeThis.addEventListener('click', function (e) {
      if (e.target.matches('i')) {
        let thisValue = parseFloat(
          removeThis.querySelector('.item__value').innerHTML
        );
        budget.balance -= thisValue;
        display_total.innerHTML = budget.balance;
        listLocation.removeChild(removeThis);
        let toBeRemoved = arrayLocation.indexOf(input)
        arrayLocation.splice(toBeRemoved, 1)
        budget.expensePercentage();
      }
    });
  }

  removeFromArray() {

  }

  updateBalance(input) {
    budget.balance += input;
    display_total.innerHTML = budget.balance;
  }

  expensePercentage() {
    let totalIncome = 0;
    budget.income.forEach(function (obj) {
      totalIncome = totalIncome + parseFloat(obj.value);
    });
    budget.expense.forEach(function (obj) {
      let percentageIndiv = (Math.abs(obj.value) / totalIncome) * 100,
        printTo = document.querySelector('#' + obj.id)
      budget.conditionForInfinity(percentageIndiv, printTo);
    })
    return totalIncome;
  }

  disExpenseAbove(input) {
    let totalIncome = this.expensePercentage(),
      percentComputed = (Math.abs(input.value) / totalIncome) * 100;
    budget.conditionForInfinity(percentComputed, percentageDis);
  }

  conditionForInfinity(percentageIndiv, printTo) {
    if (isFinite(percentageIndiv)) {
      printTo.innerHTML = `${Math.ceil(percentageIndiv)} %`
    } else {
      printTo.innerHTML = '0 %'
    }
  }
}



class newIncExp {
  constructor(description, value) {
    this.id = 'JD' + value + Math.floor(Math.random() * 99999);
    this.description = description;
    this.value = parseFloat(value);
  }
}

function get_input_btn() {
  let value = parseInt(incExp.value)
  if (isNaN(value)) {
    value = 0
    console.log('daniel')
  } else {
    console.log('jose')
    value = value
  }
  budget.newInput(select.value, description.value, value);
  description.value = ''
  incExp.value = ''
}

function get_input(e) {
  if (e.keyCode === 13) {
    get_input_btn()
  }
}

function dateDisplayNow() {
  var date = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  dateDisplay.innerHTML = months[date.getMonth()] + ' ' + date.getUTCFullYear()
}


let budget = new totalBudget(0);
dateDisplayNow();
addBtn.addEventListener('click', get_input_btn);
description.addEventListener('keypress', get_input);
incExp.addEventListener('keypress', get_input);
