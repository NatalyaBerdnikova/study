// Необходимо написать типовую функцию Overwrite, которая принимает 2 объекта и возвращает новый,
// в котором коллизии свойств разрешаются в сторону второго объекта

const test1: Overwrite<{ a: number; b: string }, { b: number; c: boolean }> = {
  a: 1,
  b: 10,
  c: true,
};
