import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantReolver } from './merchant.resolver';
import { MerchantService } from './merchant.service';
import { Merchant } from 'src/entity/merchant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Merchant])],
  providers: [MerchantReolver, MerchantService],
})
export class MerchantModule {}
