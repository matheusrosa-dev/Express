import kleur from "kleur";
import { Product } from "../app/products/entities";
import { ProductsRepository } from "../app/products/repositories";
import { productsSeed } from "../db/seeds";
import { pool } from "../shared/config/db";

const productsRepository = new ProductsRepository();

async function seedDatabase() {
  try {
    console.log("Clearing existing products data...");

    await pool.query(`DELETE FROM products`);
    await pool.query(`ALTER TABLE products AUTO_INCREMENT = 1`);

    console.log("Inserting new products...");

    await Promise.all(
      productsSeed.map(async (productDto) => {
        const entity = new Product(productDto);
        return productsRepository.create(entity);
      })
    );

    console.log(kleur.bgGreen("Products inserted successfully."));
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedDatabase();
