import {
  Controller,
  UseGuards,
  Request,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard, type RequestWithUser } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Request() req: RequestWithUser) {
    const userID = req.user?.sub;
    if (!userID) {
      throw new UnauthorizedException();
    }
    return this.userService.getProfile(userID);
  }
}
