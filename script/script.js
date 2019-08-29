'use strict';

let money,
    income,
    addExpenses,
    deposit, 
    mission,
    period;

mission = '55555';
period = 7;

/*console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(income.length);

console.log('Период' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать' + ' ' + mission + ' ' + 'долларов');

console.log(addExpenses.toLowerCase().split(', '));*/

//lesson03

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

function showTypeof(){
    return [typeof money, typeof income, typeof deposit];
}
console.log(showTypeof());

let spend = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    spend2 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    expense = prompt('Во сколько это обойдется?'),
    expense2 = prompt('Во сколько это обойдется?'),
    budgetMonth = + money - (parseInt(expense) + parseInt(expense2));
console.log(budgetMonth);

let budgetDay = budgetMonth / 30;
console.log(budgetDay);

let monthsForMission = + mission / budgetMonth;
console.log('Срок достижения цели: ' + Math.ceil(monthsForMission) + ' месяцев');

budgetDay = budgetMonth / 30;


function getStatusIncome() {
    if (budgetDay >= 800){
        return ('Высокий уровень дохода');
    } else if(budgetDay >= 300 && budgetDay < 800){
       return ('Средний уровень дохода');
    } else if(budgetDay >= 0 && budgetDay < 300){
       return ('Низкий уровень дохода');
    } else {
       return ('Что-то пошло не так');
    }
}
console.log(getStatusIncome());

//lesson04
let expenseMonth;
function getExpensesMonth(){
    expenseMonth = parseInt(expense) + parseInt(expense2);
    return expenseMonth;
}
getExpensesMonth();

let accumulatedMonth;
function getAccumulatedMonth(){
    accumulatedMonth = + money - expenseMonth;
    return accumulatedMonth;
}
console.log('Накопления за месяц: ' + getAccumulatedMonth());

function getTargetMonth(){
    let targetMonth = + mission / accumulatedMonth;
    return targetMonth;
}
getTargetMonth();
