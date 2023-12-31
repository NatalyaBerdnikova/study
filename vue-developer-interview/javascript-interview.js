// Уменьшать количество состояний (брейкпоинты - использовать em, %, vw, vh, flexbox, z-index)

// Оператор ?? и его отличие от ||
// ?? - оператор нулевого слияния, возвращает первый аргумент если он не null/undefined, иначе второй
// || - логическое или, возвращает первое истинное значение

// Замыкание, что это и как создать
// Лексическое окружение - объект (у каждой выполняемой функции, блока кода и скрипта)
// Состоит из двух частей:
// 1. Environment Record – объект, в котором как свойства хранятся все локальные переменные (а также некоторая другая информация, такая как значение this).
// 2. Ссылка на внешнее лексическое окружение – то есть то, которое соответствует коду снаружи (снаружи от текущих фигурных скобок).
// "Переменная" – это свойство специального внутреннего объекта, связанного с текущим выполняющимся блоком/функцией/скриптом. (Environment Record)
// «Получить или изменить переменную», означает, «получить или изменить свойство этого объекта».
// function declaration
// В отличие от переменных, объявленных с помощью let,
// они полностью инициализируются не тогда, когда выполнение доходит до них, а раньше, когда создаётся лексическое окружение.
// Функцию, объявленную через function declaration можно вызывать до того как она определена
// При запуске функции для неё автоматически создаётся новое лексическое окружение, для хранения локальных переменных и параметров вызова.
// Когда код хочет получить доступ к переменной – сначала происходит поиск во внутреннем лексическом окружении,
// затем во внешнем, затем в следующем и так далее, до глобального.
// Функция получает текущее значение внешних переменных, то есть их последнее значение
// Старые значения переменных нигде не сохраняются. Когда функция хочет получить доступ к переменной,
// она берёт её текущее значение из своего или внешнего лексического окружения.
// Новое лексическое окружение функции создаётся каждый раз, когда функция выполняется.
// И, если функция вызывается несколько раз, то для каждого вызова будет своё лексическое окружение,
// со своими, специфичными для этого вызова, локальными переменными и параметрами.
// При создании все функции получают скрытое свойство [[Environment]], которое ссылается на лексическое окружение места, где они были созданы.
// Для новой вложенной функции значением [[Environment]] будет текущее лексическое окружение функции родителя (где она была создана):
// Замыкание – это функция, которая запоминает свои внешние переменные и может получить к ним доступ
// В JS все функции являются замыканиями, поскольку они запоминают где были созданы с помощью Environment и могут получить доступ ко внешним переменным
// Лексическое окружение существует для любых блоков кода
// Создается при выполнении блока кода {...} и содержит его локальные переменные. Например if, for/while, {...} - простой блок кода

// immediately-invoked function expressions (function(){})();
// Так что скобки вокруг функции – это трюк, который позволяет показать JavaScript, что функция была создана в контексте другого выражения,
// и, таким образом, это функциональное выражение: ей не нужно имя и её можно вызвать немедленно.
// Сборка мусора - Обычно лексическое окружение очищается и удаляется после того, как функция выполнилась.

// Дело в том, что «на месте» разрешено вызывать только Function Expression.
// Если браузер видит function в основном потоке кода – он считает, что это Function Declaration.
// Если же function идёт в составе более сложного выражения, то он считает, что это Function Expression.

// Глобальный объект
// В браузере это window, в node.js это global
// Глобальный объект предоставляет переменные и функции, доступные в любом месте программы.
// По умолчанию это те, что встроены в язык или среду исполнения.
// globalThis - стандартизированное имя для глобального объекта
// Ко всем глобальным переменным можно обращаться напрямую (alert вместо window.alert например), глобальные переменные объявленные через var -
// доступны в этом объекте (var b = 5; window.b;)
// Можно использовать для создания полифилов
// if (!window.Promise) {
//   window.Promise = ... // собственная реализация современной возможности языка
// }

