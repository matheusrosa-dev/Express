import { Chance } from "chance";
import { Uuid } from "../../../shared/domain/value-objects";
import { Product } from "../product.entity";
import { ProductFactory } from "../product.factory";

const chance = Chance();

describe("ProductFactory Unit Tests", () => {
  const validateSpy = jest.spyOn(Product.prototype, "validate");

  describe("Factory", () => {
    it("Should create a product", () => {
      const product = ProductFactory.create({
        name: chance.name(),
        description: chance.sentence(),
        price: chance.integer({ min: 1, max: 1000 }),
        stock: chance.integer({ min: 1, max: 1000 }),
      });

      expect(validateSpy).toHaveBeenCalledTimes(1);
      expect(product).toBeInstanceOf(Product);
    });
  });

  describe("Fake Builder", () => {
    describe("One product", () => {
      it("Should create", () => {
        const faker = ProductFactory.fake().one();
        const product = faker.build();

        expect(validateSpy).toHaveBeenCalledTimes(1);

        expect(product).toBeInstanceOf(Product);
      });

      it("Should create with provided id", () => {
        const id = new Uuid();
        const faker = ProductFactory.fake().one();
        const product = faker.withId(id).build();

        expect(product.id.equals(id)).toBe(true);
      });

      it("Should create with provided name", () => {
        const name = chance.name();

        const faker = ProductFactory.fake().one();
        const product = faker.withName(name).build();

        expect(product.name).toBe(name);
      });

      it("Should create with provided description", () => {
        const description = chance.sentence();
        const faker = ProductFactory.fake().one();
        const product = faker.withDescription(description).build();

        expect(product.description).toEqual(description);
      });

      it("Should create with provided price", () => {
        const price = chance.integer({ min: 1, max: 1000 });
        const faker = ProductFactory.fake().one();
        const product = faker.withPrice(price).build();

        expect(product.price).toEqual(price);
      });

      it("Should create with provided stock", () => {
        const stock = chance.integer({ min: 1, max: 1000 });
        const faker = ProductFactory.fake().one();
        const product = faker.withStock(stock).build();

        expect(product.stock).toEqual(stock);
      });

      it("Should create with provided createdAt", () => {
        const createdAt = new Date();
        const faker = ProductFactory.fake().one();
        const product = faker.withCreatedAt(createdAt).build();

        expect(product.createdAt).toEqual(createdAt);
      });
    });

    describe("Many products", () => {
      it("Should create", () => {
        const faker = ProductFactory.fake().many(5);
        const products = faker.build();

        expect(validateSpy).toHaveBeenCalledTimes(5);

        products.forEach((product) => {
          expect(product).toBeInstanceOf(Product);
        });
      });

      it("Should create with provided id", () => {
        const id = new Uuid();
        const faker = ProductFactory.fake().many(5);
        const products = faker.withId(id).build();

        products.forEach((product) => {
          expect(product.id.equals(id)).toBe(true);
        });
      });

      it("Should create with provided name", () => {
        const name = chance.name();

        const faker = ProductFactory.fake().many(5);
        const products = faker.withName(name).build();

        products.forEach((product) => {
          expect(product.name).toBe(name);
        });
      });

      it("Should create with provided description", () => {
        const description = chance.sentence();
        const faker = ProductFactory.fake().many(5);
        const products = faker.withDescription(description).build();

        products.forEach((product) => {
          expect(product.description).toEqual(description);
        });
      });

      it("Should create with provided price", () => {
        const price = chance.integer({ min: 1, max: 1000 });
        const faker = ProductFactory.fake().many(5);
        const products = faker.withPrice(price).build();

        products.forEach((product) => {
          expect(product.price).toBe(price);
        });
      });

      it("Should create with provided stock", () => {
        const stock = chance.integer({ min: 1, max: 1000 });
        const faker = ProductFactory.fake().many(5);
        const products = faker.withStock(stock).build();

        products.forEach((product) => {
          expect(product.stock).toBe(stock);
        });
      });

      it("Should create with provided createdAt", () => {
        const createdAt = new Date();
        const faker = ProductFactory.fake().many(5);
        const products = faker.withCreatedAt(createdAt).build();

        products.forEach((product) => {
          expect(product.createdAt).toEqual(createdAt);
        });
      });
    });
  });
});
