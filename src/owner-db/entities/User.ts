import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./Store";

@Entity("user", { schema: "merchant" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "userId", length: 255 })
  userId: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @OneToMany(() => Store, (store) => store.owner)
  stores: Store[];
}
