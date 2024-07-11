import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Meal } from 'src/meals/meal.entity';
import { Unit } from './ingredients.enum';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '42ce6d29-ddac-4ac3-9a18-d52a7913b895',
    description: 'ID',
  })
  id: string;

  @Column()
  @ApiProperty({
    example: 'Apple',
    description: 'Ingredient name',
  })
  name: string;

  @Column()
  @ApiProperty({
    example: 'Fruit',
    description: 'Ingredient category',
  })
  category: string;

  @Column('float')
  @ApiProperty({
    description: 'Quantity of product',
    example: 5,
  })
  quantity: number;

  @Column()
  @ApiProperty({
    description: 'Unit',
    example: 'g',
  })
  unit: Unit;

  @Column('float')
  @ApiProperty({
    description: 'Calories quantity',
    example: 255,
  })
  calories: number;

  @Column('float')
  @ApiProperty({
    description: 'Carbs quantity',
    example: 20,
  })
  carbs: number;

  @Column('float')
  @ApiProperty({
    description: 'Proteins quantity',
    example: 15,
  })
  proteins: number;

  @Column('float')
  @ApiProperty({
    description: 'Fat quantity',
    example: 12,
  })
  fat: number;

  @ManyToOne(() => Meal, (meal) => meal.ingredients, { eager: false })
  @Exclude({ toPlainOnly: true })
  meal: Meal;
}
