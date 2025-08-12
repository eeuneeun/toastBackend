import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MenuOption } from "./MenuOption";
import { MenuOptionGroups } from "./MenuOptionGroups";

@Entity("option_groups", { schema: "owner" })
export class OptionGroups {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "display_order" })
  displayOrder: number;

  @Column("bigint", { name: "group_id" })
  groupId: string;

  @Column("bigint", { name: "option_id" })
  optionId: string;

  @OneToMany(() => MenuOption, (menuOption) => menuOption.optionGroup)
  menuOptions: MenuOption[];

  @OneToMany(
    () => MenuOptionGroups,
    (menuOptionGroups) => menuOptionGroups.optionGroup
  )
  menuOptionGroups: MenuOptionGroups[];
}
