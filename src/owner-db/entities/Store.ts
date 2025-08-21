import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("store", { schema: "owner" })
export class Store {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @Column("varchar", { name: "business_num", nullable: true, length: 255 })
  businessNum: string | null;

  @Column("datetime", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @Column("varchar", { name: "img_url", nullable: true, length: 255 })
  imgUrl: string | null;

  @Column("float", { name: "lat", nullable: true, precision: 12 })
  lat: number | null;

  @Column("float", { name: "longti", nullable: true, precision: 12 })
  longti: number | null;

  @Column("varchar", { name: "phone", nullable: true, length: 255 })
  phone: string | null;

  @Column("varchar", { name: "post_num", nullable: true, length: 255 })
  postNum: string | null;

  @Column("varchar", { name: "store_name", nullable: true, length: 255 })
  storeName: string | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("bigint", { name: "user_id", nullable: true })
  userId: string | null;
}
