'use strict'

/*
Деструктурирующее присваивание
важность: 5
У нас есть объект:

let user = {
  name: "John",
  years: 30
};
Напишите деструктурирующее присваивание, которое:

свойство name присвоит в переменную name.
свойство years присвоит в переменную age.
свойство isAdmin присвоит в переменную isAdmin (false, если нет такого свойства)
Пример переменных после вашего присваивания:

let user = { name: "John", years: 30 };

// ваш код должен быть с левой стороны:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
*/

let user = {
    name: "John",
    years: 30
};

let {name, years: age, isAdmin: isAdmin = false} = user;

//alert(name);
//alert(age);
//alert(isAdmin);

/*
Максимальная зарплата
важность: 5
У нас есть объект salaries с зарплатами:

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
Создайте функцию topSalary(salaries), которая возвращает имя самого высокооплачиваемого сотрудника.

Если объект salaries пустой, то нужно вернуть null.
Если несколько высокооплачиваемых сотрудников, можно вернуть любого из них.
P.S. Используйте Object.entries и деструктурирование, чтобы перебрать пары ключ/значение.
 */

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

const topSalary = (employees) => {
    let maxSalary = null;
    let maxSalaryName = null;

    for (const [name, salary] of Object.entries(employees)){
        if (salary > maxSalary) {
            maxSalary = salary;
            maxSalaryName = name;
        }
    }

    return maxSalaryName;
}

alert(topSalary(salaries));