'use strict'; 

let button = document.getElementById('start'),
    buttonCancel = document.querySelector('#cancel'),
    pluses = document.getElementsByTagName('button'),
    money,
    incomePlus = pluses[0],
    expensesPlus = pluses[1],
    checkbox = document.querySelector('#deposit-check'),
    addIncomeItems = document.querySelectorAll('.additional_income-item'),
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
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomesItems = document.querySelectorAll('.income-items'),
    expensesAdd = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    addExpensesValueItem = document.querySelector('.additional_expenses-item'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount'),
    periodSelect = document.querySelector('.period-select');

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
    console.log(this)
    this.budget = +salaryAmount.value;
    console.log(this.budget);
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getBudget();
    this.statusIncome();
    this.getAddExpenses();
    this.getAddIncome();
    this.getAddIncomesMonth();
    this.getPeriod();
    
    this.showResult();
};

AppData.prototype.showResult = function(){
    budgetMonthValue.value = this.budgetMonth;
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
AppData.prototype.addExpensesBlock = function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
    }
    console.log(expensesItems.length)
};
AppData.prototype.addIncomesBlock = function(){
    let cloneIncomesItem = incomesItems[0].cloneNode(true);
    incomesItems[0].parentNode.insertBefore(cloneIncomesItem, incomePlus);
    incomesItems = document.querySelectorAll('.income-items');
    if(incomesItems.length === 3){
        incomePlus.style.display = 'none';
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
AppData.prototype.getAddExpenses = function(){
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
AppData.prototype.asking = function(){
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
AppData.prototype.getBudget = function (){
        this.budgetMonth = +this.budget - +this.expenseMonth;
        console.log('Бюджет в месяц: ' + this.budgetMonth);  
};
AppData.prototype.targetMonth = function (){
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.statusIncome = function() {
   this.budgetDay = this.budgetMonth / 30;
};
AppData.prototype.getInfoDeposit = function(){
    if(this.deposit){
        do { 
            this.percentDeposit = prompt('Какой годовой процент?', '10');
            } while(isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);  
        do { 
            this.moneyDeposit = prompt('Какая сумма заложена?', '1000');
            } while(isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);  
    }
};
AppData.prototype.calcSavedMoney = function(){
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.blockInputs = function(){
    document.querySelectorAll('input').forEach(function(item){
        item.setAttribute('disabled', 'disabled');
    }) 
};
AppData.prototype.reset = function(){
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
        console.log(this)
    });
    buttonCancel.addEventListener('click', this.reset);
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomesBlock);
}

const appData = new AppData();

AppData.prototype.eventListeners();



