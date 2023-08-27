import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { Message } from 'src/entity/message.entity';
import { Merchant } from 'src/entity/merchant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { ChatGateway } from './message.gateway';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt/dist';
import { MerchantService } from 'src/merchant/merchant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Merchant])],
  providers: [
    MessageResolver,
    MessageService,
    MerchantService,
    ChatGateway,
    AuthService,
    JwtService,
  ],
})
export class MessageModule {}
