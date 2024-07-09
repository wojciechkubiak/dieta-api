import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.settings, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
