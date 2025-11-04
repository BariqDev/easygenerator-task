import {
  Controller,
  // Get,
  Post,
  Body,
  UsePipes,
  // Patch,
  // Param,
  // Delete,88
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { type SignupDto, signUpSchema } from './dto/sign-up.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  sinUp(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
