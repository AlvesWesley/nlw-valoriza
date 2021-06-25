import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Expose } from 'class-transformer'

import uuid from '../utils/uuid'

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryColumn('uuid')
  readonly id: string

  @Column()
  name: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Expose({ name: 'nameCustom' })
  nameCustom(): string {
    return `#${this.name}`
  }

  constructor() {
    if (!this.id) this.id = uuid.v4()
  }
}
