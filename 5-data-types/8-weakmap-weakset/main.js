'use strict'

/*
Есть массив сообщений:

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

У вас есть к ним доступ, но управление этим массивом происходит где-то ещё. Добавляются новые сообщения и удаляются старые, и вы не знаете в какой момент это может произойти.

Имея такую вводную информацию, решите, какую структуру данных вы могли бы использовать для ответа на вопрос «было ли сообщение прочитано?». Структура должна быть подходящей, чтобы можно было однозначно сказать, было ли прочитано это сообщение для каждого объекта сообщения.

P.S. Когда сообщение удаляется из массива messages, оно должно также исчезать из структуры данных.

P.P.S. Нам не следует модифицировать сами объекты сообщений, добавлять туда свойства. Если сообщения принадлежат какому-то другому коду, то это может привести к плохим последствиям
 */

let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

// already read messages
const weakSet = new WeakSet();

const isRead = message => {
    return weakSet.has(message);
}

console.log(isRead(messages[0]));
weakSet.add(messages[0]);
weakSet.add(messages[0]);
weakSet.add(messages[2]);
weakSet.add(messages[1]);
debugger;
console.log(isRead(messages[0]));

messages[0] = null;
messages[1] = null;
debugger;




/*
Есть массив сообщений такой же, как и в предыдущем задании.

let messages = [
  { text: "Hello", from: "John" },
  { text: "How goes?", from: "John" },
  { text: "See you soon", from: "Alice" }
];
Теперь вопрос стоит так: какую структуру данных вы бы предложили использовать для хранения информации о том, когда сообщение было прочитано?

В предыдущем задании нам нужно было сохранить только факт прочтения «да или нет». Теперь же нам нужно сохранить дату, и она должна исчезнуть из памяти при удалении «сборщиком мусора» сообщения.

P.S. Даты в JavaScript можно хранить как объекты встроенного класса Date, которые мы разберём позднее.
 */

let messages2 = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

// already read messages
const weakMap = new WeakMap();

const getReadTime = message => {
    return weakMap.get(message);
}

const setReadTime = (message, time) => {
    if (!weakMap.get(message)) {
        weakMap.set(message, time);
    }
}

console.log(getReadTime(messages2[0]));
setReadTime(messages2[0], Date());
setReadTime(messages2[0], Date());
setReadTime(messages2[2], Date());
setReadTime(messages2[1], Date());
debugger;
console.log(getReadTime(messages2[0]));

messages2[0] = null;
messages2[1] = null;
debugger;
