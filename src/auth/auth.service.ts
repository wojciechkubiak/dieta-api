import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { Auth } from './auth.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    @Inject(ConfigService)
    private configService: ConfigService,
  ) {}
  private logger = new Logger('AuthService');

  async signUp({ username, password }: AuthCredentialsDto): Promise<Auth> {
    const FAILED_TO_CREATE_ERROR_MESSAGE = `Username "${username}" already exists.`;

    try {
      const exists = await this.usersRepository.findOneBy({ username });

      if (exists) {
        this.logger.error(FAILED_TO_CREATE_ERROR_MESSAGE);
        throw new ConflictException(FAILED_TO_CREATE_ERROR_MESSAGE);
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.usersRepository.create({
        username,
        password: hashedPassword,
      });

      const saved = await this.usersRepository.save(user);

      if (!saved) {
        this.logger.error(FAILED_TO_CREATE_ERROR_MESSAGE);
        throw new BadRequestException(FAILED_TO_CREATE_ERROR_MESSAGE);
      }

      const accessToken = await this.jwtService.signAsync(
        { username },
        {
          secret: this.configService.get('JWT_KEY'),
          expiresIn: 86400,
        },
      );

      return { accessToken };
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }

  async signIn({ username, password }: AuthCredentialsDto): Promise<Auth> {
    const WRONG_AUTH_ERROR_MESSAGE = `Provided wrong authentication data for the user "${username}".`;

    try {
      const user = await this.usersRepository.findOneBy({ username });

      if (user) {
        const isGoodPassword = await bcrypt.compare(password, user.password);

        if (isGoodPassword) {
          const accessToken = await this.jwtService.signAsync(
            { username },
            {
              secret: this.configService.get('JWT_KEY'),
              expiresIn: 86400,
            },
          );

          return { accessToken };
        } else {
          this.logger.error(WRONG_AUTH_ERROR_MESSAGE);
          throw new UnauthorizedException(WRONG_AUTH_ERROR_MESSAGE);
        }
      } else {
        this.logger.error(WRONG_AUTH_ERROR_MESSAGE);
        throw new UnauthorizedException(WRONG_AUTH_ERROR_MESSAGE);
      }
    } catch (error) {
      this.logger.error(error.response.message);
      throw new InternalServerErrorException(error.response.message);
    }
  }
}
