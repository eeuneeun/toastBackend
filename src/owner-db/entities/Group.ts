import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MenuGroups } from "./MenuGroups";

@Entity("group", { schema: "owner" })
export class Group {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @OneToMany(() => MenuGroups, (menuGroups) => menuGroups.group)
  menuGroups: MenuGroups[];
}
