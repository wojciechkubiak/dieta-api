import { ApiProperty } from '@nestjs/swagger';
import { ActivityLevel, Gender } from 'src/settings/settings.enum';

export class UpdateSettingsDto {
  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  age: number;

  @ApiProperty()
  height: number;

  @ApiProperty()
  initialWeight: number;

  @ApiProperty()
  targetWeight: number;

  @ApiProperty()
  carbsPerc: number;

  @ApiProperty()
  proteinsPerc: number;

  @ApiProperty()
  fatPerc: number;

  @ApiProperty()
  deficit: number;

  @ApiProperty()
  activity: ActivityLevel;
}
