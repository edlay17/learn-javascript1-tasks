'use strict'

/*
Декоратор-шпион
важность: 5
Создайте декоратор spy(func), который должен возвращать обёртку, которая сохраняет все вызовы функции в своём свойстве calls.

Каждый вызов должен сохраняться как массив аргументов.

Например:

function work(a, b) {
  alert( a + b ); // произвольная функция или метод
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
P.S.: Этот декоратор иногда полезен для юнит-тестирования. Его расширенная форма – sinon.spy – содержится в библиотеке Sinon.JS.
*/

function work(a, b) {
    //alert(a - b);
}

function spy(func) {
    function wrapper(...args) {
        wrapper.calls.push([...args]);

        return func.apply(this, args);
    }

    wrapper.calls = [];

    return wrapper;
}

const decoratedWork = spy(work);
//decoratedWork(10, 2);
//decoratedWork(200, 10);

//console.log(decoratedWork.calls);

const obj = {
    test: 1,
    work(a, b) {
        alert(a + b + this.test);
    }
}

obj.work = spy(obj.work);
//obj.work(1, 2);
//obj.work(2, 5);

const decoratedWork2 = spy(obj.work.bind(obj));
//decoratedWork2(3, 2);
//console.log(decoratedWork2.calls);


/*
Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд. Например:

function f(x) {
  alert(x);
}

// создаём обёртки
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // показывает "test" после 1000 мс
f1500("test"); // показывает "test" после 1500 мс
Другими словами, delay(f, ms) возвращает вариант f с «задержкой на ms мс».

В приведённом выше коде f – функция с одним аргументом, но ваше решение должно передавать все аргументы и контекст this.
*/

function delay2(f, ms) {
    return async function(...args) {
        const startTime = new Date().getTime();
        console.log();

        let promise = new Promise(resolve => {
            setTimeout(() => {
                resolve(f.apply(this, args));
            }, ms);
        });

        let result = await promise;
        
        const endTime = new Date().getTime();

        console.log(endTime - startTime);
        
        return result;
    }
}

function sayHi() {
    return 123;
}

const decoratedFunc = delay2(sayHi, 1000);

/*
(async () => {
    console.log(await decoratedFunc());
    console.log(await decoratedFunc());
    console.log(await decoratedFunc());
    console.log(await decoratedFunc());
    console.log(await decoratedFunc());
})()
*/

/* simple version for compleete tests */

function delay(f, ms) {
    return function(...args) {
        setTimeout(() => f.apply(this, args), ms)
    }
}



/*
Декоратор debounce
важность: 5
Результатом декоратора debounce(f, ms) должна быть обёртка, которая передаёт вызов f не более одного раза в ms миллисекунд. Другими словами, когда мы вызываем debounce, это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.

Например:

let f = debounce(alert, 1000);

f(1); // выполняется немедленно
f(2); // проигнорирован

setTimeout( () => f(3), 100); // проигнорирован (прошло только 100 мс)
setTimeout( () => f(4), 1100); // выполняется
setTimeout( () => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
На практике debounce полезен для функций, которые получают/обновляют данные, и мы знаем, что повторный вызов в течение короткого промежутка времени не даст ничего нового. Так что лучше не тратить на него ресурсы.
*/

function debounce(f, ms) {
    let isReady = true;

    return function(...args) {
        const now = new Date().getTime();

        if (!isReady) {
            console.log('ignore function');
            return;
        }
        else {
            console.log('execute function');

            const result = f.apply(this, args);

            isReady = false;
            setTimeout(() => {isReady = true}, ms)

            return result;
        };
    } 
/*
    let isCooldown = false;

    return function() {
      if (isCooldown) return;
  
      f.apply(this, arguments);
  
      isCooldown = true;
  
      setTimeout(() => isCooldown = false, ms);
    };  */
}

let a = 0;

function test2(n) {
    a += n;
    console.log('test2');
}

