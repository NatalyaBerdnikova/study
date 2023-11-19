// Необходимо написать функцию, которая по своему интерфейсу идентична конструктору Promise,
// но возвращала бы объект, в котором методы then, catch и finally выполнятся немедленно,
// если промис уже зарезолвлен.
// Семaнтика работы методов в остальном должны быть идентична нативным промисам.

function syncPromise(constr) {
  this.value = undefined;
  this.reason = undefined;
  this.status = "pending";
  this.onFulfilled = [];
  this.onRejected = [];

  const resolve = (value) => {
    if (this.status !== "pending") {
      return;
    }

    if (value !== null && typeof value.then === "function") {
      value.then(resolve, reject);
      return;
    }

    this.status = "fulfilled";
    this.value = value;

    for (const fn of this.onFulfilled) {
      fn(this.value);
    }
  };

  const reject = (err) => {
    if (this.status !== "pending") {
      return;
    }

    this.status = "rejected";
    this.reason = err;

    for (const fn of this.onRejected) {
      fn(this.reason);
    }

    queueMicrotask(() => {
      if (this.onRejected.length === 0) {
        // void - для указания что мы намеренно игнорируем обработку promise.
        void Promise.reject(this.reason);
      }
    });
  };

  try {
    constr(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

// Порядок в консоли: 1 2
syncPromise((resolve) => resolve(1)).then(console.log);
console.log(2);
