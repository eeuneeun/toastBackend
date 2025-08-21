import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user", { schema: "owner" })
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "area", nullable: true, length: 255 })
  area: string | null;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "nickname", nullable: true, length: 255 })
  nickname: string | null;

  @Column("varchar", { name: "note", nullable: true, length: 255 })
  note: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("varchar", { name: "phone", nullable: true, length: 255 })
  phone: string | null;

  @Column("varchar", { name: "refresh_token", nullable: true, length: 255 })
  refreshToken: string | null;

  @Column("varchar", { name: "user_id", nullable: true, length: 255 })
  userId: string | null;

  @Column("varchar", { name: "username", nullable: true, length: 255 })
  username: string | null;

  @Column("varchar", { name: "ceo_name", nullable: true, length: 255 })
  ceoName: string | null;
}
