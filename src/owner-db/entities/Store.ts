import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menu } from "./Menu";
import { Orders } from "./Orders";
import { User } from "./User";

@Index("FKn82wpcqrb21yddap4s3ttwnxj", ["userId"], {})
@Index("FKpvy5q6p27nbe94ni283thh3mp", ["ownerUserId"], {})
@Entity("store", { schema: "owner" })
export class Store {
  @Column("float", { name: "lat", nullable: true, precision: 12 })
  lat: number | null;

  @Column("float", { name: "longti", nullable: true, precision: 12 })
  longti: number | null;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @PrimaryGeneratedColumn({ type: "bigint", name: "store_id" })
  storeId: string;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("bigint", { name: "user_id", nullable: true })
  userId: string | null;

  @Column("varchar", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @Column("varchar", { name: "business_num", nullable: true, length: 255 })
  businessNum: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @Column("varchar", { name: "image", nullable: true, length: 255 })
  image: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 255 })
  phone: string | null;

  @Column("varchar", { name: "post_num", nullable: true, length: 255 })
  postNum: string | null;

  @Column("varchar", { name: "store_name", nullable: true, length: 255 })
  storeName: string | null;

  @Column("bigint", { name: "owner_user_id", nullable: true })
  ownerUserId: string | null;

  @OneToMany(() => Menu, (menu) => menu.store)
  menus: Menu[];

  @OneToMany(() => Orders, (orders) => orders.storeStore)
  orders: Orders[];

  @ManyToOne(() => User, (user) => user.stores, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;

  @ManyToOne(() => User, (user) => user.stores2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "owner_user_id", referencedColumnName: "userId" }])
  ownerUser: User;
}
