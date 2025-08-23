import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MenuGroup } from "./MenuGroup";
import { Store } from "./Store";

@Entity("menu", { schema: "merchant" })
export class Menu {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "category", length: 255 })
  category: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "desc", length: 255 })
  desc: string;

  @Column("decimal", { name: "price", precision: 10, scale: 2 })
  price: string;

  @Column("varchar", { name: "imgUrl", length: 255 })
  imgUrl: string;

  @OneToMany(() => MenuGroup, (menuGroup) => menuGroup.menu)
  menuGroups: MenuGroup[];

  @ManyToOne(() => Store, (store) => store.menus, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "storeId", referencedColumnName: "id" }])
  store: Store;
}
