import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OwnerGroupOption } from "./OwnerGroupOption";
import { OwnerMenuGroup } from "./OwnerMenuGroup";

@Entity("owner_group", { schema: "toast" })
export class OwnerGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "desc", length: 255 })
  desc: string;

  @OneToMany(
    () => OwnerGroupOption,
    (ownerGroupOption) => ownerGroupOption.group
  )
  ownerGroupOptions: OwnerGroupOption[];

  @OneToMany(() => OwnerMenuGroup, (ownerMenuGroup) => ownerMenuGroup.group)
  ownerMenuGroups: OwnerMenuGroup[];
}
