import { CreateUserDto } from "../app/users/dtos";
import { User } from "../app/users/entities";
import { UsersRepository } from "../app/users/repositories";
import { pool } from "../shared/config/db";

const createUserDtos: CreateUserDto[] = [
  { name: "Alice Wonderland" },
  { name: "Bob The Builder" },
  { name: "Charlie Brown" },
  { name: "Dora the Explorer" },
  { name: "Elsa the Snow Queen" },
];

const usersRepository = new UsersRepository();

async function seedDatabase() {
  try {
    console.log("Clearing existing users data...");

    await pool.query(`DELETE FROM users`);
    await pool.query(`ALTER TABLE users AUTO_INCREMENT = 1`);

    console.log("Inserting new users...");

    await Promise.all(
      createUserDtos.map(async (userDto) => {
        const entity = new User(userDto);
        return usersRepository.create(entity);
      })
    );

    console.log("Users inserted successfully.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedDatabase();
