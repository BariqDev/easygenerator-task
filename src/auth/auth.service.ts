import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/sign-up.dto';
import { SigninDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  signup(signupDto: SignupDto) {
    return signupDto;
  }

  signin(signinDto: SigninDto) {
    return signinDto;
  }
}
