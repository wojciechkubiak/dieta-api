import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DayName } from './day.enum';
import { Plan } from 'src/plans/plan.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Meal } from 'src/meals/meal.entity';

@Entity()
export class Day {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('smallint')
  @ApiProperty({
    example: 0,
    description: 'Day (0 - MONDAY, 6 - SUNDAY).',
  })
  day: DayName;

  @ManyToOne(() => Plan, (plan) => plan.days, { eager: false })
  @Exclude({ toPlainOnly: true })
  plan: Plan;

  @OneToMany(() => Meal, (meal) => meal.day, { eager: true })
  @Exclude({ toPlainOnly: true })
  meals: Meal[];
}
