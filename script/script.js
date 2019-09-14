'use strict'; 

const button = document.getElementById('start'),
    buttonCancel = document.querySelector('#cancel'),
    pluses = document.getElementsByTagName('button'),
    
    incomePlus = pluses[0],
    expensesPlus = pluses[1],
    checkbox = document.querySelector('#deposit-check'),
   
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expenseMonthValue = document.querySelector('.expenses_month-value'),
    addIncomeValue = document.querySelector('.additional_income-value'),
    addExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonths = document.querySelector('.target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    periodAmount = document.querySelector('.period-amount'),
    periodSelect = document.querySelector('.period-select'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    targetAmount = document.querySelector('.target-amount'),
    depositPercent = document.querySelector('.deposit-percent');
let expensesItems = document.querySelectorAll('.expenses-items'),
    money,
    addIncomeItems = document.querySelectorAll('.additional_income-item'),
    incomesItems = document.querySelectorAll('.income-items'),
    expensesAdd = document.querySelector('.additional_expenses-item'),mb,
    addExpensesValueItem = document.querySelector('.additional_expenses-item'),
    incomeItems = document.querySelectorAll('.income-items');

const AppData = function(){
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetMonth = 0;
    this.budgetDay = 0; 
    this.budgetPeriod = 0;
    this.expenseMonth = 0;
};
AppData.prototype.start = function() {
    if(salaryAmount.value === ''){
        alert('Ошибка! Поле "Месячный доход" должно быть заполнено.');
    }
    let context = this.start.bind(appData);
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.statusIncome();
    this.getAddExpenses();
    this.getAddIncome();
    this.getAddIncomesMonth();
    this.getPeriod();
    this.showResult();
};
AppData.prototype.showResult = function(){
    budgetMonthValue.value = Math.ceil(this.budgetMonth);
    budgetDayValue.value =  Math.floor(+this.budgetDay);
    expenseMonthValue.value = this.expenseMonth;
    addExpensesValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonths.value = Math.ceil(this.targetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    this.blockInputs();
    button.style.display = 'none';
    buttonCancel.style.display = 'block'; 
};
AppData.prototype.addExpensesBlock = () => {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
    }
};

AppData.prototype.addIncomesBlock = () => {
    let cloneIncomesItem = incomesItems[0].cloneNode(true);
    incomesItems[0].parentNode.insertBefore(cloneIncomesItem, incomePlus);
    incomesItems = document.querySelectorAll('.income-items');
    if(incomesItems.length === 3){
        incomePlus.style.display = 'none';
    }
};
AppData.prototype.addBlocks = function(arr, pluses){
    console.log(arr);
    let cloneitem = arr[0].cloneNode(true);
    arr[0].parentNode.insertBefore(cloneitem, pluses);
    if(arr.length === 3){
        pluses.style.display = 'none';
    }

};
AppData.prototype.getExpenses = function(){
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            this.expenses[itemExpenses] = cashExpenses;
        }
    }, this);
};
AppData.prototype.getIncome = function(){
    incomesItems = document.querySelectorAll('.income-items');
    incomesItems.forEach(function(item){
        let incomeTitle = item.querySelector('.income-title').value;
        let incomeAmount = item.querySelector('.income-amount').value;
        if(incomeTitle !== '' && incomeAmount !== ''){
            this.income[incomeTitle] = incomeAmount;
        }
    }, this);
};
AppData.prototype.getAddExpenses = () => {
    let addExpenses = expensesAdd.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== ''){
            appData.addExpenses.push(item);
        }
    })  
};
AppData.prototype.getAddIncome = function(){
    addIncomeItems.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            this.addIncome.push(itemValue);
        }
    }, this);
};
AppData.prototype.getPeriod = function(){
    periodAmount.textContent = periodSelect.value;
    this.budgetPeriod = this.budgetMonth * periodSelect.value;
    return periodSelect.value;
};
AppData.prototype.getExpensesMonth = function(){
     for ( let key in this.expenses){
      this.expenseMonth += +this.expenses[key];
     }
};
AppData.prototype.getAddIncomesMonth = function(){
    for ( let key in this.income){
        this.budgetMonth += +this.income[key];
    }
};
AppData.prototype.getInfoDeposit = function(){
    if(this.deposit){
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
    }
};
AppData.prototype.getBudget = function (){
        this.budgetMonth = +this.budget - +this.expenseMonth + (depositPercent.value * depositAmount.value)/12;
};
AppData.prototype.targetMonth = function (){
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.statusIncome = function() {
   this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.calcSavedMoney = function(){
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.blockInputs = () => {
    document.querySelectorAll('input').forEach((item) => {
        item.setAttribute('disabled', 'disabled');
    }) 
    depositBank.setAttribute('disabled', 'disabled');
};
AppData.prototype.reset = () => {
    location.reload();
};
AppData.prototype.eventListeners = function(){
    button.setAttribute('disabled', false);
    salaryAmount.addEventListener('input', function(){
        if(salaryAmount === ''){
            button.setAttribute('disabled', false);
        } else {
            button.removeAttribute('disabled');
        }
    })

    periodSelect.addEventListener('input', this.getPeriod);
    
    button.addEventListener('click', function(){   
        appData.start();
    });
    buttonCancel.addEventListener('click', this.reset);
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addBlocks.bind(incomesItems, incomePlus));
}

checkbox.addEventListener('change', function(){
    if(checkbox.checked){
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        AppData.deposit = 'true';
        depositBank.addEventListener('change', function(){
            let selectIndex = this.options[this.selectedIndex].value;
            if(selectIndex === 'other'){
                depositPercent.style.display = 'inline-block';
                depositPercent.value = '';
                depositPercent.removeAttribute('disabled');
            }else {
                depositPercent.style.display = 'none';
                depositPercent.value = selectIndex;
            }
        });
    } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositAmount.value = '';
        AppData.deposit = 'false';
    }
});

const appData = new AppData();

AppData.prototype.eventListeners();



