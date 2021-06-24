import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import uuid from '../utils/uuid'

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn('uuid')
  readonly id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  admin: boolean

  @Column()
  password: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  constructor() {
    if (!this.id) this.id = uuid.v4()
  }
}
