import { CreateProductDto } from "../app/products/dtos";
import { Product } from "../app/products/entities";
import { ProductsRepository } from "../app/products/repositories";
import { pool } from "../shared/config/db";

const createProductDtos: CreateProductDto[] = [
  {
    name: "Laptop Gamer",
    description: "Notebook de alta performance para jogos",
    price: 7_500.99,
    stock: 15,
  },
  {
    name: "Mouse Óptico",
    description: "Mouse ergonômico com fio",
    price: 89.9,
    stock: 120,
  },
  {
    name: "Teclado Mecânico RGB",
    description: "Teclado com switches mecânicos e iluminação RGB",
    price: 349.5,
    stock: 50,
  },
  {
    name: 'Monitor Ultrawide 34"',
    description: "Monitor com proporção 21:9 para maior imersão",
    price: 2200.0,
    stock: 25,
  },
  {
    name: "Headset Gamer",
    description: "Headset de alta qualidade para jogos",
    price: 1_500.0,
    stock: 10,
  },
];

const productsRepository = new ProductsRepository();

async function seedDatabase() {
  try {
    console.log("Clearing existing products data...");

    await pool.query(`DELETE FROM products`);
    await pool.query(`ALTER TABLE products AUTO_INCREMENT = 1`);

    console.log("Inserting new products...");

    await Promise.all(
      createProductDtos.map(async (productDto) => {
        const entity = new Product(productDto);
        return productsRepository.create(entity);
      })
    );

    console.log("Products inserted successfully.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedDatabase();
