import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './registerUser.dto';
import { LoginDto } from './loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterDto) {
    const token = this.authService.registerUser(registerUserDto);
    return token;
  }

  @Post('login')
  login(@Body() loginUserDto: LoginDto) {
    return this.authService.loginUser(loginUserDto);
  }
}
