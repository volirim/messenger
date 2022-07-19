import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/auth';
import { IreceivedMessage, Message } from 'src/models/message';
import { IIsViewedData } from 'src/types/message';
import generateDate from 'src/utils/date';
import { relateMessageWithUser } from 'src/utils/relateMessageWithUser';
import { Brackets, getConnection, Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messages: Repository<Message>,
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async getLastMessage(from, to) {
    return await this.messages
      .createQueryBuilder()
      .where(
        new Brackets((qb) => {
          qb.where('message.from = :from', { from }).andWhere(
            'message.to = :to',
            { to },
          );
        }),
      )
      .orWhere(
        new Brackets((qb) => {
          qb.where('message.from = :to', to).andWhere(
            'message.to = :from',
            from,
          );
        }),
      )
      .addOrderBy('message.id', 'DESC')
      .getOne();
  }

  async getMessages(from, to) {
    return await this.messages
      .createQueryBuilder('message')
      .where(
        new Brackets((qb) => {
          qb.where('message.from = :from', { from }).andWhere(
            'message.to = :to',
            { to },
          );
        }),
      )
      .orWhere(
        new Brackets((qb) => {
          qb.where('message.from = :to', to).andWhere(
            'message.to = :from',
            from,
          );
        }),
      )
      .addOrderBy('message.id', 'ASC')
      .getMany();
  }

  async save(message: IreceivedMessage) {
    const date = generateDate();
    if (message.message.length) {
      const savedMessage = await this.messages.save({ ...message, time: date });
      const messageId = savedMessage.id;

      const userId = await this.users.find({ userId: message.from });

      relateMessageWithUser(message.from, savedMessage);
      relateMessageWithUser(message.to, savedMessage);

      return messageId;
    }
  }

  async setIsViewed(isViewed: IIsViewedData) {
    const message = await this.messages.findOne(isViewed.id);
    message.isViewed = isViewed.isViewed;
    return this.messages.save(message);
  }
}
