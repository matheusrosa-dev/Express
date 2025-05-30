import kleur from "kleur";
import { User } from "../app/users/entities";
import { UsersRepository } from "../app/users/repositories";
import { usersSeed } from "../db/seeds";
import { pool } from "../shared/config/db";

const usersRepository = new UsersRepository();

async function seedDatabase() {
  try {
    console.log("Clearing existing users data...");

    await pool.query(`DELETE FROM users`);
    await pool.query(`ALTER TABLE users AUTO_INCREMENT = 1`);

    console.log("Inserting new users...");

    await Promise.all(
      usersSeed.map(async (userDto) => {
        const entity = new User(userDto);
        return usersRepository.create(entity);
      })
    );

    console.log(kleur.bgGreen("Users inserted successfully."));
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedDatabase();
