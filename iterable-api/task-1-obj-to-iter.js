// objToIterator;
// Написать функцию, которая принимает объект и возвращает итератор,
// который обходит объект по элементам. Генераторы использовать нельзя.

// [1, 2]
function objToIterator(obj) {
  const keys = Object.keys(obj);

  let cursor = 0;

  return {
    ...obj,
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const currentCursor = cursor;
      cursor++;

      return {
        done: currentCursor >= keys.length,
        value: obj[keys[currentCursor]],
      };
    },
  };
}

console.log(Array.from(objToIterator({ a: 1, b: 2 })));

// Написать функцию, которая принимает объект и возвращает итератор,
// который обходит объект по элементам. Итератор должен создаваться с помощью генератора.

// [1, 2]
function* objToIterator2(obj) {
  return {
    ...obj,
    *[Symbol.iterator]() {
      for (const key in obj) {
        yield {
          value: obj[key],
          done: false,
        };
      }
    },
  };
}

console.log(Array.from(objToIterator2({ a: 1, b: 2 })));
