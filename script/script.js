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
    expensesAdd = document.querySelector('.additional_expenses-item'),
    addIncomeItems = document.querySelectorAll('.additional_income-item'),
    depositPercent = document.querySelector('.deposit-percent');
let money,
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomesItems = document.querySelectorAll('.income-items');

class AppData {
    constructor(){
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
    }  
    start () {
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
        this.getAdd(expensesAdd.value.split(','), this.addExpenses);
        this.getAdd(addIncomeItems, this.addIncome);
        this.getAddIncomesMonth();
        this.getPeriod();
        this.showResult();
    }
    showResult () {
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
    }
};

AppData.prototype.addBlocks = (arr, pluses, str) =>{
    let cloneitem = arr[0].cloneNode(true);
    arr[0].parentNode.insertBefore(cloneitem, pluses);
    arr = document.querySelectorAll(str);
    if(arr.length === 3){
        pluses.style.display = 'none';
    }
};
AppData.prototype.getExpenses = () => {
    expensesItems = document.querySelectorAll('.expenses-items');
    expensesItems.forEach(item => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            appData.expenses[itemExpenses] = cashExpenses;
        }
    }, this);
    
};
AppData.prototype.getIncome = () => {
    incomesItems = document.querySelectorAll('.income-items');
    incomesItems.forEach(item => {
        let incomeTitle = item.querySelector('.income-title').value;
        let incomeAmount = item.querySelector('.income-amount').value;
        if(incomeTitle !== '' && incomeAmount !== ''){
            appData.income[incomeTitle] = incomeAmount;
        }
    }, this);
};
AppData.prototype.getAdd = (arr, elem) => {
    arr.forEach(item => {
        if (item.value || item.value == '') item = item.value;
        item = item.trim();
        if (item !== '') elem.push(item);
    }, this);
};
AppData.prototype.getPeriod = () => {
    periodAmount.textContent = periodSelect.value;
    appData.budgetPeriod = this.budgetMonth * periodSelect.value;
    return periodSelect.value;
};
AppData.prototype.getExpensesMonth = () => {
     for ( let key in appData.expenses){
      appData.expenseMonth += +appData.expenses[key];
     }
};
AppData.prototype.getAddIncomesMonth = () => {
    for ( let key in appData.income){
        appData.budgetMonth += +appData.income[key];
    }
};
AppData.prototype.getInfoDeposit = () => {
    if(appData.deposit){
            appData.percentDeposit = depositPercent.value;
            appData.moneyDeposit = depositAmount.value;
    }
};
AppData.prototype.getBudget = () => {
        appData.budgetMonth = +appData.budget - +appData.expenseMonth + (depositPercent.value * depositAmount.value)/12;
};
AppData.prototype.targetMonth = () => {
    return targetAmount.value / appData.budgetMonth;
};
AppData.prototype.statusIncome = () => {
   appData.budgetDay = appData.budgetMonth / 30;
};
AppData.prototype.calcSavedMoney = () => {
    return appData.budgetMonth * periodSelect.value;
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
    expensesPlus.addEventListener('click', this.addBlocks.bind(this, expensesItems, expensesPlus, '.expenses-items'));
    incomePlus.addEventListener('click', this.addBlocks.bind(this, incomesItems, incomePlus, '.income-items'));
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



