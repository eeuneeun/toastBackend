import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "./Group";

@Entity("option", { schema: "merchant" })
export class Option {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("decimal", {
    name: "price",
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  price: string;

  @Column("varchar", { name: "desc", nullable: true, length: 255 })
  desc: string | null;

  @Column("varchar", { name: "imgUrl", nullable: true, length: 255 })
  imgUrl: string | null;

  @ManyToMany(() => Group, (group) => group.options)
  @JoinTable({
    name: "group_options",
    joinColumns: [{ name: "option_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "group_id", referencedColumnName: "id" }],
    schema: "merchant",
  })
  groups: Group[];
}
