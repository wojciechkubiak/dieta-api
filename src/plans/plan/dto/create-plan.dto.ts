import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
