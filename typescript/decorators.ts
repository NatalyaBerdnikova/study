// Реализовать с помощью декораторов и типовых функций поддержку методов с реализаций для интерфейсов

// Необходимо придумать как реализовать имплементацию интерфейсов с поддержкой неабстрактных методов.
// TS должен полностью понимать типы.

abstract class Duckable {
  get canFly(): boolean {
    return unimplemented();
  }

  set canFly(value: boolean) {}

  static canFly(self: Duckable): string {
    if (arguments.length > 1) {
      const value = arguments[1];
      // Setter code
    } else {
      return /* Getter code */;
    }
  }
}

@derive(Duckable)
class DuckLike implements Duckable {
  name: string = "Bob";

  fly(): void {
    // Do some logic to fly
  }
}
