import { EmailInvalidError, Email } from "..";
import { Chance } from "chance";
import { validateEmail } from "../../utils";

const chance = Chance();

describe("Email Unit Tests", () => {
  const validateSpy = jest.spyOn(Email.prototype, "validate");

  it("Should create a valid email", () => {
    const email = new Email(chance.email());

    expect(validateEmail(email.email)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("Should throw an error when email is invalid", () => {
    expect(() => new Email("invalid-email")).toThrow(new EmailInvalidError());
    expect(() => new Email("invalid@email")).toThrow(new EmailInvalidError());
    expect(() => new Email("@email.com")).toThrow(new EmailInvalidError());
    expect(() => new Email("invalid-email.com")).toThrow(
      new EmailInvalidError()
    );

    expect(validateSpy).toHaveBeenCalledTimes(4);
  });

  it("Should accept a valid email", () => {
    const providedEmail = chance.email();

    const email = new Email(providedEmail);
    expect(email.email).toBe(providedEmail);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
