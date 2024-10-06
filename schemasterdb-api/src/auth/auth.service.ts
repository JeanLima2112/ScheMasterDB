import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthDto, AuthResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  private jwtSecret: string;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
    {
      this.jwtSecret = this.configService.get<string>('JWT_SECRET');
    }
  }

  async singIn(newAuth: AuthDto): Promise<AuthResponseDto> {
    const foundUser = await this.userService.findOne(newAuth.email);

    if (!foundUser || !compareSync(newAuth.password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, email: foundUser.email };
    const token = this.jwtService.sign(payload);
    return {
      id: foundUser.id,
      token,
      expiresIn: this.jwtExpirationTimeInSeconds,
    };
  }
  async validate(req): Promise<boolean> {
    // await this.delay(3000);
    const request = req;
    const token = req.body.headers.Authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
