'use strict'

// Строки в JavaScript кодируются в UTF-16.
// Есть спецсимволы (например /n)

/*
Сделать первый символ заглавным
важность: 5
Напишите функцию ucFirst(str), возвращающую строку str с заглавным первым символом. Например:
 */
const ucFirst = str => {
    if (!str) return "";
    const firstLetter = str[0].toUpperCase();
    return firstLetter + str.slice(1);
}

/*
Проверка на спам
важность: 5
Напишите функцию checkSpam(str), возвращающую true, если str содержит 'viagra' или 'XXX', а иначе false.
Функция должна быть нечувствительна к регистру:
 */
const stopWords = ["viagra", 'XXX'];

const checkSpam = (str, stopWords) => {
    let isSpam = false;
    stopWords.forEach(word => {
        if (isSpam) return;
        const lowerWord = word.toLowerCase();
        const lowerStr = str.toLowerCase();
        if (lowerStr.includes(lowerWord)) {
            isSpam = true;
        }
    })
    return isSpam;
}

const testPhrases = ["buy ViAgRa now", "free xxxxx", "innocent rabbit"]
testPhrases.forEach(el => console.log(checkSpam(el, stopWords)));

/*
Усечение строки
важность: 5
Создайте функцию truncate(str, maxlength), которая проверяет длину строки str и, если она превосходит maxlength, заменяет конец str на "…", так, чтобы её длина стала равна maxlength.

Результатом функции должна быть та же строка, если усечение не требуется, либо, если необходимо, усечённая строка.
 */

const truncate = (str, maxLength) => {
    if (!(str.length > maxLength)) return str;
    const shortStr = str.slice(0, maxLength - 1) + "…"
    return shortStr;
}

const strsForTest = [
    {
        value: "Вот, что мне хотелось бы сказать на эту тему:",
        maxLength: 20,
    },
    {
        value: "Всем привет!",
        maxLength: 20,
    },
]

strsForTest.forEach((obj) => {
    const {value, maxLength} = obj;
    truncate(value, maxLength);
})


/*
Выделить число
важность: 4
Есть стоимость в виде строки "$120". То есть сначала идёт знак валюты, а затем – число.

Создайте функцию extractCurrencyValue(str), которая будет из такой строки выделять числовое значение и возвращать его.
 */

const extractCurrencyValue = str => {
    return str.length > 1 ? +str.slice(1) : str;
}






