// Необходимо написать функцию, которая принимала бы некоторый Promise и экземпляр AbortController и
// возвращала бы новый.
// Этот промис можно отменить с помощью использования переданного AbortController. При отмене промис режектится.

var controller = new AbortController();

function abortablePromise(promise, abortSignal) {
  return new Promise((resolve, reject) => {
    const onAbort = reject("Aborted");

    abortSignal.addEventListener("abort", onAbort, { once: true });

    promise.then(
      (res) => {
        resolve(res);
        abortSignal.removeEventListener("abort", onAbort, { once: true });
      },
      (err) => {
        reject(err);
        abortSignal.removeEventListener("abort", onAbort, { once: true });
      }
    );
  });
}

abortablePromise(myPromise, controller.signal).catch(console.error);

controller.abort();
