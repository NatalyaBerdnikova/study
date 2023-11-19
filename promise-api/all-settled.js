// Необходимо написать функцию, которая идентична Promise.allSettled.

function allSettled(promises) {
  const tasks = Array.from(promises);

  if (tasks.length === 0) {
    Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    const results = new Array(tasks.length);
    let done = 0;

    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i] = Promise.resolve(tasks[i]);
      tasks[i]
        .then((value) => {
          results[i] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[i] = { status: "rejected", reason };
        })
        .finally(() => {
          done += 1;
          if (done === tasks.length) {
            resolve(results);
          }
        });
    }
  });
}

const promise1 = new Promise((res) => setTimeout(res, 500)).then(() => 1);
const promise2 = new Promise((res) => setTimeout(res, 2000)).then(() => 2);
const promise3 = new Promise((_, reject) => reject("Aborted"));

allSettled([promise1, promise2, promise3]).then((res) => console.log(res));
