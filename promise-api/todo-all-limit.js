// Необходимо написать статический метод для Promise, который бы работал как Promise.all,
// но с возможностью задания лимита на выполнения "одновременных" задач.
// В качестве первого параметра, метод должен принимать Iterable объект с функциями, которые возвращают Promise.
// Сам метод также возвращает Promise.

// TODO:

function allLimit(iterable, limit) {
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

allLimit(
  [
    fetch.bind(null, "url1"),
    fetch.bind(null, "url2"),
    fetch.bind(null, "url3"),
    fetch.bind(null, "url4"),
  ],
  2
).then(([data1, data2, data3, data4]) => {
  console.log(data1, data2, data3, data4);
});
