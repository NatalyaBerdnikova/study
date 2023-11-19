// Необходимо написать функцию promiseAll, которая бы принимала Iterable значений,
// которые могут быть Promise, и возвращала новый Promise зарезолвленный с массивом результатов этих Promise.
// Типы элементов в ответе должны выводиться точно.

promiseAll([Promise.resolve({ a: 1 })]).then(([o]) => {
  console.log(o.a);
});

promiseAll([1, Promise.resolve("foo")]).then(([num, str]) => {
  console.log(num.toFixed(), str.trim());
});

promiseAll([1, Promise.resolve("foo"), Promise.resolve(new Date())]).then(
  ([num, str, date]) => {
    console.log(num.toFixed(), str.trim(), date.getYear());
  }
);
