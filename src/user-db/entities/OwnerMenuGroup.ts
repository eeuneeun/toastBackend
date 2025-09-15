import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OwnerGroup } from "./OwnerGroup";
import { OwnerMenu } from "./OwnerMenu";

@Entity("owner_menu_group", { schema: "toast" })
export class OwnerMenuGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "priority", default: () => "'0'" })
  priority: number;

  @Column("tinyint", { name: "isRequired", default: () => "'0'" })
  isRequired: number;

  @ManyToOne(() => OwnerGroup, (ownerGroup) => ownerGroup.ownerMenuGroups, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "groupId", referencedColumnName: "id" }])
  group: OwnerGroup;

  @ManyToOne(() => OwnerMenu, (ownerMenu) => ownerMenu.ownerMenuGroups, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "menuId", referencedColumnName: "id" }])
  menu: OwnerMenu;
}
