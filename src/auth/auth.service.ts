import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  signUp(signupDto: SignupDto) {
    return signupDto;
  }
}
