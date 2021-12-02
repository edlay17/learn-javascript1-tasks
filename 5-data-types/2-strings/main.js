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






