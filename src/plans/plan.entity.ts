import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Status } from './plan.enum';
import { User } from '../auth/user.entity';
import { Day } from 'src/days/day.entity';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  @ApiProperty({
    example: 'New plan 1',
    description: 'Plan name',
  })
  name: string;

  @Column({ default: Status.ACTIVE })
  @ApiProperty({
    example: 'ACTIVE',
    description: 'Status (default: ACTIVE)',
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.plans, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @OneToMany(() => Day, (day) => day.plan, { eager: true })
  days: Day[];
}
