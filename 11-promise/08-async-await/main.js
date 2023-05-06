'use strict'

/*

Перепишите один из примеров раздела Цепочка промисов, используя async/await вместо .then/catch:

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}

loadJson('no-such-user.json') // (3)
  .catch(alert); // Error: 404

*/

async function loadJson(url) {
  try {
    const resp = await fetch(url);

    if (resp.status == 200) {
      const json = await resp.json();
      console.log(json);

      return json;
    }
     
    throw new Error(response.status);
  }
  catch(e) {
    alert(e);
  }
}

loadJson('https://api.github.com/users/edlay17/repos');


