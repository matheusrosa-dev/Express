import { UserInMemoryRepository } from "../../../../infra/user/db/in-memory/user.repository";
import { DeleteUser } from "../use-case";
import { Uuid } from "../../../../shared/domain/value-objects";
import { NotFoundUser } from "../../common/errors";
import { UserFactory } from "../../../../domain/user/user.factory";

describe("Delete User Integration Tests", () => {
  let useCase: DeleteUser;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new DeleteUser(repository);
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
      new NotFoundUser()
    );
  });
});
