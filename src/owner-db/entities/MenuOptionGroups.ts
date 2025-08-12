import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menu } from "./Menu";
import { OptionGroups } from "./OptionGroups";

@Index("FK625f6l5tgu40ryqj3tnnt6uo6", ["menuId"], {})
@Index("FKinsug5j5iux9ad2p8mibr2uvt", ["optionGroupId"], {})
@Entity("menu_option_groups", { schema: "owner" })
export class MenuOptionGroups {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bit", { name: "is_required" })
  isRequired: boolean;

  @Column("bigint", { name: "menu_id", nullable: true })
  menuId: string | null;

  @Column("bigint", { name: "option_group_id", nullable: true })
  optionGroupId: string | null;

  @ManyToOne(() => Menu, (menu) => menu.menuOptionGroups, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "menu_id", referencedColumnName: "menuId" }])
  menu: Menu;

  @ManyToOne(
    () => OptionGroups,
    (optionGroups) => optionGroups.menuOptionGroups,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "option_group_id", referencedColumnName: "id" }])
  optionGroup: OptionGroups;
}