// Утечки памяти обычно случаются автоматически, и могут проявляться в двух ситуациях
// 1. Приложение, в котором посетитель все время на одной странице и работает со сложным JavaScript-интерфейсом.
// В этом случае утечки могут постепенно съедать доступную память.
// 2. Страница регулярно делает что-то, вызывающее утечку памяти. Посетитель (например, менеджер) оставляет компьютер на ночь
// включённым, чтобы не закрывать браузер с кучей вкладок.
// Приходит утром – а браузер съел всю память и рухнул и сильно тормозит.

// var - устаревшее слово для объявления переменных
// Для него не существует блочной области видимости, ограничивается только функцией или скриптом.
// Допускает повторное объявление
// бъявления переменных var обрабатываются в начале выполнения функции (или запуска скрипта, если переменная является глобальной).
// Это поведение называется «hoisting» (всплытие, поднятие), потому что все объявления переменных var «всплывают» в самый верх функции.
// Объявления переменных «всплывают», но присваивания значений – нет.

// Область видимости

// Контекст, ключевое слово this
// this - ключевое слово, объект содержащий в себе контекст выполнения функции.
// Контекст this меняется в зависимости от его использования
// 1. this = window
// Глобальная область видимости
// Внутри функций, объявленных в глобальной области видимости (При strict mode this = undefined)
// 2. Когда this используется внутри объекта, то this ссылается на сам объект
// 3. this во вложенных объектах относится к тому объекту, в методах которого он используется.
// 4. Особенности стрелочных функций: this будет таким, каким он был на момент создания стрелочной функции (захватывается из текущего контекста)
// Стрелочные функции не привязаны к собственным сущностям this, arguments, super или new.target.
// Стрелочные функции лучше всего подходят для использования их в роли обычных функций, а не методов объектов, их нельзя использовать в роли конструкторов
// 5. Обращение к this из функции, которая была объявлена за пределами объекта, а потом назначена в качестве его метода, если вызывать obj.func() - то контекст будет этим объектом
// 6. Ключевое слово new и this. Использование в функциях-конструкторах для создания объектов
// Когда функцию-конструктор вызывают с использованием ключевого слова new,
// this в ней указывает на новый объект, который, с помощью конструктора, снабжают свойствами и методами.

// Прототипное наследование
// __proto__ - исторически обусловленный геттер и сеттер для скрытого свойства [[Prototype]]
// В современном JS рекомендуется использовать Object.getPrototypeOf/Object.setPrototypeOf
// Если запрашиваемое свойство в объекте не найдено, то JS ищет его в прототипе. Это называется прототипным наследованием.
// Неважно, где находится метод: в объекте или его прототипе. При вызове метода this — всегда объект перед точкой.
// Цикл for in проходит не только по собственным свойствам объекта, но и по унаследованным
// Если унаследованные свойства нам не нужны, то мы можем отфильтровать их при помощи встроенного метода obj.hasOwnProperty(key)

// 'use strict' - директива, которая выглядит как строка
// Когда она находится в начале скрипта, весь сценарий работает в "современном" режиме. Директива не сработает, если указано не в 1-ой строке. Также можно указывать вначале функций.
// Выше 'use strict' могут писаться только комментарии.
// Отменить использование строгого режима невозможно.
// Модули и классы по умолчанию используют этот режим.
// Заменяет исключениями ошибки, которые раньше интерпретатор пропускал. Исправляет ошибки, которые мешали некоторым движкам проводить оптимизацию кода. Запрещает использовать некоторые элементы синтаксиса.
// Все содержимое модулей JavaScript автоматически находится в строгом режиме, и для его запуска не требуется никаких инструкций.

// Web API
// API геолокации https://developer.mozilla.org/ru/docs/Web/API/Geolocation_API
// Intersection Observer API
// Clipboard API
// Весь список: https://developer.mozilla.org/ru/docs/Web/API

