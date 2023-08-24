import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver('Message')
export class MessageResolver {
  private messages = [];

  @Query('messages')
  getMessages() {
    return this.messages;
  }

  @Mutation('sendMessage')
  sendMessage(@Args('text') text: string) {
    const newMessage = { text, timestamp: new Date().toISOString() };
    this.messages.push(newMessage);
    return newMessage;
  }
}
