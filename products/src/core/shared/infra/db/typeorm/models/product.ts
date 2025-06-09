import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({
  name: "products",
})
export class ProductModel {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  stock!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "timestamp" })
  created_at!: Date;
}
