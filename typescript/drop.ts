// Необходимо написать типовую функцию Drop, которая удаляет первые N Элементов из заданного массива или кортежа
// и возвращает массив удалаенных элементов

const test1: Drop<2, [1, 2, 3]> = [1, 2];
const test2: Drop<1, [1, 2, 3]> = [1];
const test3: Drop<3, []> = [];