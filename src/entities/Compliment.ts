import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm'

import uuid from '../utils/uuid'
import { Tag } from './Tag'
import { User } from './User'

@Entity({ name: 'compliments' })
export class Compliment {
  @PrimaryColumn('uuid')
  readonly id: string

  @Column({ name: 'user_sender' })
  userSenderId: string

  @JoinColumn({ name: 'user_sender' })
  @ManyToOne(() => User)
  userSender: User

  @Column({ name: 'user_receiver' })
  userReceiverId: string

  @JoinColumn({ name: 'user_receiver' })
  @ManyToOne(() => User)
  userReceiver: User

  @Column({ name: 'tag_id' })
  tagId: string

  @JoinColumn({ name: 'tag_id' })
  tag: Tag

  @Column()
  message: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  constructor() {
    if (!this.id) this.id = uuid.v4()
  }
}
