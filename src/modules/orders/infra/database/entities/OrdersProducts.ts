import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Order } from './Order'
import { Product } from 'src/modules/products/infra/database/entities/Product'
import { IOrdersProducts } from '@modules/orders/domain/models/IOrdersProducts'

@Entity('orders_products')
export class OrdersProducts implements IOrdersProducts {
  @PrimaryGeneratedColumn()
  id: number

  @Column('decimal')
  price: number

  @Column('int')
  quantity: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // juntando a tabela order com a order_products e informando que a coluna de relação é a orderId
  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @Column()
  order_id: string

  @ManyToOne(() => Product, Product => Product.order_products)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column()
  product_id: string
}
