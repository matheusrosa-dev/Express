import { FindAllUsers } from "../use-case";
import { UserMySQLRepository } from "../../../../infra/user/db/my-sql/user.repository";
import { mysqlPool } from "../../../../shared/infra/db/my-sql/connection";
import { UserFactory } from "../../../../domain/user/user.factory";

describe("Find All Users Integration Tests", () => {
  const repository = new UserMySQLRepository();
  const useCase = new FindAllUsers(repository);

  beforeEach(() => {
    mysqlPool.execute(`DELETE FROM ${repository.tableName}`);
  });

  it("Should find all users", async () => {
    const spyInsert = jest.spyOn(repository, "findAll");

    const users = UserFactory.fake().many(5).build();

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
