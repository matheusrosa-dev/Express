import { Chance } from "chance";
import { FindAllUsers } from "../use-case";
import { UserFactory } from "../../../domain/user.factory";
import { UserMySQLRepository } from "../../../infra/db/my-sql/user.repository";
import { mysqlPool } from "../../../../shared/infra/db/my-sql/connection";

const chance = Chance();

describe("Find All Users Integration Tests", () => {
  const repository = new UserMySQLRepository();
  const useCase = new FindAllUsers(repository);

  beforeEach(() => {
    mysqlPool.execute(`DELETE FROM ${repository.tableName}`);
  });

  it("Should find all users", async () => {
    const spyInsert = jest.spyOn(repository, "findAll");

    const users = Array(5)
      .fill(null)
      .map(() =>
        UserFactory.create({
          name: chance.name(),
          email: chance.email(),
        })
      );

    await Promise.all(users.map((user) => repository.insert(user)));

    const output = await useCase.execute();

    expect(output).toHaveLength(5);
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toEqual(
      expect.arrayContaining(
        users.map((user) => ({
          id: user.id.id,
          name: user.name,
          email: user.email.email,
          status: user.status,
          createdAt: user.createdAt,
        }))
      )
    );
  });

  afterAll(async () => {
    await mysqlPool.end();
  });
});
