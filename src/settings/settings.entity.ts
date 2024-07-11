import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActivityLevel, Gender } from './settings.enum';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: Gender.FEMALE })
  @ApiProperty({
    description: 'Gender (default: FEMALE = 0)',
    example: 0,
  })
  gender: Gender;

  @Column('smallint')
  @ApiProperty({
    description: 'Age',
    example: 35,
  })
  age: number;

  @Column('smallint')
  @ApiProperty({
    description: 'Height (cm)',
    example: 175,
  })
  height: number;

  @Column('float')
  @ApiProperty({
    description: 'Initial Weight (kg)',
    example: 79.9,
  })
  initialWeight: number;

  @Column('float')
  @ApiProperty({
    description: 'Target Weight (kg)',
    example: 75.9,
  })
  targetWeight: number;

  @Column('smallint')
  @ApiProperty({
    description: 'Carbs (%)',
    example: 34,
  })
  carbsPerc: number;

  @Column('smallint')
  @ApiProperty({
    description: 'Proteins (%)',
    example: 33,
  })
  proteinsPerc: number;

  @Column('smallint')
  @ApiProperty({
    description: 'Fat (%)',
    example: 33,
  })
  fatPerc: number;

  @Column('smallint')
  @ApiProperty({
    description: 'Height (cm)',
    example: 175,
  })
  deficit: number;

  @Column({ default: ActivityLevel.MEDIOCRE })
  @ApiProperty({
    description: 'Activity Level (default: MEDIOCRE = 2)',
    example: 2,
  })
  activity: ActivityLevel;

  @OneToOne(() => User, (user) => user.settings, { eager: false })
  @JoinColumn()
  @Exclude({ toPlainOnly: true })
  user: User;
}
