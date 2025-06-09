import { validate as validateUuid } from "uuid";
import { Uuid, UuidInvalidError } from "..";

describe("Uuid Unit Tests", () => {
  const validateSpy = jest.spyOn(Uuid.prototype, "validate");

  it("Should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(validateUuid(uuid.id)).toBe(true);

    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("Should throw an error when uuid is invalid", () => {
    expect(() => new Uuid("invalid-uuid")).toThrow(new UuidInvalidError());
    expect(() => new Uuid("123e4567-e89b-12d3-a456-42661417400")).toThrow(
      new UuidInvalidError()
    );
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it("Should accept a valid uuid", () => {
    const providedUuid = "f47ac10b-58cc-4372-a567-0e02b2c3d479";

    const uuid = new Uuid(providedUuid);
    expect(uuid.id).toBe(providedUuid);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
