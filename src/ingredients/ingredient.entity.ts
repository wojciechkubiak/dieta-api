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
    description: 'Ingredient name',
  })
  category: string;

  @ApiProperty({
    description: 'Quantity of product',
    example: '5',
  })
  @Column('float')
  quantity: number;

  @ApiProperty({
    description: 'Unit',
    example: 'g',
  })
  @Column()
  unit: Unit;

  @Column('float')
  calories: number;

  @Column('float')
  carbs: number;

  @Column('float')
  proteins: number;

  @Column('float')
  fat: number;

  @ManyToOne(() => Meal, (meal) => meal.ingredients, { eager: false })
  @Exclude({ toPlainOnly: true })
  meal: Meal;
}