// Паттерны проектирования
// Порождающие
// Фабричный метод, абстрактная фабрика, прототип, строитель, одиночка
// Структурные
// Адаптер, мост, компоновщик, декоратор, фасад, легковес
// Поведенческие
// Шаблонный метод, посетитель, состояние, стратегия, наблюдатель, снимок, команда, цепочка обязанностей, итератор, посредник

// Singleton
// Необходима гарантия что из этого класса будет создан лишь один объект
// static поле - к нему можно обращаться без создания экземпляра класса
// class Database {
//   url: String,
//   private static instance: Database;

//   constructor() {
//     if (Database.instance) {
//       return Database.instance;
//     }
//     this.url = Math.random();
//     Database.instance = this;
//   }
// }
//

// Модули
// CommonJS – модульная система, созданная для сервера Node.js.
// Также есть AMD (ex require.js) и UMD (универсальная, совместима с предыдущими двумя)
// Система модулей на уровне языка появилась в 2015
// Модуль это просто файл. Один скрипт - один файл
// Директивы export и import чтобы вызывать одни модули из других
// Модули поддерживают ряд спец.ключевых слов и имеют ряд особенностей, поэтому нужно явно указывать что скрипт является модулем
// <script type="module">
// Модули не работают локально, только через http(s) или при использовании live server
// Особенности модулей:
// 1. Всегда 'use strict'
// 2. Своя область видимости
// 3. Код в модуле выполняется только один раз при импорте
// Такое поведение позволяет конфигурировать модули при первом импорте. Мы можем установить его свойства один раз,
// и в дальнейших импортах он будет уже настроенным.
// 4. Объект import.meta содержит информацию о текущем модуле.
// В модуле this - не определен.
// Особенности в браузерах
// 1. Модули являются отложенными (Всегда выполняются в отложенном режиме, как скрипты с атрибутом defer)
// Их загрузка не блокирует обработку HTML, ожидают полной загрузки HTML и только потом выполняются, сохраняется порядок
// 2. Атрибут async работает для модульных скриптов. Скрипт выполнится сразу как загрузится
// 3. Внешние скрипты с type="module" с одинаковым src запускаются только 1 раз
// 4. Внешний скрипт с другого домена должен указать заголовок CORS(Access-Control-Allow-Origin), обеспечивая лучшую безопасность по умолчанию
// 5. Путь должен быть абсолютным или относительным, но не голым import from 'sayHi'
// 6. nomodule атрибут для script при отсутствии поддержки в браузере модулей
// Инструменты сборки:
// tree-shaking - удаление неиспользуемых модулей, удаление недостижимого кода, спец.операторов console debugger
// Современный js может быть трансформирован в предыдущий стандарт с помощью Babel
// Минимизация кода (удаление пробелов, более коротки имена для переменных)
// Сборщик соберет все модули в один/несколько файлов и их можно подключить как обычный скрипт
// Импортирование всего из модуля import * as say from 'sayHi';
// 1. Сборщик не сможет оптимизировать этот модуль (удалить неиспользуемые функции, поскольку они импортированы)
// 2. Более длинное имя для функций
// 3. Код менее понятен, что и где используется отследить сложнее
// Импорт "как" (alias) import {sayHi as hi, sayBye as bye} from './say.js';
// Экспорт аналогично export {sayHi as hi, sayBye as bye};
// Экспорт по умолчанию - export default, импортируем без {}
// Имя default - export {sayHi as default};
// Импорт default вместе с именованным import {default as User, sayHi} from './user.js';
// Реэкспорт
// export {sayHi} from './say.js'; // реэкспортировать sayHi
// export {default as User} from './user.js'; // реэкспортировать default
// export User from './user.js' - работать не будет
// export * from './user.js' реэкспортирует только именованные экспорты, исключая экспорт по умолчанию
// Динамический импорт
// Выражение import(path) - возвращает промис с объектом всех экспортов модуля
// let obj = await import('./say.js');
// let say = obj.default;
// или, одной строкой: let {default: say} = await import('./say.js');
// Динамический импорт работает в скриптах (без указания type module)
// Это не функция, а спец.синтаксис как super(). Так что мы не можем скопировать import в другую переменную или вызвать при помощи .call/apply

