import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class getAllMessagesDto {
  @Field()
  userId: string;

  @Field()
  merchantId: number;
}
