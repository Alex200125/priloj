let startBtn = document.getElementById('start'),
    bud_v = document.getElementsByClassName('budget-value')[0],
    day_v = document.getElementsByClassName('daybudget-value')[0],
    level_v = document.getElementsByClassName('level-value')[0],
    exp_v = document.getElementsByClassName('expenses-value')[0],
    opt_v = document.getElementsByClassName('optionalexpenses-value')[0],
    inc_v = document.getElementsByClassName('income-value')[0],
    month_v = document.getElementsByClassName('monthsavings-value')[0],
    year_v = document.getElementsByClassName('yearsavings-value')[0],
    exp_i = document.getElementsByClassName('expenses-item'),
    btn_exp_i = document.getElementsByTagName('button')[0],
    btn_optExp = document.getElementsByTagName('button')[1],
    btn_countBud = document.getElementsByTagName('button')[2],
    optExpItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncomeLable = document.querySelector('.choose-income-label'),
    checkbox = document.querySelector('#savings'),
    chooseIncome = document.querySelector('.choose-income'),
    chooseSum = document.querySelector('#sum'),
    percent = document.querySelector('#percent'),
    year = document.querySelector('.year-value'),
    inp_month_v = document.querySelector('.month-value'),
    inp_day_v =document.querySelector('.day-value');
      
let money, time;

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    buttons: true,
};

btnDisabled(true);

startBtn.addEventListener('click', function() {
    time = prompt("Введите дату в формате YYYY-MM-DD");
    money = +prompt("Ваш бюджет на месяц?");
    
    while(isNaN(money)|| money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?");
    }
    appData.budget = money;
    appData.timeData = time;
    bud_v.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    inp_month_v.value = new Date(Date.parse(time)).getMonth() + 1;
    inp_day_v.value = new Date(Date.parse(time)).getDate();

    btnDisabled(false);
});



btn_exp_i.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < exp_i.length; i++) {
        let a = exp_i[i].value,
            b = exp_i[++i].value;

        if ((typeof (a)) != null && (typeof (b)) != null && a != '' && b != '') {
            appData.expenses[a] = +b;
            sum += +b;
        } else {
            console.log('Что-то не так');
            i = i - 1;
        }
    }
    exp_v.textContent = sum;
});

btn_optExp.addEventListener('click', function() {
    for(let i = 0; i < optExpItem.length;i++) {
        let a = optExpItem[i].value;

        if((typeof(a)) != null && a != '') {
            appData.optionalExpenses[i] = a;
        } else {
            alert("Пожалуйста, заполните данные");
            i--;
        }
        opt_v.textContent += appData.optionalExpenses[i] + ' ';
    }
    
});

btn_countBud.addEventListener('click', function() {
    if(appData.expense != null || appData.expenses != undefined) {
        let summ = 0;
        for(key in appData.expenses) {
            summ += appData.expenses[key];
        }
        
        appData.moneyPerDay = ((appData.budget - summ) / 30).toFixed();
        day_v.textContent = appData.moneyPerDay;

        if(appData.moneyPerDay < 100) {
            level_v.textContent = "Минимальный уровень достатка";
        } else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            level_v.textContent = "Уже лучше!";
        } else if(appData.moneyPerDay > 2000) {
            level_v.textContent = "Вот теперь, то что надо!";
        } else {
            level_v.textContent = "Что-то пошло не так :(";
        } 
    } else if(appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        day_v.textContent = appData.moneyPerDay;

        if(appData.moneyPerDay < 100) {
            level_v.textContent = "Минимальный уровень достатка";
        } else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            level_v.textContent = "Уже лучше!";
        } else if(appData.moneyPerDay > 2000) {
            level_v.textContent = "Вот теперь, то что надо!";
        } else {
            level_v.textContent = "Что-то пошло не так :(";
        } 
    } else {
        day_v.textContent = 'Произошла ошибка';
    }
    
});

chooseIncome.addEventListener('input', function() {
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    inc_v.textContent = appData.income;
});

checkbox.addEventListener('click', function() {
    if(appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

chooseSum.addEventListener('input', function() {
    if(appData.savings == true) {
        let sum = +chooseSum.value,
            perc = +percent.value;
        appData.monthIncome = sum / 100 / 12 * perc;
        appData.yearIncome = sum / 100 * perc;

        month_v.textContent = appData.monthIncome.toFixed(1);
        year_v.textContent = appData.yearIncome.toFixed(1);
    }
});

percent.addEventListener('input', function() {
    if(appData.savings == true) {
        if(appData.savings == true) {
            let sum = +chooseSum.value,
                perc = +percent.value;
            appData.monthIncome = sum / 100 / 12 * perc;
            appData.yearIncome = sum / 100 * perc;
    
            month_v.textContent = appData.monthIncome.toFixed(1);
            year_v.textContent = appData.yearIncome.toFixed(1);
        }
    }
});

//functions

function btnDisabled(a) { 
    btn_exp_i.disabled = a;
    btn_optExp.disabled = a;
    btn_countBud.disabled = a;
}