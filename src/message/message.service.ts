import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/entity/message.entity';
import { createMessageDto } from './dto/create.message';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createMessage(input: createMessageDto): Promise<Message> {
    const newMessage = this.messageRepository.create(input);
    return await this.messageRepository.save(newMessage);
  }
}
