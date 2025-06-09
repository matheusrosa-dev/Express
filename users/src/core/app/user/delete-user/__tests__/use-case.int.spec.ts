import { DeleteUser } from "../use-case";
import { Uuid } from "../../../../shared/domain/value-objects";
import { UserNotFoundError } from "../../common/errors";
import { mysqlPool } from "../../../../shared/infra/db/my-sql/connection";
import { UserMySQLRepository } from "../../../../infra/user/db/my-sql/user.repository";
import { UserFactory } from "../../../../domain/user/user.factory";

describe("Delete User Integration Tests", () => {
  const repository = new UserMySQLRepository();
  const useCase = new DeleteUser(repository);

  beforeEach(() => {
    mysqlPool.execute(`DELETE FROM ${repository.tableName}`);
  });

  it("Should delete a user", async () => {
    const spyInsert = jest.spyOn(repository, "delete");

    const user = UserFactory.fake().one().build();

    await repository.insert(user);

    await useCase.execute({
      id: user.id.id,
    });

    const foundUser = await repository.findById(user.id);

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(foundUser).toBeNull();
  });

  it("Should throw error when user is not found", async () => {
    await expect(() => useCase.execute({ id: new Uuid().id })).rejects.toThrow(
      new UserNotFoundError()
    );
  });

  afterAll(async () => {
    await mysqlPool.end();
  });
});
