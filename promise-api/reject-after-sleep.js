// Необходимо написать функцию возвращающую Promise, который зареджектится через заданное количество миллисекунд.
// Вторым аргументов функция принимает объект ошибки.

function rejectAfterSleep(ms, err) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(err);
    }, ms);
  });
}

rejectAfterSleep(200, "boom!").catch((err) => {
  console.log(err);
});
