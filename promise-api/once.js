// Необходимо написать функцию, которая бы добавлял обработчик события на заданный элемент и возвращала Promise.
// Promise должен зарезолвиться при срабатывании события. В качестве значения Promise должен возвращать объект события.

function once(el, event) {
  return new Promise((resolve) => {
    el.addEventListener(event, resolve, { once: true });
  });
}

once(document.body, "click").then((e) => {
  console.log(e);
});
