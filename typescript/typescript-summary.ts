// Typescript - надмножество языка JavaScript
// Привносит возможность явно аннотировать используемые в программе типы

// В браузере мы можем исполнять только JS, для исполнения TS нужно скомпилировать
// npx tsc ./index.ts - typescript compiler обработает ts файл в js
// Тип - абстрактный маркер, связанный с опр. сущностью, и ассоциирует с этой сущностью определенный набор методов и свойств

// Встроенные типы данных JS: 1. Number (Double 3.14), 2. BigInt (Очень большое, но целое),
// 3. String (UTF-16, каждый символ - 2 байта), эмоджи иконки например представлены суррогатными парами, символами начала и конца
// 4. Boolean (однобитное значение, 1 байт)
// 5. Symbol (Для записи в объекты, прочитать можно только по ссылке на этот символ)
// 6. Null, 7. Undefined Примитивные типы <^ 8. Object

// JS - язык динамический, все типы обрабатываются в runtime
// Виды типизаций:
// 1. Слабая или сильная (нестрогая или строгая)
// В сильной типизации нельзя использовать операторы для операндов разных типов
// В JS слабая типизация
// 2. Явная или неявная
// При явной типизации тип всегда указывается при объявлении переменных
// В неявной виртуальная машина/компилятор (в случае JS) сам  обрабатывает тип
// При явном указании типов для компилятора или IDE появляется возможность статического анализа кода
// Есть также гибридная, чтобы писать типы где необходимо, и не писать если понятно для программы из контекста
// 3. Динамическая или статическая
// При статической типизации не может быть ситуации что компилятор не может вывести какой-то тип
// При динамической типизации на этапе компиляции ничего не известно про типы
// Все типы определяются в runtime
// Динамическая типизация дает большую гибкость, цена - потеря в эффективности Python, JavaScript, TypeScript, Julia
// Статическая типизация требует много описательного кода Java, C#, Rust

// Enum - специальный тип
// Можно использовать как тип, а можно как значение (Foo.A)
// enum Foo { A, B, C };
// const Foo = { A: 0, B: 0, C: 0, 0: 'A', 1: 'B', 2: 'C' };
// Можно также задавать значения явно
// enum StatusCodes { NotFound = 404, ServerError = 500 }
// Значение для пары может быть и числом и строкой

// Декоратор - Функция, принимает спец.объект и возвращает спец.объект
// class Foo {
//   @once
//   @deprecated
//   foo() {}
// }
// function deprecated() {
//   console.log("Method is deprecated");
// }
// function once(fn) {
//   const NULL = {};
//   let result = NULL;
//   return function () {
//     if (result === NULL) {
//       result = fn.apply(this, arguments);
//     }
//     return result;
//   };
// }

// function deprecated(target, key, desc) {
//  const fn = desc.value;
//  return {
//   ...desc,
//   value: function() {
//     console.log('Method is deprecated');
//     return fn.apply(this, arguments);
//   }
//  }
// }
// function once(target, key, desc) {
//   const NULL = {};
//   let result = NULL;
//   const fn = desc.value;
//   return {
//     ...desc,
//     value: function () {
//       if (result === NULL) {
//         result = fn.apply(this, arguments);
//       }

//       return result;
//     },
//   };
// }
// Чтобы декораторы заработали, нужно включить их в tsconfig experimentalDecorators
// Сейчас эта фича находится в драфте
// Декораторы можно реализовать в версиях JS младше ES5,  в тех версиях где присутствует реализация getters и setters
// Также typescript может преобразовывать js в более старую версию, как аналог Babel
// У typescript только 2 runtime конструкции - enum, decorators, все остальные связано с типами, и модификаторы свойств видимости у методов и свойств классов/объектов, интерфейсы

// tsconfig.json - настройки для обработки/компиляции typescript в javascript
// {
//   "compilerOptions": {
//     "target": "ES5",
//     "experimentalDecorators": true,
//     "OutDir": "dist",
//     "strict": true
//   },
//   "include": ["src"],
// }

