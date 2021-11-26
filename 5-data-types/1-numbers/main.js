'use strict'

const million = 1.5e6; // 1 500 000
const num1 = 0.001;
console.log( num1 === 1e-3 ); // true

console.log( 0xff ); // 255
console.log( 0xFF ); // 255
console.log( 0b11111111 ); // 255
console.log( 0o377 ); // 255

console.log( 0xFF === 0o377 ); // true

// num.toString(base)
const num = 255;
console.log( num.toString(16) );  // ff
console.log( 255..toString(16) ); // ff

/*
В JS используется 64битный формат хранения чисел
52 - для хранения цифр
11 - для положения точки
1 - для знака
слишком большое число вернет Infinity

проблемы с округлением по причине представления чисел в двоичной форме
числовой формат испольуземый в JS решает это округлением до ближайшего возможного числа

из-за такого хранения каждое число может иметь + и -, например 0: 0 и -0
*/


/*
Сумма пользовательских чисел
 */
const sum = () => {
    const num_1 = +prompt("enter num1");
    const num_2 = +prompt("enter num2");
    if (!isNaN(num_1) && !isNaN(num_2)) {
        console.info("sum", num_1 + num_2);
    }
    else {
        console.log("error");
    }
}
//sum();

/*
Случайное число от min до max
Напишите функцию random(min, max), которая генерирует случайное число с плавающей точкой от min до max (но не включая max).
 */
const random = (from, to) => {
    if ( to < from ) return "error";
    const random = Math.random();
    const result = random * (to - from) + from;
    return result;
}

console.log( random(-10, 10) );
console.log( random(-10, 10) );
console.log( random(-10, 10) );
console.log( random(1, 10) );
console.log( random(1, 10) );
console.log( random(1, 10) );

/*
Напишите функцию randomInteger(min, max), которая генерирует случайное целое (integer) число от min до max (включительно).
Любое число из интервала min..max должно появляться с одинаковой вероятностью.
 */
const randomInt = (from, to) => {
    if ( to < from ) return "error";
    const random = Math.random();
    const result = Math.floor(random * (to + 1 - from) + from);
    return result;
}

console.log( randomInt(-10, 10) );
console.log( randomInt(-10, 10) );
console.log( randomInt(-10, 10) );
console.log( randomInt(1, 10) );
console.log( randomInt(1, 10) );
console.log( randomInt(1, 10) );

/*
Создайте функцию readNumber, которая будет запрашивать ввод числового значения до тех пор, пока посетитель его не введёт.
Функция должна возвращать числовое значение.
Также надо разрешить пользователю остановить процесс ввода, отправив пустую строку или нажав «Отмена». В этом случае функция должна вернуть null.
 */

const readNumber = () => {
    while (true) {
        let data = prompt("enter num");
        if (data === null) return null;
        if (data.match(/^\s*$/i)) return null;
        else if (!isNaN(data)) return +data;
    }
}

console.log(readNumber());







