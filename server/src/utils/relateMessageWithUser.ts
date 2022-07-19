import { User } from 'src/models/auth';
import { Message } from 'src/models/message';
import { getConnection } from 'typeorm';

export const relateMessageWithUser = (userId: number, message: Message) => {
  getConnection()
    .createQueryBuilder()
    .relation(User, 'messages')
    .of(userId)
    .add(message);
};
