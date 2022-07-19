import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Like, NotBrackets, Repository } from 'typeorm';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MessageService } from './message/message.service';
import { User } from './models/auth';
import { UserService } from './user/user.service';
import getUsers from './utils/getAllUsersQuery';

@Controller('app')
export class AppController {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('users')
  async getAllUsers(@Req() req) {
    return await this.userService.findAll(req.body);
  }

  @Get('findUser')
  async getUser(@Query('id') id: string) {
    return await this.usersRepo.findOne({ userId: parseInt(id, 10) });
  }

  @Get('getStatus')
  async getStatus(@Query('id') id: string) {
    return await this.userService.getUserStatusFromDB(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('checkauth')
  async checkAuth() {
    return true;
  }

  @Get('selectOne')
  async selectOne(
    @Query('id') id: string,
    @Query('userToFindId') userToFindId: string,
  ) {
    return await this.userService.selectOneUser(
      parseInt(id, 10),
      parseInt(userToFindId, 10),
    );
  }
}
