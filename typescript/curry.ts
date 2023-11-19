// Необходимо написать функцию curry, которая бы функцию и возвращала каррированную версию.
// TS должен корректно выводить типы такой функции, а также любой ей производной.

const f = curry(function foo(a: number, b: string, c: boolean): number {
  return 42;
});

// @ts-expect-error
f("bla");

// @ts-expect-error
f(10)(34);

f(10)("foo")(true).toFixed();
