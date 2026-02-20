import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './registerUser.dto';
import { LoginDto } from './loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterDto) {
    const token = this.authService.registerUser(registerUserDto);
    return token;
  }

  @Post('login')
  login(@Body() loginUserDto: LoginDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    const user = await this.userService.getUserById(userId);
    return {
      id: user?.id,
      fname: user?.fname,
      lname: user?.lname,
      email: user?.email,
      role: user?.role,
    };
  }
}
