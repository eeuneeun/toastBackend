import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('FK4sgenfcmk1jajhgctnkpn5erg', ['storeId'], {})
@Entity('menu', { schema: 'owner' })
export class Menu {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;
  @Column('varchar', { name: 'des', nullable: true, length: 255 })
  des: string | null;

  @Column('varchar', { name: 'img_url', nullable: true, length: 255 })
  imgUrl: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'price' })
  price: number;

  @Column('bigint', { name: 'store_id', nullable: true })
  storeId: string | null;
}
