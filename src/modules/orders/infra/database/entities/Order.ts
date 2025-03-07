import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { OrdersProducts } from './OrdersProducts'
import { Customers } from 'src/modules/customers/infra/database/entities/Customers'
import { IOrder } from '@modules/orders/domain/models/IOrder'

@Entity('orders')
export class Order implements IOrder {
  @PrimaryGeneratedColumn()
  id: number

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
