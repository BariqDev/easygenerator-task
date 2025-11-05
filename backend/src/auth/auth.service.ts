import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/sign-up.dto';
import { SigninDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.dto';

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
    const user = await this.userService.createProfile({
      ...signupDto,
      password: hashed_password,
    });

    // create jwt token
    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(jwtPayload);

    const response = {
      ...user,
      access_token: token,
    };
    return response;
  }

  async signin(signinDto: SigninDto) {
    // get user profile
    const user = await this.userService.findOne(signinDto.email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(
      signinDto.password,
      user?.hashed_password || '',
    );

    // invalid password
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    // create jwt token
    const jwtPayload: JwtPayload = {
      sub: user?._id?.toString(),
      email: user.email,
    };
    const token = this.jwtService.sign(jwtPayload);

    const response = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      access_token: token,
    };

    return response;
  }
}
