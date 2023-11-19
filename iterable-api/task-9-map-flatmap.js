// Нужно написать аналог flat и flatMap, но который возвращает итератор. Генераторы использовать нельзя.

function flat(iters) {
  let currentArrayIndex = 0;
  let currentElementIndex = 0;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      while (currentElementIndex < iters[currentArrayIndex]?.length) {
        const item = iters[currentArrayIndex][currentElementIndex];
        currentArrayIndex += 1;

        if (currentArrayIndex >= iters.length) {
          currentElementIndex += 1;
          currentArrayIndex = 0;
        }

        return { value: item, done: false };
      }
      return { done: true };
    },
  };
}

// [1, 4, 2, 5, 3, 6]
Array.from(
  flat([
    [1, 2, 3],
    [4, 5, 6],
  ])
);

// Нужно написать аналог flat и flatMap, но который возвращает итератор. Итератор должен создаваться с помощью генератора.

function* flat([...iters]) {
  let currentArrayIndex = 0;
  let currentElementIndex = 0;

  while (currentElementIndex < iters[currentArrayIndex]?.length) {
    const item = iters[currentArrayIndex][currentElementIndex];
    currentArrayIndex += 1;

    if (currentArrayIndex >= iters.length) {
      currentElementIndex += 1;
      currentArrayIndex = 0;
    }

    yield item;
  }
}

// [1, 4, 2, 5, 3, 6]
Array.from(
  flat([
    [1, 2, 3],
    [4, 5, 6],
  ])
);
