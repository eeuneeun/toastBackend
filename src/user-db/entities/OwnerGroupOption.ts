import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OwnerOption } from "./OwnerOption";
import { OwnerGroup } from "./OwnerGroup";

@Entity("owner_group_option", { schema: "toast" })
export class OwnerGroupOption {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "quantity", default: () => "'1'" })
  quantity: number;

  @ManyToOne(
    () => OwnerOption,
    (ownerOption) => ownerOption.ownerGroupOptions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "optionId", referencedColumnName: "id" }])
  option: OwnerOption;

  @ManyToOne(() => OwnerGroup, (ownerGroup) => ownerGroup.ownerGroupOptions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "groupId", referencedColumnName: "id" }])
  group: OwnerGroup;
}
