// Необходимо написать функцию возвращающую Promise, который зарезолвится через заданное количество миллисекунд

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

sleep(200).then(() => {
  console.log("Я проснулся!");
});
