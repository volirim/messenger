import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageService } from 'src/message/message.service';
import { RegisterDTO, User } from 'src/models/auth';
import { Message } from 'src/models/message';
import getUsers from 'src/utils/getAllUsersQuery';
import getSelectedUser from 'src/utils/getSelectedUser';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private messageService: MessageService,
  ) {}

  async findOne(username: string) {
    return await this.usersRepository.findOne({ username });
  }

  async findAll(body) {
    const activeUserId = (
      await this.usersRepository.findOne({
        username: body.username,
      })
    ).userId;

    if (body.nickname.length !== 0) {
      return await getUsers(activeUserId, body.nickname);
    } else {
      return getUsers(activeUserId);
    }
  }

  async saveUser(user: RegisterDTO) {
    try {
      const savedUser = await this.usersRepository.save(user);
      return savedUser;
    } catch (e) {
      console.log('error');
    }
  }

  async getUserStatusFromDB(id: string) {
    const searchedUser = await this.usersRepository.findOne({ userId: +id });
    return searchedUser.lastOnline;
  }

  async setUserStatusFromDB(id: string, status: string) {
    await this.usersRepository.save({ userId: +id, lastOnline: status });
  }

  async selectOneUser(id: number, userToFindId: number) {
    return getSelectedUser(id, userToFindId);
  }
}
