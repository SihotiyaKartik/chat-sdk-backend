import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/entity/message.entity';
import { createMessageDto } from './dto/create.message';
import { getAllMessagesDto } from './dto/get.all.messages';
import { Merchant } from 'src/entity/merchant.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Merchant)
    private readonly merchantRepository: Repository<Merchant>,
  ) {}

  async createMessage(input: createMessageDto): Promise<Message> {
    const merchantData = await this.merchantRepository.find({
      where: { id: input.merchantId },
    });

    if (!merchantData || merchantData.length == 0) {
      throw new NotFoundException({
        message: "Error while sending message, given merchant doesn't exist",
      });
    }

    const newMessage = this.messageRepository.create(input);
    return await this.messageRepository.save(newMessage);
  }

  async getAllConversationMessage(
    input: getAllMessagesDto,
  ): Promise<Message[]> {
    const { userId, merchantId } = input;

    const merchantData = await this.merchantRepository.find({
      where: { id: merchantId },
    });

    if (!merchantData || merchantData.length == 0) {
      throw new NotFoundException({
        message: 'No such merchant Exist',
      });
    }

    return await this.messageRepository.find({
      where: { userId, merchantId },
    });
  }
}
