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
import { RepositoryEnum } from '../consts';
import { Auth } from './auth.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(RepositoryEnum.USER)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    @Inject(ConfigService)
    private configService: ConfigService,
  ) {}
  private logger = new Logger('AuthService');

  async signUp({ username, password }: AuthCredentialsDto): Promise<Auth> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.usersRepository.create({
        username,
        password: hashedPassword,
      });

      const saved = await this.usersRepository.save(user);

      if (!saved) {
        this.logger.error(`Failed to create the user: "${username}"`);
        throw new BadRequestException(`User not created`);
      }

      const accessToken = await this.jwtService.signAsync(
        { username },
        {
          secret: this.configService.get('JWT_KEY'),
          expiresIn: 3600,
        },
      );

      return { accessToken };
    } catch (error) {
      if (error.code === '23505') {
        this.logger.error(
          `Failed to create the user because of existing name: "${username}"`,
        );
        throw new ConflictException('Username already exists');
      }

      this.logger.error(`Failed to create the user: "${username}"`);

      throw new InternalServerErrorException();
    }
  }

  async signIn({ username, password }: AuthCredentialsDto): Promise<Auth> {
    const user = await this.usersRepository.findOneBy({ username });

    if (user) {
      const isGoodPassword = await bcrypt.compare(password, user.password);

      if (isGoodPassword) {
        const accessToken = await this.jwtService.signAsync(
          { username },
          {
            secret: this.configService.get('JWT_KEY'),
            expiresIn: 3600,
          },
        );

        return { accessToken };
      } else {
        this.logger.error(
          `Provided wrong authentication data for the user: "${username}"`,
        );
        throw new UnauthorizedException('Please check your logic credentials');
      }
    }
  }
}
