import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from 'src/message/message.service';
import { User } from 'src/models/auth';
import { Message } from 'src/models/message';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [UserService, MessageService],
  exports: [UserService],
})
export class UserModule {}
