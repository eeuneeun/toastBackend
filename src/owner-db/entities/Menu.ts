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
import { User } from "./User";
import { MenuGroups } from "./MenuGroups";
import { MenuOption } from "./MenuOption";
import { MenuOptionGroups } from "./MenuOptionGroups";
import { OrderMenu } from "./OrderMenu";

@Index("FK4sgenfcmk1jajhgctnkpn5erg", ["storeId"], {})
@Index("FKap5hgt5aj2nljtabyxbi01h0t", ["userUserId"], {})
@Entity("menu", { schema: "owner" })
export class Menu {
  @Column("int", { name: "price" })
  price: number;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @PrimaryGeneratedColumn({ type: "bigint", name: "menu_id" })
  menuId: string;

  @Column("bigint", { name: "store_id", nullable: true })
  storeId: string | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("varchar", { name: "category", nullable: true, length: 255 })
  category: string | null;

  @Column("varchar", { name: "des", nullable: true, length: 255 })
  des: string | null;

  @Column("varchar", { name: "img_url", nullable: true, length: 255 })
  imgUrl: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("bigint", { name: "user_user_id", nullable: true })
  userUserId: string | null;

  @ManyToOne(() => Store, (store) => store.menus, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "store_id", referencedColumnName: "storeId" }])
  store: Store;

  @ManyToOne(() => User, (user) => user.menus, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_user_id", referencedColumnName: "userId" }])
  userUser: User;

  @OneToMany(() => MenuGroups, (menuGroups) => menuGroups.menu)
  menuGroups: MenuGroups[];

  @OneToMany(() => MenuOption, (menuOption) => menuOption.menu)
  menuOptions: MenuOption[];

  @OneToMany(
    () => MenuOptionGroups,
    (menuOptionGroups) => menuOptionGroups.menu
  )
  menuOptionGroups: MenuOptionGroups[];

  @OneToMany(() => OrderMenu, (orderMenu) => orderMenu.menu)
  orderMenus: OrderMenu[];
}
