import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Plan } from '../plans/plan.entity';

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
  plans: Plan[];
}
