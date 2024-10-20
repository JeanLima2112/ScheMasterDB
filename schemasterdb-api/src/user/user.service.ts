import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserResponse, UserDto } from './dto/user.dto';
import { EmailService } from './email.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async create(newUser: UserDto): Promise<CreateUserResponse> {
    const userAlreadyRegistered = await this.findOne(newUser.email);

    if (userAlreadyRegistered) {
      throw new ConflictException(
        `User with email ${newUser.email} already registered`,
      );
    }
    // const verificationToken = randomBytes(32).toString('hex');

    // this.sendEmailVerification(
    //   newUser.email,
    //   newUser.username,
    //   verificationToken,
    // );

    const dbUser = new User();
    dbUser.username = newUser.username;
    dbUser.email = newUser.email;
    dbUser.passwordHash = bcryptHashSync(newUser.password, 10);
    // dbUser.token = verificationToken;

    const { id, username, email } = await this.usersRepository.save(dbUser);

    await this.sendWelcomeEmail(email, username);

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
      password: userFound.passwordHash,
      id: userFound.id,
      email: userFound.email,
      username: userFound.username,
    };
  }

  private async sendWelcomeEmail(
    email: string,
    username: string,
  ): Promise<void> {
    const subject = 'Bem-vindo ao nosso sistema!';

    const html = `
      <p>Olá <strong>${username}</strong>,</p>
      <p>Obrigado por se registrar! Sua conta foi criada com sucesso.</p>
      <p>Agora você pode fazer login em nosso site clicando no botão abaixo:</p>
      <a href="http://localhost:5173/login" 
         style="background-color: #1DC5F5; padding: 10px 20px; color: white; text-decoration: none; border-radius: 5px;">
        Fazer Login
      </a>
      <p>Atenciosamente,<br>Equipe do SchemasterDB</p>
    `;

    await this.emailService.sendEmail(email, subject, html);
  }

  // private async sendEmailVerification(
  //   email: string,
  //   username: string,
  //   token: string,
  // ): Promise<void> {
  //   const subject = 'Verifique seu email';

  //   const verificationLink = `http://localhost:3000/auth/verify-email?token=${token}`;

  //   const cancelLink = `http://localhost:3000/auth/cancel-account?email=${email}`;

  //   const html = `
  //     <p>Olá ${username},</p>
  //     <p>Por favor, verifique seu email clicando no botão abaixo:</p>
  //     <a href="${verificationLink}"
  //        style="background-color: #1DC5F5; padding: 10px 20px; color: white; text-decoration: none; border-radius: 5px;">
  //       Verificar Email
  //     </a>
  //     <p>Se você não quiser criar uma conta com esse email, clique no botão abaixo para cancelar o registro:</p>
  //     <a href="${cancelLink}"
  //        style="background-color: #F5621D; padding: 10px 20px; color: white; text-decoration: none; border-radius: 5px;">
  //       Cancelar Registro
  //     </a>
  //     <p>Atenciosamente,<br>Equipe do SchemasterDB</p>
  //   `;

  //   await this.emailService.sendEmail(email, subject, html);
  // }

  // async confirmEmail(token: string): Promise<void> {
  //   const user = await this.usersRepository.findOne({ where: { token } });
  //   if (!user) {
  //     throw new ConflictException(
  //       'Invalid or expired email verification token',
  //     );
  //   }

  //   user.isEmailConfirmed = true;
  //   await this.usersRepository.save(user);
  // }
}
