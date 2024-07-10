import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Measure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('date')
  date: string;

  @Column('float')
  weight: number;

  @Column('float')
  neck: number;

  @Column('float')
  chest: number;

  @Column('float')
  bicep: number;

  @Column('float')
  forearm: number;

  @Column('float')
  waist: number;

  @Column('float')
  abdomen: number;

  @Column('float')
  hips: number;

  @Column('float')
  thigh: number;

  @Column('float')
  calf: number;
}
