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

let appData = {
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetMonth: 0,
    budgetDay: 0, 
    budgetPeriod: 0,
    expenseMonth: 0,
    start: function() {
        if(salaryAmount.value === ''){
            alert('Ошибка! Поле "Месячный доход" должно быть заполнено.');
        }
        let context = this.start.bind(appData);
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
    },
    showResult: function(){
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
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
        console.log(expensesItems.length)
    },
    addIncomesBlock: function(){
        let cloneIncomesItem = incomesItems[0].cloneNode(true);
        incomesItems[0].parentNode.insertBefore(cloneIncomesItem, incomePlus);
        incomesItems = document.querySelectorAll('.income-items');
        if(incomesItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            }
        }, this);
    },
    getIncome: function(){
        incomesItems = document.querySelectorAll('.income-items');
        incomesItems.forEach(function(item){
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            if(incomeTitle !== '' && incomeAmount !== ''){
                this.income[incomeTitle] = incomeAmount;
            }
        }, this);
    },
    getAddExpenses: function(){
        let addExpenses = expensesAdd.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        })  
    },
   
    getAddIncome: function(){
        addIncomeItems.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        }, this);
    },
    getPeriod: function(){
        periodAmount.textContent = periodSelect.value;
        this.budgetPeriod = this.budgetMonth * periodSelect.value;
        return periodSelect.value;
    },
    asking: function(){
    },
    getExpensesMonth: function(){
         for ( let key in appData.expenses){
          this.expenseMonth += +this.expenses[key];
         }
    },
    getAddIncomesMonth: function(){
        for ( let key in appData.income){
            this.budgetMonth += +appData.income[key];
        }
   },
    getBudget: function (){
            this.budgetMonth = +this.budget - +this.expenseMonth;
            console.log('Бюджет в месяц: ' + this.budgetMonth);  
    },
    targetMonth: function (){
        return targetAmount.value / this.budgetMonth;
    },
    statusIncome: function() {
       this.budgetDay = this.budgetMonth / 30;
    },
    getInfoDeposit: function(){
        if(this.deposit){
            do { 
                this.percentDeposit = prompt('Какой годовой процент?', '10');
                } while(isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);  
            do { 
                this.moneyDeposit = prompt('Какая сумма заложена?', '1000');
                } while(isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);  
        }
    },
    calcSavedMoney: function(){
        return this.budgetMonth * periodSelect.value;
    },
    blockInputs: function(){
        document.querySelectorAll('input').forEach(function(item){
            item.setAttribute('disabled', 'disabled');
        }) 
    },
    reset: function(){
        location.reload();
    }
};
button.setAttribute('disabled', false);
salaryAmount.addEventListener('input', function(){
    if(salaryAmount === ''){
        button.setAttribute('disabled', false);
    } else {
        button.removeAttribute('disabled');
    }
})

periodSelect.addEventListener('input', appData.getPeriod);

button.addEventListener('click', function(){    
    appData.start();
});
buttonCancel.addEventListener('click', appData.reset);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomesBlock);
