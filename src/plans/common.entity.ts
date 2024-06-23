import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { PlanStatus } from './common.enum';
import { ApiProperty } from '@nestjs/swagger';

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

  @Column('text', { default: PlanStatus.ACTIVE })
  @ApiProperty({
    example: PlanStatus.ACTIVE,
    description: `Plan status (default: ${PlanStatus.ACTIVE})`,
  })
  status: PlanStatus;
}
