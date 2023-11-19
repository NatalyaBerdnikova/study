// Необходимо написать типовую функцию HasTail, которая возвращает true, если у переданного массива или кортежа
// есть хвостовая часть

const test1: HasTail<[1, 2, 3]> = true;
const test2: HasTail<[1]> = false;
const test3: HasTail<[]> = false;
