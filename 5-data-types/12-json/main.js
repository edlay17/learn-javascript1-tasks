'use strict'

/*
Преобразуйте объект в JSON, а затем обратно в обычный объект
важность: 5
Преобразуйте user в JSON, затем прочитайте этот JSON в другую переменную.

let user = {
  name: "Василий Иванович",
  age: 35
};
 */

const user = {
    name: "Василий Иванович",
    age: 35
};

const userJson = JSON.stringify(user);
console.log(userJson);
const userObj = JSON.parse(userJson);
console.log(userObj);


/*
Исключить обратные ссылки
важность: 5
В простых случаях циклических ссылок мы можем исключить свойство, из-за которого они возникают, из сериализации по его имени.

Но иногда мы не можем использовать имя, так как могут быть и другие, нужные, свойства с этим именем во вложенных объектах. Поэтому можно проверять свойство по значению.

Напишите функцию replacer для JSON-преобразования, которая удалит свойства, ссылающиеся на meetup:
 */

let room = {
    number: 23
};

let meetup = {
    title: "Совещание",
    occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
    place: room
};

// цикличные ссылки
room.occupiedBy = meetup;
meetup.self = meetup;

function replacer(key, value) {
    if (key !== "" && value === meetup) return undefined;
    return value;
}

alert( JSON.stringify(meetup, replacer) );

