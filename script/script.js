'use strict';

let money,
    income = 99,
    expense,
    expense2,
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кварплата, поездки'),
    deposit = confirm('Есть ли у вас депозит в банке?'), 
    mission = '55555',
    period = 7;

/*console.log(addExpenses.toLowerCase().split(', '));*/

do  {
    money = prompt('Ваш месячный доход?', 10000);
}
while(isNaN(money) || money === '' || money === null);

function showTypeof(){
    return [typeof money, typeof income, typeof deposit];
}
console.log(showTypeof());

let expenseMonth,
    spend = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'кварплата'),
    spend2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'поездки');
function getExpensesMonth(){
    expense = + prompt('Во сколько это обойдется(кварплата)?', 500);
    while(isNaN(expense) || expense === '' || expense === null){
        expense = + prompt('Во сколько это обойдется(кварплата)?', 500)
    }

    expense2 = + prompt('Во сколько это обойдется(поездки)?', 500);
    while(isNaN(expense2) || expense2 === '' || expense2 === null){
        expense2 = + prompt('Во сколько это обойдется(поездки)?', 500)
    }

    expenseMonth = parseInt(expense) + parseInt(expense2);
    return expenseMonth;  
}
getExpensesMonth();
  
let budgetMonth = + money - (parseInt(expense) + parseInt(expense2));
console.log(budgetMonth);

let budgetDay = budgetMonth / 30;
if(budgetDay >= 0) {
    console.log(budgetDay);
} else {
    console.log('Что то пошло не так');
}


let monthsForMission = + mission / budgetMonth;
console.log('Срок достижения цели: ' + Math.ceil(monthsForMission) + ' месяцев');

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


let accumulatedMonth;
function getAccumulatedMonth(){
    accumulatedMonth = + money - expenseMonth;
    return accumulatedMonth;
}
console.log('Накопления за месяц: ' + getAccumulatedMonth());

function getTargetMonth(){
    let targetMonth = + mission / accumulatedMonth;
    if( Math.ceil(targetMonth) >= 0){
        console.log('Цель будет достигнута через ' + Math.ceil(targetMonth) + ' месяцев');
        return targetMonth;
    } else {
        console.log('Цель не будет достигнута');
    }
   
}
getTargetMonth();