// Базовые типы TS:
// number, bigint, string, symbol, boolean, null, undefined, object

// arr: Array<unknown> <- неважно что лежит в массиве, или неизвестный тип
// ^^ Универсальная запись для контейнерных типов.
// Array<string> === string[]
// Array<Array<string>> === string[][]
// Ковариантность - возможность прокидывать значение указанного типа, или любого его подтипа

// Можно указывать классы как типы, объекты этих классов могут быть параметрами
// class Bla { bar: '123'; }; function getBla(a: Bla) { ... };
// Если же указать вместо класса typeof Bla - то параметром будет функция-конструктор Bla, но не любая другая функция

// В типах, если необходимо обратиться к свойству, то это делается через скобки, а не точку
// function getBla(a: Bla['constructor']) { ... } < Но это будет обычной функцией

// Классы - формализация контракта, регистрация типов
// Также поддерживают ковариантность

// Upcast - преобразование передаваемого подтипа класса в его надтип (От конкретного типа к абстрактному)

// function foo(arr: Map<string, number>);
// function foo(arr: Set<string, number>);
// function foo(arr: Promise<string>); <- Promise также является контейнерным типом
// Конструкция Type<T> - в документации обозначает контейнерный тип и позволяет описать типы хранимых значений

// Размеченные объединения (тип-сумма, алгебраический тип)
// function foo(a: string | number | string[]) - в таких случаях нужно в runtime проверять тип переменной
// Такие проверки называются guard'ами, позволяют выходить из ситуаций с использованием размеченного объединения

// any - небезопасный аналог unknown, является сырым JS значением и TS никак не реагирует на обращение к переменным с таким типом

// Функция quard, возвращаемое значение равно true, когда что-то принадлежит другому типу
// function isArray(obj: unknown): boolean
// function isArray(obj: unknown): obj is Array<unknown>

// Пересечения типов
// function foo(a: Foo & Bar) {}
// class Foo { foo: string = '12'; }
// class Bar { bar: number = 12; }
// foo({ ...new Foo(), ...new Bar() });
// Используется реже, например используется с миксинами

// Константные типы
// function foo(a: 1 | 10)
// function foo(a: 'true')
// function insertAdjacentHTML(str: string, append: 'beforeBegin' | 'afterbegin' | 'beforeend' | 'afterend');

// Тип на основе шаблона (Тип: строковый шаблон)
// append: `${'after' | 'before'}${'begin' | 'end'}`

// Типы символов
// const работает как unique symbol, если бы был let, то в качестве параметра функции подходил бы любой символ
// const a: unique symbol = Symbol('foo');
// const b: unique symbol = Symbol('bla');
// function abs(a: typeof a | typeof b) {}

// Алиасы типов
// type AdjacentMode = `${'before' | 'after'}${'begin' | 'end'}`
// function insertAdjacentHTML(el: Element, html: string, mode: Adjacent): Element {}

// Интерфейсы
// interface Options { capture?: boolean; passive?: boolean; once?: boolean; }
// function addEventListener(el: Element, event: string, opts?: Options) { ... }
// В типе можно сделать пересечения и размеченные объединения (нельзя в интерфейсе).
// Интерфейс гарантирует отсутствие объединений, может наследоваться от другого интерфейса, типа или класса
// Интерфейс может наследоваться от типа, но не наоборот
// Когда есть два интерфейса (или интерфейс + класс, но не тип), с одинаковыми именами, то их свойства суммируются

// Тип функции
// interface Options { handler: (el: Element, ...args: unknown[]) => number; }
// interface Handler { (el: Element, ...args: unknown[]) => number; }
// type Handler = { (el: Element, ...args: unknown[]): number; }
// type Handler = ((el: Element, ...args: number[]) => number) | number;

