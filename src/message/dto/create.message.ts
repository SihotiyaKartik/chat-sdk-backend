import { InputType, Field } from '@nestjs/graphql';
import { MessageSender } from 'src/entity/message.entity';

@InputType()
export class createMessageDto {
  @Field()
  text: string;

  @Field()
  userId: string;

  @Field()
  merchantId: number;

  @Field(() => MessageSender)
  sender: MessageSender;
}
