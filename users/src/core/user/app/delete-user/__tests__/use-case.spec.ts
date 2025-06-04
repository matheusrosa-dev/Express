import { Chance } from "chance";
import { UserInMemoryRepository } from "../../../infra/db/in-memory/user.repository";
import { DeleteUser } from "../use-case";
import { UserFactory } from "../../../domain/user.factory";
import { Uuid } from "../../../../shared/domain/value-objects";
import { NotFoundUser } from "../../errors";

const chance = Chance();

describe("Delete User Integration Tests", () => {
  let deleteUser: DeleteUser;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    deleteUser = new DeleteUser(repository);
  });

  it("Should delete a user", async () => {
    const spyInsert = jest.spyOn(repository, "delete");

    const user = UserFactory.create({
      name: chance.name(),
      email: chance.email(),
    });

    await repository.insert(user);

    await deleteUser.execute({
      id: user.id.id,
    });

    const foundUser = await repository.findById(user.id);

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(foundUser).toBeNull();
  });

  it("Should throw error when user is not found", async () => {
    await expect(() =>
      deleteUser.execute({ id: new Uuid().id })
    ).rejects.toThrow(new NotFoundUser());
  });
});
