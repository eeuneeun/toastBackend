import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("groups", { schema: "owner" })
export class Groups {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "des", nullable: true, length: 255 })
  des: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;
}
