// Написать функцию, которая принимает Iterable объект и функцию-фильтр и возвращает итератор,
// который обходит только те элементы, для которых фильтр вернул true. Генераторы использовать нельзя.

function filter(iter, fn) {
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

        if (fn(item)) {
          return { value: item, done: false };
        }
      }
      return { done: true };
    },
  };
}

// [3, 4]
Array.from(filter(new Set([1, 2, 3, 4]), (el) => el > 2));

// Написать функцию, которая принимает Iterable объект и функцию-фильтр и возвращает итератор,
// который обходит только те элементы, для которых фильтр вернул true. Итератор должен создаваться с помощью генератора.

function* filter(iter, fn) {
  for (el of iter) {
    if (fn(el)) {
      yield el;
    }
  }
}

// [3, 4]
Array.from(filter(new Set([1, 2, 3, 4]), (el) => el > 2));
