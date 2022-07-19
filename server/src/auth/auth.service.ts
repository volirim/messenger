import { Injectable } from '@nestjs/common';
import { RegisterDTO } from 'src/models/auth';
import { createHmacFromString } from 'src/utils/crypto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IuserLoginDTO } from 'src/types/auth';
import generateDate from 'src/utils/date';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerData: RegisterDTO) {
    const existingUser = await this.userService.findOne(registerData.username);

    if (!existingUser) {
      const password = createHmacFromString(registerData.password);
      const databaseUser = {
        username: registerData.username,
        password,
        lastOnline: generateDate(),
      };
      console.log(generateDate());

      await this.userService.saveUser(databaseUser);
      const userFromDB = await this.userService.findOne(databaseUser.username);
      const payload = { username: userFromDB.username, sub: userFromDB.userId };
      return {
        access_token: this.jwtService.sign(payload),
        ...payload,
      };
    }
    return null;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === createHmacFromString(pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IuserLoginDTO) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      ...payload,
    };
  }
}
