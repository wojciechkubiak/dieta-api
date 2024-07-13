import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ActivityLevel, Gender } from 'src/settings/settings.enum';

export class CreateSettingsDto {
  @ApiProperty()
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  height: Gender;

  @ApiProperty()
  @IsNotEmpty()
  initialWeight: number;

  @ApiProperty()
  @IsNotEmpty()
  targetWeight: number;

  @ApiProperty()
  @IsNotEmpty()
  carbsPerc: number;

  @ApiProperty()
  @IsNotEmpty()
  proteinsPerc: number;

  @ApiProperty()
  @IsNotEmpty()
  fatPerc: number;

  @ApiProperty()
  @IsNotEmpty()
  deficit: number;

  @ApiProperty()
  @IsNotEmpty()
  activity: ActivityLevel;
}