// Перегрузка - способность написать функцию с одним и тем же именем, но принимающую разные аргументы
// Речь только об интерфейсе функции, а не о реализации
// Передали 1 аргумент - ф работает как getter, 2 - как setter, также в зависимости от количества аргумента разный возвращаемый тип значения
// Реализация перегрузки через function declaration:
// function widget(name: string): Widget | null;
// function widget(name: string, params: {}): true;
// function widget(name: string, params?: {}) {
//   if (arguments.length === 1) {
//     return getWidget(name);
//   }
//   return regWidget(name, params);
// }
// Не совсем правильная реализация перегрузки, поскольку функция будет принимать number | string, и не сможет сама определить возвращаемый тип:
// interface Obj {
//  foo(a: string): string;
//  foo(a: number): number;
// }
// let obj: Obj = { foo(a) { return <any>a; } }
// <any> - преобразует возвращаемое значение к типу any, и не будет совершать над ним никаких проверок
// В таком виде безопасно, но в основном лучше типы выводить
// В классе с перегрузками удобнее чем в обычных объектах
// class Obj { foo(a: string): string; foo(a: number): number; foo(a: string | number): string | number { return a } }
// Перегрузка для стрелочных функций невозможна

// Тип any
// Значение может быть чем угодно, и ts никак не проверяет операции с этим значением
// Хорошая практика - не использовать any
// 1. Можно использовать если никак по-другому не вывести тип, например при использовании библиотеки
// 2. Можно использовать там, где это значение ни на что не влияет

// Тип unknown
// Обязательно использовать guard > преобразовывать неизвестное к какому-то конкретному типу

// Тип never
// Используется для функций-типов, преобразований, которые что-то изменяют
// Не означает что функция возвращает undefined, а просто ничего не может вернуть
// Никогда не заканчивается
// function foo(): never { throw 1; }
// function foo(): never { while (true) { ... } }

// Тип void
// Значение не имеет какого-то типа, мы не можем работать с этим значением
// function foo() { console.log('1212'); }
// Функция ничего явно не возвращает. Хотя неявно функция возвращает undefined, они не равнозначны
// То есть тип возвращаемого значения может быть любым, но мы ничего с ним не делаем

// Индексы и ключи объекта
// let a: {[key: string]: number } = {}; <- означает что все ключи априори инициализированы и имеют значение
// let a: {[key: string]: number | undefined } = {};
// a['dd'] = 3434;
// a['dd34s434']?.toFixed(); - nullish оператор, проверяет есть ли значение
// a['dd34s434']!.toFixed(); - явное указание для ts что значение не null|undefined
// Стоит использовать очень осторожно,
let a: {
  length: number;
  [i: number]: number | undefined;
} = { length: 0 };

// Коллизии типов свойств
// Нельзя переопределять типы при наследовании интерфейсов
// interface Foo { a: number; }
// interface Bar extends Foo { a: string; b: number; }
// ^ Нарушение контракта
// При пересечении типов (именно примитивы) получается never
// number & string -> never
// type Foo = { a: number };
// type Bar = Foo & { a: string; b: number };
// a - never;
// Коллизий лучше избегать

// Классы в TS
// Класс формализует тип, класс - калька для создания объектов
// Модификаторы области видимости
// protected - перед объявлением свойства класса
// Снаружи к такому свойству обратиться нельзя, но потомки класса могут использовать его в своих методах
// Можно также запретить напрямую создавать экземпляры класса protected constructor() {}
// Пример с downcast, явное приведение типы
class Foo {
  #bz = 2;
  static create() {
    return new this();
    // return new (<typeof Foo>this.constructor)();
    // return new Foo();
  }

  protected constructor() {
    this.#bz++;
  }
}
// Также мы не можем одной перегрузке дать public, а другой protected
// private свойство сейчас legacy, появился до становления нативных приватных свойств
// Также у этих свойств возникают коллизии имен, а у свойств через # - нет
// Сеттер всегда возвращает void, т.к. это изменяющая функция
// get bz() { return this.#bz; };
// protected set bz(value: number): void { this.#bz = value; };

