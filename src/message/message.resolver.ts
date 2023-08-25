import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Message } from 'src/entity/message.entity';
import { createMessageDto } from './dto/create.message';
import { MessageService } from './message.service';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  async createMessage(
    @Args('input') input: createMessageDto,
  ): Promise<Message> {
    return this.messageService.createMessage(input);
  }
}
