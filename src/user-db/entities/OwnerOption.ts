import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OwnerGroupOption } from "./OwnerGroupOption";

@Entity("owner_option", { schema: "toast" })
export class OwnerOption {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("decimal", {
    name: "price",
    precision: 10,
    scale: 0,
    default: () => "'0'",
  })
  price: string;

  @Column("varchar", { name: "desc", nullable: true, length: 255 })
  desc: string | null;

  @Column("varchar", { name: "imgUrl", nullable: true, length: 255 })
  imgUrl: string | null;

  @OneToMany(
    () => OwnerGroupOption,
    (ownerGroupOption) => ownerGroupOption.option
  )
  ownerGroupOptions: OwnerGroupOption[];
}
