import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Day } from 'src/days/day.entity';
import { Ingredient } from 'src/ingredients/ingredient.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '42ce6d29-ddac-4ac3-9a18-d52a7913b895',
    description: 'ID',
  })
  id: string;

  @Column()
  @ApiProperty({
    example: 'Breakfast',
    description: 'Meal name',
  })
  name: string;

  @ManyToOne(() => Day, (day) => day.meals, { eager: false })
  @Exclude({ toPlainOnly: true })
  day: Day;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.meal, { eager: true })
  @Exclude({ toPlainOnly: true })
  ingredients: Ingredient[];
}
