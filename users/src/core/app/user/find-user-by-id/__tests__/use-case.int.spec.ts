import { FindUserById } from "../use-case";
import { Uuid } from "../../../../shared/domain/value-objects";
import { NotFoundUser } from "../../common/errors";
import { UserMySQLRepository } from "../../../../infra/user/db/my-sql/user.repository";
import { mysqlPool } from "../../../../shared/infra/db/my-sql/connection";
import { UserFactory } from "../../../../domain/user/user.factory";

describe("Find User By Id Integration Tests", () => {
  const repository = new UserMySQLRepository();
  const useCase = new FindUserById(repository);

  beforeEach(() => {
    mysqlPool.execute(`DELETE FROM ${repository.tableName}`);
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
      new NotFoundUser()
    );
  });

  afterAll(async () => {
    await mysqlPool.end();
  });
});
