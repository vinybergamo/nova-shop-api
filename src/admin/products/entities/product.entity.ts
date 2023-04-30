import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
    nullable: true,
  })
  cost_price: number;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    default: 1,
  })
  quantity: number;

  @Column({
    default: true,
  })
  active: boolean;

  @Column({
    default: new Date(),
  })
  created_at: Date;

  @Column({
    default: new Date(),
  })
  updated_at: Date;
}
