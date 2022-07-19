import { User } from 'src/models/auth';
import { getConnection } from 'typeorm';

async function getUsers(activeUserId: number, nicknameToFind?: string) {
  const rawArray = await getConnection()
    .createQueryBuilder(User, 'user')
    .select(['user.userId', 'user.username', 'user.lastOnline'])
    .where(
      nicknameToFind
        ? 'user.username like :nickname'
        : 'user.username = user.username',
      {
        nickname: `%${nicknameToFind}%`,
      },
    )
    .leftJoinAndMapOne(
      'user.lastMessage',
      'user.messages',
      'message',
      'message.from = :activeId OR message.to = :activeId',
      { activeId: activeUserId },
    )
    .orderBy('message.id', 'DESC')
    .getMany();

  return rawArray.filter((user) => user.userId !== activeUserId);
}

export default getUsers;
