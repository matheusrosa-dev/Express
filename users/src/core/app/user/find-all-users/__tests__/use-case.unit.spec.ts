import { UserFactory } from "../../../../domain/user/user.factory";
import { UserInMemoryRepository } from "../../../../infra/user/db/in-memory/user.repository";
import { FindAllUsers } from "../use-case";

describe("Find All Users Integration Tests", () => {
  let useCase: FindAllUsers;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new FindAllUsers(repository);
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
});
