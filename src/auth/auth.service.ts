import { Injectable } from '@nestjs/common';
import { GqlContextInterface } from 'src/gql.context';
import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { MerchantService } from 'src/merchant/merchant.service';
import { NotFoundException } from '@nestjs/common/exceptions';

config();

@Injectable()
export class AuthService {
  constructor(private readonly merchantService: MerchantService) {}

  async authenticateMessageToken(token: string): Promise<GqlContextInterface> {
    try {
      const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY);

      const merchantData = await this.merchantService.getMerchnatById(
        decodedToken.merchantId,
      );

      if (!merchantData)
        throw new NotFoundException({
          message: "The merchant you want to connect doesn't exist",
        });

      const gqlData: GqlContextInterface = {
        userId: decodedToken.userId,
        merchantId: decodedToken.merchantId,
      };

      return gqlData;
    } catch (error) {
      throw new Error('Message authentication failed, ' + error);
    }
  }
}
