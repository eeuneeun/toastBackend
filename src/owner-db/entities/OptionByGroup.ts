import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FK7qbw3f190fj600gemi1mou362", ["groupId"], {})
@Index("FK78827x6ivuxfi430toiqpxi89", ["optionId"], {})
@Entity("option_by_group", { schema: "owner" })
export class OptionByGroup {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "group_id" })
  groupId: string;

  @Column("bigint", { name: "option_id", nullable: true })
  optionId: string | null;
}
