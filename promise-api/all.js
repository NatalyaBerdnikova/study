// Необходимо написать функцию, которая идентична Promise.all.

function all(iterable) {
  const tasks = Array.from(iterable);

  if (tasks.length === 0) {
    Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    const results = new Array(tasks.length);
    let done = 0;

    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i] = Promise.resolve(tasks[i]);
      tasks[i]
        .then((res) => {
          results[i] = res;
          done += 1;

          if (done === tasks.length) {
            resolve(results);
          }
        })
        .catch(reject);
    }
  });
}

const promise1 = new Promise((res) => setTimeout(res, 500)).then(() => 1);
const promise2 = new Promise((res) => setTimeout(res, 2000)).then(() => 2);

all([promise1, promise2]).then((res) => console.log(res));
