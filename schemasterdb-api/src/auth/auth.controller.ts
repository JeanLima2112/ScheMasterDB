import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthResponseDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async singIn(@Body() newAuth: AuthDto): Promise<AuthResponseDto> {
    return await this.authService.singIn(newAuth);
  }
  @Post('validate')
  async validate(@Request() req): Promise<boolean> {
    return await this.authService.validate(req);
  }
  // @Get('verify-email')
  // async verifyEmail(@Query('token') token: string): Promise<string> {
  //   if (!token) {
  //     throw new BadRequestException('Missing email verification token');
  //   }

  //   await this.userService.confirmEmail(token);
  //   return 'Email verificado Com Sucesso, volte ao ScheMaster';
  // }
}
