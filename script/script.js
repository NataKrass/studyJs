'use strict';

let income = 99,
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Кварплата, поездки'),
    deposit = confirm('Есть ли у вас депозит в банке?'), 
    mission = '55555',
    period = 7;

/*console.log(addExpenses.toLowerCase().split(', '));*/
let appData = {
    budget: function() {
        do {
          appData.budget = prompt('Ваш месячный доход?', 10000);
          console.log('Месячный доход: ' + appData.budget)
        }
        while(isNaN(appData.budget) || appData.budget === '' || appData.budget === null);
    },
    budgetDay: 0, 
    expenseMonth: 0,
    expenses: {
        
       },
    asking: function(){
        let expense;
            for (let i = 0; i < 2; i++) {
           
            let spend = prompt('Какие обязательные ежемесячные расходы у вас есть?');
            do { 
               expense = +prompt('Во сколько это обойдется(кварплата)?', 500);
               appData.expenses[spend] = expense;
                } while(isNaN(expense) || expense === '' || expense === null);     
        }
       },
    getExpensesMonth: function(){
         for ( let key in appData.expenses){
          appData.expenseMonth += appData.expenses[key];
         }
        },
    
    budgetMonth: function(){
            appData.budgetMonth = + appData.budget - appData.expenseMonth;
            console.log('Бюджет в месяц: ' + appData.budgetMonth);  
        },
    getAccumulatedMonth: function (){
        appData.getAccumulatedMonth = + appData.budget - appData.expenseMonth;
            return appData.getAccumulatedMonth;
        },
    targetMonth: function (){
        let targetMonth = + mission / appData.getAccumulatedMonth;
            if( Math.ceil(targetMonth) >= 0){
                console.log('Цель будет достигнута через ' + Math.ceil(targetMonth) + ' месяцев');
                return targetMonth;
            } else {
                console.log('Цель не будет достигнута');
            }
        },
    statusIncome: function() {
        appData.budgetDay = appData.budgetMonth / 30;
        if(appData.budgetDay >= 0) {
            console.log('Бюджет в день: ' + appData.budgetDay);
        } else {
            console.log('Что то пошло не так');
        }
            if (appData.budgetDay >= 800){
                return ('Высокий уровень дохода');
            } else if(appData.budgetDay >= 300 && appData.budgetDay < 800){
            return ('Средний уровень дохода');
            } else if(appData.budgetDay >= 0 && appData.budgetDay < 300){
            return ('Низкий уровень дохода');
            } else {
            return ('Что-то пошло не так');
            }
        }
};

appData.budget();

appData.asking();

appData.getExpensesMonth();

console.log('Расходы в месяц: ' + appData.expenseMonth);

appData.budgetMonth();

console.log(appData.statusIncome());

console.log('Накопления за месяц: ' + appData.getAccumulatedMonth());

appData.targetMonth();

for (let key in appData ) {
    console.log('Наша программа включает в себя данные: ' + key + ': ' + appData[key]);
}
