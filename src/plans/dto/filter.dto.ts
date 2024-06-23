import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Status } from '../plan.enum';

export class FilterStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  status: Status;
}
