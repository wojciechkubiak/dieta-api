import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DayName } from './day.enum';

@Entity()
export class Day {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  planId: string;

  @Column('smallint')
  day: DayName;
}
