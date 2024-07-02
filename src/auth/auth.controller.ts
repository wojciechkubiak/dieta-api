import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { Auth } from './auth.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<Auth> {
    this.logger.verbose(
      `Creating account for: "${authCredentialsDto.username}"`,
    );
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Auth user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Auth,
  })
  @HttpCode(HttpStatus.OK)
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<Auth> {
    this.logger.verbose(`Logging user: "${authCredentialsDto.username}"`);
    return this.authService.signIn(authCredentialsDto);
  }
}
