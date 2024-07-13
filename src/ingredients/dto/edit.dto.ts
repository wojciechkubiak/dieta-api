import { ApiProperty } from '@nestjs/swagger';
import { Unit } from '../ingredients.enum';

export class EditIngredientDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  unit: Unit;

  @ApiProperty()
  carbs: number;

  @ApiProperty()
  proteins: number;

  @ApiProperty()
  fat: number;
}
