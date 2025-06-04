import { UserInMemoryRepository } from "../../../../infra/user/db/in-memory/user.repository";
import { FindUserById } from "../use-case";
import { Uuid } from "../../../../shared/domain/value-objects";
import { NotFoundUser } from "../../common/errors";
import { UserFactory } from "../../../../domain/user/user.factory";

describe("Find User By Id Unit Tests", () => {
  let useCase: FindUserById;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new FindUserById(repository);
  });

  it("Should find a user by id", async () => {
    const spyInsert = jest.spyOn(repository, "findById");

    const user = UserFactory.fake().one().build();

    await repository.insert(user);

    const output = await useCase.execute({
      id: user.id.id,
    });

    expect(spyInsert).toHaveBeenCalledTimes(1);

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
});
