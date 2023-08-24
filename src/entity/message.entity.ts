import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum messageSender {
  User = 'user',
  Merchant = 'merchant',
}

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  userId: string;

  @Column()
  merchantId: number;

  @Column({
    type: 'enum',
    enum: messageSender,
    default: messageSender.Merchant,
  })
  sender: messageSender;
}
