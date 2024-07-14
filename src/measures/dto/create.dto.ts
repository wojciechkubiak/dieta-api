import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMeasureDto {
  @ApiProperty()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  weight: number;

  @ApiProperty()
  @IsNotEmpty()
  neck: number;

  @ApiProperty()
  @IsNotEmpty()
  chest: number;

  @ApiProperty()
  @IsNotEmpty()
  bicep: number;

  @ApiProperty()
  @IsNotEmpty()
  forearm: number;

  @ApiProperty()
  @IsNotEmpty()
  waist: number;

  @ApiProperty()
  @IsNotEmpty()
  abdomen: number;

  @ApiProperty()
  @IsNotEmpty()
  hips: number;

  @ApiProperty()
  @IsNotEmpty()
  thigh: number;

  @ApiProperty()
  @IsNotEmpty()
  calf: number;
}
