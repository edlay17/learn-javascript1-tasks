'use strict'

/*
Переведите текст вида border-left-width в borderLeftWidth
важность: 5
Напишите функцию camelize(str), которая преобразует строки вида «my-short-string» в «myShortString».

То есть дефисы удаляются, а все слова после них получают заглавную букву.
 */

const htmlAttr = "list-style-image";

const camelize = (str) => {
    const arrayFromString = str.split("-");
    const result = arrayFromString.reduce((previousValue, item) => {
        const firstLetterUpper = item[0].toUpperCase();
        return previousValue + firstLetterUpper + item.slice(1);
    })
    return result;
}

//alert(camelize(htmlAttr));


/*
Напишите функцию filterRange(arr, a, b), которая принимает массив arr, ищет в нём элементы между a и b и отдаёт массив этих элементов.

Функция должна возвращать новый массив и не изменять исходный.
 */

const filterRange = (arr, a, b) => {
    let from = a;
    let to = b;
    if (a > b) {
        from = b;
        to = a;
    }

    const filterFunc = (num) => (num >= from && num <= to);

    return arr.filter(filterFunc);
}

let arr = [5, 3, 8, 1];
//console.log(filterRange(arr, 4, 1));
//console.log(filterRange(arr, 1, 4));
//console.log(arr);


/*
Фильтрация по диапазону "на месте"
важность: 4
Напишите функцию filterRangeInPlace(arr, a, b), которая принимает массив arr и удаляет из него все значения кроме тех, которые находятся между a и b. То есть, проверка имеет вид a ≤ arr[i] ≤ b.

Функция должна изменять принимаемый массив и ничего не возвращать.
 */

const isNumBetween = (num, a, b) => {
    let from = a;
    let to = b;
    if (a > b) {
        from = b;
        to = a;
    }

    return num >= from && num <= to
}

const filterRangeInPlace = (arr, a, b) => {
    arr.forEach((elem, index, array) => {
        while(!isNumBetween(array[index], a, b)){
            arr.splice(index, 1);
        }
    });
}

const array2 = [1, 2, 5, 7, 2, -10, -2, -5];
filterRangeInPlace(array2, -5, 4);
//console.log(array2);


/*
let arr = [5, 2, 1, -10, 8];

// ... ваш код для сортировки по убыванию

alert( arr ); // 8, 5, 2, 1, -10
 */

const arr2 = [5, 2, 1, -10, 8];
//console.log(arr2);
arr2.sort((a, b) => b - a );
//console.log(arr2);

/*
Скопировать и отсортировать массив
важность: 5
У нас есть массив строк arr. Нужно получить отсортированную копию, но оставить arr неизменённым.

Создайте функцию copySorted(arr), которая будет возвращать такую копию.
 */
const arr3 = [1, 5, 0, -10, 12, 14, 21];
const copySorted = arr => {
    return [...arr].sort();
}
//console.log(arr3);
//console.log(copySorted(arr3));
//console.log(arr3);

/*
Создайте функцию конструктор Calculator, которая создаёт «расширяемые» объекты калькулятора.
Задание состоит из двух частей.

Во-первых, реализуйте метод calculate(str), который принимает строку типа "1 + 2" в формате «ЧИСЛО оператор ЧИСЛО» (разделено пробелами) и возвращает результат. Метод должен понимать плюс + и минус -.

alert( calc.calculate("3 + 7") ); // 10
Затем добавьте метод addMethod(name, func), который добавляет в калькулятор новые операции. Он принимает оператор name и функцию с двумя аргументами func(a,b), которая описывает его.

Для этой задачи не нужны скобки или сложные выражения.
Числа и оператор разделены ровно одним пробелом.
Не лишним будет добавить обработку ошибок.
 */

function Calculator() {
    this.methods = [
        {
            name: "+",
            func: (a, b) => a + b
        },
        {
            name: "-",
            func: (a, b) => a - b
        }
    ]

    this.calculate = function (str){
        const array = str.split(" ");
        if (isNaN(array[0]) || isNaN(array[2])) return NaN;
        const num1 = +array[0];
        const num2 = +array[2];
        const method = this.methods.find((elem) => elem.name === array[1]);
        if (method) return method.func(num1, num2);
        return null;
    }

    this.addMethod = function ( name, func ) {
        this.methods.push({ name, func });
    }

}

const calc1 = new Calculator();
console.log(calc1.calculate("7 + 3"));
console.log(calc1.calculate("3 - 1"));
calc1.addMethod("/", (a, b) => a / b);
console.log(calc1.calculate("10 / 3"));


/*
Трансформировать в массив имён
важность: 5
У вас есть массив объектов user, и в каждом из них есть user.name. Напишите код, который преобразует их в массив имён.
 */


let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let users = [ vasya, petya, masha ];
let names = users.map(elem => elem.name);

alert( names );


/*
Трансформировать в объекты
важность: 5
У вас есть массив объектов user, и у каждого из объектов есть name, surname и id.

Напишите код, который создаст ещё один массив объектов с параметрами id и fullName, где fullName – состоит из name и surname.
 */

let vasya2 = { name: "Вася", surname: "Пупкин", id: 1 };
let petya2 = { name: "Петя", surname: "Иванов", id: 2 };
let masha2 = { name: "Маша", surname: "Петрова", id: 3 };

let users2 = [ vasya2, petya2, masha2 ];

let usersMapped = users2.map(elem => {
    return {
        id: elem.id,
        fullName: elem.name + " " + elem.surname
    };
});

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // Вася Пупкин


/*
Отсортировать пользователей по возрасту
важность: 5
Напишите функцию sortByAge(users), которая принимает массив объектов со свойством age и сортирует их по нему.
 */

const sortByAge = (users) => {
    users.sort((a, b) => a.age - b.age);
}

let vasya3 = { name: "Вася", age: 25 };
let petya3 = { name: "Петя", age: 30 };
let masha3 = { name: "Маша", age: 28 };

let arr4 = [ vasya3, petya3, masha3 ];

sortByAge(arr4);
console.log(arr4);


/*
Получить средний возраст
важность: 4
Напишите функцию getAverageAge(users), которая принимает массив объектов со свойством age и возвращает средний возраст.

Формула вычисления среднего арифметического значения: (age1 + age2 + ... + ageN) / N.
 */
const getAverageAge = (users) => {
    let sum = 0;
    let count = 0;
    users.forEach(elem => {
        sum += elem.age;
        count++;
    });
    return sum / count;
}

let vasya4 = { name: "Вася", age: 25 };
let petya4 = { name: "Петя", age: 30 };
let masha4 = { name: "Маша", age: 29 };

let arr5 = [ vasya4, petya4, masha4 ];

alert( getAverageAge(arr5) );


/*
Оставить уникальные элементы массива
важность: 4
Пусть arr – массив строк.

Напишите функцию unique(arr), которая возвращает массив, содержащий только уникальные элементы arr.
 */
const unique = (arr) => {
    const uniqueArr = [];
    arr.forEach((elem) => {
        if (!uniqueArr.find(uniqueItem => elem === uniqueItem)) uniqueArr.push(elem);
    })
    return uniqueArr;
}

const arr6 = [1, 5, 4, 5, 6, 7, 1, 4, 5, 5, 0, 2];
console.log(arr6);
console.log(unique(arr6));