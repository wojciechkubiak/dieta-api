import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Measure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('date')
  date: string;

  @Column('real')
  weight: number;

  @Column('real')
  neck: number;

  @Column('real')
  chest: number;

  @Column('real')
  bicep: number;

  @Column('real')
  forearm: number;

  @Column('real')
  waist: number;

  @Column('real')
  abdomen: number;

  @Column('real')
  hips: number;

  @Column('real')
  thigh: number;

  @Column('real')
  calf: number;
}
