import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { Message } from 'src/entity/message.entity';
import { Merchant } from 'src/entity/merchant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Merchant])],
  providers: [MessageResolver, MessageService],
})
export class MessageModule {}
