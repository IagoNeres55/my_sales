import { OrdersProducts } from 'src/modules/orders/infra/database/entities/OrdersProducts'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'decimal' })
  price: number

  @Column({ type: 'int' })
  quantity: number

  @CreateDateColumn({ type: 'timestamp'})
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp'})
  updated_at: Date

  @OneToMany(()=> OrdersProducts, order_products => order_products.product, {
    cascade: true
  })
  order_products: OrdersProducts[]
}
