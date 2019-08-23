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

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(income.length);

console.log('Период' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать' + ' ' + mission + ' ' + 'долларов');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log(budgetDay);
console.log(budgetDay%30);

