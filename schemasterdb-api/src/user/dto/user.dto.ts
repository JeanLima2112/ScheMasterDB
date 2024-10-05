import { IsNotEmpty } from 'class-validator';

export class UserDto {
  id?: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

export interface CreateUserResponse {
  id: string;
  email;
  username;
}
