import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FKlr6b5i0f2uomfr8u2q3tt2q9f", ["menuId"], {})
@Index("FKhkcy891unac9ltx7pqa98lu1m", ["optionGroupId"], {})
@Entity("menu_option", { schema: "owner" })
export class MenuOption {
  @Column("int", { name: "option_price" })
  optionPrice: number;

  @Column("bigint", { name: "menu_id", nullable: true })
  menuId: string | null;

  @PrimaryGeneratedColumn({ type: "bigint", name: "menu_option_id" })
  menuOptionId: string;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("varchar", { name: "category", nullable: true, length: 255 })
  category: string | null;

  @Column("varchar", { name: "des", nullable: true, length: 255 })
  des: string | null;

  @Column("bigint", { name: "option_group_id", nullable: true })
  optionGroupId: string | null;
}
