'use strict';

let money,
    income,
    addExpenses,
    deposit, 
    mission,
    period;

money = 999;
income = '99';
addExpenses = 'Учеба, Поездки, Одежда';
deposit = true;
mission = '55555';
period = 7;

/*console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(income.length);

console.log('Период' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать' + ' ' + mission + ' ' + 'долларов');

console.log(addExpenses.toLowerCase().split(', '));*/

let budgetDay = money / 30;
console.log(budgetDay);
console.log(budgetDay%30);

//lesson03

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
console.log(addExpenses.split(', '));
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

let spend = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    spend2 = prompt('Какие обязательные ежемесячные расходы у вас есть?'),
    expense = prompt('Во сколько это обойдется?'),
    expense2 = prompt('Во сколько это обойдется?'),
    budgetMonth = + money - (parseInt(expense) + parseInt(expense2));
console.log(budgetMonth);
console.log(mission);

let monthsForMission = + mission / budgetMonth;
console.log(Math.ceil(monthsForMission));

budgetDay = budgetMonth / 30;
console.log(Math.floor(budgetDay));

if (budgetDay >= 800){
    console.log('Высокий уровень дохода');
} else if(budgetDay >= 300 && budgetDay <= 800){
    console.log('Средний уровень дохода');
} else if(budgetDay >= 0 && budgetDay <= 300){
    console.log('Низкий уровень дохода');
} else {
    console.log('Что-то пошло не так');
}