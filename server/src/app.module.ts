import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/auth';
import { UserModule } from './user/user.module';
import { Message } from './models/message';
import { MessageService } from './message/message.service';
import { AppController } from './app.controller';
import { MessageController } from './message/message.controller';
import { MessageModule } from './message/message.module';
import { MessageGateway } from './message/message.gateway';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '111222333Denisman',
      database: 'chat',
      entities: [User, Message],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    UserModule,
    TypeOrmModule.forFeature([Message, User]),
    MessageModule,
  ],
  controllers: [AppController, MessageController],
  providers: [MessageService, MessageGateway, UserService],
})
export class AppModule {}
