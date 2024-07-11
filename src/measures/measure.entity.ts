import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Measure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  @ApiProperty({
    description: 'Date',
    example: 'eg. 2022-04-15',
  })
  date: string;

  @Column('float')
  @ApiProperty({
    description: 'Weight (kg)',
    example: 99.9,
  })
  weight: number;

  @Column('float')
  @ApiProperty({
    description: 'Neck (cm)',
    example: 40,
  })
  neck: number;

  @Column('float')
  @ApiProperty({
    description: 'Chest (cm)',
    example: 105,
  })
  chest: number;

  @Column('float')
  @ApiProperty({
    description: 'Bicep (cm)',
    example: 40,
  })
  bicep: number;

  @Column('float')
  @ApiProperty({
    description: 'Forearm (cm)',
    example: 35,
  })
  forearm: number;

  @Column('float')
  @ApiProperty({
    description: 'Waist (cm)',
    example: 95,
  })
  waist: number;

  @Column('float')
  @ApiProperty({
    description: 'Abdomen (cm)',
    example: 100,
  })
  abdomen: number;

  @Column('float')
  @ApiProperty({
    description: 'Hips (cm)',
    example: 95,
  })
  hips: number;

  @Column('float')
  @ApiProperty({
    description: 'Thigh (cm)',
    example: 65,
  })
  thigh: number;

  @Column('float')
  @ApiProperty({
    description: 'Calf (cm)',
    example: 40,
  })
  calf: number;

  @ManyToOne(() => User, (user) => user.measures, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
