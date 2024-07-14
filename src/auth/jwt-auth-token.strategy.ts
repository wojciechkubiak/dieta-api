import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RepositoryType } from 'src/repository.consts';

@Injectable()
export class JwtAuthTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(RepositoryType.USERS)
    private usersRepository: Repository<User>,
    @Inject(ConfigService)
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate({ username }: { username: string }): Promise<User> {
    const user: User = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
