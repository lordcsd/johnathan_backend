import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/loginDTO';
import { TouristSignupDTO } from './dto/touristSignUpDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('tourist-sign-up')
  async touristSignUp(@Body() details: TouristSignupDTO) {
    return await this.authService.touristSignUp(details);
  }

  @Post('login')
  async login(@Body() details: LoginDTO) {
    return await this.authService.login(details);
  }
}
