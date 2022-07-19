import { User } from 'src/models/auth';
import { getConnection } from 'typeorm';

async function getSelectedUser(activeUserId: number, userToFindId: number) {
  const user = await getConnection()
    .createQueryBuilder(User, 'user')
    .select(['user.userId', 'user.username', 'user.lastOnline'])
    .where('user.userId = :userToFind', { userToFind: userToFindId })
    .leftJoinAndMapOne(
      'user.lastMessage',
      'user.messages',
      'message',
      'message.from = :activeId OR message.to = :activeId',
      { activeId: activeUserId },
    )
    .orderBy('message.id', 'DESC')
    .getOne();

  return user;
}

export default getSelectedUser;
