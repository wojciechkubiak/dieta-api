import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plan } from '../plans/plan.entity';
import { Exclude } from 'class-transformer';
import { Settings } from 'src/settings/settings.entity';

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

  @OneToOne(() => Settings, (settings) => settings.user, { eager: true })
  @JoinColumn()
  @Exclude({ toPlainOnly: true })
  settings: Settings;
}
