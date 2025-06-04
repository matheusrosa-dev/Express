import { Chance } from "chance";
import { Email, Uuid } from "../../../shared/domain/value-objects";
import { Status } from "../enums";
import { User } from "../user.entity";
import { UserFactory } from "../user.factory";

const chance = Chance();

describe("UserFactory Unit Tests", () => {
  const validateSpy = jest.spyOn(User.prototype, "validate");

  describe("Factory", () => {
    it("Should create a user", () => {
      const user = UserFactory.create({
        email: chance.email(),
        name: chance.name(),
      });

      expect(validateSpy).toHaveBeenCalledTimes(1);
      expect(user).toBeInstanceOf(User);
    });
  });

  describe("Fake Builder", () => {
    describe("One user", () => {
      it("Should create", () => {
        const faker = UserFactory.fake().one();
        const user = faker.build();

        expect(validateSpy).toHaveBeenCalledTimes(1);

        expect(user).toBeInstanceOf(User);
        expect(user.id).toBeInstanceOf(Uuid);

        expect(typeof user.name).toBe("string");
        expect(user.name).toBeTruthy();

        expect(user.email).toBeInstanceOf(Email);

        expect(user.status).toBe(Status.ACTIVE);

        expect(user.createdAt).toBeInstanceOf(Date);
      });

      it("Should create with provided id", () => {
        const id = new Uuid();
        const faker = UserFactory.fake().one();
        const user = faker.withId(id).build();

        expect(user.id.equals(id)).toBe(true);
      });

      it("Should create with provided name", () => {
        const name = chance.name();

        const faker = UserFactory.fake().one();
        const user = faker.withName(name).build();

        expect(user.name).toBe(name);
      });

      it("Should create with provided email", () => {
        const email = chance.email();
        const faker = UserFactory.fake().one();
        const user = faker.withEmail(email).build();

        expect(user.email.email).toEqual(email);
      });

      it("Should create with provided status", () => {
        const faker = UserFactory.fake().one();
        const user = faker.withStatus(Status.BLOCKED).build();

        expect(user.status).toBe(Status.BLOCKED);
      });

      it("Should create with provided createdAt", () => {
        const createdAt = new Date();
        const faker = UserFactory.fake().one();
        const user = faker.withCreatedAt(createdAt).build();

        expect(user.createdAt).toEqual(createdAt);
      });
    });

    describe("Many users", () => {
      it("Should create", () => {
        const faker = UserFactory.fake().many(5);
        const users = faker.build();

        expect(validateSpy).toHaveBeenCalledTimes(5);

        users.forEach((user) => {
          expect(user).toBeInstanceOf(User);

          expect(user.id).toBeInstanceOf(Uuid);

          expect(typeof user.name).toBe("string");
          expect(user.name).toBeTruthy();

          expect(user.email).toBeInstanceOf(Email);

          expect(user.status).toBe(Status.ACTIVE);

          expect(user.createdAt).toBeInstanceOf(Date);
        });
      });

      it("Should create with provided id", () => {
        const id = new Uuid();
        const faker = UserFactory.fake().many(5);
        const users = faker.withId(id).build();

        users.forEach((user) => {
          expect(user.id.equals(id)).toBe(true);
        });
      });

      it("Should create with provided name", () => {
        const name = chance.name();

        const faker = UserFactory.fake().many(5);
        const users = faker.withName(name).build();

        users.forEach((user) => {
          expect(user.name).toBe(name);
        });
      });

      it("Should create with provided email", () => {
        const email = chance.email();
        const faker = UserFactory.fake().many(5);
        const users = faker.withEmail(email).build();

        users.forEach((user) => {
          expect(user.email.email).toEqual(email);
        });
      });

      it("Should create with provided status", () => {
        const faker = UserFactory.fake().many(5);
        const users = faker.withStatus(Status.BLOCKED).build();

        users.forEach((user) => {
          expect(user.status).toBe(Status.BLOCKED);
        });
      });

      it("Should create with provided createdAt", () => {
        const createdAt = new Date();
        const faker = UserFactory.fake().many(5);
        const users = faker.withCreatedAt(createdAt).build();

        users.forEach((user) => {
          expect(user.createdAt).toEqual(createdAt);
        });
      });
    });
  });
});
