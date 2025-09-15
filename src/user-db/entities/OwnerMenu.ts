import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OwnerStore } from "./OwnerStore";
import { OwnerMenuGroup } from "./OwnerMenuGroup";

@Entity("owner_menu", { schema: "toast" })
export class OwnerMenu {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "category", length: 255 })
  category: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "desc", length: 255 })
  desc: string;

  @Column("decimal", {
    name: "price",
    precision: 10,
    scale: 0,
    default: () => "'0'",
  })
  price: string;

  @Column("varchar", { name: "imgUrl", length: 255 })
  imgUrl: string;

  @ManyToOne(() => OwnerStore, (ownerStore) => ownerStore.ownerMenus, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "storeId", referencedColumnName: "id" }])
  store: OwnerStore;

  @OneToMany(() => OwnerMenuGroup, (ownerMenuGroup) => ownerMenuGroup.menu)
  ownerMenuGroups: OwnerMenuGroup[];
}
