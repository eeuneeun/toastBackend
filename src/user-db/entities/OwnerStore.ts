import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OwnerMenu } from "./OwnerMenu";
import { OwnerUser } from "./OwnerUser";

@Entity("owner_store", { schema: "toast" })
export class OwnerStore {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "address", length: 255 })
  address: string;

  @Column("varchar", { name: "postNum", length: 255 })
  postNum: string;

  @Column("varchar", { name: "tel", length: 255 })
  tel: string;

  @Column("varchar", { name: "businessNum", length: 255 })
  businessNum: string;

  @Column("varchar", { name: "desc", length: 255 })
  desc: string;

  @Column("varchar", { name: "imgUrl", length: 255 })
  imgUrl: string;

  @OneToMany(() => OwnerMenu, (ownerMenu) => ownerMenu.store)
  ownerMenus: OwnerMenu[];

  @ManyToOne(() => OwnerUser, (ownerUser) => ownerUser.ownerStores, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ownerId", referencedColumnName: "id" }])
  owner: OwnerUser;
}
