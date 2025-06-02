import { Chance } from "chance";
import { Email, Uuid } from "../../../shared/domain/value-objects";
import { User } from "../user.entity";
import { Status } from "../enums";
import { InvalidUserError } from "../errors";

const chance = Chance();
describe("User Unit Tests", () => {
  it("Should instance a valid user", () => {
    const name = chance.name();
    const createdAt = new Date();

    const user = new User({
      id: new Uuid(),
      name,
      email: new Email(chance.email()),
      status: Status.ACTIVE,
      createdAt,
    });

    user.validate();

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeInstanceOf(Uuid);
    expect(user.name).toBe(name);
    expect(user.email).toBeInstanceOf(Email);
    expect(user.status).toBe(Status.ACTIVE);
    expect(user.createdAt).toEqual(createdAt);
  });

  it("Should throw an error when validate a invalid user", () => {
    const user = new User({
      id: new Uuid(),
      name: "",
      email: new Email(chance.email()),
      status: "" as Status,
      createdAt: null as unknown as Date,
    });

    expect(() => user.validate()).toThrow(new InvalidUserError());
  });

  it("Should convert to JSON", () => {
    const user = new User({
      id: new Uuid(),
      name: chance.name(),
      email: new Email(chance.email()),
      status: Status.ACTIVE,
      createdAt: new Date(),
    });

    expect(user.toJSON()).toStrictEqual({
      id: user.id.id,
      name: user.name,
      email: user.email.email,
      status: user.status,
      createdAt: user.createdAt,
    });
  });
});
