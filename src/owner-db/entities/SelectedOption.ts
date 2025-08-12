import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Option } from "./Option";
import { OrderMenu } from "./OrderMenu";

@Index("FKht1i07pegiptuq7a66vjjqtdb", ["optionOptionId"], {})
@Index("FKpwr78eqkarf81ik5blio1nfjt", ["orderMenuId"], {})
@Entity("selected_option", { schema: "owner" })
export class SelectedOption {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("int", { name: "option_price" })
  optionPrice: number;

  @Column("int", { name: "quantity" })
  quantity: number;

  @Column("bigint", { name: "option_option_id", nullable: true })
  optionOptionId: string | null;

  @Column("bigint", { name: "order_menu_id", nullable: true })
  orderMenuId: string | null;

  @ManyToOne(() => Option, (option) => option.selectedOptions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "option_option_id", referencedColumnName: "optionId" }])
  optionOption: Option;

  @ManyToOne(() => OrderMenu, (orderMenu) => orderMenu.selectedOptions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "order_menu_id", referencedColumnName: "orderMenuId" }])
  orderMenu: OrderMenu;
}
