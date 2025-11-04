import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/sign-up.dto';
import { SigninDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    // Hash password
    const hashed_password = await bcrypt.hash(signupDto.password, 10);

    // Save user data with hashed password
    const user = await this.userService.create({
      ...signupDto,
      password: hashed_password,
    });

    // create jwt token
    const jwtPayload = {
      sub: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(jwtPayload);

    return {
      access_token: token,
      user: user,
      message: 'User added successfully',
    };
  }

  signin(signinDto: SigninDto) {
    return signinDto;
  }
}
