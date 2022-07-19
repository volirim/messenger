import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/models/auth';
import { Message } from 'src/models/message';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Message, User])],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
