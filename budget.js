const add = document.querySelector('.add');
const select = add.querySelector('.add__type');
const description = add.querySelector('.add__description');
const inc_exp = add.querySelector('.add__value');
const add_btn = add.querySelector('.add__btn');
// const inc_list = document.querySelector('.income__list');
// const exp_list = document.querySelector('.expenses__list');

description.addEventListener('keypress', get_input);
inc_exp.addEventListener('keypress', get_input);
add_btn.addEventListener('click', get_input_btn);

function get_input_btn() {
  console.log(select.value);
  console.log(description.value);
  console.log(inc_exp.value);
  where_to_print();
}

function get_input(e) {
  if (e.keyCode === 13) {
    console.log(select.value);
    console.log(description.value);
    console.log(inc_exp.value);
    where_to_print();
  }
}

function where_to_print() {
  const select_value = select.value;
  const description_value = description.value;
  const Inc_exp_value = inc_exp.value;
  const inc_exp_value = formatNumber(inc_exp.value);
  let sign, print_to;
  if (select_value === 'inc') {
    sign = '+';
    print_to = document.querySelector('.income__list');
  }
  if (select_value === 'exp') {
    sign = '-';
    print_to = document.querySelector('.expenses__list');
  }

  const print_list = `
  <div class="item clearfix" id="expense-0">
  <div class="item__description">${description_value}</div>
  <div class="right clearfix">
  <div class="item__value">${sign} ${inc_exp_value}</div>
  <div class="item__percentage">21%</div>
  <div class="item__delete">
  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
  </div>
  </div>
  </div>
  `;
  const new_list = document.createElement('div');
  new_list.innerHTML = print_list;
  print_to.appendChild(new_list);

  display_upperScreen(inc_exp_value, select_value, sign);
  total_inc(select_value, Inc_exp_value);
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

function total_inc(select, new_entry) {
  const display_total = document.querySelector('.budget__value');
  let current_value;
  if (select === 'inc') {
    current_value = current_value + new_entry;
  }
  if (select === 'exp') {
    current_value = current_value - new_entry;
  }
  display_total.innerHTML = current_value;
  // formatNumber(current_value);
  console.log('daniel');
}
