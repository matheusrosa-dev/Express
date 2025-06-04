import { Chance } from "chance";
import { UserInMemoryRepository } from "../../../../infra/user/db/in-memory/user.repository";
import { UpdateUser } from "../use-case";
import { UserFactory } from "../../../../domain/user/user.factory";
import { NotFoundUser } from "../../common/errors";
import { Email } from "../../../../shared/domain/value-objects";

const chance = Chance();

describe("Update User Unit Tests", () => {
  let useCase: UpdateUser;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new UpdateUser(repository);
  });

  it("Should update a user", async () => {
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

    const foundUser = repository["_entities"][0];

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: foundUser.id.id,
      name: foundUser.name,
      email: foundUser.email.email,
      status: foundUser.status,
      createdAt: foundUser.createdAt,
    });
  });

  it("Should throw an error when user is not found", async () => {
    const user = UserFactory.fake().one().build();

    await expect(
      useCase.execute({
        id: user.id.id,
        name: user.name,
        email: user.email.email,
      })
    ).rejects.toThrow(new NotFoundUser());
  });
});
