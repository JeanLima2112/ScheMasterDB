import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class AuthResponseDto {
  id: string;
  token: string;
  expiresIn: number;
}
