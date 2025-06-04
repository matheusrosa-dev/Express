import { Chance } from "chance";
import { mysqlPool } from "../../../../../shared/infra/db/my-sql/connection";
import { UserMySQLRepository } from "../user.repository";
import { Email } from "../../../../../shared/domain/value-objects";
import { UserFactory } from "../../../../../domain/user/user.factory";
import { Status } from "../../../../../domain/user/enums";

const chance = Chance();

describe("UserMySQLRepository Unit Tests", () => {
  const repository = new UserMySQLRepository();

  beforeEach(async () => {
    await mysqlPool.execute(`DELETE FROM ${repository.tableName}`);
  });

  it("Should insert a new user", async () => {
    const user = UserFactory.fake().one().build();

    const createdUser = await repository.insert(user);

    expect(createdUser).toStrictEqual(user);
  });

  it("Should delete a user", async () => {
    const user = UserFactory.fake().one().build();

    const createdUser = await repository.insert(user);

    await repository.delete(createdUser.id);

    const foundUser = await repository.findById(createdUser.id);

    expect(foundUser).toBeNull();
  });

  it("Should update a user", async () => {
    const user = UserFactory.fake().one().build();

    await repository.insert(user);

    user.update({
      name: chance.name(),
      email: new Email(chance.email()),
      status: Status.BLOCKED,
    });

    const updatedUser = await repository.update(user);

    expect(updatedUser).toStrictEqual(user);
  });

  it("Should find all users", async () => {
    const users = UserFactory.fake().many(5).build();

    await Promise.all(users.map((user) => repository.insert(user)));

    const foundUsers = await repository.findAll();

    expect(foundUsers).toHaveLength(5);
    expect(foundUsers).toEqual(expect.arrayContaining(users));
  });

  afterAll(async () => {
    await mysqlPool.end();
  });
});