// Каррирование
// это трансформация функций таким образом, чтобы они принимали аргументы не как f(a, b, c), а как f(a)(b)(c)
// Реализация каррирования с неопределенным заранее количеством аргументов
// function curry(func) {
//   return function curried(...args) {
//     if (args.length >= func.length) {
//       return func.apply(this, args);
//     } else {
//       return function(...args2) {
//         return curried.apply(this, args.concat(args2));
//       }
//     }
//   };
// }
// Для каррирования необходима функция с ограниченным количество аргументов, функцию f(...args) каррировать не получится.

// Ссылочный тип (Reference Type)
// Для работы вызовов типа user.hi(), JavaScript использует трюк – точка '.' возвращает не саму функцию, а специальное значение «ссылочного типа»
// let user = {
//   name: "John",
//   hi() { alert(this.name); }
// };
// разделим получение метода объекта и его вызов в разных строках
// let hi = user.hi;
// hi(); // Ошибка, потому что значением this является undefined
// (user.name == "John" ? user.hi : user.bye)(); // Ошибка!
// Результатом доступа к свойству user.hi является не функция, а значение ссылочного типа. Для user.hi в строгом режиме оно будет таким:
// (user, "hi", true) // значение ссылочного типа (Reference Type)
// Когда скобки () применяются к значению ссылочного типа (происходит вызов), то они получают полную информацию об объекте и его методе, и могут поставить правильный this (user в данном случае, по base).
// Ссылочный тип – исключительно внутренний, промежуточный, используемый, чтобы передать информацию от точки . до вызывающих скобок ().
// При любой другой операции, например, присваивании hi = user.hi, ссылочный тип заменяется на собственно значение user.hi (функцию), и дальше работа уже идёт только с ней. Поэтому дальнейший вызов происходит уже без this.

// Методы объекта. this
// Функции, которые находятся в свойствах объекта, называются «методами».
// Методы позволяют объектам «действовать»: object.doSomething().
// Методы могут ссылаться на объект через this.
// Значение this определяется во время исполнения кода.
// При объявлении любой функции в ней можно использовать this, но этот this не имеет значения до тех пор, пока функция не будет вызвана.
// Функция может быть скопирована между объектами (из одного объекта в другой).
// Когда функция вызывается синтаксисом «метода» – object.method(), значением this во время вызова является object.
// Также ещё раз заметим, что стрелочные функции являются особенными – у них нет this. Когда внутри стрелочной функции обращаются к this, то его значение берётся извне.
// Значение this одно для всей функции, блоки кода и объектные литералы на него не влияют

// Привязка контекста this для функции.
// При передаче функции отдельно от ее выполнения теряется контекст this, например setTimeout(func, 100)
// Можно использовать анонимную функцию как обертку, или явно привязать контекст с помощью bind
// bindAll - привязать контекст ко всем методам объекта
// for (let key in user) {
//   if (typeof user[key] == 'function') {
//     user[key] = user[key].bind(user);
//   }
// }
// Частичное применение, с помощью bind можно привязать не только контекст, но и аргументы
// let bound = func.bind(context, [arg1], [arg2], ...);
// Частичное применение без контекста
// function partial(func, ...argsBound) {
//   return function(...args) { // (*)
//     return func.call(this, ...argsBound, ...args);
//   }
// }
// Экзотический объект bound function, возвращаемый при первом вызове f.bind(...), запоминает контекст (и аргументы, если они были переданы) только во время создания.
// Следующий вызов bind будет устанавливать контекст уже для этого объекта. Это ни на что не повлияет.
// Можно сделать новую привязку, но нельзя изменить существующую.
// function f() {
//   alert(this.name);
// }
// f = f.bind({ name: "Вася" }).bind({ name: "Петя" });
// f(); // Вася
// Результатом работы bind является другой объект.
// forEach по умолчанию выполняет функции с this, равным undefined
//
