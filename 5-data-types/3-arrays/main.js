'use strict'

/*
Создайте массив styles с элементами «Джаз» и «Блюз».
Добавьте «Рок-н-ролл» в конец.
Замените значение в середине на «Классика». Ваш код для поиска значения в середине должен работать для массивов с любой длиной.
Удалите первый элемент массива и покажите его.
Вставьте «Рэп» и «Регги» в начало массива.
 */

const styles = ["Джаз", "Блюз"];
//alert(styles);

styles.push("Рок-н-ролл");
//alert(styles);

let centerIndex = Math.floor(styles.length/2);
styles[centerIndex] = "Классика";
//alert(styles);

//alert(styles[0]);
styles.shift();

styles.unshift("Рэп");
styles.unshift("Регги");
//alert(styles);

/*
Напишите функцию sumInput(), которая:

Просит пользователя ввести значения, используя prompt и сохраняет их в массив.
Заканчивает запрашивать значения, когда пользователь введёт не числовое значение, пустую строку или нажмёт «Отмена».
Подсчитывает и возвращает сумму элементов массива.
P.S. Ноль 0 – считается числом, не останавливайте ввод значений при вводе «0».
 */
const sumInput = () => {
    const array = [];
    let sumOfArray = 0;
    while (true) {
        const num = prompt("enter num");
        if (!isFinite(num) || num === null || num.trim() === "") {
            for (const elem of array) {
                sumOfArray += elem;
            }
            return sumOfArray;
        }
        array.push(+num);
        console.log(array);
    }
}

//alert(sumInput());

/*
На входе массив чисел, например: arr = [1, -2, 3, 4, -9, 6].
Задача: найти непрерывный подмассив в arr, сумма элементов в котором максимальна.
Функция getMaxSubSum(arr) должна возвращать эту сумму.
 */


/*
На входе массив чисел, например: arr = [1, -2, 3, 4, -9, 6].

Задача: найти непрерывный подмассив в arr, сумма элементов в котором максимальна.

Функция getMaxSubSum(arr) должна возвращать эту сумму.
 */

const getMaxSubSum = (arr) => {
    const arrayOfSubArrays = [];
    for (const elem of arr) {
        //debugger;
        if (arrayOfSubArrays.length === 0) {
            arrayOfSubArrays.push(elem);
        }
        else {
            if (arrayOfSubArrays[arrayOfSubArrays.length - 1] >= 0) {
                if (elem >= 0 ) arrayOfSubArrays[arrayOfSubArrays.length - 1] += elem;
                else arrayOfSubArrays.push(elem);
            }
            else {
                if (elem <= 0 ) arrayOfSubArrays[arrayOfSubArrays.length - 1] += elem;
                else arrayOfSubArrays.push(elem);
            }
        }
    }
    if (arrayOfSubArrays.length === 1 && arrayOfSubArrays[0] <= 0) return 0;
    return arrayOfSubArrays;
}

const array = [1, -2, 3, 4, -9, 6];
console.log(array);
console.log(getMaxSubSum(array));


function getMaxSubSum2(arr) {
    if (arr.length < 1) return 0;

    let max = arr[0];
    let current = 0;
    for (let num of arr) {
        if (current + num > 0) current += num;
        else {
            if (num > 0) current = num;
            else current = 0;
        }
        if (max < current) max = current;
    }

    return max < 0 ? 0 : max;
}
const array2 = [1000, -20, 3, 4, -9000, 18000, -15000, 8000, 6000, 5000, -100, 700, -200, 1000];
console.log(array2);
console.log(getMaxSubSum2(array2));
