const add = document.querySelector('.add');
const select = add.querySelector('.add__type');
const description = add.querySelector('.add__description');
const inc_exp = add.querySelector('.add__value');
const add_btn = add.querySelector('.add__btn');
const inc_list = document.querySelector('.income__list');
const exp_list = document.querySelector('.expenses__list');
const percentage_dis = document.querySelector('.budget__expenses--percentage');
let inv_percentage,
  inc_array = [],
  exp_array = [],
  newobj;
add_btn.addEventListener('click', get_input_btn);
description.addEventListener('keypress', get_input);
inc_exp.addEventListener('keypress', get_input);

let Income_expense = class {
  constructor(Description, Select, inc_exp) {
    this.Description = Description;
    this.Select = Select;
    this.inc_exp = inc_exp;
  }
  where_to_print() {
    let sign, current_array, list_point, percentage_print;
    let formated_number = formatNumber(parseFloat(this.inc_exp));
    total_inc(this.Select, this.inc_exp);
    if (this.Select === 'inc') {
      sign = '+';
      current_array = inc_array;
      list_point = inc_list;
      percentage_print = '';
    }
    if (this.Select === 'exp') {
      sign = '-';
      current_array = exp_array;
      list_point = exp_list;
      percentage_print = `<div class="item__percentage">${inv_percentage}</div>`;
    }
    const print_list = function (list_point, current_array) {
      const htmlstring = current_array
        .map(function (element) {
          return `<div class="item clearfix" id="expense-0">
        <div class="item__description">${element.Description}</div>
        <div class="right clearfix">
        <div class="item__value">${sign} ${formatNumber(element.inc_exp)}</div>
        ${percentage_print}
        <div class="item__delete">
        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
        </div>
        </div>
        </div>`;
        })
        .join('');
      list_point.innerHTML = htmlstring;
      console.log('PRINT');
    };
    current_array.push(this);
    total_inc(this.Select, this.inc_exp);
    print_list(list_point, current_array);
    display_upperScreen(formated_number, this.Select, sign);
    this.rem_ind(current_array, this, list_point);
  }

  rem_ind(array, elem, list_point) {
    list_point.addEventListener('click', function (e) {
      if (e.target.matches('i')) {
        let current_node = e.target.parentNode.parentNode.parentNode.parentNode;
        console.log('joseDaniel');
        console.log(e.target.parentNode.parentNode.parentNode.parentNode);
        array.splice(array.indexOf(elem), 1);
        list_point.removeChild(current_node);
        total_inc();
      }
    });
  }
};

function get_input_btn() {
  console.log(select.value);
  console.log(description.value);
  console.log(inc_exp.value);
  newobj = new Income_expense(description.value, select.value, inc_exp.value);
  newobj.where_to_print();
}

function get_input(e) {
  if (e.keyCode === 13) {
    console.log(select.value);
    console.log(description.value);
    console.log(inc_exp.value);
    newobj = new Income_expense(description.value, select.value, inc_exp.value);
    newobj.where_to_print();
  }
}

function display_upperScreen(latest_value, select, sign) {
  const bd_inc = document.querySelector('.budget__income--value');
  const bd_exp = document.querySelector('.budget__expenses--value');
  console.log(bd_inc.textContent);
  console.log(bd_exp.textContent);
  if (select === 'inc') {
    bd_inc.textContent = `${sign} ${latest_value}`;
  }
  if (select === 'exp') {
    bd_exp.textContent = `${sign} ${latest_value}`;
  }
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function total_inc(select, inv_expense) {
  const display_total = document.querySelector('.budget__value');
  let inc_sum = 0,
    exp_sum = 0;
  inc_array.forEach(function (obj) {
    inc_sum = inc_sum + parseFloat(obj.inc_exp);
    console.log(obj.inc_exp);
  });
  exp_array.forEach(function (obj) {
    exp_sum += parseFloat(obj.inc_exp);
  });
  let total_Income = inc_sum - exp_sum;
  display_total.innerHTML = total_Income;
  console.log(select);
  if (select === 'exp') {
    exp_percentage(inc_sum, inv_expense);
  } else {
    return;
  }
}

function exp_percentage(totalIncome, inv_expense) {
  inv_percentage = Math.floor(
    (parseFloat(inv_expense) / parseFloat(totalIncome)) * 100
  );
  console.log('Asuncion');
  console.log(inv_percentage);
  percentage_dis.innerHTML = `${inv_percentage} %`;
  return inv_percentage;
}
