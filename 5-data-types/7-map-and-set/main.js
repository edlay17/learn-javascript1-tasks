'use strict'

/*
Допустим, у нас есть массив arr.

Создайте функцию unique(arr), которая вернёт массив уникальных, не повторяющихся значений массива arr.
 */

function unique(arr) {
    const uniqueValues = new Set(arr);
    const resultArray = [];
    uniqueValues.forEach((value, valueAgain, Set) => {
        resultArray.push(value);
    })
    return resultArray;
}

function unique2(arr) {
    const uniqueValues = new Set(arr);
    return Array.from(uniqueValues);
}

let values = [
    "Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

console.log( unique(values) );
console.log( unique2(values) );


/*
Напишите функцию aclean(arr), которая возвращает массив слов, очищенный от анаграмм.
 */

const aclean = arr => {
    const newArray = arr.map(elem => {
        return elem.toLowerCase()
            .split("")
            .sort()
            .join("")
    })
    const uniqueElems = new Set(newArray);
    return Array.from(uniqueElems);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
console.log(aclean(arr));




let map = new Map();
map.set("name", "John");

let keys = map.keys();
const keysArr = Array.from(keys);
keysArr.push("test");
//console.log(keysArr);
