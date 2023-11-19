// Необходимо написать типовую функцию IterableType, которая возвращает тип элемента переданного Iterable или AsyncIterable объекта

// number
const test1: IterableType<[1, 2, 3]>;

// string
const test2: IterableType<Set<string>>;

// {a: number}
const test3: IterableType<AsyncIterable<{ a: number }>>;
