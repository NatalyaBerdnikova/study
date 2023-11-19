// Необходимо написать функцию, которая принимает объект Promise и некоторое количество миллисекунд
// и возвращает новый Promise.
// Если переданный Promise не успевает зарезолвится до истечения этого времени,
// то результирующий Promise должен быть отклонён с ошибкой new Error('Timeout').

function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Timeout"));
    }, ms);

    promise.then((res) => resolve(res));
  });
}

timeout(fetch("url"), 500).then(console.log, console.log);
