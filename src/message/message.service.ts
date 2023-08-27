import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/entity/message.entity';
import { createMessageDto } from './dto/create.message';
import { getAllMessagesDto } from './dto/get.all.messages';
import { MerchantService } from 'src/merchant/merchant.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly merchantService: MerchantService,
  ) {}

  async createMessage(input: createMessageDto): Promise<Message> {
    const newMessage = this.messageRepository.create(input);
    return await this.messageRepository.save(newMessage);
  }

  async createMessageWithMerchantValidation(
    input: createMessageDto,
  ): Promise<Message> {
    const merchantData = await this.merchantService.getMerchnatById(
      input.merchantId,
    );

    if (!merchantData) {
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

    const merchantData = await this.merchantService.getMerchnatById(
      input.merchantId,
    );

    if (!merchantData) {
      throw new NotFoundException({
        message: 'No such merchant Exist',
      });
    }

    return await this.messageRepository.find({
      where: { userId, merchantId },
    });
  }
}