const wrapped = debounce(test2, 200);
/*
wrapped(1);
wrapped(2);
wrapped(2);
setTimeout(() => wrapped(10), 10);
setTimeout(() => wrapped(100), 201);
setTimeout(() => wrapped(100), 1000);

setTimeout(() => console.log(a), 2000);
*/


/*

Тормозящий (throttling) декоратор
важность: 5
Создайте «тормозящий» декоратор throttle(f, ms), который возвращает обёртку, передавая вызов в f не более одного раза в ms миллисекунд. Те вызовы, которые попадают в период «торможения», игнорируются.

Отличие от debounce – если проигнорированный вызов является последним во время «задержки», то он выполняется в конце.

Давайте рассмотрим реальное применение, чтобы лучше понять это требование и выяснить, откуда оно взято.

Например, мы хотим отслеживать движения мыши.

В браузере мы можем объявить функцию, которая будет запускаться при каждом движении указателя и получать его местоположение. Во время активного использования мыши эта функция запускается очень часто, это может происходить около 100 раз в секунду (каждые 10 мс).

Мы бы хотели обновлять информацию на странице при передвижениях.

…Но функция обновления update() слишком ресурсоёмкая, чтобы делать это при каждом микродвижении. Да и нет смысла делать обновление чаще, чем один раз в 1000 мс.

Поэтому мы обернём вызов в декоратор: будем использовать throttle(update, 1000) как функцию, которая будет запускаться при каждом перемещении указателя вместо оригинальной update(). Декоратор будет вызываться часто, но передавать вызов в update() максимум раз в 1000 мс.

Визуально это будет выглядеть вот так:

Для первого движения указателя декорированный вариант сразу передаёт вызов в update. Это важно, т.к. пользователь сразу видит нашу реакцию на его перемещение.
Затем, когда указатель продолжает движение, в течение 1000 мс ничего не происходит. Декорированный вариант игнорирует вызовы.
По истечению 1000 мс происходит ещё один вызов update с последними координатами.
Затем, наконец, указатель где-то останавливается. Декорированный вариант ждёт, пока не истечёт 1000 мс, и затем вызывает update с последними координатами. В итоге окончательные координаты указателя тоже обработаны.
Пример кода:

function f(a) {
  console.log(a)
}

// f1000 передаёт вызовы f максимум раз в 1000 мс
let f1000 = throttle(f, 1000);

f1000(1); // показывает 1
f1000(2); // (ограничение, 1000 мс ещё нет)
f1000(3); // (ограничение, 1000 мс ещё нет)

// когда 1000 мс истекли ...
// ...выводим 3, промежуточное значение 2 было проигнорировано
P.S. Аргументы и контекст this, переданные в f1000, должны быть переданы в оригинальную f.

*/

function throttle(f, ms) {
    let isReady = true;
    let lastArgs = null;

    return function wrapper() {
        if (isReady) {
            f.apply(this, arguments);
            isReady = false;

            setTimeout(() => {
                isReady = true;
                
                if (lastArgs) {
                    wrapper.apply(this, lastArgs);
                    lastArgs = null;
                }
            }, ms);
        }
        else {
            lastArgs = arguments;
        }
    }
}

function f(a) {
    console.log(a)
  }
  
  // f1000 передаёт вызовы f максимум раз в 1000 мс
  let f1000 = throttle(f, 1000);
  
  f1000(1); // показывает 1
  f1000(2); // (ограничение, 1000 мс ещё нет)
  f1000(3); // (ограничение, 1000 мс ещё нет)


  /*
    обычная функция вычисляет свой this в момент выполнения, если это функция объекта obj2, то ее this будет obj2
    
    функции внутри других функций получают this = undefined или window в зависимости от use strict
    исправить это можно привязкой контекста

    стрелочная функция берет контекст у обычной функции, внутри которой она объявлена (рождена)
  */
  const obj2 = {
    test() {
        console.log('obj2');
        console.log(this); // obj2
        function test2() {
            console.log(this); 
        }

        test2(); // undefined
        test2.apply(this); // obj2
    }
  }

  obj2.test();