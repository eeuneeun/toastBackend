import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "./Group";
import { Menu } from "./Menu";

@Index("FK1hxqsom5l9k3n4i5v4g90od0r", ["groupId"], {})
@Index("FKd9u4w7154t77exvcoc9tmdgvk", ["menuId"], {})
@Entity("menu_groups", { schema: "owner" })
export class MenuGroups {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bit", { name: "is_required" })
  isRequired: boolean;

  @Column("bigint", { name: "group_id", nullable: true })
  groupId: string | null;

  @Column("bigint", { name: "menu_id", nullable: true })
  menuId: string | null;

  @ManyToOne(() => Group, (group) => group.menuGroups, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "group_id", referencedColumnName: "id" }])
  group: Group;

  @ManyToOne(() => Menu, (menu) => menu.menuGroups, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "menu_id", referencedColumnName: "menuId" }])
  menu: Menu;
}
