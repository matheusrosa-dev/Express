import kleur from "kleur";
import { UserMySQLRepository } from "../../../user/db/my-sql/user.repository";
import { MySQL } from "../../../../shared/infra/db/my-sql/connection";
import { UserFactory } from "../../../../domain/user/user.factory";

const mysql = new MySQL();
const usersRepository = new UserMySQLRepository(mysql.connection);

async function seedDatabase() {
  try {
    console.log("Clearing existing users data...");

    console.log(`DELETE FROM ${usersRepository.tableName}`);

    await mysql.connection.query(`DELETE FROM ${usersRepository.tableName}`);
    await mysql.connection.query(
      `ALTER TABLE ${usersRepository.tableName} AUTO_INCREMENT = 1`
    );

    console.log("Inserting new users...");

    await Promise.all(
      UserFactory.fake()
        .many(5)
        .build()
        .map(async (user) => {
          return usersRepository.insert(user);
        })
    );

    console.log(kleur.bgGreen("Users inserted successfully."));
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await mysql.connection.end();
  }
}

seedDatabase();
