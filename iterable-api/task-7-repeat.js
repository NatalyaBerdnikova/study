// Написать функцию, которая принимает Iterable объект и количество повторений и возвращает итератор,
// который продублирует все элементы из исходного заданное количество раз. Генераторы использовать нельзя.

function take(iter, n) {
  if (n <= 0) {
    return;
  }

  const iterator = iter[Symbol.iterator]();
  let currentItem = iterator.next();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      while (n > 0 && !currentItem.done) {
        const item = currentItem.value;
        currentItem = iterator.next();
        n -= 1;

        return { value: item, done: false };
      }
      return { done: true };
    },
  };
}

// [1, 2, 3, 1, 2, 3]
Array.from(repeat([1, 2, 3], 2));

// Написать функцию, которая принимает Iterable объект и количество повторений и возвращает итератор,
// который продублирует все элементы из исходного заданное количество раз. Итератор должен создаваться с помощью генератора.

function* repeat(iter, n) {
  for (let i = 0; i < n; i += 1) {
    for (const el of iter) {
      yield el;
    }
  }
}

// [1, 2, 3, 1, 2, 3]
Array.from(repeat([1, 2, 3], 2));
