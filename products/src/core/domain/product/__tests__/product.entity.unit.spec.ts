import { Chance } from "chance";
import { Uuid } from "../../../shared/domain/value-objects";
import { Product } from "../product.entity";
import { ProductInvalid } from "../errors";

const chance = Chance();
describe("Product Unit Tests", () => {
  it("Should instance a valid product", () => {
    const name = chance.name();
    const description = chance.sentence();
    const price = chance.integer({ min: 1, max: 1000 });
    const stock = chance.integer({ min: 1, max: 1000 });
    const createdAt = new Date();

    const product = new Product({
      id: new Uuid(),
      name,
      description,
      price,
      stock,
      createdAt,
    });

    product.validate();

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBeInstanceOf(Uuid);
    expect(product.name).toBe(name);
    expect(product.description).toBe(description);
    expect(product.price).toBe(price);
    expect(product.stock).toBe(stock);
    expect(product.createdAt).toEqual(createdAt);
  });

  it("Should throw an error when validate a invalid product", () => {
    const product = new Product({
      id: new Uuid(),
      name: "",
      description: "",
      price: -10,
      stock: -10,
      createdAt: null as unknown as Date,
    });

    expect(() => product.validate()).toThrow(new ProductInvalid());
  });

  it("Should convert to JSON", () => {
    const product = new Product({
      id: new Uuid(),
      name: chance.name(),
      description: chance.sentence(),
      price: chance.integer({ min: 1, max: 1000 }),
      stock: chance.integer({ min: 1, max: 1000 }),
      createdAt: new Date(),
    });

    expect(product.toJSON()).toStrictEqual({
      id: product.id.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      createdAt: product.createdAt,
    });
  });
});
