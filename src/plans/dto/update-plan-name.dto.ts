import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePlanNameDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
