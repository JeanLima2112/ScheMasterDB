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
    const userAlreadyRegistered = await this.findOne(newUser.username);

    if (userAlreadyRegistered) {
      throw new ConflictException(
        `User ${newUser.username} already registered`,
      );
    }
    const dbUser = new User();
    dbUser.username = newUser.username;
    dbUser.email = newUser.email;
    dbUser.passwordHash = bcryptHashSync(newUser.password, 10);

    const { id, username, email } = await this.usersRepository.save(dbUser);
    return { id, username, email };
  }
  async findOne(username: string): Promise<UserDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username },
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
