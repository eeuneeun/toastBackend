import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OwnerStore } from "./OwnerStore";

@Entity("owner_user", { schema: "toast" })
export class OwnerUser {
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

  @OneToMany(() => OwnerStore, (ownerStore) => ownerStore.owner)
  ownerStores: OwnerStore[];
}
