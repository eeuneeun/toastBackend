import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

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

  @Column("bigint", { name: "groups_id", nullable: true })
  groupsId: string | null;
}
