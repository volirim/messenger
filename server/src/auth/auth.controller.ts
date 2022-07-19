import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  get(@Req() request) {
    return request.user;
  }

  @Post('register')
  async registerUser(@Req() req) {
    return await this.service.register(req.body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.service.login(req.user);
  }
}
