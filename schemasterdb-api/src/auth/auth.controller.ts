import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthResponseDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async singIn(@Body() newAuth: AuthDto): Promise<AuthResponseDto> {
    return await this.authService.singIn(newAuth);
  }
  @Post('validate')
  async validate(@Request() req): Promise<boolean> {
    return await this.authService.validate(req);
  }
}
