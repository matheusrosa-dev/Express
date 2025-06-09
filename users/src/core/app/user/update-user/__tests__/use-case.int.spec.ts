import { Chance } from "chance";
import { UpdateUser } from "../use-case";
import { UserMySQLRepository } from "../../../../infra/user/db/my-sql/user.repository";
import { mysqlPool } from "../../../../shared/infra/db/my-sql/connection";
import { Email, Uuid } from "../../../../shared/domain/value-objects";
import { UserFactory } from "../../../../domain/user/user.factory";
import { UserNotFoundError } from "../../common/errors";

const chance = Chance();

describe("Update User Integration Tests", () => {
  const repository = new UserMySQLRepository();
  const useCase = new UpdateUser(repository);

  beforeEach(() => {
    mysqlPool.execute(`DELETE FROM ${repository.tableName}`);
  });

  it("Should create a user", async () => {
    const spyInsert = jest.spyOn(repository, "update");

    const user = UserFactory.fake().one().build();

    await repository.insert(user);

    user.update({
      name: chance.name(),
      email: new Email(chance.email()),
    });

    const output = await useCase.execute({
      id: user.id.id,
      name: user.name,
      email: user.email.email,
    });

    const foundUser = (await repository.findById(new Uuid(output.id)))!;

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: foundUser.id.id,
      name: foundUser.name,
      email: foundUser.email.email,
      status: foundUser.status,
      createdAt: foundUser.createdAt,
    });
  });

  it("Should throw an error when user already exists", async () => {
    const user = UserFactory.fake().one().build();

    await expect(
      useCase.execute({
        id: user.id.id,
        name: user.name,
        email: user.email.email,
      })
    ).rejects.toThrow(new UserNotFoundError());
  });

  afterAll(async () => {
    await mysqlPool.end();
  });
});
