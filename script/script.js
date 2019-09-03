let button = document.getElementById('start'),
    pluses = document.getElementsByTagName('button'),

    plusIncome = pluses[0],
    plusExpenses = pluses[1],

    checkbox = document.querySelector('#deposit-check'),
    incomeItems = document.querySelectorAll('.additional_income-item'),
    incomeMonth = document.querySelector('.budget_month-value'),
    budgetDay = document.querySelector('.budget_day-value'),
    expenseMonthValue = document.querySelector('.expenses_month-value'),
    incomeAddValue = document.querySelector('.additional_income-value'),
    expenseAddValue = document.querySelector('.additional_expenses-value'),
    incomePeriod = document.querySelector('.income_period-value'),
    targetMonths = document.querySelector('.target_month-value'),

    income = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    expensesAdd = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    period = document.querySelector('period-select');

   