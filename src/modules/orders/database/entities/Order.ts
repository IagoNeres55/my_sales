import { Customers } from '@modules/customers/database/entities/Customers'
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { OrdersProducts } from './OrdersProducts'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: Number

  @ManyToOne(() => Customers)
  @JoinColumn({ name: 'customer_id' })
  customer: Customers

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[]


}
