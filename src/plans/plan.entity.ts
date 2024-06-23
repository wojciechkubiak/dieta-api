import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { Status } from './plan.enum';

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

  @Column()
  @ApiProperty({
    example: '821f826d-4894-403d-baec-f4f362a37493',
    description: 'User ID',
  })
  userId: string;

  @Column({ default: Status.ACTIVE })
  @ApiProperty({
    example: 'ACTIVE',
    description: 'Status (default: ACTIVE)',
  })
  status: Status;
}
