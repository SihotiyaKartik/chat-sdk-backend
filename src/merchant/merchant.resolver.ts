import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Merchant } from 'src/entity/merchant.entity';
import { createMerchantDto } from './dto/create.merchant';
import { updateMerchantDto } from './dto/update.merchant';
import { MerchantService } from './merchant.service';

@Resolver(() => Merchant)
export class MerchantReolver {
  constructor(private readonly merchantService: MerchantService) {}

  @Query(() => [Merchant])
  async getAllMerchants(): Promise<Merchant[]> {
    return this.merchantService.getAllMerchants();
  }

  @Mutation(() => Merchant)
  async createMerchant(
    @Args('input') input: createMerchantDto,
  ): Promise<Merchant> {
    return this.merchantService.createMerchant(input);
  }

  @Mutation(() => Merchant)
  async updateMerchant(
    @Args('id') id: number,
    @Args('input') input: updateMerchantDto,
  ): Promise<Merchant> {
    return this.merchantService.updateMerchant(id, input);
  }

  @Mutation(() => Boolean)
  async deleteMerchant(@Args('id') id: number): Promise<boolean> {
    return this.merchantService.deleteMerchant(id);
  }
}
