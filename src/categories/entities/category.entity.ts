import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    default: new Date(),
    type: 'timestamp',
  })
  created_at: Date;

  @Column({
    default: new Date(),
    onUpdate: 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    name: 'updated_at',
  })
  updated_at: Date;

  @ManyToMany(() => Product)
  products: Product[];
}
