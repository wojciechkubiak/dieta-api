import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Status } from '../plan.enum';

export class UpdateNameDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

export class UpdateStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  status: Status;
}
