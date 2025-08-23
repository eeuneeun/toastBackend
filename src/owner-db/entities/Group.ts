import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MenuGroup } from "./MenuGroup";
import { Option } from "./Option";

@Entity("group", { schema: "merchant" })
export class Group {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "desc", length: 255 })
  desc: string;

  @OneToMany(() => MenuGroup, (menuGroup) => menuGroup.group)
  menuGroups: MenuGroup[];

  @ManyToMany(() => Option, (option) => option.groups)
  options: Option[];
}
