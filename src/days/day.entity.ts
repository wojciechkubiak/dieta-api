import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DayName } from './day.enum';
import { Plan } from 'src/plans/plan.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Day {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '42ce6d29-ddac-4ac3-9a18-d52a7913b895',
    description: 'ID',
  })
  id: string;

  @Column('smallint')
  @ApiProperty({
    example: '0',
    description: 'Day',
  })
  day: DayName;

  @ManyToOne(() => Plan, (plan) => plan.days, { eager: false })
  @Exclude({ toPlainOnly: true })
  plan: Plan;
}
