// Необходимо написать функцию, которая идентична Promise.race.

function race(iterable) {
  const tasks = Array.from(iterable);

  if (tasks.length === 0) {
    Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    for (let i = 0; i < tasks.length; i += 1) {
      Promise.resolve(tasks[i]).then(resolve, reject);
    }
  });
}
