'use strict'

/*
Функции - объекты
свойства:
name - имя функции
length - количество аргументов
можно добавлять свои, очень удобно чтобы на засорять глобальный объект

так же кастомными свойствами можно добиться подобия замыкания, но эти свойства будут доступны из вне, в отличии от замыкания

с помощью свойств можно определить преобразование фунцкии (объекта) в примитивы
 */

/*
Задача 1

Измените код makeCounter() так, чтобы счётчик мог увеличивать и устанавливать значение:

counter() должен возвращать следующее значение (как и раньше).
counter.set(value) должен устанавливать счётчику значение value.
counter.decrease() должен уменьшать значение счётчика на 1.
 */

// props
function makeCounter() {
    let count = 0;

    function counter() {
        return counter.count++;
    };

    counter.count = count;
    counter.set = function(value) {
        this.count = value;
    }
    counter.decrease = function() {
        this.count--;
    }

    return counter;
}

let counter = makeCounter();
counter();
//debugger;

// closure
function makeCounter_clos() {
    let count = 0;

    function counter() {
        return count++;
    }
    counter.set = function(value) {
        count = value;
    }
    counter.decrease = function() {
        count--;
    }

    return counter;
}

let counter_clos = makeCounter_clos();
counter_clos();
//debugger;


/*
Сумма с произвольным количеством скобок
важность: 2
Напишите функцию sum, которая бы работала следующим образом:

sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
P.S. Подсказка: возможно вам стоит сделать особый метод преобразования в примитив для функции.
 */

const sum = (num) => {
    let sum = num;

    function summary(num) {
        sum += num;
        return summary;
    }

    summary.toString = () => sum;
    summary.valueOf = () => sum;

    return summary;
}

const sum2 = (num) => {
    function summary(num) {
        summary.sum+=num;
        return summary;
    }

    summary.sum = num;
    summary.toString = () => summary.sum;
    summary.valueOf = () => summary.sum;

    return summary;
}

sum(15)(25)(10)(30);

sum2(10)(-5)(0)(2);

alert(sum(10)(2));
alert(sum2(10)(20));
console.log(sum(10)(15).toString());
console.log(Number(sum(15)(30)));
console.log(Number(sum2(35)(30)));