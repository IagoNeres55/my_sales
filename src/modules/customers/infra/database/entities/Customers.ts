import { ICustomer } from '@modules/customers/domain/models/ICustomer'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('customers')
export class Customers implements ICustomer {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  email: string

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date
}
