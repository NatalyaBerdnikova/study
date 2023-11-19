// Итератор это объект, хранит текущее состояние перебора и возвращает значение (методом next)
// Возвращается при вызове метода [Symbol.iterator]

class Iter {
  constructor(iter) {
    this.iter = iter;
  }

  *[Symbol.iterator]() {
    yield* this.iter;
  }

  filter(pred) {
    const { iter } = this;

    const newIter = (function* () {
      for (const el of iter) {
        if (pred(el)) {
          yield el;
        }
      }
    })();

    return new Iter(newIter);
  }

  map(fn) {
    const { iter } = this;

    const newIter = (function* () {
      for (const el of iter) {
        yield fn(el);
      }
    })();

    return new Iter(newIter);
  }

  take(n) {
    const { iter } = this;

    const newIter = (function* () {
      if (n <= 0) {
        return;
      }

      for (const el of iter) {
        yield el;
        n--;
      }

      if (n <= 0) {
        return;
      }
    })();

    return new Iter(newIter);
  }

  enumerate() {
    const { iter } = this;

    const newIter = (function* () {
      let i = 0;

      for (const el of iter) {
        yield [i, el];
        i++;
      }
    })();

    return new Iter(newIter);
  }
}

function* getRandom() {
  while (true) {
    yield Math.random();
  }
}

let rand;

async function updateRandom(randomGenerator) {
  const iter = randomGenerator();

  for (val of iter) {
    rand = val;
    await new Promise((r) => setTimeout(r, 20 * 1e3));
  }
}

updateRandom(getRandom);

// Генераторы для написания синхронного асинхронного кода
// Как писать асинхронный код без Async/Await

function* fetchSomething() {
  try {
    const a = yield fetch("url1");
    const b = yield fetch("url2");

    return [a, b];
  } catch {
    return [];
  }
}

function executer(iter, value) {
  const res = iter.next(value);

  const promise = Promise.resolve(res.value);

  if (res.done) {
    return promise;
  }

  return promise.then(
    (val) => executer(iter, val),
    (err) => {
      const res = iter.throw(err);

      if (res.done) {
        return promise;
      }

      return executer(iter, res.value);
    }
  );
}

executer(fetchSomething()).then((val) => {
  console.log(val);
});

// Асинхронный forEach
function* _forEach(iter, fn) {
  let time = Date.now();

  for (const el of iter) {
    fn(el);

    if (Date.now - time > 300) {
      yield;
      time = Date.now();
    }
  }
}

const forEach = (...args) => executer(_forEach(...args));

// Не забыть сделать sleep внутри executer
forEach(new Array(1e8), console.log).then();
// Чтобы не писать Promise интерфейс, можем использовать executer. ^^

// Обработка событий через итераторы. Асинхронные итераторы
// Возвращает { done: false, value: Promise(e) };
function on(el, event) {
  let cb;

  el.addEventListener(event, (e) => {
    if (cb != null) {
      cb(e);
      cb = null;
    }
  });

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      return {
        done: false,
        value: new Promise((resolve) => {
          cb = resolve;
        }),
      };
    },
  };
}

// for await of создаёт цикл, проходящий через асинхронные итерируемые объекты
(async () => {
  for await (const e of on(document, "click")) {
    console.log(e);
  }
})();

// [Symbol.asyncIterator] возвращает не итератор, а промис наподобие Promise({ done: false, value: e })
// Используется в цикле for await (const i of...)
function on(el, event) {
  let cb;

  el.addEventListener(event, (e) => {
    if (cb != null) {
      cb(e);
      cb = null;
    }
  });

  return {
    [Symbol.asuncIterator]() {
      return this;
    },

    next() {
      return new Promise((resolve) => {
        cb = (arg) => {
          resolve({
            done: false,
            value: arg,
          });
        };
      });
    },
  };
}

(async () => {
  for await (const e of on(document, "click")) {
    console.log(e);
  }
})();

// Если у генератора есть модификатор async, значит он возвращает второй формат ответа Promise({done: false, value: el});
async function* on2(el, event) {
  let cb;

  el.addEventListener(event, (e) => {
    if (cb != null) {
      cb(e);
      cb = null;
    }
  });

  while (true) {
    await new Promise((resolve) => {
      cb = resolve;
    });
  }
}

(async () => {
  for await (const e of on2(document, "click")) {
    console.log(e);
  }
})();

// Также можно использовать для обработки данных, полученных от сервера
fetch("https://foo.com").then(async (res) => {
  for await (const chunk of res.body) {
    console.log(chunk);
  }
});
