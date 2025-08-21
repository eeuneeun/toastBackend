import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FK8xi606dt4yl0y97a5kka5xqdf", ["menuOptionMenuOptionId"], {})
@Index("FK8ekw6mdky9rcumf6g5hxk8pkl", ["orderMenuId"], {})
@Entity("selected_menu_option", { schema: "owner" })
export class SelectedMenuOption {
  @Column("int", { name: "option_price" })
  optionPrice: number;

  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "menu_option_menu_option_id", nullable: true })
  menuOptionMenuOptionId: string | null;

  @Column("bigint", { name: "order_menu_id", nullable: true })
  orderMenuId: string | null;

  @Column("int", { name: "quantity" })
  quantity: number;
}
