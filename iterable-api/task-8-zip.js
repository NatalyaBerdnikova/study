// Написать функцию, которая принимает 2 и более Iterable объектов и возвращает итератор,
// который создаст кортежи из элементов исходных итераторов. Генераторы использовать нельзя.

function zip(...iters) {
  let currentElementIndex = 0;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let item = [];

      for (const iter of iters) {
        if (iter[currentElementIndex]) {
          item.push(iter[currentElementIndex]);
        }
      }

      if (item.length === 0) {
        return { done: true };
      }

      currentElementIndex++;
      return { value: item, done: false };
    },
  };
}

// [[1, 2], [2, 3], [3, 4]]
Array.from(zip([1, 2, 3], [2, 3, 4]));

// Написать функцию, которая принимает 2 и более Iterable объектов и возвращает итератор,
// который создаст кортежи из элементов исходных итераторов. Итератор должен создаваться с помощью генератора.

function* zip(...iters) {
  for (let i = 0; i < iters[0].length; i++) {
    let currentElementIndex = i;
    let item = [];

    for (const iter of iters) {
      if (iter[currentElementIndex]) {
        item.push(iter[currentElementIndex]);
      }
    }

    yield item;
  }
}

// [[1, 2], [2, 3], [3, 4]]
Array.from(zip([1, 2, 3], [2, 3, 4]));
