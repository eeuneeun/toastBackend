import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Store } from "./Store";
import { OrderMenu } from "./OrderMenu";

@Index("FK9loamnte7akaq3a6nlsxlyfp5", ["storeStoreId"], {})
@Entity("orders", { schema: "owner" })
export class Orders {
  @Column("int", { name: "total_price" })
  totalPrice: number;

  @Column("datetime", { name: "create_at", nullable: true })
  createAt: Date | null;

  @PrimaryGeneratedColumn({ type: "bigint", name: "order_id" })
  orderId: string;

  @Column("bigint", { name: "store_store_id", nullable: true })
  storeStoreId: string | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("varchar", { name: "customer", nullable: true, length: 255 })
  customer: string | null;

  @Column("varchar", { name: "customer_phone", nullable: true, length: 255 })
  customerPhone: string | null;

  @Column("varchar", { name: "delivery_address", nullable: true, length: 255 })
  deliveryAddress: string | null;

  @Column("varchar", { name: "payment_method", nullable: true, length: 255 })
  paymentMethod: string | null;

  @Column("enum", {
    name: "order_status",
    nullable: true,
    enum: ["CANCELLED", "COMPLETED", "DELIVERY", "IN_PROGRESS", "WAITING"],
  })
  orderStatus:
    | "CANCELLED"
    | "COMPLETED"
    | "DELIVERY"
    | "IN_PROGRESS"
    | "WAITING"
    | null;

  @Column("enum", {
    name: "order_type",
    nullable: true,
    enum: ["DELIVERY", "DINE_IN", "TAKEOUT"],
  })
  orderType: "DELIVERY" | "DINE_IN" | "TAKEOUT" | null;

  @Column("bigint", { name: "customer_id", nullable: true })
  customerId: string | null;

  @ManyToOne(() => Store, (store) => store.orders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "store_store_id", referencedColumnName: "storeId" }])
  storeStore: Store;

  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.order)
  orderMenus: OrderMenu[];
}
