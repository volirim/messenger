import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { FileInterceptor } from '@nestjs/platform-express';
import { IreceivedMessage, Message } from 'src/models/message';
import { IIsViewedData, IMessageTime, IreceivedFile } from 'src/types/message';
import { uploadImage } from 'src/utils/cloudinaryUploader';
import { getClientDate } from 'src/utils/date';
import { MessageService } from './message.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('last')
  async getLastMessage(@Query('from') from: string, @Query('to') to: string) {
    try {
      const messageFromDb = await this.messageService.getLastMessage(from, to);
      const time = getClientDate(messageFromDb.time);
      return { ...messageFromDb, time };
    } catch (e) {
      throw new HttpException('Cannot get messages', 404);
    }
  }

  @Post('send')
  sendMessage(@Body() message: IreceivedMessage) {
    return this.messageService.save(message);
  }

  @Post('sendImage')
  async sendImage(@Body() message: IreceivedFile) {
    console.log(message);
    const url = await uploadImage(message.message, message.type);
    if (url) {
      const cloudMessage = { ...message, message: url };
      return this.messageService.save(cloudMessage);
    }
  }

  @Get('getMessages')
  async getMessages(@Query('from') from: string, @Query('to') to: string) {
    return (
      await this.messageService.getMessages(
        parseInt(from, 10),
        parseInt(to, 10),
      )
    ).map<Message<IMessageTime>>((message) => ({
      id: message.id,
      from: message.from,
      to: message.to,
      message: message.message,
      isViewed: message.isViewed,
      type: message.type,
      time: getClientDate(message.time),
    }));
  }

  @Post('viewed')
  async setViewed(@Body() isViewed: IIsViewedData) {
    const message = await this.messageService.setIsViewed(isViewed);
    return { id: message.id, isViewed: message.isViewed };
  }
}
