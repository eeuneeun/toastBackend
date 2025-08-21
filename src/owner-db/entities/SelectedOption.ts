import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FKpwr78eqkarf81ik5blio1nfjt", ["orderMenuId"], {})
@Entity("selected_option", { schema: "owner" })
export class SelectedOption {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("int", { name: "price" })
  price: number;

  @Column("int", { name: "quantity" })
  quantity: number;

  @Column("bigint", { name: "order_menu_id", nullable: true })
  orderMenuId: string | null;

  @Column("int", { name: "option_price" })
  optionPrice: number;

  @Column("bigint", { name: "option_option_id", nullable: true })
  optionOptionId: string | null;
}
