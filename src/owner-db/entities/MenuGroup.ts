import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menu } from "./Menu";
import { Group } from "./Group";

@Entity("menu_group", { schema: "merchant" })
export class MenuGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "priority", default: () => "'0'" })
  priority: number;

  @Column("tinyint", { name: "isRequired", default: () => "'0'" })
  isRequired: number;

  @ManyToOne(() => Menu, (menu) => menu.menuGroups, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "menuId", referencedColumnName: "id" }])
  menu: Menu;

  @ManyToOne(() => Group, (group) => group.menuGroups, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "groupId", referencedColumnName: "id" }])
  group: Group;
}
