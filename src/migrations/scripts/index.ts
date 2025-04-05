import CreateProductsTable from "./create_products_table";
import CreatePurchasesTable from "./create_purchases_table";
import CreateUsersTable from "./create_users_table";
import CreatePurchaseProductsTable from "./create_purchase_products_table";

export const migrations = [
  CreateUsersTable,
  CreateProductsTable,
  CreatePurchasesTable,
  CreatePurchaseProductsTable,
];
