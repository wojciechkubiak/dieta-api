import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Plan } from '../plans/plan.entity';
import { Exclude } from 'class-transformer';
import { Settings } from 'src/settings/settings.entity';
import { Category } from 'src/categories/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Measure } from 'src/measures/measure.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'Username',
  })
  username: string;

  @Column()
  @ApiProperty({
    example: 'Password1!',
    description:
      'Password with 8 letters, upper-case, lower-case, number and a sign',
  })
  password: string;

  @Column({ default: false })
  @ApiProperty({
    example: 'true',
    description: 'Account activation status',
  })
  isActivated: boolean;

  @OneToMany(() => Plan, (plan) => plan.user, { eager: true })
  @Exclude({ toPlainOnly: true })
  plans: Plan[];

  @OneToOne(() => Settings, (settings) => settings.user, { eager: true })
  @Exclude({ toPlainOnly: true })
  settings: Settings;

  @OneToMany(() => Category, (category) => category.user, { eager: true })
  @Exclude({ toPlainOnly: true })
  categories: Category[];

  @OneToMany(() => Measure, (measure) => measure.user, { eager: true })
  @Exclude({ toPlainOnly: true })
  measures: Measure[];
}
