import { IProduct } from '@modules/products/domain/models/IProduct'
import { OrdersProducts } from 'src/modules/orders/infra/database/entities/OrdersProducts'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('products')
export class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Exclude()
  @Column({ type: 'decimal' })
  price: number

  @Column({ type: 'int' })
  quantity: number

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date

  @OneToMany(() => OrdersProducts, order_products => order_products.product, {
    cascade: true,
  })
  order_products: OrdersProducts[]
}
