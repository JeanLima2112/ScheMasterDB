import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserResponse, UserDto } from './dto/user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(newUser: UserDto): Promise<CreateUserResponse> {
    const userAlreadyRegistered = await this.findOne(newUser.email);

    if (userAlreadyRegistered) {
      throw new ConflictException(
        `User with email ${newUser.email} already registered`,
      );
    }
    const dbUser = new User();
    dbUser.username = newUser.username;
    dbUser.email = newUser.email;
    dbUser.passwordHash = bcryptHashSync(newUser.password, 10);

    const { id, username, email } = await this.usersRepository.save(dbUser);
    return { id, username, email };
  }
  async findOne(email: string): Promise<UserDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { email },
    });

    if (!userFound) {
      return null;
    }
    return {
      id: userFound.id,
      email: userFound.email,
      username: userFound.username,
      password: userFound.passwordHash,
    };
  }
}
