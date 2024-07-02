import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DayName } from './day.enum';
import { Plan } from 'src/plans/plan.entity';
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';

@Entity()
export class Day {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('smallint')
  day: DayName;

  @ManyToOne(() => User, (user) => user.days, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne(() => Plan, (plan) => plan.days, { eager: false })
  @Exclude({ toPlainOnly: true })
  plan: Plan;
}
