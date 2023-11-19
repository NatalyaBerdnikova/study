// Написать функцию, которая принимает Iterable объект и возвращает итератор,
// который возвращает пары вида [номер итерации, элемент.]. Генераторы использовать нельзя.

function enumerate(iter) {
  const iterator = iter[Symbol.iterator]();
  let currentItem = iterator.next();
  let index = -1;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      while (!currentItem.done) {
        const item = currentItem.value;
        currentItem = iterator.next();
        index += 1;

        return { value: [index, item], done: false };
      }
      return { done: true };
    },
  };
}

// [[0, 1], [1, 2], [2, 3]]
Array.from(enumerate([1, 2, 3]));

// Написать функцию, которая принимает Iterable объект и возвращает итератор,
// который возвращает пары вида [номер итерации, элемент.]. Итератор должен создаваться с помощью генератора.

function* enumerate(iter) {
  let index = 0;
  for (const el of iter) {
    yield [index, el];
    index += 1;
  }
}

// [[0, 1], [1, 2], [2, 3]]
Array.from(enumerate([1, 2, 3]));
