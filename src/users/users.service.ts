import { Injectable, NotFoundException } from '@nestjs/common';
import User from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getUserById(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
