import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { MessageResolver } from './message/message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), GraphqlModule],
  controllers: [AppController],
  providers: [AppService, MessageResolver],
})
export class AppModule {}
