import { FindUserById } from "../use-case";
import { Uuid } from "../../../../shared/domain/value-objects";
import { UserNotFoundError } from "../../common/errors";
import { UserMySQLRepository } from "../../../../infra/user/db/my-sql/user.repository";
import { MySQL } from "../../../../shared/infra/db/my-sql/connection";
import { UserFactory } from "../../../../domain/user/user.factory";

describe("Find User By Id Integration Tests", () => {
  const mySql = new MySQL();
  const repository = new UserMySQLRepository(mySql.connection);
  const useCase = new FindUserById(repository);

  beforeEach(() => {
    mySql.connection.execute(`DELETE FROM ${repository.tableName}`);
  });

  it("Should find a user by id", async () => {
    const spyInsert = jest.spyOn(repository, "findById");

    const user = UserFactory.fake().one().build();

    await repository.insert(user);

    const output = await useCase.execute({
      id: user.id.id,
    });

    expect(spyInsert).toHaveBeenCalledTimes(2);

    expect(output).toStrictEqual({
      id: user.id.id,
      name: user.name,
      email: user.email.email,
      status: user.status,
      createdAt: user.createdAt,
    });
  });

  it("Should throw error when user is not found", async () => {
    await expect(() => useCase.execute({ id: new Uuid().id })).rejects.toThrow(
      new UserNotFoundError()
    );
  });

  afterAll(async () => {
    await mySql.connection.end();
  });
});
