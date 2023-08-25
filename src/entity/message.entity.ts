import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

export enum MessageSender {
  User = 'user',
  Merchant = 'merchant',
}

@ObjectType()
@Entity()
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  text: string;

  @Field(() => String)
  @Column()
  userId: string;

  @Field(() => Int)
  @Column()
  merchantId: number;

  @Field(() => MessageSender)
  @Column({
    type: 'enum',
    enum: MessageSender,
    default: MessageSender.Merchant,
  })
  sender: MessageSender;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;
}
