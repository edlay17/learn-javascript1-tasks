'use strict'

/*

// Необходимо написать функцию возвращающую Promise, который зарезолвится через заданное количество миллисекунд

sleep(200).then(() => {
  console.log('Я проснулся!');
});

*/

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  }); 
}

sleep(1000).then(() => {
  console.log('resolved after 1000ms');
})

sleep(4000).then(() => {
  console.log('resolved after 4000ms');
})


/*
// Необходимо написать функцию возвращающую Promise, который зареджектится через заданное количество миллисекунд.
// Вторым аргументов функция принимает объект ошибки.

rejectAfterSleep(200, 'boom!').catch((err) => {
  console.log(err);
});
*/

function fejectAfterSleep(ms, err) {
  return new Promise((reslove, reject) => {
    setTimeout(reject(err), ms);
  })
}

fejectAfterSleep(100, 'boom!')
  .then(() => console.log('then'))
  .catch(err => {
    console.error(err);
    return 200;
  })
  .then(console.log);

/*
// Необходимо написать функцию, которая принимает объект Promise и некоторое количество миллисекунд
// и возвращает новый Promise.
// Если переданный Promise не успевает зарезолвится до истечения этого времени,
// то результирующий Promise должен быть отклонён с ошибкой new Error('Timeout').
timeout(fetch('url'), 500).then(console.log, console.log);
*/

function timeout(promise, ms) {
  const timeout = new Promise((res, rej) => {
    setTimeout(() => rej('Timeout'), ms);
  })
  
  return Promise.race(
    [
      timeout,
      promise
    ]
  )
}

timeout(fetch('https://catfact.ninja/fact'), 50).then(console.log, console.log);
timeout(fetch('https://catfact.ninja/fact'), 5000).then(console.log, console.log);



/*
## all

> Необходимо написать функцию, которая идентична Promise.all.
*/

function promiseAll(arr) {
  const results = {
    length: 0,
  };

  const promise = new Promise((resolve, reject) => {
    const addResult = (result, index) => {
      results[index] = result;
      results.length++;

      if (results.length === arr.length) {
        resolve(Array.from(results));
      }
    }

    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i];

      if (elem.then) {
        elem.then(
          (res) => {
            addResult(res, i);
          },
          (err) => reject(err)
        )
      }
      else {
        addResult(elem, i);
      }
    }
  })

  return promise;
}

const fetch1 = fetch('https://catfact.ninja/fact');
const fetch2 = fetch('https://catfact.ninja/fact');
const prom = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done1'), 3000);
})
const prom2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done2'), 1000);
})
const primitive1 = 8;
const primitive2 = 'string';
const rejected = new Promise((resolve, reject) => {
  setTimeout(() => reject('404'), 100);
})

const promises = [fetch1, fetch2, prom, prom2, rejected];

const result = promiseAll(promises);

result.then(result => {
  console.log('all completed');
  console.log(result);
}, () => {
  console.log('unexpected error')
})
result.then(
  res2 => {
    console.log('all completed 2');
    console.log(res2);
  }, 
  (err) => {
    console.log(err);
  }
)

const result2 = Promise.all([fetch1, fetch2, prom, prom2]);
result2.then(res => {
  console.log('default promise completed')
  console.log(res);
})
console.log('default promise all')
console.log(result2);