import { Category } from 'src/categories/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({
    nullable: true,
  })
  promotion_price: number;

  @Column({
    default: 0,
  })
  cost_price: number;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    default: 0,
  })
  quantity: number;

  @Column({
    default: false,
  })
  active: boolean;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    default: new Date(),
  })
  created_at: Date;

  @Column({
    default: new Date(),
  })
  updated_at: Date;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
