import { Chance } from "chance";
import { UserInMemoryRepository } from "../../../../infra/user/db/in-memory/user.repository";
import { CreateUser } from "../use-case";
import { UserFactory } from "../../../../domain/user/user.factory";
import { UserConflictError } from "../../common/errors";

const chance = Chance();

describe("Create User Unit Tests", () => {
  let useCase: CreateUser;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new CreateUser(repository);
  });

  it("Should create a user", async () => {
    const spyInsert = jest.spyOn(repository, "insert");

    const output = await useCase.execute({
      name: chance.name(),
      email: chance.email(),
    });

    expect(spyInsert).toHaveBeenCalledTimes(1);

    const user = repository["_entities"][0];

    expect(output).toStrictEqual({
      id: user.id.id,
      name: user.name,
      email: user.email.email,
      status: user.status,
      createdAt: user.createdAt,
    });
  });

  it("Should throw an error when user already exists", async () => {
    const user = UserFactory.fake().one().build();

    await repository.insert(user);

    await expect(
      useCase.execute({
        name: user.name,
        email: user.email.email,
      })
    ).rejects.toThrow(new UserConflictError());
  });
});
