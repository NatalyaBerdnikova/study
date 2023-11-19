// Необходимо написать обертку для fetch, с возможностью "перезапроса" в случае неудачи.
// Функция должна принимать параметр-функцию, которая получает какой по счету перезапрос и возвращать количество мс
// до следующего перезапроса или false. Если функция вернула false, то Promise запроса режектится с исходной ошибкой.

function fetchWithRetry(url, params) {
  return new Promise((resolve, reject) => {
    function tryFetch(attempt) {
      fetch(url)
        .then(resolve)
        .catch((err) => {
          if (!params.retry(attempt)) {
            return reject(err);
          }

          setTimeout(() => {
            tryFetch(attempt + 1);
          }, params.retry(attempt));
        });
    }

    return tryFetch(1);
  });
}

fetchWithRetry("my-url", {
  retry: (i) => {
    if (i < 5) {
      return i * 1e3;
    }

    return false;
  },
});
