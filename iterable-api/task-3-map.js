// Написать функцию, которая принимает Iterable объект и функцию отображения и возвращает итератор,
// который возвращает элементы, полученные с помощью функции отображения. Генераторы использовать нельзя.

function map(iter, fn) {
  const iterator = iter[Symbol.iterator]();
  let currentItem = iterator.next();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      while (!currentItem.done) {
        const item = currentItem.value;
        currentItem = iterator.next();

        return { value: fn(item), done: false };
      }
      return { done: true };
    },
  };
}

// [2, 4, 6, 8]
Array.from(map(new Set([1, 2, 3, 4]), (el) => el * 2));

// Написать функцию, которая принимает Iterable объект и функцию отображения и возвращает итератор,
// который возвращает элементы, полученные с помощью функции отображения. Итератор должен создаваться с помощью генератора.

function* map(iter, fn) {
  for (el of iter) {
    yield fn(el);
  }
}

// [2, 4, 6, 8]
Array.from(map(new Set([1, 2, 3, 4]), (el) => el * 2));
