import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Plan } from '../plans/plan.entity';
import { Day } from 'src/days/day.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActivated: boolean;

  @OneToMany(() => Plan, (plan) => plan.user, { eager: true })
  @Exclude({ toPlainOnly: true })
  plans: Plan[];

  @OneToMany(() => Day, (plan) => plan.user, { eager: true })
  @Exclude({ toPlainOnly: true })
  days: Day[];
}
