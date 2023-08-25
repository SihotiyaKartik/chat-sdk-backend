import { Module } from '@nestjs/common';
import { MerchantModule } from 'src/merchant/merchant.module';
import { MessageModule } from 'src/message/message.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      context: ({ req }) => ({ req }),
      driver: ApolloDriver,
    }),
    MerchantModule,
  ],
})
export class GraphqlModule {}
