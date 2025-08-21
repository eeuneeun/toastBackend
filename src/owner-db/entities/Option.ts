import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FKd0120l8q2tc2y0umejmb9pb66", ["optionByGroupId"], {})
@Entity("option", { schema: "owner" })
export class Option {
  @Column("varchar", { name: "category", nullable: true, length: 255 })
  category: string | null;

  @Column("varchar", { name: "des", nullable: true, length: 255 })
  des: string | null;

  @Column("varchar", { name: "img_url", nullable: true, length: 255 })
  imgUrl: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "price" })
  price: number;

  @Column("bigint", { name: "option_by_group_id", nullable: true })
  optionByGroupId: string | null;

  @Column("int", { name: "option_price" })
  optionPrice: number;

  @PrimaryGeneratedColumn({ type: "bigint", name: "option_id" })
  optionId: string;
}
