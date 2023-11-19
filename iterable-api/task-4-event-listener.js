// Написать функцию, которая принимает некоторый элемент и название события для прослушки и возвращает асинхронный итератор.
// Итератор будет возвращать новые элементы (объекты события) при срабатывании события.

function on(el, event) {
  let cb;

  el.addEventListener(event, (e) => {
    if (cb != null) {
      cb(e);
      cb = null;
    }
  });

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      return {
        done: false,
        value: new Promise((resolve) => {
          cb = resolve;
        }),
      };
    },
  };
}

(async () => {
  for await (const e of on(document, "click")) {
    console.log(e);
  }
})();
