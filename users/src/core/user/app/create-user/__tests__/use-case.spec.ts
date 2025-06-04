import { Chance } from "chance";
import { UserInMemoryRepository } from "../../../infra/db/in-memory/user.repository";
import { CreateUser } from "../use-case";

const chance = Chance();

describe("Create User Unit Tests", () => {
  let createUser: CreateUser;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    createUser = new CreateUser(repository);
  });

  it("Should create a user", async () => {
    const spyInsert = jest.spyOn(repository, "insert");

    const output = await createUser.execute({
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
});
