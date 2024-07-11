import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '42ce6d29-ddac-4ac3-9a18-d52a7913b895',
    description: 'ID',
  })
  id: string;

  @Column()
  @ApiProperty({
    example: 'Dry',
    description: 'Ingridient category',
  })
  category: string;

  @ManyToOne(() => User, (user) => user.categories, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
