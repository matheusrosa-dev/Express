import { ValueObject } from "..";

class StringValueObject extends ValueObject {
  constructor(public value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(public value1: string, public value2: number) {
    super();
  }
}

describe("Value Object Unit Tests", () => {
  it("Should be equal", () => {
    const stringValueObject1 = new StringValueObject("test");
    const stringValueObject2 = new StringValueObject("test");
    expect(stringValueObject1.equals(stringValueObject2)).toBe(true);

    const complexValueObject1 = new ComplexValueObject("test", 1);
    const complexValueObject2 = new ComplexValueObject("test", 1);
    expect(complexValueObject1.equals(complexValueObject2)).toBe(true);
  });

  it("Should NOT be equal", () => {
    const stringValueObject1 = new StringValueObject("test1");
    const stringValueObject2 = new StringValueObject("test2");
    expect(stringValueObject1.equals(stringValueObject2)).toBe(false);

    const complexValueObject1 = new ComplexValueObject("test1", 1);
    const complexValueObject2 = new ComplexValueObject("test2", 1);
    expect(complexValueObject1.equals(complexValueObject2)).toBe(false);
  });
});
