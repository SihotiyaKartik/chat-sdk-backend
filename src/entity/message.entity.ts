import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';

export enum MessageSender {
  'User',
  'Merchant',
}

registerEnumType(MessageSender, {
  name: 'MessageSender',
});

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
