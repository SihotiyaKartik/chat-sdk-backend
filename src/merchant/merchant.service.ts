import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from 'src/entity/merchant.entity';
import { createMerchantDto } from './dto/create.merchant';
import { updateMerchantDto } from './dto/update.merchant';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(Merchant)
    private readonly merchantRepository: Repository<Merchant>,
  ) {}

  async getAllMerchants(): Promise<Merchant[]> {
    return await this.merchantRepository.find();
  }

  async createMerchant(input: createMerchantDto): Promise<Merchant> {
    const newMerchant = this.merchantRepository.create(input);
    return await this.merchantRepository.save(newMerchant);
  }

  async updateMerchant(id: number, input: updateMerchantDto): Promise<any> {
    const merchant = await this.merchantRepository.preload({
      id,
      ...input,
    });

    console.log(merchant);

    if (!merchant) {
      throw new NotFoundException({ message: 'Merchant not found' });
    }

    return await this.merchantRepository.save(merchant);
  }

  async deleteMerchant(id: number): Promise<boolean> {
    const deleteMerchant = await this.merchantRepository.delete(id);
    return deleteMerchant.affected > 0;
  }
}
