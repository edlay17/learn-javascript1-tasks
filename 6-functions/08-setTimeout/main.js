'use strict'

/*
вложенный setTimeout более гибкий и надежный, чем setInterval
при рекурсивном setTimeout каждый вызов происходит через заданный интервал, а в случае setInterval этот интервал включает в себя еще и время выполнения функции
 */

/*
Вывод каждую секунду
важность: 5
Напишите функцию printNumbers(from, to), которая выводит число каждую секунду, начиная от from и заканчивая to.

    Сделайте два варианта решения.

    Используя setInterval.
    Используя рекурсивный setTimeout.
*/

const printNumbers = (from, to) => {
    let counter = from;

    const timerId = setInterval(() => {
        console.log(counter);
        if (counter >= to) clearTimeout(timerId);
        counter++;
    }, 1000)
}
printNumbers(1, 10);

const printNumbers2 = (from, to) => {
    const timerId = setTimeout(function tick() {
        console.log(from);

        if (from >= to) clearTimeout(timerId);
        else setTimeout(tick, 1000, from++, to);

    }, 1000, from, to);
}
printNumbers2(1, 10);
