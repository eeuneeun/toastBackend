import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SelectedOption } from "./SelectedOption";

@Entity("option", { schema: "owner" })
export class Option {
  @PrimaryGeneratedColumn({ type: "bigint", name: "option_id" })
  optionId: string;

  @Column("varchar", { name: "des", nullable: true, length: 255 })
  des: string | null;

  @Column("varchar", { name: "img_url", nullable: true, length: 255 })
  imgUrl: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "option_price" })
  optionPrice: number;

  @OneToMany(
    () => SelectedOption,
    (selectedOption) => selectedOption.optionOption
  )
  selectedOptions: SelectedOption[];
}
