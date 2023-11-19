// Нет возможности обработать код с помощью try/catch, потому что он работает только с синхронным кодом
// Промис может быть в трех состояниях: pending, fulfilled (then, finally), rejected(then, catch, finally)
// При использовании конструкций async/await, обработка ошибок происходит через try/catch
// Авто reject срабатывает только для синхронного кода

// Конструктор Promise. Промисификация функций
async function sleep(ms) {
  // Если мы вызовем функцию reject, то этот промис автоматически зареджектится.
  // А если вызовем resolve с определенным значением, то промис зарезолвится с этим значением.
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stringify(obj) {
  return new Promise((resolve) => {
    resolve(JSON.stringify(obj));
  });
}

// В ES2020 появилась возможность использовать await глобально, а не только внутри async функций

window.addEventListener("unhandledrejection", (err) => {});
process.addListener("unhandledrejection", (err) => {});
// unhandledrejection - глобальное событие, при необработанной ошибке в promises.

new Promise((resolve) => {
  resolve(sleep(100).then(() => 10));
});
// ^^ Две аналогичные конструкции
new Promise((resolve, reject) => {
  sleep(100)
    .then(() => 10)
    .then(resolve, reject);
});

// Thenable объекты, могут взаимодействовать с promises. Поддерживают обратную совместимость.
const a = {
  then(cb) {
    cb(100);
  },
};

new Promise((r) => r(a)).then((v) => v + 10);

// .finally() - аналогично finally в try/catch, вызывается вне зависимости от того была ошибка или нет.
// finally сохраняет состояние родительского promise. Если promise был rejected и вернул ошибку, то из finally вернется ошибка
// И если там было значение, то вернется это же значение. То есть нужен catch после finally

// У класса Promise также есть статические методы
// Promise.resolve(10); - Оборачивает в Promise любое значение. Но не реализовывает логику auto-reject

// Promise.reject(Promise.resolve(10)).catch((err) => err.then()); - в catch попадет не распакованное значение
// Растягивание/Раскрытие promises не работает для rejecting

// Promise.all([]) - принимает на вход любой итерируемый объект, значения которого могут быть Promise или обычными значениями.
// Возвращает новый promise, который станет resolved, когда все переданные promises будут resolved
// А если какой-то из переданных promises будет rejected, то и этот созданный станет rejected
// Порядок результативных значений будет сохранен

// Асинхронные и setTimeout - макротаски, а promises - микротаски
// Микротаски выполнятся раньше чем макротаски
// Микротаски создаются только с помощью promise или queueMicrotask(() => {}) [< Выполнится сразу после синхронного кода]
// Микротаски выполняются до того как отрендерился DOM, а макротаски после.

// Promise.allSettled([]); - Всегда fulfilled, но возвращает не массив распакованных значений, а массив специальных объектов
// Эти объекты имеют поля status, value, reason;

Promise.allSettled([a, b]).then(([a, b]) => {
  if (a.status === "fulfilled") {
    console.log(a.value);
  }

  if (a.status === "rejected") {
    console.log(a.reason);
  }
});

// Promise.race([]); - Также принимает на вход итерируемый объект. Resolve или reject тем значением, которое пришло самым первым.
// Вариант использования - если асинхронное действие длится слишком долго, то можно вызвать reject.
Promise.race([doAction(), sleep(200).then(() => Promise.reject("Timeout"))]); // < doAction - возвращает promise

// Promise.any([]); - Возвращаемый станет fulfilled, когда хотя бы один из переданных promises станет fulfilled
// А станет rejected, если абсолютно все переданные станут rejected.
// Может быть полезен при проверке на наличие интернета

// fetchWithRetry

function fetchWithRetry(constructor, tries) {
  return constructor().catch((err) => {
    if (tries <= 0) {
      return Promise.reject(err);
    }

    tries--;
    return fetchWithRetry(constructor, tries);
  });
}

// Обработка событий через Promise.
function on(el, event) {
  return new Promise((resolve) =>
    el.addEventListener(event, resolve, { once: true })
  );
}

on(el, "click").then(() => {});

function logAfter(task) {
  task.then(() => console.log(""));
}

logAfter(on(el, "click"));
logAfter(openFile("click.txt"));
// Такие функции помогают писать более полиморфный код

// "Синхронный API для promises"
class SyncPromise {
  static resolve(val) {
    if (val instanceof SyncPromise) {
      return val;
    }

    return new SyncPromise((resolve) => {
      resolve(val);
    });
  }

  static reject(val) {
    return new SyncPromise((_, reject) => {
      reject(val);
    });
  }

  static all(iterable) {
    const tasks = Array.from(iterable);

    if (tasks.length === 0) {
      return SyncPromise.resolve([]);
    }

    return new SyncPromise((resolve, reject) => {
      const results = new Array(tasks.length);
      let done = 0;

      for (let i = 0; i < tasks.length; i++) {
        tasks[i] = SyncPromise.resolve(task[i]);
        tasks[i]
          .then((res) => {
            results[i] = res;
            done += 1;

            if (done === tasks.length) {
              resolve(results);
            }
          })
          .catch(reject);
      }
    });
  }

  static allSettled(iterable) {
    const tasks = Array.from(iterable);

    if (tasks.length === 0) {
      return SyncPromise.resolve([]);
    }

    return new SyncPromise((resolve) => {
      const results = new Array(tasks.length);
      let done = 0;

      for (let i = 0; i < tasks.length; i++) {
        tasks[i] = SyncPromise.resolve(task[i]);
        tasks[i]
          .then((value) => {
            results[i] = { status: "fulfilled", value };
            done += 1;

            if (done === tasks.length) {
              resolve(results);
            }
          })
          .catch((reason) => {
            results[i] = { status: "rejected", reason };
            done += 1;

            if (done === tasks.length) {
              resolve(results);
            }
          });
      }
    });
  }

  static race(iterable) {
    const tasks = Array.from(iterable);

    if (tasks.length === 0) {
      return SyncPromise.resolve();
    }

    return new SyncPromise((resolve, reject) => {
      for (let i = 0; i < tasks.length; i++) {
        SyncPromise.resolve(tasks[i]).then(resolve, reject);
      }
    });
  }

  constructor(constr) {
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

  then(onFulfilled, onRejected) {
    return new SyncPromise((resolve, reject) => {
      const wrappedResolve = () => {
        try {
          resolve(onFulfilled ? onFulfilled(this.value) : this.value);
        } catch (err) {
          reject(err);
        }
      };
      const wrappedReject = () => {
        if (onRejected) {
          try {
            resolve(onRejected(this.reason));
          } catch (err) {
            reject(err);
          }
        } else {
          reject(this.reason);
        }
      };

      if (this.status === "fulfilled") {
        wrappedResolve();
        return;
      }

      if (this.status === "rejected") {
        wrappedReject();
        return;
      }

      this.onFulfilled.push(wrappedResolve);
      this.onRejected.push(wrappedReject);
    });
  }

  catch(onRejected) {
    return new SyncPromise((resolve, reject) => {
      const wrappedReject = () => {
        if (onRejected) {
          try {
            resolve(onRejected(this.reason));
          } catch (err) {
            reject(err);
          }
        } else {
          reject(this.reason);
        }
      };

      if (this.status === "fulfilled") {
        resolve(this.value);
        return;
      }

      if (this.status === "rejected") {
        wrappedReject();
        return;
      }

      this.onFulfilled.push(resolve);

      this.onRejected.push(wrappedReject);
    });
  }

  finally(cb) {
    return new SyncPromise((resolve, reject) => {
      const wrappedResolve = () => {
        try {
          let res = cb();

          if (typeof res.then === "function") {
            res = res.then(() => this.value);
          } else {
            res = this.value;
          }

          resolve(res);
        } catch (err) {
          reject(err);
        }
      };

      const wrappedReject = () => {
        try {
          let res = cb();

          if (typeof res.then === "function") {
            res = res.then(() => {
              throw this.reason;
            });

            resolve(res);
          } else {
            reject(this.reason);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.status === "fulfilled") {
        wrappedResolve();
        return;
      }

      if (this.status === "rejected") {
        wrappedReject();
        return;
      }

      this.onFulfilled.push(wrappedResolve);
      this.onRejected.push(wrappedReject);
    });
  }
}

// То что представляют из себя Promises в функциональных языках программирования называется монады

function abortable(promise, abortSignal) {
  return new Promise((resolve, reject) => {
    const onAbort = () => {
      reject("Aborted");
    };

    abortSignal.addEventListener("abort", onAbort, { once: true });

    promise.then(
      (res) => {
        abortSignal.removeEventListener("abort", onAbort);
        resolve(res);
      },
      (err) => {
        abortSignal.removeEventListener("abort", onAbort);
        reject(err);
      }
    );
  });
}

const abortController = new AbortController();

abortable(sleep(500), abortController.signal);

abortController.abort();
