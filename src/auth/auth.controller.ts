import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type SignupDto, signUpSchema } from './dto/sign-up.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { type SigninDto, signInSchema } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('/signin')
  @UsePipes(new ZodValidationPipe(signInSchema))
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
