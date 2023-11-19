// Написать функцию, которая принимает Iterable объект и максимальное количество итераций и возвращает итератор,
// который завершиться после достижения нужного количества итераций. Генераторы использовать нельзя.

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

// [1, 2]
Array.from(take([1, 2, 3], 2));

// Написать функцию, которая принимает Iterable объект и максимальное количество итераций и возвращает итератор,
// который завершиться после достижения нужного количества итераций. Итератор должен создаваться с помощью генератора.

function* take(iter, n) {
  if (n <= 0) {
    return;
  }

  for (const el of iter) {
    yield el;
    n--;

    if (n <= 0) {
      return;
    }
  }
}

// [1, 2]
Array.from(take([1, 2, 3], 2));
