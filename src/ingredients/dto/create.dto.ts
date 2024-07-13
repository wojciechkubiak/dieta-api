import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Unit } from '../ingredients.enum';

export class CreateIngredientsDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  unit: Unit;

  @ApiProperty()
  @IsNotEmpty()
  carbs: number;

  @ApiProperty()
  @IsNotEmpty()
  proteins: number;

  @ApiProperty()
  @IsNotEmpty()
  fat: number;
}
