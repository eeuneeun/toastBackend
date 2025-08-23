import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Menu } from "./Menu";

@Entity("store", { schema: "merchant" })
export class Store {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "address", length: 255 })
  address: string;

  @Column("varchar", { name: "postNum", length: 255 })
  postNum: string;

  @Column("varchar", { name: "tel", length: 255 })
  tel: string;

  @Column("varchar", { name: "businessNum", length: 255 })
  businessNum: string;

  @Column("varchar", { name: "desc", length: 255 })
  desc: string;

  @Column("varchar", { name: "imgUrl", length: 255 })
  imgUrl: string;

  @ManyToOne(() => User, (user) => user.stores, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ownerId", referencedColumnName: "id" }])
  owner: User;

  @OneToMany(() => Menu, (menu) => menu.store)
  menus: Menu[];
}