// Реализация интерфейса
interface EventEmitter {
  on(event: string, handler: (...args: any[]) => void): void;
  off(event: string, handler: (...args: any[]) => void): void;
  emit(event: string, data: unknown): void;
}

interface Focusable {
  get isFocused(): boolean;
  focus(): void;
}

class Widget implements EventEmitter, Focusable {
  on() {}
  off() {}
  emit() {}
  get isFocused() {
    return true;
  }
  focus() {}
}

class Controller {
  on() {}
  off() {}
  emit() {}
}

function foo(val: EventEmitter) {
  val.emit("dffdg", 232);
}
foo(new Controller());
// Необязательно явно указывать что класс реализует интерфейс, ts сам может проверить есть ли методы интерфейса в классе
// При наследовании может быть указан только 1 интерфейс, при реализации - не ограничено
// В интерфейсах нет дефолтной реализации, но это возможно
// Можно также имплементировать типы, но только если они не используют размеченные определения
// В интерфейсе не может быть protected или private свойств, поэтому при использовании класса как интерфейса такие свойства будут игнорироваться

// Абстрактные классы
abstract class EventEmitter2 {
  abstract dispatch(event: string, data: unknown): void;
  on(event: string, handler: (...args: any[]) => void) {}
  off(event: string, handler: (...args: any[]) => void) {}
  emit(event: string, data: unknown) {}
}

class Widget2 extends EventEmitter2 implements Focusable {
  get isFocused() {
    return true;
  }
  focus() {}
  dispatch(event: string, data: unknown) {}
}
// В коде нельзя создать абстрактный класс, создан исключительно чтобы от него наследоваться
// Также в абстрактном классе в отличии от интерфейсов можно использовать модификаторы видимости
// Также у него можно создавать абстрактные свойства и методы
// У такого метода нет реализации, реализацию нужно создавать в конкретном классе, который от него extends
// Абстрактные классы могут друг от друга наследоваться.
// Абстрактный класс также может implements interface
// constructor у абстрактных классов обязательно protected

// Переопределение свойств в дочернем классе
class A {
  protected foo: number = 1;
}

class B extends A {
  public override foo: number = 2;

  // override bar() {
  //   super.bar();
  // }
}
// Вызов метода родительского класса, если этого метода нет, то это ошибка
// Свойство когда-то было в родителе, затем его удалили и код начал ломаться непредсказуемым образом

// Строго инициализированные свойства
// Свойство всегда инициализировано, оно никогда не может быть undefined

class Foo3 {
  bla!: string;

  constructor(bla: string) {
    this.setBla(bla);
  }

  setBla(bla: string) {
    this.bla = bla;
  }
}

// Тип функции конструктора
interface Foo4 {
  foo: string;
  bla(): number;
}

interface FooConstructor4 {
  new (): Foo4;
}

class Bar4 implements Foo4 {
  foo = "sdsd";
  bla() {
    return 1212;
  }
}

function ban(value: FooConstructor4): Foo4 {
  return new value();
}

ban(Bar4); // <- Можно передавать как конструктор
// this - Неявный аргумент функции, его тип можно описать в параметрах функции
// addEventListener('bla', function(this: { a:number }) { console.log(this.a) })

// this полиморфизм
// class Foo { bar(): Foo { return this } }
// new Foo().bar().bar().bar();
// class Bar extends Foo { bar2(): Bar { return this } }
// new Foo().bar().bar2().bar();
// Вместо этого можно указать this
// class Foo { bar(): this { return this } }

// Ассоциативные типы (через this полиморфизм):
class Widget3 {
  protected value: unknown;

  getValue(): unknown {
    return this.value;
  }
}

class InputWidget extends Widget3 {
  protected override value: string = "";

  override getValue(): string {
    return String(super.getValue());
  }
}
// ts.config "noImplicitOverride": true - правила для того чтобы ts всегда ругался на отсутствие override
class FormWidget4 {
  readonly Value!: unknown;

  protected value!: this["Value"];

  getValue(): this["Value"] {
    return this.value;
  }
}

