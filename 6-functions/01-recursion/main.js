'use strict'

/*
Вычислить сумму чисел до данного
важность: 5
Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.

Например:

sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
Сделайте три варианта решения:

С использованием цикла.
Через рекурсию, т.к. sumTo(n) = n + sumTo(n-1) for n > 1.
С использованием формулы арифметической прогрессии.
Пример работы вашей функции:

function sumTo(n) { ... ваш код ... }

alert( sumTo(100) ); // 5050
P.S. Какой вариант решения самый быстрый? Самый медленный? Почему?

P.P.S. Можно ли при помощи рекурсии посчитать sumTo(100000)?
*/

const sumToLoop = (numTo) => {
    let sum = 0;
    for (let n = numTo; n > 0; n--) {
        sum += n;
    }
    return sum;
}
console.log(sumToLoop(100));

const sumToRec = (numTo) => {
    if (numTo <= 1) return numTo;
    return numTo + sumToRec(numTo - 1);
}
console.log(sumToRec(100));

const sumToArithmetic = (numTo, numFrom = 1, n = 100) => {
    return (numFrom + numTo) / 2 * n;
}
console.log(sumToArithmetic(100));

/*
Самый быстрый вариант - арифметический, т.к. в нем минимальное количество вычислений и итераций.

Самый медленный вариант - рекурсивный, потому что в нем будет использовано 100 контекстов вызова. Это менее эффективно, чем 1 контекст вызова со 100 итерациями.

Посчитать sumToRec(100000) вероятнее всего не получится из-за ограничений движков на размер стека контекстов вызова.
*/



/*
Вычислить факториал
важность: 4
Факториал натурального числа – это число, умноженное на "себя минус один", затем на "себя минус два", и так далее до 1. Факториал n обозначается как n!

Определение факториала можно записать как:

n! = n * (n - 1) * (n - 2) * ...*1
Примеры значений для разных n:

1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
Задача – написать функцию factorial(n), которая возвращает n!, используя рекурсию.

alert( factorial(5) ); // 120
P.S. Подсказка: n! можно записать как n * (n-1)! Например: 3! = 3*2! = 3*2*1! = 6
 */

const getFact = (num) => {
    if (num === 1) return 1;
    return num * getFact(num - 1);
}
console.log(getFact(3));
console.log(getFact(5));




/*
Числа Фибоначчи
важность: 5
Последовательность чисел Фибоначчи определяется формулой Fn = Fn-1 + Fn-2. То есть, следующее число получается как сумма двух предыдущих.

Первые два числа равны 1, затем 2(1+1), затем 3(1+2), 5(2+3) и так далее: 1, 1, 2, 3, 5, 8, 13, 21....

Числа Фибоначчи тесно связаны с золотым сечением и множеством природных явлений вокруг нас.

Напишите функцию fib(n) которая возвращает n-е число Фибоначчи.

Пример работы:

function fib(n) { ваш код }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
P.S. Все запуски функций из примера выше должны работать быстро. Вызов fib(77) должен занимать не более доли секунды.
 */

const fibRec = (n) => {
    if (n === 1 || n === 2) return 1;
    return fib(n - 1) + fib(n-2);
}

const fib = (n) => {
    if (n === 1) return 1;

    let sum = null;
    let prevSum = 1;
    let doublePrev = 0;

    for (let k = 2; k <= n; k++) {
        sum = prevSum + doublePrev;
        doublePrev = prevSum;
        prevSum = sum;
    }
    return sum;
}

console.log(fibRec(3));
console.log(fib(77));



/*
Вывод односвязного списка
важность: 5
Допустим, у нас есть односвязный список (как описано в главе Рекурсия и стек):

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
Напишите функцию printList(list), которая выводит элементы списка по одному.

Сделайте два варианта решения: используя цикл и через рекурсию.

Как лучше: с рекурсией или без?
*/

let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

const printList = (list) => {
    console.log(list.value);
    let currentObj = list;
    while (currentObj.next !== null) {
        currentObj = currentObj.next;
        console.log(currentObj.value);
    }
}
//printList(list);

const printListRec = (list) => {
    console.log(list.value);
    if (list.next === null) return;
    printListRec(list.next);
}
//printListRec(list);

/*
Лучше без рекурсии, т.к. не забивается стек контекстов вызова
 */



/*
Вывод односвязного списка в обратном порядке
важность: 5
Выведите односвязный список из предыдущего задания Вывод односвязного списка в обратном порядке.

Сделайте два решения: с использованием цикла и через рекурсию.
 */

const printReverseListRec = (list) => {
    if (list.next) printReverseListRec(list.next);
    console.log(list.value);
}
printReverseListRec(list);

const printReverseList = (list) => {
    const elems = [];

    elems.push(list);
    let currentObj = list;
    while (currentObj.next !== null) {
        currentObj = currentObj.next;
        elems.push(currentObj);
    }

    for (let n = elems.length - 1; n >= 0; n--) {
        console.log(elems[n].value);
    }
}
printReverseList(list);