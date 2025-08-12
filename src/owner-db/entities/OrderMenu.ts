import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menu } from "./Menu";
import { Orders } from "./Orders";
import { SelectedMenuOption } from "./SelectedMenuOption";
import { SelectedOption } from "./SelectedOption";

@Index("FK4oumkm265ypdtcndhueq1cv26", ["menuId"], {})
@Index("FKmw4iqpidcbvklykhbhxewx124", ["orderId"], {})
@Entity("order_menu", { schema: "owner" })
export class OrderMenu {
  @Column("int", { name: "quantity" })
  quantity: number;

  @Column("int", { name: "total_price" })
  totalPrice: number;

  @Column("bigint", { name: "menu_id", nullable: true })
  menuId: string | null;

  @Column("bigint", { name: "order_id", nullable: true })
  orderId: string | null;

  @PrimaryGeneratedColumn({ type: "bigint", name: "order_menu_id" })
  orderMenuId: string;

  @Column("varchar", { name: "customer", nullable: true, length: 255 })
  customer: string | null;

  @ManyToOne(() => Menu, (menu) => menu.orderMenus, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "menu_id", referencedColumnName: "menuId" }])
  menu: Menu;

  @ManyToOne(() => Orders, (orders) => orders.orderMenus, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "order_id", referencedColumnName: "orderId" }])
  order: Orders;

  @OneToMany(
    () => SelectedMenuOption,
    (selectedMenuOption) => selectedMenuOption.orderMenu
  )
  selectedMenuOptions: SelectedMenuOption[];

  @OneToMany(() => SelectedOption, (selectedOption) => selectedOption.orderMenu)
  selectedOptions: SelectedOption[];
}