class InputWidget4 extends FormWidget4 {
  override readonly Value!: string;
}

// Свойства с флагом readonly можно менять только в конструкторе
// Используется в классах, type и в interface
// Если есть геттер, но нет сеттера, то свойство тоже readonly
// Есть предустановленные типы в ts: ReadonlyArray<string> или value: readonly string[]
class Foo5 {
  readonly bar: Readonly<{ a: 1 }>;
}
// При наследовании происходит тоже самое как если не написать override readonly
// Свойство также останется readonly

// Кортежи - массив с ограниченной длинной и определенным типом каждого элемента
// const a: [string, number, boolean] = ['', 0, false];
// В кортежах можно использовать rest оператор const a: [string, ...number[]]
// Параметры в rest - опциональны. После rest опциональные параметры идти не могут
// После опционального параметра идти неопциональный не может

// Альтернативный синтаксис кастинга
// let a = <MyType>{}; -> let a = {} as MyType;

// Операторы для работы с типами
// Оператор typeof
// let a = { a: 1, b: 2 }; type A = typeof a;

// Оператор keyof
// type A = keyof a; a - коллекция, массив/tuple/object;
// type A = keyof {a: number; b: string}; <- A = 'a' | 'b';
// type A = keyof [1, 'sd']; <- A = любое числовое значение, length

// Оператор in
// type Dict = {
//   [K in "a" | "b"]: number;
// };

// let d: Dict = {
//   a: 1,
//   b: 2,
// };

// Использование in + keyof
// interface Obj {
//   a: number;
//   b: string;
//   c: boolean;
// }

// type Dict = {
//   [K in keyof Obj]: Obj[K];
// };

// let d: Dict = {
//   a: 1,
//   b: "2",
//   c: false,
// };

// Использование in + keyof + typeof
const obj = {
  a: 1,
  b: "2",
  c: false,
};

type Dict = {
  [K in keyof typeof obj]: (typeof obj)[K];
};

let d: Dict = {
  a: 1,
  b: "2",
  c: false,
};

// Модификатор readonly вместе с индексным типом
// type Dict = {
//   readonly [K in keyof typeof obj]: (typeof obj)[K];
// };
// Чтобы избавиться от флага readonly исходного объекта нужно написать -
// type Dict = {
//   -readonly [K in keyof typeof obj]: (typeof obj)[K];
// };

// Параметрические типы и обобщенные функции (generic)
// Первый параметрический тип:
// type Dict = {
//   [K in keyof typeof obj]: (typeof obj)[K];
// };
// let a: Array<string>
// Нужно записывать тип в переменную
// Обобщенная функция или generic-функция
// function id<T>(value: T): T {...}
// id<string>() - вызывая параметрическую функцию мы можем явно ей указание значение параметрического типа
// Также можно указать этот тип по умолчанию
// function id<T = number>(value: string): T {...}
// function id<T extends Array<string>>(value: T): T {...}
// При extends типового параметра можно использовать размеченное объединение
// function foo<Y extends string | number(value: T) {}
class Optional<T> {
  readonly #value: T;

  constructor(value: T) {
    this.#value = value;
  }

  getValue(): T {
    return this.#value;
  }
}

let a5: Optional<number> = new Optional(10);

function foo5(val: Optional<number>) {}
// foo5(new Optional(true)); <- возникнет ошибка
function foo6(val: Optional<string>) {}
// foo6(new Optional<'foo'>)('foo'); <- строка foo, является подтипом типа строка

// Выведение параметрических типов
function map<
  A extends any[],
  F extends (el: A extends Array<infer V> ? V : unknown) => any
>(arr: A, fn: F): F extends (...args: any[]) => infer R ? R[] : unknown {
  return <any>arr.map(fn);
}
// infer - ключевое слово для вывода типа
// Pattern matching, если A - является наследником массива каких-то типов, и этот тип можно вывести, то взять этот тип, иначе unknown
map([1, 2, 3], String)[0].trim();

