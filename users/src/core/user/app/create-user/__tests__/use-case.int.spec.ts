import { Chance } from "chance";
import { CreateUser } from "../use-case";
import { UserMySQLRepository } from "../../../infra/db/my-sql/user.repository";
import { mysqlPool } from "../../../../shared/infra/db/my-sql/connection";
import { Uuid } from "../../../../shared/domain/value-objects";

const chance = Chance();

describe("Create User Integration Tests", () => {
  const repository = new UserMySQLRepository();
  const useCase = new CreateUser(repository);

  beforeEach(() => {
    mysqlPool.execute(`DELETE FROM ${repository.tableName}`);
  });

  it("Should create a user", async () => {
    const spyInsert = jest.spyOn(repository, "insert");

    const output = await useCase.execute({
      name: chance.name(),
      email: chance.email(),
    });

    expect(spyInsert).toHaveBeenCalledTimes(1);

    const foundUser = await repository.findById(new Uuid(output.id));

    expect(output).toStrictEqual({
      id: foundUser?.id.id,
      name: foundUser?.name,
      email: foundUser?.email.email,
      status: foundUser?.status,
      createdAt: foundUser?.createdAt,
    });
  });

  afterAll(async () => {
    await mysqlPool.end();
  });
});
