import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menu } from "./Menu";
import { Store } from "./Store";

@Index("UKob8kqyqqgmefl0aco34akdtpe", ["email"], { unique: true })
@Entity("user", { schema: "owner" })
export class User {
  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @PrimaryGeneratedColumn({ type: "bigint", name: "user_id" })
  userId: string;

  @Column("varchar", { name: "area", nullable: true, length: 255 })
  area: string | null;

  @Column("varchar", { name: "ceo_name", nullable: true, length: 255 })
  ceoName: string | null;

  @Column("varchar", {
    name: "email",
    nullable: true,
    unique: true,
    length: 255,
  })
  email: string | null;

  @Column("varchar", { name: "nickname", nullable: true, length: 255 })
  nickname: string | null;

  @Column("varchar", { name: "note", nullable: true, length: 255 })
  note: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 255 })
  phone: string | null;

  @Column("varchar", { name: "refresh_token", nullable: true, length: 255 })
  refreshToken: string | null;

  @Column("varchar", { name: "login_id", nullable: true, length: 255 })
  loginId: string | null;

  @Column("varchar", { name: "username", nullable: true, length: 255 })
  username: string | null;

  @OneToMany(() => Menu, (menu) => menu.userUser)
  menus: Menu[];

  @OneToMany(() => Store, (store) => store.user)
  stores: Store[];

  @OneToMany(() => Store, (store) => store.ownerUser)
  stores2: Store[];
}
