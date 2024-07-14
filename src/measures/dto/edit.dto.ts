import { ApiProperty } from '@nestjs/swagger';

export class EditMeasureDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  neck: number;

  @ApiProperty()
  chest: number;

  @ApiProperty()
  bicep: number;

  @ApiProperty()
  forearm: number;

  @ApiProperty()
  waist: number;

  @ApiProperty()
  abdomen: number;

  @ApiProperty()
  hips: number;

  @ApiProperty()
  thigh: number;

  @ApiProperty()
  calf: number;
}