//
type GetFunctionResult<F extends Function> = F extends (
  ...args: any[]
) => infer R
  ? R
  : unknown;

type GetArrElemTypes<A extends any[]> = A extends (infer E)[] ? E : unknown;

function map2<A extends any[], F extends (el: GetArrElemTypes<A>) => any>(
  arr: A,
  fn: F
): GetFunctionResult<F>[] {
  return <any>arr.map(fn);
}
// Полезная практика выносить функции-хелперы для работы над типами выносить отдельно

// Функция, извлекающая тип первого элемента массива или кортежа
type Head<A extends any[]> = A extends []
  ? never
  : A extends [h: infer H, ...args: any]
  ? H
  : unknown;

let h: Head<[string, boolean, number]>;

type Head2<A extends any[]> = {
  0: never;
  1: A extends [h: infer H, ...args: any] ? H : unknown;
}[A extends [] ? 0 : 1];

type Tail<A extends any[]> = {
  0: [];
  1: A extends [h: any, ...args: infer A] ? A : unknown[];
}[A extends [] ? 0 : 1];

// Функция для сложения чисел
type Num = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type Inc<I extends Num> = {
  0: 1;
  1: 2;
  2: 3;
  3: 4;
  4: 5;
  5: 6;
  6: 7;
  7: 8;
  8: 9;
  9: 10;
  10: never;
}[I];
type Dec<I extends Num> = {
  0: never;
  1: 0;
  2: 1;
  3: 2;
  4: 3;
  5: 4;
  6: 5;
  7: 6;
  8: 7;
  9: 8;
  10: 9;
}[I];
type Sum<A extends Num, B extends Num> = B extends 0 ? A : Sum<Inc<A>, Dec<B>>;

let h2: Sum<3, 5>;

// Сопоставление с шаблоном параметрических типов
// function toSet<T extends any[]>(
//   arr: T
// ): Set<T extends (infer E)[] ? E : unknown> {
//   return new Set(arr);
// }
// Более короткая версия:
// function toSet<T>(arr: T[]): Set<T> {
//   return new Set(arr);
// }
// Версия с перегрузкой с параметрическими типами
function toSet<T>(arr: T[]): Set<T>;
function toSet<T>(arr: Promise<T[]>): Promise<Set<T>>;
function toSet<T extends Promise<any[]>>(
  arr: T
): Promise<Set<T extends Promise<(infer E)[]> ? E : unknown>>;

function toSet<T>(arr: T[] | Promise<T[]>): Set<T> | Promise<Set<T>> {
  if (arr instanceof Promise) {
    return arr.then((arr) => new Set(arr));
  }
  return new Set(arr);
}

// Безопасные и опасные параметрические типы
// Опасность в том, что ts не может гарантировать вывод типа
// Прямой каст типа - добавляет опасность return <T>(new Set(arr));
// Вот так безопасно:
function toSet2<T>(arr: T[]): Set<T> {
  return new Set(arr);
}
// В классах или интерфейсах мы не можем использовать extends {} | { a: 1 };
// А в параметрическом типе мы можем использовать размеченное объединение
// interface Bla<T extends string | number>

// Если мы делаем implements или extends интерфейса у которого есть параметрический тип
// То мы можем использовать pattern matching
class Optional2<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}

class ArrayOptional<T> extends Optional2<T> {}

// Подробнее про касты типов
interface Fn {
  (val: string): string;
  (val: number): number;
}

const f: Fn = (val) => <any>val;
// <any> - явный каст типа
// То есть явно указываем для ts какой тип, вне зависимости от того каким его видит ts
// Не очень безопасная операция, но страхует если не использовать any
// Также касты читаются справа налево
let a3 = <number>(<any>"fddfd");
// Здесь переходим от абстрактного типа к конкретному (downcast)
interface O {
  bla: string;
}
let a4 = <O>{};
// Объект - подтип интерфейса O и по сути должен иметь определенные свойства
// Но используя каст мы уверяем ts что это действительно нужный тип > получаем ошибки

// Функция cast
//
